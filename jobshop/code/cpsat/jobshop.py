import re
import os
from ortools.sat.python import cp_model

instance = "../data/Taillard1993/jobshop/tjs80.txt"
directory = "../data/Lawrence1984/"

def generate(instance):
    lines = open(instance, "r").readlines()
    header = lines.pop(0)
    jobs = [ (j, re.findall(r'(\d+)\s*(\d+)', l)) for j,l in enumerate(lines) ]

    horizon = 0
    for _, operations in jobs:
        for _, (_, d) in enumerate(operations):
            horizon += int(d)

    machines = {}
    last = []

    model = cp_model.CpModel()

    for _, operations in jobs:
        previous = None
        for rank, (m, d) in enumerate(operations):
            machine = int (m)
            duration = int (d)
            if machine >= 0 and duration >= 0:
                start = model.new_int_var(0, horizon, "")
                end   = model.new_int_var(0, horizon, "")
                task  = model.new_interval_var(start, duration, end, "")
                if (not machine in machines): machines[machine] = []
                machines[machine].append(task)
                if (not previous is None): model.add(previous <= start)
                previous = end
                if (rank == len(operations) - 1): last.append(end)

    for m in machines: model.add_no_overlap(machines[m])
        
    makespan = model.new_int_var(0, horizon, "")
    model.add_max_equality(makespan, last)

    model.minimize(makespan)
    return model

solver = cp_model.CpSolver()
solver.parameters.log_search_progress = True
solver.parameters.max_time_in_seconds = 600

solver.solve(generate(instance))

for path, folders, files in os.walk(directory):
    print(path)
    for filename in files:
        instance = os.path.join(path, filename)
        model = generate(instance)
        solver.solve(model)
        print(filename, "%d"%solver.BestObjectiveBound(), "%d"%solver.ObjectiveValue(), "%d"%solver.WallTime())
