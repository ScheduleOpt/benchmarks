# How to run CP-SAT benchmark

## Requirements

- Python
- CP-SAT (https://developers.google.com/optimization/cp/cp_solver)

## Instructions

### jobshop.py

The file `jobshop.py` contains all what is needed for the benchmark
- CP-SAT model for the (reentrant) jobshop problem
- loop that reads the instances in json format
- solution validation
- generation of results.json and solutions.json files

The parameters to be adjusted are
```json
solver.parameters.max_time_in_seconds = 600
solver.parameters.log_search_progress = False
hardware = "Intel 11th Gen Core i7-1185G7"
```

The file can be run with the command
```
python jobshop.py
```

### results.json

The benchmark script creates a file `results_CP-SAT_{date}` and for each problem solved an entry of the form

```json
{
    "instance": "abz5",
    "lb": {
        "value": 1154, 
        "date": "2026-06-21", 
        "solver": "CP-SAT", 
        "hardware": "Intel 11th Gen Core i7-1185G7", 
        "time": 1, "certificate": "no"
    },
    "ub": {
        "value": 1234, 
        "date": "2026-06-21", 
        "solver": "CP-SAT", 
        "hardware": "Intel 11th Gen Core i7-1185G7", 
        "time": 1, 
        "certificate": "yes"
    }
},
```

The field `certificate` becomes `yes` when the solution is validated by the validation function

### solution.json

The benchmark scripts creates a file `solution_CP-SAT_{date}` and writes the best solution found for instance solved, in the following format

```json
{
    "instance": "abz5",
    "makespan": 1234,
    "solver": "CP-SAT",
    "date": "2026-06-21",
    "machine_0": [8, 2, 9, 4, 7, 6, 3, 1, 0, 5],
    "machine_1": [5, 6, 2, 7, 9, 3, 8, 0, 1, 4],
    "machine_2": [3, 7, 1, 4, 5, 8, 0, 6, 2, 9],
    "machine_3": [4, 9, 1, 7, 8, 6, 3, 5, 2, 0],
    "machine_4": [7, 4, 5, 0, 1, 6, 3, 8, 2, 9],
    "machine_5": [1, 5, 7, 2, 0, 4, 3, 8, 6, 9],
    "machine_6": [7, 1, 8, 5, 2, 0, 4, 3, 9, 6],
    "machine_7": [6, 3, 8, 7, 9, 5, 2, 4, 0, 1],
    "machine_8": [2, 4, 0, 9, 5, 7, 6, 1, 8, 3],
    "machine_9": [2, 4, 9, 7, 5, 0, 3, 8, 6, 1]
}
```


