import * as CP from '@scheduleopt/optalcp'
import * as fs from 'node:fs'

const directory = "../../instances/json"
const bks = JSON.parse(fs.readFileSync("../../solutions/bks.json"))

const create_model = async instance => {
    const string = fs.readFileSync(`${directory}/${instance}`, { encoding: "utf-8"})
    const json = JSON.parse(string)

    const model = new CP.Model(instance)
    const tasks = []
    const machines = new Map()

    let job = null
    let previous = null
    for (const op of json.data) {
        const t = model.intervalVar({ length : op.duration })
        if (previous && job == op.job) model.endBeforeStart(previous, t)
        if (!machines.has(op.machine)) machines.set(op.machine, [])
        machines.get(op.machine).push(t)
        tasks.push(t)
        previous = t
        job = op.job
    }
    for (let tasks of machines.values()) model.noOverlap(tasks)
    model.minimize(model.max(tasks.map(t => t.end())))
    return model
}

const params = {  
    // Default parameters are usually fine, but if you want to change some parameters
    // You shouldn't need to change any other parameters that these
    timeLimit: 1,
    preset : "Default", // "Large" 
    lnsMode : "Focused", // "Robust"
    noOverlapPropagationLevel : 4, 
    cumulPropagationLevel: 3,
    integralPropagationLevel : 2,
    positionPropagationLevel : 2,
    reservoirPropagationLevel: 2,
    usePrecedenceEnergy : 1, 
    fdsDualStrategy : "split", // "minimum", "random"
    workers: [{ searchType  : "LNS"}, { searchType  : "LNS"}, { searchType  : "LNS"}, { searchType  : "FDSDual" }] 
}

const test = { // refers to info in bks record
    family : new Set(["dmu", "ta"]),
    status : new Set(["open"])
}

const run_benchmark = async filter => {
    const files = fs.readdirSync (directory, { recursive : true })
    .filter(v => {
            const r = bks.find(t => `${t.instance}.json` == v)
            let keep = true
            if (r) for (const field in filter) if (!filter[field].has(r[field])) keep = false
            return keep
        })
    await CP.benchmark(create_model, files, { timeLimit: 600 })
}

const run_once = async instance => {
    const model = await create_model (`${directory}/${instance}.json`)
    model.solve ()
}

await run_once(process.argv[2])
//await run_benchmark(test)