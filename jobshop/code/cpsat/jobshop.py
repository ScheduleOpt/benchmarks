import os
import json
import math
from datetime import datetime
from ortools.sat.python import cp_model

solver = cp_model.CpSolver()
solver.parameters.max_time_in_seconds = 600
solver.parameters.log_search_progress = True

solver_name = "CP-SAT"
path = "../../instances/json/"
date = datetime.now().strftime("%Y-%m-%d")

task_info = []

def generate (instance):
    with open(os.path.join(path, f'{instance}.json'), "r") as f:
        data = json.load(f)

    task_info.clear()
    horizon = sum(task['duration'] for task in data['operations'])
    
    model = cp_model.CpModel()
    machines = {}
    rank = {}
    ends = {}
    
    for task in data['operations']:
        job = int(task['job'])
        machine = int(task['machine'])
        duration = int(task['duration'])
        if job in rank:
            rank[job] = rank[job] + 1
        else:
            rank[job] = 0

        start = model.new_int_var(0, horizon, f"s_{job}_{rank}")
        end = model.new_int_var(0, horizon, f"e_{job}_{rank}")
        task_interval = model.new_interval_var(start, duration, end, f"i_{job}_{rank}")
        
        if machine not in machines: machines[machine] = []
        machines[machine].append(task_interval)
            
        if job in ends: 
            model.add(start >= ends[job])
        ends[job] = end

        task_info.append({ "job" : job, "machine" : machine, "interval" : task_interval })

    for m in machines: model.add_no_overlap(machines[m])
    
    makespan = model.new_int_var(0, horizon, "makespan")
    model.add_max_equality(makespan, [ ends[k] for k in ends  ])
    model.minimize(makespan)
    
    return model

def benchmark(results_file, solution_file):

    files = [f for f in os.listdir(path) if f.endswith(".json")]
    
    for filename in files:
        instance = os.path.splitext(filename)[0]
        print("solving", instance)
        model = generate (instance)
        status = solver.solve(model)
        makespan = int(solver.ObjectiveValue())
        lower_bound = int(solver.BestObjectiveBound())
        time = math.ceil(solver.WallTime() / 60)
        print(f'{instance} ${lower_bound} .. ${makespan} ${status} ${time}')

benchmark (f'results_{solver_name}_{date}.json', f'solutions_{solver_name}_{date}.json')
