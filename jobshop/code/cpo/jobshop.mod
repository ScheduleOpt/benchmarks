/*********************************************
 * OPL 22.1.1.0 Model
 * Author: DOFP
 * Creation Date: Jan 25, 2025 at 10:52:29 PM
 *********************************************/

using CP;

execute { cp.param.logPeriod = 100000000; cp.param.OptimalityTolerance = 0; cp.param.RelativeOptimalityTolerance = 0; }

tuple top { key int job; key int rank; int machine; int duration; }

{top} operations = ...;

{int} jobs = { o.job | o in operations };
{int} machines = { o.machine | o in operations };

{top} op_per_machine [m in machines] = { o | o in operations : o.machine == m };
{top} op_per_job [j in jobs] = { o | o in operations : o.job == j };

int nb_operations [j in jobs] = max(o in op_per_job[j]) o.rank;
{top} last_ = { o | j in jobs, o in op_per_job[j] : o.rank == nb_operations[j] };

dvar interval task [o in operations] size o.duration;

minimize max (o in last_) endOf(task[o]);

constraints {	
	forall (m in machines) noOverlap(all(o in op_per_machine[m]) task[o]);
	forall (<j,r,m,d> in operations : r < nb_operations[j]) endBeforeStart(task[<j,r>], task[<j,r+1>]);
}

tuple pair { int time; int job; }
sorted {pair} seq [m in machines] = { <startOf(task[<j,r>]),j> | <j,r,_,d> in op_per_machine[m] };
