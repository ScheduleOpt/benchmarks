import * as CP from '@scheduleopt/optalcp'
import * as fs from 'node:fs/promises'

const directory = "../../instances/BFFMOR2012"
const instance = "../../instances/BFFMOR2012/MFJS07.txt"

const params = { timeLimit: 600 }

const create_model = async filename => {
    const lines = (await fs.readFile(filename, 'utf8')).split(/\r?\n/).map(l => l.trim().split(/\s+/).map(v => Number(v)))
    const [nb_jobs, nb_machines, _] = lines.shift()

    const machines = new Map()
    const pred = new Set()
    const last_candidate = new Set()
    const task = []

    const model = new CP.Model(filename)

    let j = 0
    for (let k = 0; k < lines.length; k++) {
        const data = lines[k]
        if (data.length == 2) {
            const [a,b] = data
            pred.add([a,b])
            last_candidate.delete(a)
        }
        else if (data.length > 1) {
            task[j] = model.intervalVar()
            const options = []
            const nb_options = data[0]
            for (let o = 0; o < nb_options; o++) {
                const m = data[1 + 2 * o]
                const d = data[1 + 2 * o + 1]
                const t = model.intervalVar({ length : d, optional : true })
                if (!machines.has(m)) machines.set(m, [])
                machines.get(m).push(t)
                options.push(t)
            }
            model.alternative(task[j], options)
            last_candidate.add(j)
            j++
        }
    }

    for (const [a,b] of pred) model.endBeforeStart(task[a], task[b])

    for (let tasks of machines.values()) model.noOverlap(tasks)

    model.enforce(model.sum(task.map(t => t.pulse(1))).le(nb_machines))

    const last = Array.from(last_candidate.values())
    model.minimize(model.max(last.map(k => task[k].end())))

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
    if (model) model.solve(params)
}

run_once(instance)
//run_benchmark(directory)