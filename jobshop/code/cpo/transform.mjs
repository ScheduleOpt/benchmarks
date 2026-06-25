import * as fs from 'node:fs'
import { json } from 'node:stream/consumers'

const directory = "../../instances/json"
const bks = JSON.parse(fs.readFileSync("../../solutions/bks.json"))

const time_limit = 600 // in seconds
const hardware = "Intel 11th Gen Core i7-1185G7" // your machine

const filter = { // refers to info in bks record
    //family : new Set(["bel"]),
    //status : new Set(["open"])
}

const json_to_dat = async () => {
    const files = fs.readdirSync (directory, { recursive : true })
    .filter(v => v.endsWith("json"))
    .filter(v => {
            const r = bks.find(t => `${t.instance}.json` == v)
            let keep = true
            if (r) for (const field in filter) if (!filter[field].has(r[field])) keep = false
            return keep
        })
    const names = []
    for (const file of files) {
        const instance = file.split("\.")[0]
        names.push(instance)
        const json = JSON.parse(await fs.readFileSync(`${directory}/${file}`, { encoding: "utf-8"}))
        const s = []
        for (const r of json.data) s.push(`<${r.job},${r.operation},${r.machine},${r.duration}>`)
        fs.writeFileSync(`./data/${instance}.dat`, `operations = {\n${s.join(",\n")}\n};`)
    }
    const n = names.map(v => `"${v}"`)
    fs.writeFileSync("instances.dat_", `timeLimit = ${time_limit};\nhardware = "${hardware}";\ninstances = {\n${n.join(",\n")}\n};\n`)
}  

json_to_dat()