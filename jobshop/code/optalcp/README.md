# How to run OptalCP benchmark

## Requirements

- OptalCP (https:///optalcp.com)
- NodeJS (https://nodejs.org) or bun (https://bun.sh/)

## Instructions

### jobshop.mjs

The file `jobshop.mjs` contains all what is needed for the benchmark
- CP-SAT model for the (reentrant) jobshop problem
- loop that reads the instances in json format
- solution validation
- generation of results.json and solutions.json files

The parameters to be adjusted are
```js
const params = {  
    // Default parameters are usually fine, but if you want to change some parameters
    // You shouldn't need to change any other parameters than these
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
```
and the filters which controls what instances are ran (from bks.json)

```js
const filter = {
    family : new Set(["dmu", "ta"]),
}
```
Runs all the instances from families `dmu` and `ta`

```js
const filter = {
    status : new Set(["open"])
}
```
Runs all the instances marked "open" in `bks.json`


The file can be run with the command
```
node jobshop.mjs
```

### results.json

The benchmark script creates a file `results_OptalCP_{date}` and for each problem solved an entry of the form

```json
{
    "instance" : "abz5",
    "lb" : {
        "value":1234,
        "date":"2026-06-21",
        "solver":"OptalCP",
        "hardware":"Intel 11th Gen Core i7-1185G7",
        "time":1,
        "certificate":"no"
    },
    "ub" : {
        "value":1234,
        "date":"2026-06-21",
        "solver":"OptalCP",
        "hardware":"Intel 11th Gen Core i7-1185G7",
        "time":1,
        "certificate":"no"
    }
}
```

### solution.json

The benchmark scripts creates a file `solution_OptalCP_{date}` and writes the best solution found for instance solved, in the following format

```json
{
    "instance" : "abz5",
    "makespan" : 1234,
    "solver" : "OptalCP",
    "date" : "2026-06-21",
    "machine_0" : [0,5,2,9,4,8,7,6,3,1],
    "machine_1" : [5,4,2,7,9,3,8,0,6,1],
    "machine_2" : [9,7,3,1,4,5,8,0,6,2],
    "machine_3" : [4,2,0,7,9,8,6,3,1,5],
    "machine_4" : [7,5,0,1,6,3,8,2,4,9],
    "machine_5" : [1,9,5,7,2,0,4,3,8,6],
    "machine_6" : [6,1,8,2,5,0,4,3,9,7],
    "machine_7" : [6,1,3,8,7,9,5,4,2,0],
    "machine_8" : [3,4,0,9,5,7,6,1,2,8],
    "machine_9" : [2,8,6,1,4,9,7,5,0,3]
},
```
