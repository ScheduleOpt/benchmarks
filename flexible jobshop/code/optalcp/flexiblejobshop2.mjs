import * as CP from '@scheduleopt/optalcp'
import * as fs from 'node:fs/promises'

const directory = "../../instances/testing"
const instance = "../../instances/BarnesChambers1996/mt10c1.txt"

const params = {
    timeLimit: 600,
    workers: [
        { searchType: "FDS",   noOverlapPropagationLevel: 4, cumulPropagationLevel: 3 },
        { searchType: "FDS",   noOverlapPropagationLevel: 4, cumulPropagationLevel: 3 },
        { searchType: "FDSLB", noOverlapPropagationLevel: 4, cumulPropagationLevel: 3, FDSLBStrategy: "Split" },
        { searchType: "LNS",   noOverlapPropagationLevel: 2, cumulPropagationLevel: 2 },
    ]
}

const create_model = async filename => {
    const lines = (await fs.readFile(filename, 'utf8')).split(/\r?\n/).map(l => l.trim().split(/\s+/).map(v => Number(v)))
    const [nb_jobs, nb_machines, _] = lines.shift()

    const machines = new Map()
    const all_tasks = []
    const last = []

    const model = new CP.Model(filename)

    for (let j = 0; j < lines.length; j++) {
        const data = lines[j]
        const nb_operations = data[0]
        let previous = null
        let last_task = null
        let operation_index = 1
        for (let r = 0; r < nb_operations; r++) {
            const nb_options = data[operation_index]
            const task = model.intervalVar()
            all_tasks.push(task)
            const options = []
            for (let o = 0; o < nb_options; o++) {
                const m = data[operation_index + 1 + 2 * o]
                const d = data[operation_index + 1 + 2 * o + 1]
                const t = model.intervalVar({ length : d, optional : true })
                if (!machines.has(m)) machines.set(m, [])
                machines.get(m).push(t)
                options.push(t)
            }
            model.alternative(task, options)
            if (previous) model.endBeforeStart(previous, task)
            previous = task
            last_task = task
            operation_index += 2 * nb_options + 1
        }
        if (last_task) last.push(last_task.end())
    }

    for (let tasks of machines.values()) model.noOverlap(tasks)

    model.cumulLe(model.cumulSum(all_tasks.map(t => t.pulse(1))), nb_machines)

    model.minimize(model.max(last))

    return model
}

const run_benchmark = async folder => {
    const files = (await fs.readdir (folder, { recursive : true }))
      .filter(v => v.endsWith("txt"))
      .map(v => folder + "/" + v)
    CP.benchmark(create_model, files, params)
}

const run_once = async filename => {
    const model = await create_model(filename)
    if (model) CP.solve(model, params)
}

//run_once(instance)
run_benchmark(directory)