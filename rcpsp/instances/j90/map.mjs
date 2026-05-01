import * as fs from 'node:fs/promises'

const files = await fs.readdir (".")

for (let filename of files) 
    if (filename.endsWith(".sm")) {

    const s = filename.split('/')
    const instance = s[s.length - 1].replace(/.sm/,'')
    
    const f = (await fs.readFile(filename, 'utf8')).split(/\r?\n/)

    console.log("reading", instance)

    const header = f[14].trim().split(/\s+/)
    const nbTasks = Number(header[1]) + 2

    const offset = 18
    const successors = []

    for (let i = 0; i < nbTasks; i++) {
        const data = f[i + offset].trim().split(/\s+/)
        const id = Number(data[0])
        const nbSuccessors = Number(data[2])
        successors[id] = []
        for (let k = 0; k < nbSuccessors; k++) successors[id].push(Number(data[3+k]))
    }

    const offset2 = offset + nbTasks + 4
    const duration = Array(nbTasks)
    const consumption = Array(nbTasks)
    let nbResources = 0

    for (let i = 0; i < nbTasks; i++) {
        const data = f[i + offset2].trim().split(/\s+/)
        const id = Number(data[0])
        duration[id] = Number(data[2])
        nbResources = data.length - 3
        consumption[id] = Array(nbResources)
        for (let r = 0; r < nbResources; r++) consumption[id][r] = Number(data[3+r])
    }

    const offset3 = offset2 + nbTasks + 3
    const capacities = f[offset3].trim().split(/\s+/).join(" ")

    const r = []
    r.push(`${nbTasks} ${nbResources}`)
    r.push(capacities)
    for (let i = 1; i <= nbTasks; i++) r.push(`${duration[i]} ${consumption[i].join(" ")} ${successors[i].length} ${successors[i].join(" ")}`)

    fs.writeFile(`${instance}.rcp`, r.join("\n"))

    //break
}

