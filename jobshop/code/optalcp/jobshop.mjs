import * as CP from '@scheduleopt/optalcp'
import * as fs from 'node:fs'

const directory = "../../instances/json"
const bks = JSON.parse(fs.readFileSync("../../solutions/bks.json"))

const create_model = async file => {
    const string = fs.readFileSync(file, { encoding: "utf-8"})
    const json = JSON.parse(string)

    const nb_machines = json.machines
    const nb_jobs = json.jobs

    const machines = new Map()
    const last = []

    const tasks = []
    for (let k = 0; k < json.data.length; k++) json.data[k].index = k

    const model = new CP.Model(json.instance)

    let job = null
    let previous = null
    for (const op of json.data) {
        const task = model.intervalVar({ length : op.duration })           
        task.duration = op.duration
        const m = op.machine
        if (!machines.has(m)) machines.set(m, [])
        machines.get(m).push(task)
        if (job == op.job) model.endBeforeStart(previous, task) 
        if (op.operation == nb_machines - 1) last.push(task.end())   
        previous = task
        job = op.job
        tasks[op.index] = task
    }

    for (let tasks of machines.values()) model.noOverlap(tasks)

    model.minimize(model.max(last))

    return model
}

const test = new Set([ "tai" ])

const params = { timeLimit: 600 }

const run_benchmark = async test => {
    const files = fs.readdirSync (directory, { recursive : true })
    .map(v => directory + "/" + v)
    .filter(v => v.endsWith("json"))
    .filter(v => {
        const file = fs.readFileSync(directory + "/" + v, { encoding: "utf-8"})
        const json = JSON.parse(file)
        return test.has(json.family)
    })
    await CP.benchmark(create_model, files, params)
}

const run_once = async instance => {
    const model = await create_model (`${directory}/${instance}.json`)
    model.solve (params)
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Usage: node jobshop.mjs instance.json');
    process.exit(1);
}
await run_once(args[0])
//await run_benchmark(test)
