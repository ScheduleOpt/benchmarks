# How to run CPO benchmark

## Requirements

- IBM ILOG CP Optimizer (we use the OPL interface)
- NodeJS (https://nodejs.org) or bun (https://bun.sh/)

## Instructions

### transform.mjs

The file `transform.mjs` transforms the jobshop instances from the json format to a format understandable by OPL (.dat) and puts them in `./data`
It also generates the file `intances.dat` that describes the main parameters of the benchmark (time limit, instances to be ran) that serves as input of `benchmark.mod`

Before launching transform.mjs
- create the folder `./data`
- update the variables `time_limit` and `hardware`
- update the filters

The filters are based on the content of bks.json

```json
const filter = {
    family : new Set(["dmu", "ta"]),
}
```
Generates all the instances from families `dmu` and `ta`

```json
const filter = {
    status : new Set(["open"])
}
```
Generates all the instances that are marked as open in `bks.json`

run `transform.mjs` with the instruction
```
node transform.mjs
```

### instances.dat

You can also edit `instances.dat` if you don't want to do simple changes without running `transform.mjs` again

### benchmark.mod

The file `benchmark.mod` controls the loop that
- reads and solves an instance
- generates the file `results.json`
- generates the file `solutions.json`

it takes as input the files `instances.dat` and requires `jobshop.mod` to be present in the same folder

Run `benchmark.mod` either by
- creating in OPL Studio a "run configuration" (in an existing OPL project) containing `benchmark.mod` and `instances.dat` and running it via the UI
- running OPL from the command line

### jobshop.mod

The file `jobshop.mod` is the OPL model for the jobshop. It can be tested independently of the benchmark controlling script by creating a "run configuration" (in an existing OPL project) containing `jobshop.mod` and an instance like `ft06.dat`

### results.json

The benchmark script creates for each problem solved an entry of the form

```json
{
    "instance" : "abz5",
    "lb" : {
        "value":1234,
        "date":"2026-6-21",
        "solver":"CPO",
        "hardware":"Intel 11th Gen Core i7-1185G7",
        "time": 1,
        "certificate":"no" 
    },
    "ub" : {
        "value":1234,
        "date":"2026-6-21",
        "solver":"CPO",
        "hardware":"Intel 11th Gen Core i7-1185G7",
        "time": 1,
        "certificate":"no"
    }
}
```

### solution.json

The benchmark scripts writes the best solution found for instance in `solutions.json` with the following format

```json
{
    "instance":"abz5",
    "makespan":1234,
    "solver":"CPO",
    "date":"2026-6-21",
    "machine_4" : [7, 4, 5, 0, 1, 6, 3, 8, 2, 9],
    "machine_8" : [2, 4, 0, 9, 5, 7, 6, 1, 8, 3],
    "machine_6" : [7, 1, 8, 5, 2, 0, 4, 3, 9, 6],
    "machine_5" : [1, 5, 7, 2, 0, 4, 3, 8, 6, 9],
    "machine_1" : [5, 6, 2, 7, 9, 3, 8, 0, 4, 1],
    "machine_2" : [3, 7, 1, 4, 5, 8, 0, 6, 2, 9],
    "machine_9" : [2, 4, 9, 7, 5, 0, 3, 8, 6, 1],
    "machine_7" : [3, 6, 8, 7, 9, 5, 4, 2, 0, 1],
    "machine_0" : [8, 2, 9, 4, 7, 6, 3, 1, 0, 5],
    "machine_3" : [4, 1, 7, 9, 8, 6, 3, 5, 2, 0]
}
```

For the moment solutions are not double-checked by a separate function. In order to validate the solution in a site like optimizizer (https://optimizizer.com) you need to reorder the machines and keep only the list of numbers

```
8 2 9 4 7 6 3 1 0 5
5 6 2 7 9 3 8 0 4 1
3 7 1 4 5 8 0 6 2 9
4 1 7 9 8 6 3 5 2 0
7 4 5 0 1 6 3 8 2 9
1 5 7 2 0 4 3 8 6 9
7 1 8 5 2 0 4 3 9 6
3 6 8 7 9 5 4 2 0 1
2 4 0 9 5 7 6 1 8 3
2 4 9 7 5 0 3 8 6 1
```