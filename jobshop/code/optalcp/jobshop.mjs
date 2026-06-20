import * as CP from '@scheduleopt/optalcp'
import * as fs from 'node:fs'

const directory = "../../instances/json"
const bks = JSON.parse(fs.readFileSync("../../solutions/bks.json"))

const create_model = async instance => {

    const string = fs.readFileSync(`${directory}/${instance}`, { encoding: "utf-8"})
    const json = JSON.parse(string)
 
    const last = new Map()
    const machines = new Map()

    const model = new CP.Model(instance)

    for (const { job, machine, duration } of json.data) {

        const task = model.intervalVar({ length : duration })
        task.job = job
        if (last.has(job)) model.endBeforeStart(last.get(job), task)

        if (!machines.has(machine)) machines.set(machine, [])
        machines.get(machine).push(task)

        last.set(job, task)
    }

    for (const tasks of machines.values()) model.noOverlap(tasks)

    const a = [...last.values()].map(v => v.end())
    model.minimize(model.max(a))

    return { model, machines }
}

const params = {  
    // Default parameters are usually fine, but if you want to change some parameters
    // You shouldn't need to change any other parameters that these
    timeLimit: 600,
    logLevel: 0,
    //preset : "Default", // "Large" 
    //lnsMode : "Robust", // "Focused"
    noOverlapPropagationLevel : 4, 
    cumulPropagationLevel: 3,
    integralPropagationLevel : 2,
    positionPropagationLevel : 2,
    reservoirPropagationLevel: 2,
    usePrecedenceEnergy : 1, 
    //fdsDualStrategy : "Split", // "Minimum", "Random"
    //workers: [{ searchType  : "LNS"}, { searchType  : "LNS"}, { searchType  : "LNS"}, { searchType  : "FDSDual" }] 
}

function getCurrentDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`;
}

const test = { // refers to info in bks record
    //family : new Set(["bel"]),
    //status : new Set(["open"])
}

const write = (file, new_record) => {
    let data = []
    if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file, { encoding : "utf-8" }))
    data.push(new_record)
    const s = []
    for (const r of data) {
        const rs = []
        for (const key in r) rs.push(`    "${key}" : ${JSON.stringify(r[key])}`)
        s.push(`{\n${rs.join(",\n")}\n}`)
    }
    fs.writeFileSync(file, `[\n${s.join(",\n")}]`)
}

const run_benchmark = async filter => {
    const files = fs.readdirSync (directory, { recursive : true })
    .filter(v => {
            const r = bks.find(t => `${t.instance}.json` == v)
            let keep = true
            if (r) for (const field in filter) if (!filter[field].has(r[field])) keep = false
            return keep
        })
    for (const file of files) {
        const instance = file.split(".")[0]
        const solver = "OptalCP"
        const date = getCurrentDate()

        const { model, machines } = await create_model (file)
        const result = await model.solve (params)
        const hardware = result.cpu
        const lb = result.objectiveBound
        const ub = result.objective
        const time = Math.ceil(result.duration / 60)

        console.log(`${instance} ${lb} .. ${ub} in ${time} minutes`)
        const r = { 
            instance, 
            lb : { value : lb, date, solver, hardware, time, certificate : "no" },
            ub : { value : ub, date, solver, hardware, time, certificate : "no" }
        }
        write(`result_${solver}_${date}.json`, r)

        if (ub != undefined) {
            const solution = { instance, makespan: ub, solver, date }
            const sorted_machines = [...machines.keys()].sort((a,b) => a - b)
            for (const m of sorted_machines) {
                const tasks = machines.get(m)
                const jobs = (tasks.map(v => [result.solution.getStart(v), v.job])).sort()
                solution[`machine_${m}`] = jobs.map(([_,j]) => j)
            }
            write(`solution_${solver}_${date}.json`, solution)
        }
    }
}

const run_once = async instance => {
    const model = await create_model (`${directory}/${instance}.json`)
    model.solve (params)
}

//await run_once(process.argv[2])
await run_benchmark(test)