
import * as CP from '@scheduleopt/optalcp'
import * as fs from 'node:fs/promises'

const directory = "../data/Taillard1993/jobshop/"

const params = {
    timeLimit: 600,
    relativeGapTolerance: 0,
    workers: [
        { searchType: "FDS",   noOverlapPropagationLevel: 4, cumulPropagationLevel: 3 },
        { searchType: "FDS",   noOverlapPropagationLevel: 4, cumulPropagationLevel: 3 },
        { searchType: "FDSLB", noOverlapPropagationLevel: 4, cumulPropagationLevel: 3, FDSLBStrategy: "Split" },
        { searchType: "LNS",   noOverlapPropagationLevel: 2, cumulPropagationLevel: 2 },
    ]
}

const create_model = async filename => {
    const lines = (await fs.readFile(filename, 'utf8')).split(/\r?\n/).map(l => l.trim().split(/\s+/).map(v => Number(v)))
    const [nb_jobs, nb_machines] = lines.shift()

    const machines = new Map()
    const last = []

    const model = new CP.Model(filename)
 
    for (let j = 0; j < lines.length; j++) {
        const data = lines[j]
        const r_max = Math.round(data.length / 2)
        let previous = null
        let last_task = null
        for (let r = 0; r < r_max; r++) {
            const m = data[2 * r]
            const d = data[2 * r + 1]
            if (m >= 0 && d >= 0) { // some files end in -1 -1
                const task = model.intervalVar({ length : d })
                if (!machines.has(m)) machines.set(m, [])
                machines.get(m).push(task)
                if (previous) model.endBeforeStart(previous, task)
                previous = task
                last_task = task
            }
        }
        if (last_task) last.push(last_task.end())
    }

    for (let tasks of machines.values()) model.noOverlap(tasks)

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

run_benchmark(directory)