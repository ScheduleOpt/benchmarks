import * as CP from '@scheduleopt/optalcp'
import { time, timeLog } from 'console'
import * as fs from 'fs/promises'

const instance = "../instances/j30/j30_1_1.rcp"
const directory = "../instances/j120"

const read_data = async filename => {
    const f = await fs.readFile(filename, { encoding:"utf8"})
    const matches = f.match(/\d+/g)
    const integers = matches.map(num => parseInt(num, 10))
    const nb_tasks = integers[0]
    const nb_resources = integers[1]
    const capacity = []
    for (let i = 0; i < nb_resources; i++) capacity[i] = integers[i+2]
    const task_data = []
    let k = nb_resources + 2
    for (let i = 0; i < nb_tasks; i++) {
        const duration = integers[k]
        const consumption = []
        for (let r = 0; r < nb_resources; r++) consumption[r] = integers[k+1+r]
        const nb_successors = integers[k+1  +nb_resources]
        const successors = []
        for (let s = 0; s < nb_successors; s++) {
            const v = integers[k+2+nb_resources+s] - 2
            if (v < nb_tasks - 2) successors.push(v)
        }
        k += 2 + nb_resources + nb_successors
        if (duration) task_data.push({ duration, consumption, successors})
    }
    return { nb_tasks, nb_resources, capacity, task_data}
}

const create_model = async file => {
    const model = new CP.Model(file)
    const { nb_resources, capacity, task_data } = await read_data(file)

    const task = task_data.map(d => model.intervalVar({ length : d.duration}))

    // Resources
    const resource = []
    for (let r = 0; r < nb_resources; r++) resource[r] = []

    for (let i = 0; i < task_data.length; i++) {
        for (let r = 0; r < nb_resources; r++) {
            const c = task_data[i].consumption[r]
            if (c > 0) resource[r].push(task[i].pulse(c))
        }
    }
    for (let r = 0; r < nb_resources; r++) model.sum(resource[r]).le(capacity[r])

    // Precedences
    for (let i = 0; i < task_data.length; i++)
        for (let j of task_data[i].successors) 
            model.endBeforeStart(task[i], task[j])

    model.minimize(model.max(task.map(t => t.end())))
   
    return model
}

const params = { timeLimit : 600 }

const run_benchmark = async folder => {
    const files = (await fs.readdir (folder, { recursive : true }))
      .filter(v => v.endsWith("rcp"))
      .map(v => folder + "/" + v)
    await CP.benchmark(create_model, files, params)
}

const run_once = async filename => {
    const model = await create_model(filename)
    if (model) model.solve(params)
}

//run_once(instance)
run_benchmark(directory)
