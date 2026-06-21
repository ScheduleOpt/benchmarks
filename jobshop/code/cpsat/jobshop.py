import os
import json
import math
from datetime import datetime
from ortools.sat.python import cp_model

solver = cp_model.CpSolver()
solver.parameters.max_time_in_seconds = 600
solver.parameters.log_search_progress = False
hardware = "Intel 11th Gen Core i7-1185G7"

solver_name = "CP-SAT"
path = "../../instances/json/"
date = datetime.now().strftime("%Y-%m-%d")

task_info = []

def generate (instance):
    with open(os.path.join(path, f'{instance}.json'), "r") as f:
        data = json.load(f)

    task_info.clear()
    horizon = sum(task['duration'] for task in data['data'])
    
    model = cp_model.CpModel()
    machines = {}
    rank = {}
    ends = {}
    
    for task in data['data']:
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


def update_json_file(file, new_record):
    data = []
    if os.path.exists(file):
        with open(file, "r") as f:
            data = json.load(f)
    data.append(new_record)
    with open(file, "w") as f:
        f.write("[")
        for i, entry in enumerate(data):
            if i > 0: f.write(",")
            f.write("\n{")
            for j, key in enumerate(entry):
                if j > 0: f.write(",")
                f.write(f'\n    "{key}": {json.dumps(entry[key])}')
            f.write("\n}")
        f.write("\n]")


def validate_solution(input_json_path, solution):
    """ Written by an AI """
    with open(input_json_path, "r") as f:
        data = json.load(f)

    tasks = data['data']
    nb_tasks = len(tasks)
    
    # 1. Map occurrences for Reentrant Job Shop
    job_machine_task_indices = {}
    for i, t in enumerate(tasks):
        k = (int(t['job']), int(t['machine']))
        if k not in job_machine_task_indices:
            job_machine_task_indices[k] = []
        job_machine_task_indices[k].append(i)
        
    occurrence_pointers = {k: 0 for k in job_machine_task_indices}
    
    # Pre-calculate expected tasks per machine to validate counts
    expected_machine_counts = {}
    for t in tasks:
        m = int(t['machine'])
        expected_machine_counts[m] = expected_machine_counts.get(m, 0) + 1

    preds = {i: [] for i in range(nb_tasks)}
    succs = {i: [] for i in range(nb_tasks)}
    
    # 2. Build Job Sequence Dependencies
    job_sequences = {}
    for i, t in enumerate(tasks):
        jid = int(t['job'])
        if jid not in job_sequences:
            job_sequences[jid] = []
        job_sequences[jid].append(i)
        
    for jid, seq in job_sequences.items():
        for idx in range(1, len(seq)):
            preds[seq[idx]].append(seq[idx-1])
            succs[seq[idx-1]].append(seq[idx])

    # 3. Build Machine Sequence Dependencies
    for key, job_list in solution.items():
        if key.startswith("machine_"):
            m_id = int(key.split('_')[1])
            
            # Check if the machine processed the correct total number of tasks
            if len(job_list) != expected_machine_counts.get(m_id, 0):
                print(f"Validation failed: Machine {m_id} task count mismatch.")
                return False
            
            m_tasks = []
            for jid in job_list:
                k = (jid, m_id)
                if k not in job_machine_task_indices or occurrence_pointers[k] >= len(job_machine_task_indices[k]):
                    print(f"Validation failed: Unexpected job {jid} on machine {m_id}.")
                    return False
                
                # Fetch the correct task index based on how many times we've seen this (job, machine) combo
                idx = job_machine_task_indices[k][occurrence_pointers[k]]
                m_tasks.append(idx)
                occurrence_pointers[k] += 1
            
            # Add dependencies based on the machine's execution sequence
            for idx in range(1, len(m_tasks)):
                preds[m_tasks[idx]].append(m_tasks[idx-1])
                succs[m_tasks[idx-1]].append(m_tasks[idx])

    # 3.5 Verify all tasks for all jobs were scheduled
    for k, visits_made in occurrence_pointers.items():
        expected_visits = len(job_machine_task_indices[k])
        if visits_made != expected_visits:
            job_id, machine_id = k
            print(f"Validation failed: Job {job_id} expected {expected_visits} visits to Machine {machine_id}, but only made {visits_made}.")
            return False

    # 4. Longest path calculation using Topological Sort (Safe from infinite loops)
    in_degree = {i: 0 for i in range(nb_tasks)}
    for i in range(nb_tasks):
        for s in succs[i]:
            in_degree[s] += 1
            
    queue = [i for i in range(nb_tasks) if in_degree[i] == 0]
    start_times = [0] * nb_tasks
    
    visited_count = 0
    while queue:
        u = queue.pop(0)
        visited_count += 1
        for s in succs[u]:
            start_times[s] = max(start_times[s], start_times[u] + int(tasks[u]['duration']))
            in_degree[s] -= 1
            if in_degree[s] == 0:
                queue.append(s)
                
    # If the visited nodes don't equal total tasks, a cycle exists in the graph
    if visited_count != nb_tasks:
        print("Validation failed: Cycle detected in the schedule!")
        return False

    makespan = 0
    for i in range(nb_tasks):
        makespan = max(makespan, start_times[i] + int(tasks[i]['duration']))
    
    print(f"Validated makespan {makespan}")
    return makespan


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

        result = {
            "instance" : instance,
            "lb" : {"value": lower_bound, "date": date, "solver": solver_name, "hardware": hardware, "time": time, "certificate": "no" },
            "ub" : {"value": makespan, "date": date, "solver": solver_name, "hardware": hardware, "time": time, "certificate": "no" }
        }
        print(f'{instance} {lower_bound} .. {makespan} in {time} minutes', status)

        if status in { cp_model.FEASIBLE, cp_model.OPTIMAL }:
            solution = {
                "instance": instance, 
                "makespan" : makespan,
                "solver" : solver_name,
                "date": date,
            }
            machines = {}
            for task in task_info:
                job = task['job']
                machine = task['machine']
                interval = task['interval']
                s = solver.Value(interval.StartExpr())
                if machine not in machines:
                    machines[machine] = []
                machines[machine].append({ "s" : s, "job" : job })
                machines[machine].sort(key=lambda x: x['s'])
            sorted_machines = sorted([ m for m in machines ])
            for m in sorted_machines: 
                solution[f'machine_{m}'] = [ task['job'] for task in machines[m] ]
            validated_makespan = validate_solution(os.path.join(path, filename), solution)
            if validated_makespan == makespan:
                result["ub"]["certificate"] = "yes"
                update_json_file(solution_file, solution)
        
        update_json_file(results_file, result) # if solution valid, certificate field is updated

benchmark (f'results_{solver_name}_{date}.json', f'solution_{solver_name}_{date}.json')
