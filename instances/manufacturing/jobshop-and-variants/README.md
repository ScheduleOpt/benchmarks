# The Jobshop problem and benchmark

## Table of Contents

- [Jobshop instances](#jobshop-benchmark-instances)
    - [Overview of the jobshop benchmark](#overview-of-the-benchmark)
    - [Classification of the jobshop instances](#classification-of-the-jobshop-instances)
    - [Formats](#formats)
    - [Publications](#publications)
- [Jobshop and variants using the standard format](#jobshop-variants)
    - [Jobshop](#jobshop)
    - [No buffer jobshop (blocking)](#no-buffer-jobshop-blocking-jobshop)
    - [No wait jobshop](#no-wait-jobshop)
    - [Cumulative jobshop](#cumulative-jobshop)
    - [Jobshop with operators](#jobshop-with-operators)
    - [Flowshop](#flow-shop)
    - [Permutation flow shop](#permutation-flow-shop)
    - [Non permutation flow shop](#non-permutation-flow-shop)
    - [Open shop](#open-shop)
- [Jobshop variants that require extra data](#other-jobshop-variants)
    - [Jobshop with arbitrary precedences](#jobshop-with-arbitrary-precedences)
    - [Jobshop with setup times](#jobshop-with-setup-times)
    - [Flexible jobshop](#flexible-jobshop)
- [Jobshop benchmark](#jobshop-benchmark-results)
    - [Methodology](#methodology)
    - [Instances of interest](#problems-of-interest)
        - [Small but still open](#small-yet-open)
        - [Large](#large)
        - [Industrial](#missing-industrial-instances)
    - [Current results](#current-results)
    - [Publications](#publications-1)
- [Recommendations](#recommendations)

<br/>

# Jobshop benchmark instances

## Overview of the jobshop benchmark

All instances in the benchmark follow the standard jobshop format, regardless of the problem they were originally meant for. The DaColTeppan instances use a conservative extension of the existing jobshop format. Cumulative jobshop have the capacity per machine in the filename, which may or may not be used.

Flowshop instances (631)
- 2 instances of flowshop `hel` from Heller 1960
- 8 instances of flowshop `car` from Carlier 1978
- 120 instances of flowshop `tfs` from Taillard 1993
- 21 instances of flowshop `reC` from Reeves 1995
- 480 instances of flowshop `vrf` from Vallada, Ruiz and Framinan 2015

Jobshop instances (242)
- 3 instances of jobshop `ft` from Fischer and Thompson 1963 
- 40 instances of jobshop `la` from Lawrence 1984
- 5 instances of jobshop `abz` from Adams, Balas and Zawack 1988
- 10 instances of jobshop `orb` from Applegate and Cook 1991
- 4 instances of jobshop `yn` from Yamada and Nakano 1992
- 20 instances of jobshop `swv` from Storer, Wu and Vaccari 1992
- 80 instances of jobshop `tjs` from Taillard 1993
- 80 instances of jobshop `dmu` from Demirkol, Mehta and Uzsoy 1998

Reentrant jobshop instances (114)
- 12 instances of jobshop `long-js` from Da Col and Teppan 2022
- 12 instances of jobshop `short-js` from Da Col and Teppan 2022
- 90 instances of jobshop `tai` from Da Col and Teppan 2022

Cumulative jobshop instances (1400)
- 1400 instances of cumulative flowshop `pra` from Pan, Ruiz and Alfaro-Fernandez in 2017

<br/>


## Classification of the jobshop instances

We use the following ***engines*** for the benchmark
- [**IBM ILOG Cplex**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-optimizer) : representative of the **MIP** family of engines
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the **CP-scheduling** family of engines
- [**ScheduleOpt OptalCP**](https://optalcp.com) : representative of the **CP-scheduling** family of engines
- [**Google OR-Tools**](https://developers.google.com/optimization) : representative of the **CP-SAT** family of engines

*We would like to add a representative of the local search family of engines. Please contact us if you are willing to provide us with licenses for benchmarking purposes.*

The instances are divided into
- **easy** : solved to optimality (with proof) in 1 minute by at least 1 reference engine
- **medium** : solved to optimality (with proof) in 1 hour by at least 1 reference engine
- **hard** : solved to optimality (with proof) by someone, somewhere ... allegedly
- **open** : no proof of optimality

<br/> 

If we consider the benchmark as a pure jobshop + flowshop benchmark (no cumulative, etc), there are currently
- 294 easy instances
- 63 medium instances
- 22 hard instances
- 608 open instances

The detailed results are available as a table [Current results](#current-results)

There are two subsets of remarkable instances
- 75 open instances of dimensions smaller than 20 x 20 [Small but still open](#small-yet-open)
- 40 very large instances (from 100 x 100 to 1000 x 1000) [Large](#large)

<br/> 



## Formats

There are three main formats, the ***standard***, the ***DaColTeppan*** and the ***taillard***


### Standard format

```
#n #m
((machine duration ){m}\n){n}
```


![Jobshop standard format](./img/instance.png)
<small>Image from Da Col & Teppan</small>



For instance `l01` on standard format is
```
10	5	
1	21	0	53	4	95	3	55	2	34
0	21	3	52	4	16	2	26	1	71
3	39	4	98	1	42	2	31	0	12
1	77	0	55	4	79	2	66	3	77
0	83	3	34	2	64	1	19	4	37
1	54	2	43	4	79	0	92	3	62
3	69	4	77	1	87	2	87	0	93
2	38	0	60	1	41	3	24	4	83
3	17	1	49	4	25	0	44	2	98
4	77	3	79	2	43	1	75	0	96
```

<br/>


### Da Col Teppan format

```
#n #m
((machine duration )+ -1 -1\n){n}
```

![Jobshop DaColTeppan format](./img/instance2.png)
<small>Image from Da Col & Teppan</small>


In the DaColTeppan format
- there can be any number of tasks per job
- there can be various tasks in a job running on the same machine (reentrance)
- the jobs end in a -1 -1


The DaColTeppan format is actually a format for the reentrant jobshop problem which
is a generalization of the jobshop, common in some industrial environments like semiconductors


For instance
```
10	5	
1	21	0	53	-1  -1
0	21	3	52	 4	16	2	26	1	71   4	95	3	55	 2	34 -1 -1
3	39	4	98	 1	42	2	31	0	12  79	 2	66	3	77  -1 -1
1	77	0	55	 4  -1 -1
0	83	-1 -1
1	54	2	43	4	79	0	92	3	62   3	34	 2	64	 1	19	4	37 -1 -1
3	69	4	77	1	87	2	87	0	93  41	 3	24	 4	83  -1 -1
2	38	0	60	1	-1 -1
3	17	1	49	4	25	0	44	2	98 -1 -1
4	77	3	79	2	43	1	75	0	96 -1 -1
```

To be totally conservative, the format should remove the last two -1 -1 and consider
the end of line is the separator between jobs. It is not hard to do a parser that 
accepts both.

<br/>


### Taillard format

The taillard format first lists the machines, then the durations

```
#n #m
((machine ){m}\n){n}
((duration ){m}\n){n}
```

For instance `l01` in taillard format is
```
10	5	
1	0	4	3	2
0	3	4	2	1
3	4	1	2	0
1	0	4	2	3
0	3	2	1	4
1	2	4	0	3
3	4	1	2	0
2	0	1	3	4
3	1	4	0	2
4	3	2	1	0
21	53	95	55	34
21	52	16	26	71
39	98	42	31	12
77	55	79	66	77
83	34	64	19	37
54	43	79	92	62
69	77	87	87	93
38	60	41	24	83
17	49	25	44	98
77	79	43	75	96
```


<br/>

## Publications

The instances come from the following publications

- **Heller, J.** (1960). Some numerical experiments for an M× J flow shop and its decision-theoretical aspects. Operations Research, 8(2), 178-184.

- **H. Fisher, G.L. Thompson** (1963), Probabilistic learning combinations of local job-shop scheduling rules, J.F. Muth, G.L. Thompson (eds.), Industrial Scheduling,  Prentice Hall, Englewood Cliffs, New Jersey, 225-251.

- **Carlier, J.** (1978). Ordonnancements a contraintes disjonctives. RAIRO-Operations Research, 12(4), 333-350.

- **Lawrence, S.** (1984). Resource constrained project scheduling: An experimental investigation of heuristic scheduling techniques (Supplement). Graduate School of Industrial Administration, Carnegie-Mellon University.

- **Adams, J., Balas, E., & Zawack, D.** (1988). The shifting bottleneck procedure for job shop scheduling. Management science, 34(3), 391-401.

- **Applagate, D., & Cook, W.** (1991). A computational study of the job-shop scheduling instance. ORSA J. Comput, 3, 49-51.

- **Storer, R. H., Wu, S. D., & Vaccari, R.** (1992). New search spaces for sequencing instances with application to job shop 38 (1992) 1495–1509 Manage. Sci, 38, 1495-1509.

- **T. Yamada, R. Nakano** (1992),A genetic algorithm applicable to large-scale job-shop instances, R. Manner, B. Manderick (eds.),Parallel instance solving from nature 2,North-Holland, Amsterdam,  281-290

- **Taillard, E.** (1993). Benchmarks for basic scheduling problems. european journal of operational research, 64(2), 278-285.

- **Reeves, C. R.** (1995). A genetic algorithm for flowshop sequencing. Computers & operations research, 22(1), 5-13.

- **Demirkol, E., Mehta, S., & Uzsoy, R.** (1998). Benchmarks for shop scheduling problems. European Journal of Operational Research, 109(1), 137-141.

- **Vallada, E., Ruiz, R., & Framinan, J. M.** (2015). New hard benchmark for flowshop scheduling problems minimising makespan. European Journal of Operational Research, 240(3), 666-677.

- **Pan, Q. K., Ruiz, R., & Alfaro-Fernández, P.** (2017). Iterated search methods for earliness and tardiness minimization in hybrid flowshops with due windows. Computers & Operations Research, 80, 50-60.

- **Da Col, G., & Teppan, E. C.** (2022). Industrial-size job shop scheduling with constraint programming. Operations Research Perspectives, 9, 100249.

<br/>


# Jobshop variants

Many variants of the jobshop problem can be solved with the same data
or simple addition of parameters

<br/>

## Jobshop

The classical jobshop problem has 2 constraints

- intrajob precedences 

$$\forall j \in \mathrm{jobs}, \forall r \in \mathrm{ranks} \quad \mathrm{start}_j^r + \mathrm{Duration}_j^r \leq \mathrm{start}_j^{r+1}$$

- no overlap per machine 

$$
\forall m \in \mathrm{machines}, \forall j_1,j_2 \in \mathrm{jobs} \quad
\left( \mathrm{start}\_{j_1}^m + \mathrm{Duration}\_{j_1}^m \leq \mathrm{start}\_{j_2}^m \right) \vee \left( \mathrm{start}\_{j_2}^m + \mathrm{Duration}\_{j_2}^m \leq \mathrm{start}\_{j_1}^m \right )
$$

For commodity the later constraint can be written

$$\forall m \in \mathrm{machines} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{start}_j^m + \mathrm{Duration}_j^m ] \mid j \in \mathrm{jobs} \ \rbrace$$

<br/>

## No buffer jobshop (blocking jobshop)

In the classic jobshop there is implicitly a buffer area in front of each machine where tasks can wait to be processed. In the non-buffer jobshop, also called blocking jobshop this area doesn't exist, as a result a job `(j,r)`processed on machine `m` blocks this machine until `(j,r+1)` starts being processed on the next machine.


From this problem we introduce a new variable $\mathrm{end}_j^m$

- the tasks are variable length with a minimum length of $\mathrm{Duration}_j^m$

$$\forall j \in \mathrm{jobs}, \forall r \in \mathrm{machines} \quad \mathrm{start}_j^m + \mathrm{Duration}_j^m \leq \mathrm{end}_j^m$$

- for each job, the task of rank $r+1$ starts as soon as the task of rank $r$ ends

$$\forall j \in \mathrm{jobs}, \forall r \in \mathrm{ranks} \quad \mathrm{end}_j^r = \mathrm{start}_j^{r+1}$$

- no overlap per machine 

$$
\forall m \in \mathrm{machines}, \forall j_1,j_2 \in \mathrm{jobs}\quad \left( \mathrm{end}\_{j_1}^m \leq \mathrm{start}\_{j_2}^m \right) \vee \left( \mathrm{end}\_{j_2}^m \leq \mathrm{start}\_{j_1}^m \right )
$$

or

$$\forall m \in \mathrm{machines} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{end}_j^m ] \mid j \in \mathrm{jobs} \ \rbrace$$

<br/>

The extra variables $\mathrm{end}$ can be pre-processed out of the equations

<br/>

## No-wait jobshop

In the no-wait jobshop variant, once the processing of a job has started, it has to go through all machines without interruption.


The equations are reminiscent of the blocking jobshop but without the variable length activities

- for each job, the task of rank $r+1$ starts as soon as the task of rank $r$ ends

$$\forall j \in \mathrm{jobs}, \forall r \in \mathrm{ranks} \quad \mathrm{end}_j^r = \mathrm{start}_j^{r+1}$$

- no overlap per machine 

$$
\forall m \in \mathrm{machines}, \forall j_1,j_2 \in \mathrm{jobs}\quad \left( \mathrm{end}\_{j_1}^m \leq \mathrm{start}\_{j_2}^m \right) \vee \left( \mathrm{end}\_{j_2}^m \leq \mathrm{start}\_{j_1}^m \right )
$$

or

$$\forall m \in \mathrm{machines} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{end}_j^m ] \mid j \in \mathrm{jobs} \ \rbrace$$

<br/>



## Cumulative jobshop

In the cumulative jobshop, the capacity of the capacity of the machines is not unitary anymore. In other words there is a limit $C_m$ on the number of tasks that can be simultaneously processed by machine $m$

The constraints of the problem are

- intrajob precedences 

$$\forall j \in \mathrm{jobs}, \forall r \in \mathrm{ranks} \quad \mathrm{start}_j^r + \mathrm{Duration}_j^r \leq \mathrm{start}_j^{r+1}$$

- capacity per machine 

$$\forall m \in \mathrm{machines}, \forall t \in \mathrm{time} \quad \sum_j \left( \mathrm{start}^m_j \leq t \lt \mathrm{start}^m_j + \mathrm{Duration}^m_j \right) \leq C_m$$

It is advisable to avoid having an unlimited number of equations, in this case
because of the explicit dependency on time, even if it just for notation. We therefore introduce the functional notation for cumulative constraints

$$
\forall m \in \mathrm{machines}\quad \mathrm{cumul}_m(t) = \sum_j \mathrm{step}(\mathrm{start}_j^m) - \mathrm{step}(\mathrm{start}_j^m + \mathrm{Duration}_j^m)
$$

Here $\mathrm{step}(t)$ is the function that has value 1 at time $t$ and 0 otherwise, as a result $\mathrm{cumul}$ is a function of time. Each configuration of $\mathrm{start}_j^m$ values defines a different cumulative function.


The constraints of the problem become

- intrajob precedences 

$$\forall j \in \mathrm{jobs}, \forall r \in \mathrm{ranks} \quad \mathrm{start}_j^r + \mathrm{Duration}_j^r \leq \mathrm{start}_j^{r+1}$$

- capacity per machine 

$$
\forall m \in \mathrm{machines}\quad \sum_j \mathrm{step}(\mathrm{start}_j^m) - \mathrm{step}(\mathrm{start}_j^m + \mathrm{Duration}_j^m) \leq C_m
$$

<br/>

## Jobshop with operators

The jobshop with operators limits the overall number of simultaneous tasks.
If each task requires an operator to be processed on a machine, the total number
of simultaneous tasks is limited by the total number of operators (assuming all 
operators can handle all machines)


The constraints of the problem become

- intrajob precedences 

$$\forall j \in \mathrm{jobs}, \forall r \in \mathrm{ranks} \quad \mathrm{start}_j^r + \mathrm{Duration}_j^r \leq \mathrm{start}_j^{r+1}$$

- no overlap per machine 

$$\forall m \in \mathrm{machines} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{start}_j^m + \mathrm{Duration}_j^m ] \mid j \in \mathrm{jobs} \ \rbrace$$

- maximum number of simultaneous tasks

$$\sum_m \sum_j \mathrm{step}(\mathrm{start}_j^m) - \mathrm{step}(\mathrm{start}_j^m + \mathrm{Duration}_j^m) \leq \mathrm{Op}$$

<br/>


## Flow shop

***Be aware that some authors say flowshop to mean permutation flowshop***

The flowshop is a variant of the jobshop problem in which the order of the machines within each job is always 0, 1, ..., m - 1

For instance `car1` from Carlier 1978 is

```
11 5
 0 375 1  12 2 142 3 245 4 412
 0 632 1 452 2 758 3 278 4 398
 0  12 1 876 2 124 3 534 4 765
 0 460 1 542 2 523 3 120 4 499
 0 528 1 101 2 789 3 124 4 999
 0 796 1 245 2 632 3 375 4 123
 0 532 1 230 2 543 3 896 4 452
 0  14 1 124 2 214 3 543 4 785
 0 257 1 527 2 753 3 210 4 463
 0 896 1 896 2 214 3 258 4 259
 0 532 1 302 2 501 3 765 4 988
 ```

Data for the open-shop problem can also be used for flow-shop problems as the column
for the machines can be implicitly added in the model. For instance `tai_4x4_1`

```
4 4
34  2 54 61
15 89 70  9
38 19 28 87
95  7 34 29
```

can be transformed at parsing time into
```
4 4
0 34 1  2 2 54 3 61
0 15 1 89 2 70 3  9
0 38 1 19 2 28 3 87
0 95 1  7 2 34 3 29
```

The constraints are the same as the jobshop but can be slightly simplified as the rank and machine indices are now merged. Each task is uniquely identified by the indices `(m,j)`

- intrajob precedences 

$$\forall j \in \mathrm{jobs}, \forall m \in \mathrm{machines} \quad \mathrm{start}_j^m + \mathrm{Duration}_j^m \leq \mathrm{start}_j^{m+1}$$

- no overlap per machine 

$$
\forall m \in \mathrm{machines}, \forall j_1,j_2 \in \mathrm{jobs} \quad \left( \mathrm{start}\_{j_1}^m + \mathrm{Duration}\_{j_1}^m \leq \mathrm{start}\_{j_2}^m \right) \vee \left( \mathrm{start}\_{j_2}^m + \mathrm{Duration}\_{j_2}^m \leq \mathrm{start}\_{j_1}^m \right )
$$

or

$$\forall m \in \mathrm{machines} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{start}_j^m + \mathrm{Duration}_j^m ] \mid j \in \mathrm{jobs} \ \rbrace$$

<br/>

## Permutation flow shop

***Be aware that some authors say flowshop to mean permutation flowshop***

In any jobshop-like problem, the order in which a machine schedules the different jobs is unknown. Once that order is fixed, the problem is fully solved : the minimum makespan can
be computed from the order of the jobs on each machine by pure propagation in polynomial time.

In the permutation flow shop variant, the order in which the jobs are processed on the different machines is free, but it needs to be the same for all machines.

![Permutation vs Non-Permutation flowshop](./img/permutation_vs_non_permutation_flowshop.png)
<small>Image from Artur Ferreira Brum, Automatic Algorithm Configuration for
Flow Shop Scheduling Problems (2020)</small>


We introduce the variable $\mathrm{rank}_j$ (common to all machines)

- the ranks are a permutation

$$\forall j_1, j_2 \in \mathrm{jobs} \quad \mathrm{rank}\_{j_1} \neq \mathrm{rank}\_{j_2}$$

- the jobs on the machines ordered according to their rank

$$\forall m \in \mathrm{machines}, \forall j_1, j_2 \in \mathrm{jobs} \quad \mathrm{rank}\_{j_1} < \mathrm{rank}\_{j_2} \Leftrightarrow \mathrm{start}\_{j_1}^m + \mathrm{Duration}\_{j_1}^m \leq \mathrm{start}\_{j_2}^m$$

These two constraints completely define the flowshop problem as the second constraint implies `noOverlap` on each machine (actually that constraint is the ***definition*** of noOverlap using ranks).

<br/>

## Non-permutation flow shop

The non-permutation flow shop is just another name for the flow shop

***Be aware that some authors say flowshop to mean permutation flowshop***

<br/>

## Open shop

In the open-shop variant, the order in which a job is processed on the different machines is relaxed. The inter-job precedence constraint thereafter becomes a `noOverlap`

$$\forall j \in \mathrm{jobs} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{start}_j^m + \mathrm{Duration}_j^m ] \mid m \in \mathrm{machines} \ \rbrace$$

$$\forall m \in \mathrm{machines} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{start}_j^m + \mathrm{Duration}_j^m ] \mid j \in \mathrm{jobs} \ \rbrace$$


<br/>

Just like the jobshop, opens shops can have the buffers, machine capacities, operators, etc.

<br/>

***Please refer to the open-shop section of this benchmark for more information about open-shop problems***

<br/>


# Other jobshop variants

Because these Jobshop variants require extra data, we cannot run them
over the standard benchmark

## Jobshop with arbitrary precedences

Instead of having precedences only within the tasks of a job, there is a more general precedence graph

![Precedence graph](./img/js_arbitrary_precedences.png)


## Jobshop with setup times

There are setup times in the machines to switch from one job to another

Notice that this variant is only interesting if the setup times are sequence-dependent. Otherwise it is equivalent to increase each task by the length of the setup time and to solve an usual jobshop

## Flexible jobshop

The tasks of a job can be processed by any machine in a predefined group of similar machines.

***Please refer to the flexible-jobshop section of this benchmark for more information***


<br/>


# Jobshop benchmark 

The purpose of this effort is to ***classify*** the instances into `easy`, `medium`, `hard` and `open`.

At this point in time, it is NOT to compare the engines, as we haven't had the time to run all engines on the same hardware. The engine comparison is ***ongoing work***

<br/>

## Methodology

We have based our work on the ***outstanding*** work of Naderi, Ruiz and Roshanaei *Mixed-Integer Programming versus Constraint Programming for shop scheduling problems : New Results and Outlook* [**NRR2023**] which compares CPO, Cplex and Gurobi on a benchmark of 6623 instances over 17 benchmarks with a timeout of 1h. They have made all the [raw results available](http://soa.iti.es/problem-instances)

We proceeded as follows
- We took for each instance the best result provided by Naderi et al. (i.e. the engine that solves it the fastest or which finds the best bounds) and classified that instance in `easy`, `medium` or `open` accordingly
- Then we ran OptalCP and ORtools on a hardware that is close to theirs (a 4 core Intel i7), and updated all results in which an improved bound or a change in category (`open` or `hard` -> `medium` -> `easy`) was found
- Then we added bounds from literature and websites (which can only change a problem from `open` to allegedly `hard`, the classification as `easy` or `medium` requires an engine to find and prove optimality in a single run)

<br/>

The websites used to add bounds are
- http://mistic.heig-vd.ch/taillard/problemes.dir/ordonnancement.dir/ordonnancement.html
- https://github.com/thomasWeise/jsspInstancesAndResults
- http://jobshop.jjvh.nl/
- https://optimizizer.com/jobshop.php

And the upper bounds from NRR2023


In a subsequent version of the benchmark we will run all engines, on all problems on the same hardware

<br/>

## Instances of interest

### Small yet open

We have isolated a subset of 75 problems that are smaller than 20x20 and yet still open. We recommend engines to report results on this subset rather than the whole benchmark due to the large amount of instances. Notice that the objective of engines is to prove optimality and as such, these instances are of interest. Practitioners working on heuristic approaches may find these instances too small and are invited to use larger instances in the benchmark. 

| type | name | size | LB | UB | status | lb found by | ub found by |
|---|---|---|---|---|---|---|---|
jobshop|abz8|20x15|648|665|open|CPO2015|He2002
jobshop|dmu04|20x15|2601|2669|open|BB2001|BB2001
jobshop|dmu06|20x20|3042|3244|open|vH2016|PSV2010
jobshop|dmu07|20x20|2828|3046|open|vH2016|PSV2010
jobshop|dmu41|20x15|3007|3248|open|Gh2010|PLC2015
jobshop|dmu42|20x15|3224|3390|open|vH2016|SS2018
jobshop|dmu43|20x15|3292|3441|open|Gh2010|SS2018
jobshop|dmu44|20x15|3299|3475|open|vH2016|SS2018
jobshop|dmu45|20x15|3039|3266|open|vH2016|CS2022
jobshop|dmu46|20x20|3575|4035|open|Gh2010|GR2014
jobshop|dmu47|20x20|3522|3939|open|Gh2010|GR2014
jobshop|dmu48|20x20|3447|3763|open|Gh2010|SS2018
jobshop|dmu49|20x20|3403|3710|open|Gh2010|SS2018
jobshop|dmu50|20x20|3496|3729|open|Gh2010|PLC2015
jobshop|swv06|20x15|1630|1667|open|CPO2015|CS2022
jobshop|swv07|20x15|1513|1594|open|CPO2015|GR2014
jobshop|swv08|20x15|1671|1751|open|CPO2015|Mu2015
jobshop|swv09|20x15|1633|1655|open|CPO2015|SS2018
jobshop|swv10|20x15|1663|1743|open|CPO2015|SS2018
jobshop|tjs18|20x15|1377|1396|open|CPO2015|BV1998
jobshop|tjs22|20x20|1561|1600|open|CPO2015|NS2002
jobshop|tjs23|20x20|1518|1557|open|CPO2015|NS2002
jobshop|tjs26|20x20|1591|1643|open|CPO2015|GR2014
jobshop|tjs27|20x20|1652|1680|open|CPO2015|NS2002
jobshop|tjs29|20x20|1583|1625|open|SAH2015|Aa1996
jobshop|tjs30|20x20|1528|1584|open|SAH2015|NS2002
jobshop|yn2|20x20|870|904|open|CPO2015|SS2018
jobshop|yn3|20x20|859|892|open|CPO2015|SS2018
jobshop|yn4|20x20|929|968|open|CPO2015|SS2018
flowshop|reC13|20x15|1727|1926|open|OptalCP|OptalCP
flowshop|reC15|20x15|1869|1940|open|OptalCP|OptalCP
flowshop|reC17|20x15|1727|1855|open|OptalCP|OptalCP
flowshop|tfs012|20x10|1531|1644|open|CPO|OptalCP
flowshop|tfs013|20x10|1428|1468|open|CPO|OptalCP
flowshop|tfs017|20x10|1388|1427|open|CPO|OptalCP
flowshop|tfs018|20x10|1406|1520|open|CPO|OptalCP
flowshop|tfs021|20x20|1968|2297|open|CPO|Ta1993
flowshop|tfs022|20x20|1758|2099|open|CPO|Ta1993
flowshop|tfs023|20x20|1919|2295|open|CPO|CPO
flowshop|tfs024|20x20|1892|2218|open|CPO|OptalCP
flowshop|tfs025|20x20|1989|2273|open|CPO|CPO
flowshop|tfs026|20x20|1891|2181|open|CPO|OptalCP
flowshop|tfs027|20x20|1908|2261|open|CPO|OptalCP
flowshop|tfs028|20x20|1910|2194|open|CPO|CPO
flowshop|tfs029|20x20|1871|2223|open|CPO|CPO
flowshop|tfs030|20x20|1917|2164|open|CPO|OptalCP
flowshop|vrf_20_10_01|20x10|1336|1475|open|OptalCP|OptalCP
flowshop|vrf_20_10_02|20x10|1394|1506|open|OptalCP|OptalCP
flowshop|vrf_20_10_03|20x10|1455|1555|open|OptalCP|OptalCP
flowshop|vrf_20_10_04|20x10|1290|1422|open|OptalCP|OptalCP
flowshop|vrf_20_10_05|20x10|1406|1588|open|OptalCP|OptalCP
flowshop|vrf_20_10_06|20x10|1410|1560|open|OptalCP|OptalCP
flowshop|vrf_20_10_07|20x10|1413|1568|open|OptalCP|OptalCP
flowshop|vrf_20_10_09|20x10|1367|1512|open|OptalCP|OptalCP
flowshop|vrf_20_10_10|20x10|1375|1489|open|OptalCP|OptalCP
flowshop|vrf_20_15_01|20x15|1651|1899|open|OptalCP|OptalCP
flowshop|vrf_20_15_02|20x15|1608|1905|open|OptalCP|OptalCP
flowshop|vrf_20_15_03|20x15|1536|1780|open|OptalCP|OptalCP
flowshop|vrf_20_15_04|20x15|1526|1806|open|OptalCP|OptalCP
flowshop|vrf_20_15_05|20x15|1665|1846|open|OptalCP|OptalCP
flowshop|vrf_20_15_06|20x15|1634|1933|open|OptalCP|OptalCP
flowshop|vrf_20_15_07|20x15|1646|1864|open|OptalCP|OptalCP
flowshop|vrf_20_15_08|20x15|1530|1806|open|OptalCP|OptalCP
flowshop|vrf_20_15_09|20x15|1710|1916|open|OptalCP|OptalCP
flowshop|vrf_20_15_10|20x15|1610|1845|open|OptalCP|OptalCP
flowshop|vrf_20_20_01|20x20|1821|2270|open|OptalCP|OptalCP
flowshop|vrf_20_20_02|20x20|1811|2170|open|OptalCP|OptalCP
flowshop|vrf_20_20_03|20x20|1826|2265|open|OptalCP|OptalCP
flowshop|vrf_20_20_04|20x20|1756|2148|open|OptalCP|OptalCP
flowshop|vrf_20_20_05|20x20|1828|2206|open|OptalCP|OptalCP
flowshop|vrf_20_20_06|20x20|1852|2237|open|OptalCP|OptalCP
flowshop|vrf_20_20_07|20x20|1836|2267|open|OptalCP|OptalCP
flowshop|vrf_20_20_08|20x20|1843|2139|open|OptalCP|OptalCP
flowshop|vrf_20_20_09|20x20|1964|2322|open|OptalCP|OptalCP
flowshop|vrf_20_20_10|20x20|1813|2167|open|OptalCP|OptalCP


### Large

The 40 Taillard-like instances generated by Da Col and Teppan in 2022 seem a good benchmark to evaluate the ability of optimization engines to solve very large instances (from 100 x 100 to 1000 x 1000). On the other hand, the known optimum instances are too easy for engines as both CPO and OptalCP immediately find the 600 000 lower bound and closes the instance as soon as its heuristics find a 600 000 solution.

| type | name | size | LB | UB | status | lb found by | ub found by |
|---|---|---|---|---|---|---|---|
tai_j1000_m1000_1 | 1000x1000 | jobshop | 549392 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_10 | 1000x1000 | jobshop | 541530 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_2 | 1000x1000 | jobshop | 549043 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_3 | 1000x1000 | jobshop | 552580 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_4 | 1000x1000 | jobshop | 547670 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_5 | 1000x1000 | jobshop | 545193 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_6 | 1000x1000 | jobshop | 547286 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_7 | 1000x1000 | jobshop | 545877 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_8 | 1000x1000 | jobshop | 549220 | undefined | open | OptalCP | OptalCP
tai_j1000_m1000_9 | 1000x1000 | jobshop | 543559 | undefined | open | OptalCP | OptalCP
tai_j1000_m100_1 | 1000x100 | jobshop | 525343 | 539137 | open | OptalCP | OptalCP
tai_j1000_m100_10 | 1000x100 | jobshop | 529112 | 540890 | open | OptalCP | OptalCP
tai_j1000_m100_2 | 1000x100 | jobshop | 528088 | 540895 | open | OptalCP | OptalCP
tai_j1000_m100_3 | 1000x100 | jobshop | 522793 | 534926 | open | OptalCP | OptalCP
tai_j1000_m100_4 | 1000x100 | jobshop | 524271 | 536317 | open | OptalCP | OptalCP
tai_j1000_m100_5 | 1000x100 | jobshop | 531216 | 532016 | open | OptalCP | OptalCP
tai_j1000_m100_6 | 1000x100 | jobshop | 518763 | 535189 | open | OptalCP | OptalCP
tai_j1000_m100_7 | 1000x100 | jobshop | 527093 | 535894 | open | OptalCP | OptalCP
tai_j1000_m100_8 | 1000x100 | jobshop | 519524 | 534315 | open | OptalCP | OptalCP
tai_j1000_m100_9 | 1000x100 | jobshop | 520889 | 539627 | open | OptalCP | OptalCP
tai_j100_m1000_1 | 100x1000 | jobshop | 522298 | 544894 | open | OptalCP | OptalCP
tai_j100_m1000_10 | 100x1000 | jobshop | 521766 | 544621 | open | OptalCP | OptalCP
tai_j100_m1000_2 | 100x1000 | jobshop | 530375 | 549624 | open | OptalCP | OptalCP
tai_j100_m1000_3 | 100x1000 | jobshop | 530560 | 549824 | open | OptalCP | OptalCP
tai_j100_m1000_4 | 100x1000 | jobshop | 527101 | 545656 | open | OptalCP | OptalCP
tai_j100_m1000_5 | 100x1000 | jobshop | 517728 | 546126 | open | OptalCP | OptalCP
tai_j100_m1000_6 | 100x1000 | jobshop | 522907 | 546310 | open | OptalCP | OptalCP
tai_j100_m1000_7 | 100x1000 | jobshop | 522537 | 547060 | open | OptalCP | OptalCP
tai_j100_m1000_8 | 100x1000 | jobshop | 526428 | 549382 | open | OptalCP | OptalCP
tai_j100_m1000_9 | 100x1000 | jobshop | 528097 | 551456 | open | OptalCP | OptalCP
tai_j100_m100_1 | 100x100 | jobshop | 62521 | 79804 | open | OptalCP | OptalCP
tai_j100_m100_10 | 100x100 | jobshop | 64866 | 79319 | open | OptalCP | OptalCP
tai_j100_m100_2 | 100x100 | jobshop | 62741 | 78911 | open | OptalCP | OptalCP
tai_j100_m100_3 | 100x100 | jobshop | 61197 | 78438 | open | OptalCP | OptalCP
tai_j100_m100_4 | 100x100 | jobshop | 64449 | 80847 | open | OptalCP | OptalCP
tai_j100_m100_5 | 100x100 | jobshop | 61340 | 79583 | open | OptalCP | OptalCP
tai_j100_m100_6 | 100x100 | jobshop | 60932 | 79840 | open | OptalCP | OptalCP
tai_j100_m100_7 | 100x100 | jobshop | 63641 | 80245 | open | OptalCP | OptalCP
tai_j100_m100_8 | 100x100 | jobshop | 62989 | 80178 | open | OptalCP | OptalCP
tai_j100_m100_9 | 100x100 | jobshop | 62370 | 80608 | open | OptalCP | OptalCP


### Missing industrial instances

> When generating good instances, Taillard (1993) carried out an unspecified
> number of runs in which he selected hard instances by minimizing the gap
> between a trivial lower bound and the upper bound obtained with taboo
> search methods. While this might seem unsophisticated, we will later see that
> elaborating on this procedure is the only known approach.<br/>
> **Vallada, Ruiz and Framinan** in *New hard benchmark for flowshop scheduling problems minimizing makespan* (2015)

The purpose of an optimization engine is not to solve quickly problems that are close to (what SAT practitioners call) **the phase transition**, that is the hardest problems. The purpose of an optimization engine is to solve problems that are representative of the problems found in the industry, which usually have a **structure** due to a certain similarity between products being manufactured, the types of machines and physical constraints. 

It is the engine's work to identify and exploit said structure to speed-up the resolution of the instances. Because of that, randomly generated instances are usually a poor approximation of real-world problems, and this benchmark is sadly missing instances coming from real production lines.

Also generating random instances and filtering only by comparing a trivial lower bound with a heuristic neglects the fact that engines have ***deduction algorithms*** that sometimes instantly close instances that appear to be hard for heuristics.

Consider the taillard jobshop instances
- instances 40 (30x15) to 50 (30x30) are open
- instances 51 (50x15) to 80 (100x20) are solved to optimality by OptalCP in < 1 minute with the exception of `tjs62` (50x20) and `tjs67` (50x20) which optimum is known but no engine is capable of solving them in < 1h




## Publications

The upper and lower bounds come from

- Ta1993 (2 bounds) : **Taillard, E. (1993)**. Benchmarks for basic scheduling problems. european journal of operational research, 64(2), 278-285.

- Va1995 (37 bounds) : Vaessens, personal communication (to Taillard)

- Aa1996 (1 bound) : E. Aarts, personal communication (to Taillard)

- BV1998 (1 bound) : **Balas, E., & Vazacopoulos, A. (1998)**. Guided local search with shifting bottleneck for job shop scheduling. Management science, 44(2), 262-275.

- AELS1999 (1 bound) :  E. Aarts, Huub ten Eikelder, J.K. Lenstra, R. Schilham, personal communication (to Taillard)

- BB2001 (2 bounds) : **Brucker, P., & Brinkkötter, W. (2001)**. Solving open benchmark problems for the job-shop-problem. Journal of Scheduling, 4, 53-64.

- He2002 (2 bounds) : **Andre Henning (2002)** Practical job shop scheduling problems (in german) Ph.D. Thesis, Friedrich-Schiller-University Jena, Jena, Germany

- NS2002 (6 bounds) : **Nowicki, E., & Smutnicki, C. (2002)**. Some new tools to solve the job shop problem. Raport serii: Preprinty, 60.

- Ca2003 (1 bound) : João Paulo Caldeira, personal communication (to Taillard)

- NS2005 (23 bounds) : **Nowicki, E., & Smutnicki, C. (2005)**. An advanced tabu search algorithm for the job shop problem. Journal of Scheduling, 8, 145-159.

- RMA2005 (4 bounds) : Ramon Companys, Manel Mateo & Agustín Alemán, personal communication (to Taillard)

- PS2006 (1 bounds) : **Pardalos, P. M., & Shylo, O. V. (2006)**. An algorithm for the job shop scheduling problem based on global equilibrium search techniques. Computational Management Science, 3, 331-348.

- RS2007 (5 bounds) : **Ruiz, R., & Stützle, T. (2007)**. A simple and effective iterated greedy algorithm for the permutation flowshop scheduling problem. European journal of operational research, 177(3), 2033-2049.

- ZLRG2007 (2 bounds) : **Zhang, C., Li, P., Guan, Z., & Rao, Y. (2007)**. A tabu search algorithm with a new neighborhood structure for the job shop scheduling problem. Computers & Operations Research, 34(11), 3229-3242.

- ZLRG2008 (2 bounds) : **Zhang, C. Y., Li, P., Rao, Y., & Guan, Z. (2008)**. A very fast TS/SA algorithm for the job shop scheduling problem. Computers & operations research, 35(1), 282-294.

- Gh2010 (16 bounds) : **Gharbi, A., & Labidi, M. (2010)**. Extending the single machine-based relaxation scheme for the job shop scheduling problem. Electronic Notes in Discrete Mathematics, 36, 1057-1064.

- KNFH2010 (1 bound) : **Koshimura, M., Nabeshima, H., Fujita, H., & Hasegawa, R. (2010)** . Solving open job-shop scheduling problems by SAT encoding. IEICE TRANSACTIONS on Information and Systems, 93(8), 2316-2318.

- PSV2010 (3 bounds) : **Pardalos, P. M., Shylo, O. V., & Vazacopoulos, A. (2010)**. Solving job shop scheduling problems utilizing the properties of backbone and “big valley”. Computational Optimization and Applications, 47, 61-76.

- GR2014 (8 bounds) : **Gonçalves, J. F., & Resende, M. G.** (2014). An extended Akers graphical method with a biased random‐key genetic algorithm for job‐shop scheduling. International Transactions in Operational Research, 21(2), 215-246.

- CPO2015 (33 bounds): 

    - **Vilím, P., Laborie, P., & Shaw, P. (2015).** Failure-directed search for constraint-based scheduling. In Integration of AI and OR Techniques in Constraint Programming: 12th International Conference, CPAIOR 2015, Barcelona, Spain, May 18-22, 2015, Proceedings 12 (pp. 437-453). Springer International Publishing.

    - **Vilım, P., Laborie, P., & Shaw, P**. Failure-directed Search for Constraint-based Scheduling Detailed Experimental Results.

- Mu2015 (1 bound) : Personal communication to optimizizer, probably based on **Murovec, B. (2015)**. Job-shop local-search move evaluation without direct consideration of the criterion’s value. European Journal of Operational Research, 241(2), 320-329.

- PLC2015 (7 bounds) : **Peng, B., Lü, Z., & Cheng, T. C. E. (2015)**. A tabu search/path relinking algorithm to solve the job shop scheduling problem. Computers & Operations Research, 53, 154-164.

- RMA2015 (2 bounds) : Ramon Companys, Manel Mateo & Agustín Alemán, personal communication (to Taillard)

- SAH2015 (2 bounds) : **Siala, M., Artigues, C., & Hebrard, E. (2015)**. Two clause learning approaches for disjunctive scheduling. In International Conference on Principles and Practice of Constraint Programming (pp. 393-402). Cham: Springer International Publishing.

- vH2016 (13 bounds) : **van Hoorn, J. J. (2016)**. Dynamic programming for routing and scheduling: Optimizing sequences of decisions.

- SS2018 (21 bounds) : **Shylo, O. V., & Shams, H. (2018)**. Boosting binary optimization via binary classification: A case study of job shop scheduling. arXiv preprint arXiv:1808.10813.

- CS2022 (30 bounds) : **Constantino, O. H., & Segura, C. (2022)**. A parallel memetic algorithm with explicit management of diversity for the job shop scheduling problem. Applied Intelligence, 52(1), 141-153.

- XLGG2022 (2 bounds) : **Xie, J., Li, X., Gao, L., & Gui, L. (2022)**. A hybrid algorithm with a new neighborhood structure for job shop scheduling problems. Computers & Industrial Engineering, 169, 108205.

- NRR2022 (240 bounds) : **Naderi, Ruiz and Roshanaei (2022)** Mixed-Integer Programming versus Constraint Programming for shop scheduling problems : New Results and Outlook. ***TODO : investigate where the bounds on the 240 vrf instances come from***


*There is a large number of bounds in the flowshop problems that were obtained solving the permutation flowshop problem, which is more constrained (and optimization engines like CPO and OptalCP misuse the extra-freedom).*

*Every time an engine reaches a published bound we discount the bound. When a publication reaches 0 bounds it is removed.*


<br/>



## Current results

Last updated 2023-08-12

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>abz5</td><td>10x10</td><td>jobshop</td><td>1234</td><td>1234</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>abz6</td><td>10x10</td><td>jobshop</td><td>943</td><td>943</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>abz7</td><td>20x15</td><td>jobshop</td><td>656</td><td>656</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>abz8</td><td>20x15</td><td>jobshop</td><td>648</td><td>665</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub He2002</td></tr>
<tr><td>abz9</td><td>20x15</td><td>jobshop</td><td>678</td><td>678</td><td style="background-color:red">hard</td><td>lb CPO2015 / ub OptalCP</td></tr>
<tr><td>dmu01</td><td>20x15</td><td>jobshop</td><td>2563</td><td>2563</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu02</td><td>20x15</td><td>jobshop</td><td>2706</td><td>2706</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu03</td><td>20x15</td><td>jobshop</td><td>2731</td><td>2731</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>dmu04</td><td>20x15</td><td>jobshop</td><td>2601</td><td>2669</td><td style="background-color:grey">open</td><td>lb BB2001 / ub BB2001</td></tr>
<tr><td>dmu05</td><td>20x15</td><td>jobshop</td><td>2749</td><td>2749</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu06</td><td>20x20</td><td>jobshop</td><td>3042</td><td>3244</td><td style="background-color:grey">open</td><td>lb vH2016 / ub PSV2010</td></tr>
<tr><td>dmu07</td><td>20x20</td><td>jobshop</td><td>2828</td><td>3046</td><td style="background-color:grey">open</td><td>lb vH2016 / ub PSV2010</td></tr>
<tr><td>dmu08</td><td>20x20</td><td>jobshop</td><td>3188</td><td>3188</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu09</td><td>20x20</td><td>jobshop</td><td>3092</td><td>3092</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu10</td><td>20x20</td><td>jobshop</td><td>2984</td><td>2984</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu11</td><td>30x15</td><td>jobshop</td><td>3395</td><td>3430</td><td style="background-color:grey">open</td><td>lb CPO / ub PLC2015</td></tr>
<tr><td>dmu12</td><td>30x15</td><td>jobshop</td><td>3481</td><td>3492</td><td style="background-color:grey">open</td><td>lb CPO / ub SS2018</td></tr>
<tr><td>dmu13</td><td>30x15</td><td>jobshop</td><td>3681</td><td>3681</td><td style="background-color:red">hard</td><td>lb CPO / ub ZLRG2008</td></tr>
<tr><td>dmu14</td><td>30x15</td><td>jobshop</td><td>3394</td><td>3394</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu15</td><td>30x15</td><td>jobshop</td><td>3343</td><td>3343</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>dmu16</td><td>30x20</td><td>jobshop</td><td>3734</td><td>3751</td><td style="background-color:grey">open</td><td>lb CPO / ub SS2018</td></tr>
<tr><td>dmu17</td><td>30x20</td><td>jobshop</td><td>3709</td><td>3814</td><td style="background-color:grey">open</td><td>lb CPO / ub SS2018</td></tr>
<tr><td>dmu18</td><td>30x20</td><td>jobshop</td><td>3844</td><td>3844</td><td style="background-color:red">hard</td><td>lb CPO / ub GR2014</td></tr>
<tr><td>dmu19</td><td>30x20</td><td>jobshop</td><td>3672</td><td>3764</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu20</td><td>30x20</td><td>jobshop</td><td>3604</td><td>3703</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu21</td><td>40x15</td><td>jobshop</td><td>4380</td><td>4380</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu22</td><td>40x15</td><td>jobshop</td><td>4725</td><td>4725</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu23</td><td>40x15</td><td>jobshop</td><td>4668</td><td>4668</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu24</td><td>40x15</td><td>jobshop</td><td>4648</td><td>4648</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu25</td><td>40x15</td><td>jobshop</td><td>4164</td><td>4164</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu26</td><td>40x20</td><td>jobshop</td><td>4647</td><td>4647</td><td style="background-color:red">hard</td><td>lb CPO / ub ZLRG2008</td></tr>
<tr><td>dmu27</td><td>40x20</td><td>jobshop</td><td>4848</td><td>4848</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu28</td><td>40x20</td><td>jobshop</td><td>4692</td><td>4692</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu29</td><td>40x20</td><td>jobshop</td><td>4691</td><td>4691</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu30</td><td>40x20</td><td>jobshop</td><td>4732</td><td>4732</td><td style="background-color:red">hard</td><td>lb CPO / ub NS2002</td></tr>
<tr><td>dmu31</td><td>50x15</td><td>jobshop</td><td>5640</td><td>5640</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu32</td><td>50x15</td><td>jobshop</td><td>5927</td><td>5927</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu33</td><td>50x15</td><td>jobshop</td><td>5728</td><td>5728</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu34</td><td>50x15</td><td>jobshop</td><td>5385</td><td>5385</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu35</td><td>50x15</td><td>jobshop</td><td>5635</td><td>5635</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu36</td><td>50x20</td><td>jobshop</td><td>5621</td><td>5621</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>dmu37</td><td>50x20</td><td>jobshop</td><td>5851</td><td>5851</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>dmu38</td><td>50x20</td><td>jobshop</td><td>5713</td><td>5713</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu39</td><td>50x20</td><td>jobshop</td><td>5747</td><td>5747</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu40</td><td>50x20</td><td>jobshop</td><td>5577</td><td>5577</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu41</td><td>20x15</td><td>jobshop</td><td>3007</td><td>3248</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub PLC2015</td></tr>
<tr><td>dmu42</td><td>20x15</td><td>jobshop</td><td>3224</td><td>3390</td><td style="background-color:grey">open</td><td>lb vH2016 / ub SS2018</td></tr>
<tr><td>dmu43</td><td>20x15</td><td>jobshop</td><td>3292</td><td>3441</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub SS2018</td></tr>
<tr><td>dmu44</td><td>20x15</td><td>jobshop</td><td>3299</td><td>3475</td><td style="background-color:grey">open</td><td>lb vH2016 / ub SS2018</td></tr>
<tr><td>dmu45</td><td>20x15</td><td>jobshop</td><td>3039</td><td>3266</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu46</td><td>20x20</td><td>jobshop</td><td>3575</td><td>4035</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub GR2014</td></tr>
<tr><td>dmu47</td><td>20x20</td><td>jobshop</td><td>3522</td><td>3939</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub GR2014</td></tr>
<tr><td>dmu48</td><td>20x20</td><td>jobshop</td><td>3447</td><td>3763</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub SS2018</td></tr>
<tr><td>dmu49</td><td>20x20</td><td>jobshop</td><td>3403</td><td>3710</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub SS2018</td></tr>
<tr><td>dmu50</td><td>20x20</td><td>jobshop</td><td>3496</td><td>3729</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub PLC2015</td></tr>
<tr><td>dmu51</td><td>30x15</td><td>jobshop</td><td>3954</td><td>4156</td><td style="background-color:grey">open</td><td>lb vH2016 / ub SS2018</td></tr>
<tr><td>dmu52</td><td>30x15</td><td>jobshop</td><td>4094</td><td>4303</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu53</td><td>30x15</td><td>jobshop</td><td>4141</td><td>4378</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu54</td><td>30x15</td><td>jobshop</td><td>4202</td><td>4361</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu55</td><td>30x15</td><td>jobshop</td><td>4146</td><td>4263</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu56</td><td>30x20</td><td>jobshop</td><td>4554</td><td>4939</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub XLGG2022</td></tr>
<tr><td>dmu57</td><td>30x20</td><td>jobshop</td><td>4302</td><td>4647</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub XLGG2022</td></tr>
<tr><td>dmu58</td><td>30x20</td><td>jobshop</td><td>4319</td><td>4701</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub CS2022</td></tr>
<tr><td>dmu59</td><td>30x20</td><td>jobshop</td><td>4219</td><td>4616</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu60</td><td>30x20</td><td>jobshop</td><td>4319</td><td>4721</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub CS2022</td></tr>
<tr><td>dmu61</td><td>40x15</td><td>jobshop</td><td>4917</td><td>5171</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub CS2022</td></tr>
<tr><td>dmu62</td><td>40x15</td><td>jobshop</td><td>5041</td><td>5248</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu63</td><td>40x15</td><td>jobshop</td><td>5111</td><td>5313</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub CS2022</td></tr>
<tr><td>dmu64</td><td>40x15</td><td>jobshop</td><td>5130</td><td>5226</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu65</td><td>40x15</td><td>jobshop</td><td>5107</td><td>5184</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu66</td><td>40x20</td><td>jobshop</td><td>5397</td><td>5701</td><td style="background-color:grey">open</td><td>lb vH2016 / ub CS2022</td></tr>
<tr><td>dmu67</td><td>40x20</td><td>jobshop</td><td>5589</td><td>5779</td><td style="background-color:grey">open</td><td>lb CPO / ub SS2018</td></tr>
<tr><td>dmu68</td><td>40x20</td><td>jobshop</td><td>5426</td><td>5763</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu69</td><td>40x20</td><td>jobshop</td><td>5423</td><td>5688</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu70</td><td>40x20</td><td>jobshop</td><td>5501</td><td>5868</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu71</td><td>50x15</td><td>jobshop</td><td>6080</td><td>6207</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu72</td><td>50x15</td><td>jobshop</td><td>6395</td><td>6463</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub SS2018</td></tr>
<tr><td>dmu73</td><td>50x15</td><td>jobshop</td><td>6001</td><td>6136</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu74</td><td>50x15</td><td>jobshop</td><td>6123</td><td>6196</td><td style="background-color:grey">open</td><td>lb CPO / ub SS2018</td></tr>
<tr><td>dmu75</td><td>50x15</td><td>jobshop</td><td>6029</td><td>6189</td><td style="background-color:grey">open</td><td>lb CPO / ub SS2018</td></tr>
<tr><td>dmu76</td><td>50x20</td><td>jobshop</td><td>6342</td><td>6718</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub CS2022</td></tr>
<tr><td>dmu77</td><td>50x20</td><td>jobshop</td><td>6499</td><td>6747</td><td style="background-color:grey">open</td><td>lb Gh2010 / ub CS2022</td></tr>
<tr><td>dmu78</td><td>50x20</td><td>jobshop</td><td>6586</td><td>6755</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu79</td><td>50x20</td><td>jobshop</td><td>6650</td><td>6910</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>dmu80</td><td>50x20</td><td>jobshop</td><td>6459</td><td>6634</td><td style="background-color:grey">open</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>ft06</td><td>6x6</td><td>jobshop</td><td>55</td><td>55</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ft10</td><td>10x10</td><td>jobshop</td><td>930</td><td>930</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ft20</td><td>20x5</td><td>jobshop</td><td>1165</td><td>1165</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la01</td><td>10x5</td><td>jobshop</td><td>666</td><td>666</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la02</td><td>10x5</td><td>jobshop</td><td>655</td><td>655</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la03</td><td>10x5</td><td>jobshop</td><td>597</td><td>597</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la04</td><td>10x5</td><td>jobshop</td><td>590</td><td>590</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la05</td><td>10x5</td><td>jobshop</td><td>593</td><td>593</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la06</td><td>15x5</td><td>jobshop</td><td>926</td><td>926</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la07</td><td>15x5</td><td>jobshop</td><td>890</td><td>890</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la08</td><td>15x5</td><td>jobshop</td><td>863</td><td>863</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la09</td><td>15x5</td><td>jobshop</td><td>951</td><td>951</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la10</td><td>15x5</td><td>jobshop</td><td>958</td><td>958</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la11</td><td>20x5</td><td>jobshop</td><td>1222</td><td>1222</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la12</td><td>20x5</td><td>jobshop</td><td>1039</td><td>1039</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la13</td><td>20x5</td><td>jobshop</td><td>1150</td><td>1150</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la14</td><td>20x5</td><td>jobshop</td><td>1292</td><td>1292</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la15</td><td>20x5</td><td>jobshop</td><td>1207</td><td>1207</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la16</td><td>10x10</td><td>jobshop</td><td>945</td><td>945</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la17</td><td>10x10</td><td>jobshop</td><td>784</td><td>784</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la18</td><td>10x10</td><td>jobshop</td><td>848</td><td>848</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la19</td><td>10x10</td><td>jobshop</td><td>842</td><td>842</td><td style="background-color:green">easy</td><td>Cplex in < 1 min</td></tr>
<tr><td>la20</td><td>10x10</td><td>jobshop</td><td>902</td><td>902</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la21</td><td>15x10</td><td>jobshop</td><td>1046</td><td>1046</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>la22</td><td>15x10</td><td>jobshop</td><td>927</td><td>927</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la23</td><td>15x10</td><td>jobshop</td><td>1032</td><td>1032</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la24</td><td>15x10</td><td>jobshop</td><td>935</td><td>935</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la25</td><td>15x10</td><td>jobshop</td><td>977</td><td>977</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la26</td><td>20x10</td><td>jobshop</td><td>1218</td><td>1218</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la27</td><td>20x10</td><td>jobshop</td><td>1235</td><td>1235</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>la28</td><td>20x10</td><td>jobshop</td><td>1216</td><td>1216</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la29</td><td>20x10</td><td>jobshop</td><td>1152</td><td>1152</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>la30</td><td>20x10</td><td>jobshop</td><td>1355</td><td>1355</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la31</td><td>30x10</td><td>jobshop</td><td>1784</td><td>1784</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la32</td><td>30x10</td><td>jobshop</td><td>1850</td><td>1850</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la33</td><td>30x10</td><td>jobshop</td><td>1719</td><td>1719</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la34</td><td>30x10</td><td>jobshop</td><td>1721</td><td>1721</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la35</td><td>30x10</td><td>jobshop</td><td>1888</td><td>1888</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la36</td><td>15x15</td><td>jobshop</td><td>1268</td><td>1268</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la37</td><td>15x15</td><td>jobshop</td><td>1397</td><td>1397</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la38</td><td>15x15</td><td>jobshop</td><td>1196</td><td>1196</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>la39</td><td>15x15</td><td>jobshop</td><td>1233</td><td>1233</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la40</td><td>15x15</td><td>jobshop</td><td>1222</td><td>1222</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>orb01</td><td>10x10</td><td>jobshop</td><td>1059</td><td>1059</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb02</td><td>10x10</td><td>jobshop</td><td>888</td><td>888</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb03</td><td>10x10</td><td>jobshop</td><td>1005</td><td>1005</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb04</td><td>10x10</td><td>jobshop</td><td>1005</td><td>1005</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb05</td><td>10x10</td><td>jobshop</td><td>887</td><td>887</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb06</td><td>10x10</td><td>jobshop</td><td>1010</td><td>1010</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb07</td><td>10x10</td><td>jobshop</td><td>397</td><td>397</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb08</td><td>10x10</td><td>jobshop</td><td>899</td><td>899</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb09</td><td>10x10</td><td>jobshop</td><td>934</td><td>934</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb10</td><td>10x10</td><td>jobshop</td><td>944</td><td>944</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv01</td><td>20x10</td><td>jobshop</td><td>1407</td><td>1407</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>swv02</td><td>20x10</td><td>jobshop</td><td>1475</td><td>1475</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>swv03</td><td>20x10</td><td>jobshop</td><td>1398</td><td>1398</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>swv04</td><td>20x10</td><td>jobshop</td><td>1464</td><td>1464</td><td style="background-color:red">hard</td><td>lb CPO2015 / ub CPO2015</td></tr>
<tr><td>swv05</td><td>20x10</td><td>jobshop</td><td>1424</td><td>1424</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv06</td><td>20x15</td><td>jobshop</td><td>1630</td><td>1667</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub CS2022</td></tr>
<tr><td>swv07</td><td>20x15</td><td>jobshop</td><td>1513</td><td>1594</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub GR2014</td></tr>
<tr><td>swv08</td><td>20x15</td><td>jobshop</td><td>1671</td><td>1751</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub Mu2015</td></tr>
<tr><td>swv09</td><td>20x15</td><td>jobshop</td><td>1633</td><td>1655</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub SS2018</td></tr>
<tr><td>swv10</td><td>20x15</td><td>jobshop</td><td>1663</td><td>1743</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub SS2018</td></tr>
<tr><td>swv11</td><td>50x10</td><td>jobshop</td><td>2983</td><td>2983</td><td style="background-color:red">hard</td><td>lb CPO / ub SS2018</td></tr>
<tr><td>swv12</td><td>50x10</td><td>jobshop</td><td>2972</td><td>2972</td><td style="background-color:red">hard</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>swv13</td><td>50x10</td><td>jobshop</td><td>3104</td><td>3104</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv14</td><td>50x10</td><td>jobshop</td><td>2968</td><td>2968</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>swv15</td><td>50x10</td><td>jobshop</td><td>2885</td><td>2885</td><td style="background-color:red">hard</td><td>lb CPO / ub PLC2015</td></tr>
<tr><td>swv16</td><td>50x10</td><td>jobshop</td><td>2924</td><td>2924</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv17</td><td>50x10</td><td>jobshop</td><td>2794</td><td>2794</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv18</td><td>50x10</td><td>jobshop</td><td>2852</td><td>2852</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv19</td><td>50x10</td><td>jobshop</td><td>2843</td><td>2843</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv20</td><td>50x10</td><td>jobshop</td><td>2823</td><td>2823</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tai_j10_m10_1</td><td>10x10</td><td>jobshop</td><td>8219</td><td>8219</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_2</td><td>10x10</td><td>jobshop</td><td>7416</td><td>7416</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_3</td><td>10x10</td><td>jobshop</td><td>8094</td><td>8094</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_4</td><td>10x10</td><td>jobshop</td><td>8657</td><td>8657</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_5</td><td>10x10</td><td>jobshop</td><td>7936</td><td>7936</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_6</td><td>10x10</td><td>jobshop</td><td>8509</td><td>8509</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_7</td><td>10x10</td><td>jobshop</td><td>8299</td><td>8299</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_8</td><td>10x10</td><td>jobshop</td><td>7788</td><td>7788</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_9</td><td>10x10</td><td>jobshop</td><td>8300</td><td>8300</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m10_10</td><td>10x10</td><td>jobshop</td><td>8481</td><td>8481</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_1</td><td>10x100</td><td>jobshop</td><td>56609</td><td>56609</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_2</td><td>10x100</td><td>jobshop</td><td>52330</td><td>52330</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_3</td><td>10x100</td><td>jobshop</td><td>56412</td><td>56412</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_4</td><td>10x100</td><td>jobshop</td><td>54889</td><td>54889</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_5</td><td>10x100</td><td>jobshop</td><td>54603</td><td>54603</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_6</td><td>10x100</td><td>jobshop</td><td>53723</td><td>53723</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_7</td><td>10x100</td><td>jobshop</td><td>55456</td><td>55456</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_8</td><td>10x100</td><td>jobshop</td><td>56466</td><td>56466</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_9</td><td>10x100</td><td>jobshop</td><td>55096</td><td>55096</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m100_10</td><td>10x100</td><td>jobshop</td><td>56661</td><td>56661</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_1</td><td>10x1000</td><td>jobshop</td><td>515370</td><td>515370</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_2</td><td>10x1000</td><td>jobshop</td><td>513525</td><td>513525</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_3</td><td>10x1000</td><td>jobshop</td><td>508161</td><td>508161</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_4</td><td>10x1000</td><td>jobshop</td><td>513814</td><td>513814</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_5</td><td>10x1000</td><td>jobshop</td><td>517020</td><td>517020</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_6</td><td>10x1000</td><td>jobshop</td><td>517777</td><td>517777</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_7</td><td>10x1000</td><td>jobshop</td><td>514921</td><td>514921</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_8</td><td>10x1000</td><td>jobshop</td><td>522277</td><td>522277</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_9</td><td>10x1000</td><td>jobshop</td><td>511213</td><td>511213</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j10_m1000_10</td><td>10x1000</td><td>jobshop</td><td>509855</td><td>509855</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_1</td><td>100x10</td><td>jobshop</td><td>54951</td><td>54951</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_2</td><td>100x10</td><td>jobshop</td><td>57160</td><td>57160</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_3</td><td>100x10</td><td>jobshop</td><td>54166</td><td>54166</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_4</td><td>100x10</td><td>jobshop</td><td>54371</td><td>54371</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_5</td><td>100x10</td><td>jobshop</td><td>56142</td><td>56142</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_6</td><td>100x10</td><td>jobshop</td><td>52447</td><td>52447</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_7</td><td>100x10</td><td>jobshop</td><td>54051</td><td>54051</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_8</td><td>100x10</td><td>jobshop</td><td>55624</td><td>55624</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_9</td><td>100x10</td><td>jobshop</td><td>54210</td><td>54210</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m10_10</td><td>100x10</td><td>jobshop</td><td>55464</td><td>55464</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j100_m100_1</td><td>100x100</td><td>jobshop</td><td>62521</td><td>79804</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_2</td><td>100x100</td><td>jobshop</td><td>62741</td><td>78911</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_3</td><td>100x100</td><td>jobshop</td><td>61197</td><td>78438</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_4</td><td>100x100</td><td>jobshop</td><td>64449</td><td>80847</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_5</td><td>100x100</td><td>jobshop</td><td>61340</td><td>79583</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_6</td><td>100x100</td><td>jobshop</td><td>60932</td><td>79840</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_7</td><td>100x100</td><td>jobshop</td><td>63641</td><td>80245</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_8</td><td>100x100</td><td>jobshop</td><td>62989</td><td>80178</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_9</td><td>100x100</td><td>jobshop</td><td>62370</td><td>80608</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m100_10</td><td>100x100</td><td>jobshop</td><td>64866</td><td>79319</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_1</td><td>100x1000</td><td>jobshop</td><td>522298</td><td>544894</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_2</td><td>100x1000</td><td>jobshop</td><td>530375</td><td>549624</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_3</td><td>100x1000</td><td>jobshop</td><td>530560</td><td>549824</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_4</td><td>100x1000</td><td>jobshop</td><td>527101</td><td>545656</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_5</td><td>100x1000</td><td>jobshop</td><td>517728</td><td>546126</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_6</td><td>100x1000</td><td>jobshop</td><td>522907</td><td>546310</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_7</td><td>100x1000</td><td>jobshop</td><td>522537</td><td>547060</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_8</td><td>100x1000</td><td>jobshop</td><td>526428</td><td>549382</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_9</td><td>100x1000</td><td>jobshop</td><td>528097</td><td>551456</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j100_m1000_10</td><td>100x1000</td><td>jobshop</td><td>521766</td><td>544621</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m10_1</td><td>1000x10</td><td>jobshop</td><td>515334</td><td>515334</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_2</td><td>1000x10</td><td>jobshop</td><td>509226</td><td>509226</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_3</td><td>1000x10</td><td>jobshop</td><td>517493</td><td>517493</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_4</td><td>1000x10</td><td>jobshop</td><td>519369</td><td>519369</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_5</td><td>1000x10</td><td>jobshop</td><td>513881</td><td>513881</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_6</td><td>1000x10</td><td>jobshop</td><td>511932</td><td>511932</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_7</td><td>1000x10</td><td>jobshop</td><td>523900</td><td>523900</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_8</td><td>1000x10</td><td>jobshop</td><td>513101</td><td>513101</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_9</td><td>1000x10</td><td>jobshop</td><td>508701</td><td>508701</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m10_10</td><td>1000x10</td><td>jobshop</td><td>521360</td><td>521360</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_j1000_m100_1</td><td>1000x100</td><td>jobshop</td><td>525343</td><td>539137</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_2</td><td>1000x100</td><td>jobshop</td><td>528088</td><td>540895</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_3</td><td>1000x100</td><td>jobshop</td><td>522793</td><td>534926</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_4</td><td>1000x100</td><td>jobshop</td><td>524271</td><td>536317</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_5</td><td>1000x100</td><td>jobshop</td><td>531216</td><td>532016</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_6</td><td>1000x100</td><td>jobshop</td><td>518763</td><td>535189</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_7</td><td>1000x100</td><td>jobshop</td><td>527093</td><td>535894</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_8</td><td>1000x100</td><td>jobshop</td><td>519524</td><td>534315</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_9</td><td>1000x100</td><td>jobshop</td><td>520889</td><td>539627</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m100_10</td><td>1000x100</td><td>jobshop</td><td>529112</td><td>540890</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_1</td><td>1000x1000</td><td>jobshop</td><td>549392</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_2</td><td>1000x1000</td><td>jobshop</td><td>549043</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_3</td><td>1000x1000</td><td>jobshop</td><td>552580</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_4</td><td>1000x1000</td><td>jobshop</td><td>547670</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_5</td><td>1000x1000</td><td>jobshop</td><td>545193</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_6</td><td>1000x1000</td><td>jobshop</td><td>547286</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_7</td><td>1000x1000</td><td>jobshop</td><td>545877</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_8</td><td>1000x1000</td><td>jobshop</td><td>549220</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_9</td><td>1000x1000</td><td>jobshop</td><td>543559</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tai_j1000_m1000_10</td><td>1000x1000</td><td>jobshop</td><td>541530</td><td>undefined</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tjs01</td><td>15x15</td><td>jobshop</td><td>1231</td><td>1231</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tjs02</td><td>15x15</td><td>jobshop</td><td>1244</td><td>1244</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs03</td><td>15x15</td><td>jobshop</td><td>1218</td><td>1218</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs04</td><td>15x15</td><td>jobshop</td><td>1175</td><td>1175</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs05</td><td>15x15</td><td>jobshop</td><td>1224</td><td>1224</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs06</td><td>15x15</td><td>jobshop</td><td>1238</td><td>1238</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs07</td><td>15x15</td><td>jobshop</td><td>1227</td><td>1227</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs08</td><td>15x15</td><td>jobshop</td><td>1217</td><td>1217</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs09</td><td>15x15</td><td>jobshop</td><td>1274</td><td>1274</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs10</td><td>15x15</td><td>jobshop</td><td>1241</td><td>1241</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs11</td><td>20x15</td><td>jobshop</td><td>1357</td><td>1357</td><td style="background-color:red">hard</td><td>lb CPO2015 / ub PS2006</td></tr>
<tr><td>tjs12</td><td>20x15</td><td>jobshop</td><td>1367</td><td>1367</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tjs13</td><td>20x15</td><td>jobshop</td><td>1342</td><td>1342</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tjs14</td><td>20x15</td><td>jobshop</td><td>1345</td><td>1345</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tjs15</td><td>20x15</td><td>jobshop</td><td>1339</td><td>1339</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tjs16</td><td>20x15</td><td>jobshop</td><td>1360</td><td>1360</td><td style="background-color:red">hard</td><td>lb CPO2015 / ub OptalCP</td></tr>
<tr><td>tjs17</td><td>20x15</td><td>jobshop</td><td>1462</td><td>1462</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs18</td><td>20x15</td><td>jobshop</td><td>1377</td><td>1396</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub BV1998</td></tr>
<tr><td>tjs19</td><td>20x15</td><td>jobshop</td><td>1332</td><td>1332</td><td style="background-color:red">hard</td><td>lb CPO2015 / ub OptalCP</td></tr>
<tr><td>tjs20</td><td>20x15</td><td>jobshop</td><td>1348</td><td>1348</td><td style="background-color:red">hard</td><td>lb CPO2015 / ub OptalCP</td></tr>
<tr><td>tjs21</td><td>20x20</td><td>jobshop</td><td>1642</td><td>1642</td><td style="background-color:red">hard</td><td>lb CPO2015 / ub NS2005</td></tr>
<tr><td>tjs22</td><td>20x20</td><td>jobshop</td><td>1561</td><td>1600</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub NS2002</td></tr>
<tr><td>tjs23</td><td>20x20</td><td>jobshop</td><td>1518</td><td>1557</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub NS2002</td></tr>
<tr><td>tjs24</td><td>20x20</td><td>jobshop</td><td>1644</td><td>1644</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tjs25</td><td>20x20</td><td>jobshop</td><td>1595</td><td>1595</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tjs26</td><td>20x20</td><td>jobshop</td><td>1591</td><td>1643</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub GR2014</td></tr>
<tr><td>tjs27</td><td>20x20</td><td>jobshop</td><td>1652</td><td>1680</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub NS2002</td></tr>
<tr><td>tjs28</td><td>20x20</td><td>jobshop</td><td>1603</td><td>1603</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tjs29</td><td>20x20</td><td>jobshop</td><td>1583</td><td>1625</td><td style="background-color:grey">open</td><td>lb SAH2015 / ub Aa1996</td></tr>
<tr><td>tjs30</td><td>20x20</td><td>jobshop</td><td>1528</td><td>1584</td><td style="background-color:grey">open</td><td>lb SAH2015 / ub NS2002</td></tr>
<tr><td>tjs31</td><td>30x15</td><td>jobshop</td><td>1764</td><td>1764</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tjs32</td><td>30x15</td><td>jobshop</td><td>1774</td><td>1784</td><td style="background-color:grey">open</td><td>lb CPO / ub PSV2010</td></tr>
<tr><td>tjs33</td><td>30x15</td><td>jobshop</td><td>1788</td><td>1791</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub ZLRG2007</td></tr>
<tr><td>tjs34</td><td>30x15</td><td>jobshop</td><td>1828</td><td>1828</td><td style="background-color:red">hard</td><td>lb CPO / ub CS2022</td></tr>
<tr><td>tjs35</td><td>30x15</td><td>jobshop</td><td>2007</td><td>2007</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs36</td><td>30x15</td><td>jobshop</td><td>1819</td><td>1819</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tjs37</td><td>30x15</td><td>jobshop</td><td>1771</td><td>1771</td><td style="background-color:red">hard</td><td>lb CPO / ub ZLRG2007</td></tr>
<tr><td>tjs38</td><td>30x15</td><td>jobshop</td><td>1673</td><td>1673</td><td style="background-color:red">hard</td><td>lb CPO / ub He2002</td></tr>
<tr><td>tjs39</td><td>30x15</td><td>jobshop</td><td>1795</td><td>1795</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs40</td><td>30x15</td><td>jobshop</td><td>1651</td><td>1669</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub GR2014</td></tr>
<tr><td>tjs41</td><td>30x20</td><td>jobshop</td><td>1906</td><td>2005</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub CPO2015</td></tr>
<tr><td>tjs42</td><td>30x20</td><td>jobshop</td><td>1884</td><td>1937</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub GR2014</td></tr>
<tr><td>tjs43</td><td>30x20</td><td>jobshop</td><td>1809</td><td>1846</td><td style="background-color:grey">open</td><td>lb CPO / ub PLC2015</td></tr>
<tr><td>tjs44</td><td>30x20</td><td>jobshop</td><td>1948</td><td>1979</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub CS2022</td></tr>
<tr><td>tjs45</td><td>30x20</td><td>jobshop</td><td>1997</td><td>2000</td><td style="background-color:grey">open</td><td>lb Va1995 / ub NS2002</td></tr>
<tr><td>tjs46</td><td>30x20</td><td>jobshop</td><td>1957</td><td>2004</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub GR2014</td></tr>
<tr><td>tjs47</td><td>30x20</td><td>jobshop</td><td>1807</td><td>1889</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub PLC2015</td></tr>
<tr><td>tjs48</td><td>30x20</td><td>jobshop</td><td>1912</td><td>1937</td><td style="background-color:grey">open</td><td>lb Va1995 / ub SS2018</td></tr>
<tr><td>tjs49</td><td>30x20</td><td>jobshop</td><td>1931</td><td>1961</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub CPO2015</td></tr>
<tr><td>tjs50</td><td>30x20</td><td>jobshop</td><td>1833</td><td>1923</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub PLC2015</td></tr>
<tr><td>tjs51</td><td>50x15</td><td>jobshop</td><td>2760</td><td>2760</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tjs52</td><td>50x15</td><td>jobshop</td><td>2756</td><td>2756</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs53</td><td>50x15</td><td>jobshop</td><td>2717</td><td>2717</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs54</td><td>50x15</td><td>jobshop</td><td>2839</td><td>2839</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tjs55</td><td>50x15</td><td>jobshop</td><td>2679</td><td>2679</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs56</td><td>50x15</td><td>jobshop</td><td>2781</td><td>2781</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs57</td><td>50x15</td><td>jobshop</td><td>2943</td><td>2943</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tjs58</td><td>50x15</td><td>jobshop</td><td>2885</td><td>2885</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tjs59</td><td>50x15</td><td>jobshop</td><td>2655</td><td>2655</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs60</td><td>50x15</td><td>jobshop</td><td>2723</td><td>2723</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs61</td><td>50x20</td><td>jobshop</td><td>2868</td><td>2868</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs62</td><td>50x20</td><td>jobshop</td><td>2869</td><td>2869</td><td style="background-color:red">hard</td><td>lb CPO / ub Ca2003</td></tr>
<tr><td>tjs63</td><td>50x20</td><td>jobshop</td><td>2755</td><td>2755</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs64</td><td>50x20</td><td>jobshop</td><td>2702</td><td>2702</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs65</td><td>50x20</td><td>jobshop</td><td>2725</td><td>2725</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs66</td><td>50x20</td><td>jobshop</td><td>2845</td><td>2845</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs67</td><td>50x20</td><td>jobshop</td><td>2825</td><td>2825</td><td style="background-color:red">hard</td><td>lb CPO / ub AELS1999</td></tr>
<tr><td>tjs68</td><td>50x20</td><td>jobshop</td><td>2784</td><td>2784</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs69</td><td>50x20</td><td>jobshop</td><td>3071</td><td>3071</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs70</td><td>50x20</td><td>jobshop</td><td>2995</td><td>2995</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs71</td><td>100x20</td><td>jobshop</td><td>5464</td><td>5464</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs72</td><td>100x20</td><td>jobshop</td><td>5181</td><td>5181</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs73</td><td>100x20</td><td>jobshop</td><td>5568</td><td>5568</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs74</td><td>100x20</td><td>jobshop</td><td>5339</td><td>5339</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs75</td><td>100x20</td><td>jobshop</td><td>5392</td><td>5392</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs76</td><td>100x20</td><td>jobshop</td><td>5342</td><td>5342</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs77</td><td>100x20</td><td>jobshop</td><td>5436</td><td>5436</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs78</td><td>100x20</td><td>jobshop</td><td>5394</td><td>5394</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs79</td><td>100x20</td><td>jobshop</td><td>5358</td><td>5358</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tjs80</td><td>100x20</td><td>jobshop</td><td>5183</td><td>5183</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>yn1</td><td>20x20</td><td>jobshop</td><td>884</td><td>884</td><td style="background-color:red">hard</td><td>lb KNFH2010 / ub SS2018</td></tr>
<tr><td>yn2</td><td>20x20</td><td>jobshop</td><td>870</td><td>904</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub SS2018</td></tr>
<tr><td>yn3</td><td>20x20</td><td>jobshop</td><td>859</td><td>892</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub SS2018</td></tr>
<tr><td>yn4</td><td>20x20</td><td>jobshop</td><td>929</td><td>968</td><td style="background-color:grey">open</td><td>lb CPO2015 / ub SS2018</td></tr>
<tr><td>long-js-600000-100-10000-1</td><td>103x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>long-js-600000-100-10000-2</td><td>103x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>long-js-600000-100-10000-3</td><td>103x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>long-js-600000-1000-100000-3</td><td>103x1000</td><td>reentrant jobshop</td><td>600000</td><td>859249</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>long-js-600000-100-100000-1</td><td>109x100</td><td>reentrant jobshop</td><td>600000</td><td>1077736</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>long-js-600000-100-100000-3</td><td>109x100</td><td>reentrant jobshop</td><td>600000</td><td>1070306</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>long-js-600000-100-100000-2</td><td>114x100</td><td>reentrant jobshop</td><td>600000</td><td>1066971</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>long-js-600000-1000-10000-1</td><td>1002x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-js-600000-1000-10000-2</td><td>1002x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-js-600000-1000-10000-3</td><td>1002x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-js-600000-1000-100000-1</td><td>1002x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>long-js-600000-1000-100000-2</td><td>1002x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-js-600000-100-10000-1</td><td>2162x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-js-600000-100-10000-3</td><td>2169x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-js-600000-100-10000-2</td><td>2192x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-js-600000-1000-10000-2</td><td>2863x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>short-js-600000-1000-10000-1</td><td>2882x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>short-js-600000-1000-10000-3</td><td>2897x1000</td><td>reentrant jobshop</td><td>600000</td><td>600699</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>short-js-600000-100-100000-1</td><td>20685x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-js-600000-100-100000-3</td><td>20767x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-js-600000-100-100000-2</td><td>20870x100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-js-600000-1000-100000-1</td><td>21280x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>short-js-600000-1000-100000-3</td><td>21338x1000</td><td>reentrant jobshop</td><td>600000</td><td>600038</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>short-js-600000-1000-100000-2</td><td>21349x1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>car1</td><td>11x5</td><td>flowshop</td><td>7038</td><td>7038</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>car2</td><td>13x4</td><td>flowshop</td><td>7166</td><td>7166</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>car3</td><td>12x5</td><td>flowshop</td><td>7312</td><td>7312</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>car4</td><td>14x4</td><td>flowshop</td><td>8003</td><td>8003</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>car5</td><td>10x6</td><td>flowshop</td><td>7702</td><td>7702</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>car6</td><td>8x9</td><td>flowshop</td><td>8313</td><td>8313</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>car7</td><td>7x7</td><td>flowshop</td><td>6558</td><td>6558</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>car8</td><td>8x8</td><td>flowshop</td><td>8264</td><td>8264</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>hel2</td><td>20x10</td><td>flowshop</td><td>134</td><td>134</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>hel1</td><td>100x10</td><td>flowshop</td><td>509</td><td>517</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC01</td><td>20x5</td><td>flowshop</td><td>1245</td><td>1245</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>reC03</td><td>20x5</td><td>flowshop</td><td>1093</td><td>1093</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>reC05</td><td>20x5</td><td>flowshop</td><td>1228</td><td>1228</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>reC07</td><td>20x10</td><td>flowshop</td><td>1522</td><td>1522</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>reC09</td><td>20x10</td><td>flowshop</td><td>1520</td><td>1520</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>reC11</td><td>20x10</td><td>flowshop</td><td>1402</td><td>1402</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>reC13</td><td>20x15</td><td>flowshop</td><td>1727</td><td>1926</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC15</td><td>20x15</td><td>flowshop</td><td>1869</td><td>1940</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC17</td><td>20x15</td><td>flowshop</td><td>1727</td><td>1855</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC19</td><td>30x10</td><td>flowshop</td><td>2067</td><td>2067</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>reC21</td><td>30x10</td><td>flowshop</td><td>2013</td><td>2016</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC23</td><td>30x10</td><td>flowshop</td><td>1989</td><td>1989</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>reC25</td><td>30x15</td><td>flowshop</td><td>2294</td><td>2574</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC27</td><td>30x15</td><td>flowshop</td><td>2242</td><td>2372</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC29</td><td>30x15</td><td>flowshop</td><td>2076</td><td>2299</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC31</td><td>50x10</td><td>flowshop</td><td>3003</td><td>3061</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC33</td><td>50x10</td><td>flowshop</td><td>3087</td><td>3098</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC35</td><td>50x10</td><td>flowshop</td><td>3262</td><td>3262</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>reC37</td><td>75x20</td><td>flowshop</td><td>4763</td><td>5282</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC39</td><td>75x20</td><td>flowshop</td><td>4947</td><td>5499</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>reC41</td><td>75x20</td><td>flowshop</td><td>4718</td><td>5341</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>tfs001</td><td>20x5</td><td>flowshop</td><td>1278</td><td>1278</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs002</td><td>20x5</td><td>flowshop</td><td>1358</td><td>1358</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs003</td><td>20x5</td><td>flowshop</td><td>1073</td><td>1073</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs004</td><td>20x5</td><td>flowshop</td><td>1292</td><td>1292</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs005</td><td>20x5</td><td>flowshop</td><td>1231</td><td>1231</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs006</td><td>20x5</td><td>flowshop</td><td>1193</td><td>1193</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs007</td><td>20x5</td><td>flowshop</td><td>1234</td><td>1234</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs008</td><td>20x5</td><td>flowshop</td><td>1199</td><td>1199</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs009</td><td>20x5</td><td>flowshop</td><td>1210</td><td>1210</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs010</td><td>20x5</td><td>flowshop</td><td>1103</td><td>1103</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs011</td><td>20x10</td><td>flowshop</td><td>1554</td><td>1554</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs012</td><td>20x10</td><td>flowshop</td><td>1531</td><td>1644</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs013</td><td>20x10</td><td>flowshop</td><td>1428</td><td>1468</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs014</td><td>20x10</td><td>flowshop</td><td>1356</td><td>1356</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs015</td><td>20x10</td><td>flowshop</td><td>1389</td><td>1389</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tfs016</td><td>20x10</td><td>flowshop</td><td>1367</td><td>1367</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs017</td><td>20x10</td><td>flowshop</td><td>1388</td><td>1427</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs018</td><td>20x10</td><td>flowshop</td><td>1406</td><td>1520</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs019</td><td>20x10</td><td>flowshop</td><td>1586</td><td>1586</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs020</td><td>20x10</td><td>flowshop</td><td>1559</td><td>1559</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tfs021</td><td>20x20</td><td>flowshop</td><td>1968</td><td>2297</td><td style="background-color:grey">open</td><td>lb CPO / ub Ta1993</td></tr>
<tr><td>tfs022</td><td>20x20</td><td>flowshop</td><td>1758</td><td>2099</td><td style="background-color:grey">open</td><td>lb CPO / ub Ta1993</td></tr>
<tr><td>tfs023</td><td>20x20</td><td>flowshop</td><td>1919</td><td>2295</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>tfs024</td><td>20x20</td><td>flowshop</td><td>1892</td><td>2218</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs025</td><td>20x20</td><td>flowshop</td><td>1989</td><td>2273</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>tfs026</td><td>20x20</td><td>flowshop</td><td>1891</td><td>2181</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs027</td><td>20x20</td><td>flowshop</td><td>1908</td><td>2261</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs028</td><td>20x20</td><td>flowshop</td><td>1910</td><td>2194</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>tfs029</td><td>20x20</td><td>flowshop</td><td>1871</td><td>2223</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>tfs030</td><td>20x20</td><td>flowshop</td><td>1917</td><td>2164</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs031</td><td>50x5</td><td>flowshop</td><td>2724</td><td>2724</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs032</td><td>50x5</td><td>flowshop</td><td>2834</td><td>2834</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs033</td><td>50x5</td><td>flowshop</td><td>2612</td><td>2612</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs034</td><td>50x5</td><td>flowshop</td><td>2751</td><td>2751</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs035</td><td>50x5</td><td>flowshop</td><td>2853</td><td>2853</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs036</td><td>50x5</td><td>flowshop</td><td>2825</td><td>2825</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs037</td><td>50x5</td><td>flowshop</td><td>2716</td><td>2716</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs038</td><td>50x5</td><td>flowshop</td><td>2683</td><td>2683</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs039</td><td>50x5</td><td>flowshop</td><td>2545</td><td>2545</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs040</td><td>50x5</td><td>flowshop</td><td>2776</td><td>2776</td><td style="background-color:green">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>tfs041</td><td>50x10</td><td>flowshop</td><td>2959</td><td>2991</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs042</td><td>50x10</td><td>flowshop</td><td>2828</td><td>2867</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs043</td><td>50x10</td><td>flowshop</td><td>2824</td><td>2839</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs044</td><td>50x10</td><td>flowshop</td><td>3059</td><td>3061</td><td style="background-color:grey">open</td><td>lb CPO / ub CPO</td></tr>
<tr><td>tfs045</td><td>50x10</td><td>flowshop</td><td>2917</td><td>2976</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs046</td><td>50x10</td><td>flowshop</td><td>2963</td><td>3006</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs047</td><td>50x10</td><td>flowshop</td><td>3093</td><td>3093</td><td style="background-color:red">hard</td><td>lb OptalCP / ub Va1995</td></tr>
<tr><td>tfs048</td><td>50x10</td><td>flowshop</td><td>3000</td><td>3037</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs049</td><td>50x10</td><td>flowshop</td><td>2823</td><td>2891</td><td style="background-color:grey">open</td><td>lb CPO / ub OptalCP</td></tr>
<tr><td>tfs050</td><td>50x10</td><td>flowshop</td><td>3046</td><td>3065</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs051</td><td>50x20</td><td>flowshop</td><td>3551</td><td>3850</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs052</td><td>50x20</td><td>flowshop</td><td>3533</td><td>3704</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs053</td><td>50x20</td><td>flowshop</td><td>3412</td><td>3640</td><td style="background-color:grey">open</td><td>lb CPO / ub RS2007</td></tr>
<tr><td>tfs054</td><td>50x20</td><td>flowshop</td><td>3382</td><td>3723</td><td style="background-color:grey">open</td><td>lb CPO / ub RS2007</td></tr>
<tr><td>tfs055</td><td>50x20</td><td>flowshop</td><td>3371</td><td>3611</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs056</td><td>50x20</td><td>flowshop</td><td>3499</td><td>3681</td><td style="background-color:grey">open</td><td>lb CPO / ub RS2007</td></tr>
<tr><td>tfs057</td><td>50x20</td><td>flowshop</td><td>3453</td><td>3704</td><td style="background-color:grey">open</td><td>lb CPO / ub RS2007</td></tr>
<tr><td>tfs058</td><td>50x20</td><td>flowshop</td><td>3411</td><td>3691</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs059</td><td>50x20</td><td>flowshop</td><td>3468</td><td>3743</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs060</td><td>50x20</td><td>flowshop</td><td>3474</td><td>3756</td><td style="background-color:grey">open</td><td>lb CPO / ub RS2007</td></tr>
<tr><td>tfs061</td><td>100x5</td><td>flowshop</td><td>5493</td><td>5493</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tfs062</td><td>100x5</td><td>flowshop</td><td>5257</td><td>5257</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs063</td><td>100x5</td><td>flowshop</td><td>5173</td><td>5173</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs064</td><td>100x5</td><td>flowshop</td><td>4993</td><td>4993</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs065</td><td>100x5</td><td>flowshop</td><td>5247</td><td>5247</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs066</td><td>100x5</td><td>flowshop</td><td>5135</td><td>5135</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs067</td><td>100x5</td><td>flowshop</td><td>5232</td><td>5232</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tfs068</td><td>100x5</td><td>flowshop</td><td>5083</td><td>5083</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs069</td><td>100x5</td><td>flowshop</td><td>5442</td><td>5442</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs070</td><td>100x5</td><td>flowshop</td><td>5318</td><td>5318</td><td style="background-color:orange">medium</td><td>CPO in < 1h</td></tr>
<tr><td>tfs071</td><td>100x10</td><td>flowshop</td><td>5759</td><td>5770</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs072</td><td>100x10</td><td>flowshop</td><td>5345</td><td>5349</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs073</td><td>100x10</td><td>flowshop</td><td>5646</td><td>5676</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs074</td><td>100x10</td><td>flowshop</td><td>5737</td><td>5781</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs075</td><td>100x10</td><td>flowshop</td><td>5431</td><td>5467</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs076</td><td>100x10</td><td>flowshop</td><td>5274</td><td>5303</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs077</td><td>100x10</td><td>flowshop</td><td>5553</td><td>5595</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs078</td><td>100x10</td><td>flowshop</td><td>5575</td><td>5617</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs079</td><td>100x10</td><td>flowshop</td><td>5838</td><td>5871</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs080</td><td>100x10</td><td>flowshop</td><td>5835</td><td>5845</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs081</td><td>100x20</td><td>flowshop</td><td>5914</td><td>6202</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs082</td><td>100x20</td><td>flowshop</td><td>6115</td><td>6183</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs083</td><td>100x20</td><td>flowshop</td><td>6139</td><td>6271</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs084</td><td>100x20</td><td>flowshop</td><td>6117</td><td>6269</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs085</td><td>100x20</td><td>flowshop</td><td>6148</td><td>6314</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs086</td><td>100x20</td><td>flowshop</td><td>6192</td><td>6364</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs087</td><td>100x20</td><td>flowshop</td><td>6045</td><td>6268</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs088</td><td>100x20</td><td>flowshop</td><td>6113</td><td>6401</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs089</td><td>100x20</td><td>flowshop</td><td>6014</td><td>6275</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs090</td><td>100x20</td><td>flowshop</td><td>6359</td><td>6434</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs091</td><td>200x10</td><td>flowshop</td><td>10842</td><td>10862</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs092</td><td>200x10</td><td>flowshop</td><td>10429</td><td>10480</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs093</td><td>200x10</td><td>flowshop</td><td>10915</td><td>10922</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs094</td><td>200x10</td><td>flowshop</td><td>10826</td><td>10889</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs095</td><td>200x10</td><td>flowshop</td><td>10474</td><td>10524</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs096</td><td>200x10</td><td>flowshop</td><td>10311</td><td>10329</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs097</td><td>200x10</td><td>flowshop</td><td>10825</td><td>10854</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs098</td><td>200x10</td><td>flowshop</td><td>10709</td><td>10730</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs099</td><td>200x10</td><td>flowshop</td><td>10419</td><td>10438</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs100</td><td>200x10</td><td>flowshop</td><td>10664</td><td>10675</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs101</td><td>200x20</td><td>flowshop</td><td>11010</td><td>11195</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs102</td><td>200x20</td><td>flowshop</td><td>10976</td><td>11203</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs103</td><td>200x20</td><td>flowshop</td><td>11168</td><td>11281</td><td style="background-color:grey">open</td><td>lb CPO / ub RMA2005</td></tr>
<tr><td>tfs104</td><td>200x20</td><td>flowshop</td><td>11131</td><td>11275</td><td style="background-color:grey">open</td><td>lb CPO / ub RMA2005</td></tr>
<tr><td>tfs105</td><td>200x20</td><td>flowshop</td><td>11160</td><td>11259</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs106</td><td>200x20</td><td>flowshop</td><td>11114</td><td>11176</td><td style="background-color:grey">open</td><td>lb CPO / ub RMA2005</td></tr>
<tr><td>tfs107</td><td>200x20</td><td>flowshop</td><td>11249</td><td>11360</td><td style="background-color:grey">open</td><td>lb CPO / ub RMA2005</td></tr>
<tr><td>tfs108</td><td>200x20</td><td>flowshop</td><td>11149</td><td>11334</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs109</td><td>200x20</td><td>flowshop</td><td>11013</td><td>11192</td><td style="background-color:grey">open</td><td>lb CPO / ub NS2005</td></tr>
<tr><td>tfs110</td><td>200x20</td><td>flowshop</td><td>11167</td><td>11288</td><td style="background-color:grey">open</td><td>lb CPO / ub RMA2015</td></tr>
<tr><td>tfs111</td><td>500x20</td><td>flowshop</td><td>25931</td><td>26059</td><td style="background-color:grey">open</td><td>lb CPO / ub RMA2015</td></tr>
<tr><td>tfs112</td><td>500x20</td><td>flowshop</td><td>26390</td><td>26520</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs113</td><td>500x20</td><td>flowshop</td><td>26330</td><td>26371</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs114</td><td>500x20</td><td>flowshop</td><td>26456</td><td>26456</td><td style="background-color:red">hard</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs115</td><td>500x20</td><td>flowshop</td><td>26205</td><td>26334</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs116</td><td>500x20</td><td>flowshop</td><td>26436</td><td>26477</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs117</td><td>500x20</td><td>flowshop</td><td>26329</td><td>26389</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs118</td><td>500x20</td><td>flowshop</td><td>26451</td><td>26560</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs119</td><td>500x20</td><td>flowshop</td><td>25929</td><td>26005</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>tfs120</td><td>500x20</td><td>flowshop</td><td>26355</td><td>26457</td><td style="background-color:grey">open</td><td>lb CPO / ub Va1995</td></tr>
<tr><td>vrf_10_5_01</td><td>10x5</td><td>flowshop</td><td>651</td><td>651</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_02</td><td>10x5</td><td>flowshop</td><td>698</td><td>698</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_03</td><td>10x5</td><td>flowshop</td><td>724</td><td>724</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_04</td><td>10x5</td><td>flowshop</td><td>675</td><td>675</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_05</td><td>10x5</td><td>flowshop</td><td>707</td><td>707</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_06</td><td>10x5</td><td>flowshop</td><td>735</td><td>735</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_07</td><td>10x5</td><td>flowshop</td><td>719</td><td>719</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_08</td><td>10x5</td><td>flowshop</td><td>683</td><td>683</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_09</td><td>10x5</td><td>flowshop</td><td>761</td><td>761</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_5_10</td><td>10x5</td><td>flowshop</td><td>632</td><td>632</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_01</td><td>10x10</td><td>flowshop</td><td>1051</td><td>1051</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_02</td><td>10x10</td><td>flowshop</td><td>1037</td><td>1037</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_03</td><td>10x10</td><td>flowshop</td><td>1071</td><td>1071</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_04</td><td>10x10</td><td>flowshop</td><td>984</td><td>984</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_05</td><td>10x10</td><td>flowshop</td><td>1060</td><td>1060</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_06</td><td>10x10</td><td>flowshop</td><td>1011</td><td>1011</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_07</td><td>10x10</td><td>flowshop</td><td>1026</td><td>1026</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_08</td><td>10x10</td><td>flowshop</td><td>1061</td><td>1061</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_09</td><td>10x10</td><td>flowshop</td><td>1020</td><td>1020</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_10_10</td><td>10x10</td><td>flowshop</td><td>1026</td><td>1026</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_01</td><td>10x15</td><td>flowshop</td><td>1253</td><td>1253</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_02</td><td>10x15</td><td>flowshop</td><td>1328</td><td>1328</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_03</td><td>10x15</td><td>flowshop</td><td>1325</td><td>1325</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_04</td><td>10x15</td><td>flowshop</td><td>1351</td><td>1351</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_05</td><td>10x15</td><td>flowshop</td><td>1331</td><td>1331</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>vrf_10_15_06</td><td>10x15</td><td>flowshop</td><td>1301</td><td>1301</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_07</td><td>10x15</td><td>flowshop</td><td>1361</td><td>1361</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_08</td><td>10x15</td><td>flowshop</td><td>1351</td><td>1351</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_09</td><td>10x15</td><td>flowshop</td><td>1358</td><td>1358</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_15_10</td><td>10x15</td><td>flowshop</td><td>1412</td><td>1412</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_01</td><td>10x20</td><td>flowshop</td><td>1568</td><td>1568</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_02</td><td>10x20</td><td>flowshop</td><td>1686</td><td>1686</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_03</td><td>10x20</td><td>flowshop</td><td>1640</td><td>1640</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_04</td><td>10x20</td><td>flowshop</td><td>1567</td><td>1567</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_05</td><td>10x20</td><td>flowshop</td><td>1570</td><td>1570</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_06</td><td>10x20</td><td>flowshop</td><td>1755</td><td>1755</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_07</td><td>10x20</td><td>flowshop</td><td>1633</td><td>1633</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_10_20_08</td><td>10x20</td><td>flowshop</td><td>1575</td><td>1575</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>vrf_10_20_09</td><td>10x20</td><td>flowshop</td><td>1666</td><td>1666</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>vrf_10_20_10</td><td>10x20</td><td>flowshop</td><td>1609</td><td>1609</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_01</td><td>20x5</td><td>flowshop</td><td>1192</td><td>1192</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_02</td><td>20x5</td><td>flowshop</td><td>1274</td><td>1274</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_03</td><td>20x5</td><td>flowshop</td><td>1299</td><td>1299</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_04</td><td>20x5</td><td>flowshop</td><td>1117</td><td>1117</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_05</td><td>20x5</td><td>flowshop</td><td>1339</td><td>1339</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_06</td><td>20x5</td><td>flowshop</td><td>1066</td><td>1066</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_07</td><td>20x5</td><td>flowshop</td><td>1154</td><td>1154</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_08</td><td>20x5</td><td>flowshop</td><td>1102</td><td>1102</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_09</td><td>20x5</td><td>flowshop</td><td>1310</td><td>1310</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_5_10</td><td>20x5</td><td>flowshop</td><td>1226</td><td>1226</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_20_10_01</td><td>20x10</td><td>flowshop</td><td>1336</td><td>1475</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_02</td><td>20x10</td><td>flowshop</td><td>1394</td><td>1506</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_03</td><td>20x10</td><td>flowshop</td><td>1455</td><td>1555</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_04</td><td>20x10</td><td>flowshop</td><td>1290</td><td>1422</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_05</td><td>20x10</td><td>flowshop</td><td>1406</td><td>1588</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_06</td><td>20x10</td><td>flowshop</td><td>1410</td><td>1560</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_07</td><td>20x10</td><td>flowshop</td><td>1413</td><td>1568</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_08</td><td>20x10</td><td>flowshop</td><td>1522</td><td>1522</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>vrf_20_10_09</td><td>20x10</td><td>flowshop</td><td>1367</td><td>1512</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_10_10</td><td>20x10</td><td>flowshop</td><td>1375</td><td>1489</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_01</td><td>20x15</td><td>flowshop</td><td>1651</td><td>1899</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_02</td><td>20x15</td><td>flowshop</td><td>1608</td><td>1905</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_03</td><td>20x15</td><td>flowshop</td><td>1536</td><td>1780</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_04</td><td>20x15</td><td>flowshop</td><td>1526</td><td>1806</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_05</td><td>20x15</td><td>flowshop</td><td>1665</td><td>1846</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_06</td><td>20x15</td><td>flowshop</td><td>1634</td><td>1933</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_07</td><td>20x15</td><td>flowshop</td><td>1646</td><td>1864</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_08</td><td>20x15</td><td>flowshop</td><td>1530</td><td>1806</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_09</td><td>20x15</td><td>flowshop</td><td>1710</td><td>1916</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_15_10</td><td>20x15</td><td>flowshop</td><td>1610</td><td>1845</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_01</td><td>20x20</td><td>flowshop</td><td>1821</td><td>2270</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_02</td><td>20x20</td><td>flowshop</td><td>1811</td><td>2170</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_03</td><td>20x20</td><td>flowshop</td><td>1826</td><td>2265</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_04</td><td>20x20</td><td>flowshop</td><td>1756</td><td>2148</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_05</td><td>20x20</td><td>flowshop</td><td>1828</td><td>2206</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_06</td><td>20x20</td><td>flowshop</td><td>1852</td><td>2237</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_07</td><td>20x20</td><td>flowshop</td><td>1836</td><td>2267</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_08</td><td>20x20</td><td>flowshop</td><td>1843</td><td>2139</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_09</td><td>20x20</td><td>flowshop</td><td>1964</td><td>2322</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_20_20_10</td><td>20x20</td><td>flowshop</td><td>1813</td><td>2167</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_5_01</td><td>30x5</td><td>flowshop</td><td>1805</td><td>1805</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_02</td><td>30x5</td><td>flowshop</td><td>1571</td><td>1571</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_03</td><td>30x5</td><td>flowshop</td><td>1663</td><td>1663</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_04</td><td>30x5</td><td>flowshop</td><td>1768</td><td>1768</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_05</td><td>30x5</td><td>flowshop</td><td>1706</td><td>1706</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_06</td><td>30x5</td><td>flowshop</td><td>1860</td><td>1860</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_07</td><td>30x5</td><td>flowshop</td><td>1733</td><td>1733</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_08</td><td>30x5</td><td>flowshop</td><td>1705</td><td>1705</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_09</td><td>30x5</td><td>flowshop</td><td>1718</td><td>1718</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_5_10</td><td>30x5</td><td>flowshop</td><td>1637</td><td>1637</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_30_10_01</td><td>30x10</td><td>flowshop</td><td>1792</td><td>1916</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_02</td><td>30x10</td><td>flowshop</td><td>1931</td><td>2098</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_03</td><td>30x10</td><td>flowshop</td><td>1949</td><td>2074</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_04</td><td>30x10</td><td>flowshop</td><td>1790</td><td>1945</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_05</td><td>30x10</td><td>flowshop</td><td>1954</td><td>2023</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_06</td><td>30x10</td><td>flowshop</td><td>1921</td><td>2043</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_07</td><td>30x10</td><td>flowshop</td><td>1795</td><td>1967</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_08</td><td>30x10</td><td>flowshop</td><td>1749</td><td>1896</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_09</td><td>30x10</td><td>flowshop</td><td>1775</td><td>1908</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_10_10</td><td>30x10</td><td>flowshop</td><td>1888</td><td>1888</td><td style="background-color:orange">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>vrf_30_15_01</td><td>30x15</td><td>flowshop</td><td>2084</td><td>2381</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_02</td><td>30x15</td><td>flowshop</td><td>2058</td><td>2318</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_03</td><td>30x15</td><td>flowshop</td><td>2017</td><td>2304</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_04</td><td>30x15</td><td>flowshop</td><td>2210</td><td>2444</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_05</td><td>30x15</td><td>flowshop</td><td>2179</td><td>2423</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_06</td><td>30x15</td><td>flowshop</td><td>2002</td><td>2306</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_07</td><td>30x15</td><td>flowshop</td><td>2078</td><td>2316</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_08</td><td>30x15</td><td>flowshop</td><td>2095</td><td>2366</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_09</td><td>30x15</td><td>flowshop</td><td>1996</td><td>2259</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_15_10</td><td>30x15</td><td>flowshop</td><td>2084</td><td>2385</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_01</td><td>30x20</td><td>flowshop</td><td>2185</td><td>2643</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_02</td><td>30x20</td><td>flowshop</td><td>2384</td><td>2835</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_03</td><td>30x20</td><td>flowshop</td><td>2337</td><td>2783</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_04</td><td>30x20</td><td>flowshop</td><td>2278</td><td>2680</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_05</td><td>30x20</td><td>flowshop</td><td>2273</td><td>2672</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_06</td><td>30x20</td><td>flowshop</td><td>2318</td><td>2715</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_07</td><td>30x20</td><td>flowshop</td><td>2317</td><td>2712</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_08</td><td>30x20</td><td>flowshop</td><td>2413</td><td>2812</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_09</td><td>30x20</td><td>flowshop</td><td>2386</td><td>2795</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_30_20_10</td><td>30x20</td><td>flowshop</td><td>2391</td><td>2805</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_5_01</td><td>40x5</td><td>flowshop</td><td>2396</td><td>2396</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_02</td><td>40x5</td><td>flowshop</td><td>2414</td><td>2414</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_03</td><td>40x5</td><td>flowshop</td><td>2174</td><td>2174</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_04</td><td>40x5</td><td>flowshop</td><td>2149</td><td>2149</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_05</td><td>40x5</td><td>flowshop</td><td>2231</td><td>2231</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_06</td><td>40x5</td><td>flowshop</td><td>2154</td><td>2154</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_07</td><td>40x5</td><td>flowshop</td><td>2197</td><td>2197</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_08</td><td>40x5</td><td>flowshop</td><td>2403</td><td>2403</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_09</td><td>40x5</td><td>flowshop</td><td>2292</td><td>2292</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_5_10</td><td>40x5</td><td>flowshop</td><td>2348</td><td>2348</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_40_10_01</td><td>40x10</td><td>flowshop</td><td>2303</td><td>2480</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_02</td><td>40x10</td><td>flowshop</td><td>2309</td><td>2444</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_03</td><td>40x10</td><td>flowshop</td><td>2318</td><td>2412</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_04</td><td>40x10</td><td>flowshop</td><td>2334</td><td>2472</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_05</td><td>40x10</td><td>flowshop</td><td>2318</td><td>2425</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_06</td><td>40x10</td><td>flowshop</td><td>2438</td><td>2547</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_07</td><td>40x10</td><td>flowshop</td><td>2387</td><td>2501</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_08</td><td>40x10</td><td>flowshop</td><td>2364</td><td>2491</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_09</td><td>40x10</td><td>flowshop</td><td>2287</td><td>2411</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_10_10</td><td>40x10</td><td>flowshop</td><td>2410</td><td>2478</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_01</td><td>40x15</td><td>flowshop</td><td>2737</td><td>3011</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_02</td><td>40x15</td><td>flowshop</td><td>2554</td><td>2821</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_03</td><td>40x15</td><td>flowshop</td><td>2627</td><td>2906</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_04</td><td>40x15</td><td>flowshop</td><td>2618</td><td>2919</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_05</td><td>40x15</td><td>flowshop</td><td>2653</td><td>2945</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_06</td><td>40x15</td><td>flowshop</td><td>2550</td><td>2805</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_07</td><td>40x15</td><td>flowshop</td><td>2611</td><td>2868</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_08</td><td>40x15</td><td>flowshop</td><td>2637</td><td>2900</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_09</td><td>40x15</td><td>flowshop</td><td>2493</td><td>2708</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_15_10</td><td>40x15</td><td>flowshop</td><td>2673</td><td>2945</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_01</td><td>40x20</td><td>flowshop</td><td>3032</td><td>3326</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_02</td><td>40x20</td><td>flowshop</td><td>2757</td><td>3226</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_03</td><td>40x20</td><td>flowshop</td><td>2759</td><td>3233</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_04</td><td>40x20</td><td>flowshop</td><td>2831</td><td>3233</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_05</td><td>40x20</td><td>flowshop</td><td>2670</td><td>3055</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_06</td><td>40x20</td><td>flowshop</td><td>2758</td><td>3192</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_07</td><td>40x20</td><td>flowshop</td><td>2808</td><td>3244</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_08</td><td>40x20</td><td>flowshop</td><td>2882</td><td>3266</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_09</td><td>40x20</td><td>flowshop</td><td>2883</td><td>3335</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_40_20_10</td><td>40x20</td><td>flowshop</td><td>2732</td><td>3122</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_5_01</td><td>50x5</td><td>flowshop</td><td>3054</td><td>3054</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_02</td><td>50x5</td><td>flowshop</td><td>2851</td><td>2851</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_03</td><td>50x5</td><td>flowshop</td><td>2746</td><td>2746</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_04</td><td>50x5</td><td>flowshop</td><td>2824</td><td>2824</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_05</td><td>50x5</td><td>flowshop</td><td>2866</td><td>2866</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_06</td><td>50x5</td><td>flowshop</td><td>2841</td><td>2841</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_07</td><td>50x5</td><td>flowshop</td><td>2600</td><td>2600</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_08</td><td>50x5</td><td>flowshop</td><td>2684</td><td>2684</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_09</td><td>50x5</td><td>flowshop</td><td>2614</td><td>2614</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_5_10</td><td>50x5</td><td>flowshop</td><td>2834</td><td>2834</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_50_10_01</td><td>50x10</td><td>flowshop</td><td>2788</td><td>2926</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_02</td><td>50x10</td><td>flowshop</td><td>2891</td><td>3035</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_03</td><td>50x10</td><td>flowshop</td><td>2911</td><td>3019</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_04</td><td>50x10</td><td>flowshop</td><td>2890</td><td>3003</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_05</td><td>50x10</td><td>flowshop</td><td>3168</td><td>3252</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_06</td><td>50x10</td><td>flowshop</td><td>3088</td><td>3149</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_07</td><td>50x10</td><td>flowshop</td><td>2763</td><td>2842</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_08</td><td>50x10</td><td>flowshop</td><td>2974</td><td>3072</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_09</td><td>50x10</td><td>flowshop</td><td>2933</td><td>3022</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_10_10</td><td>50x10</td><td>flowshop</td><td>2935</td><td>3056</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_01</td><td>50x15</td><td>flowshop</td><td>3027</td><td>3316</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_02</td><td>50x15</td><td>flowshop</td><td>3137</td><td>3347</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_03</td><td>50x15</td><td>flowshop</td><td>3070</td><td>3301</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_04</td><td>50x15</td><td>flowshop</td><td>3316</td><td>3521</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_05</td><td>50x15</td><td>flowshop</td><td>3094</td><td>3334</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_06</td><td>50x15</td><td>flowshop</td><td>3128</td><td>3346</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_07</td><td>50x15</td><td>flowshop</td><td>3228</td><td>3490</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_08</td><td>50x15</td><td>flowshop</td><td>3186</td><td>3430</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_09</td><td>50x15</td><td>flowshop</td><td>2971</td><td>3205</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_15_10</td><td>50x15</td><td>flowshop</td><td>3160</td><td>3399</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_01</td><td>50x20</td><td>flowshop</td><td>3262</td><td>3693</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_02</td><td>50x20</td><td>flowshop</td><td>3265</td><td>3719</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_03</td><td>50x20</td><td>flowshop</td><td>3429</td><td>3784</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_04</td><td>50x20</td><td>flowshop</td><td>3310</td><td>3709</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_05</td><td>50x20</td><td>flowshop</td><td>3232</td><td>3632</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_06</td><td>50x20</td><td>flowshop</td><td>3378</td><td>3795</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_07</td><td>50x20</td><td>flowshop</td><td>3317</td><td>3696</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_08</td><td>50x20</td><td>flowshop</td><td>3358</td><td>3783</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_09</td><td>50x20</td><td>flowshop</td><td>3388</td><td>3816</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_50_20_10</td><td>50x20</td><td>flowshop</td><td>3331</td><td>3769</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_5_01</td><td>60x5</td><td>flowshop</td><td>3350</td><td>3350</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_02</td><td>60x5</td><td>flowshop</td><td>3034</td><td>3034</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_03</td><td>60x5</td><td>flowshop</td><td>3207</td><td>3207</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_04</td><td>60x5</td><td>flowshop</td><td>3266</td><td>3266</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_05</td><td>60x5</td><td>flowshop</td><td>3187</td><td>3188</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_5_06</td><td>60x5</td><td>flowshop</td><td>3100</td><td>3100</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_07</td><td>60x5</td><td>flowshop</td><td>3312</td><td>3312</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_08</td><td>60x5</td><td>flowshop</td><td>3405</td><td>3405</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_09</td><td>60x5</td><td>flowshop</td><td>3119</td><td>3119</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_5_10</td><td>60x5</td><td>flowshop</td><td>3656</td><td>3656</td><td style="background-color:green">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>vrf_60_10_01</td><td>60x10</td><td>flowshop</td><td>3332</td><td>3435</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_02</td><td>60x10</td><td>flowshop</td><td>3576</td><td>3655</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_03</td><td>60x10</td><td>flowshop</td><td>3373</td><td>3423</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_04</td><td>60x10</td><td>flowshop</td><td>3376</td><td>3455</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_05</td><td>60x10</td><td>flowshop</td><td>3401</td><td>3505</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_06</td><td>60x10</td><td>flowshop</td><td>3508</td><td>3594</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_07</td><td>60x10</td><td>flowshop</td><td>3527</td><td>3654</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_08</td><td>60x10</td><td>flowshop</td><td>3495</td><td>3552</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_09</td><td>60x10</td><td>flowshop</td><td>3599</td><td>3685</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_10_10</td><td>60x10</td><td>flowshop</td><td>3432</td><td>3492</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_01</td><td>60x15</td><td>flowshop</td><td>3737</td><td>3940</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_02</td><td>60x15</td><td>flowshop</td><td>3664</td><td>3888</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_03</td><td>60x15</td><td>flowshop</td><td>3625</td><td>3880</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_04</td><td>60x15</td><td>flowshop</td><td>3485</td><td>3716</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_05</td><td>60x15</td><td>flowshop</td><td>3629</td><td>3881</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_06</td><td>60x15</td><td>flowshop</td><td>3647</td><td>3893</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_07</td><td>60x15</td><td>flowshop</td><td>3545</td><td>3809</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_08</td><td>60x15</td><td>flowshop</td><td>3494</td><td>3749</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_09</td><td>60x15</td><td>flowshop</td><td>3587</td><td>3800</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_15_10</td><td>60x15</td><td>flowshop</td><td>3687</td><td>3902</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_01</td><td>60x20</td><td>flowshop</td><td>3782</td><td>4163</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_02</td><td>60x20</td><td>flowshop</td><td>3818</td><td>4290</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_03</td><td>60x20</td><td>flowshop</td><td>3929</td><td>4365</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_04</td><td>60x20</td><td>flowshop</td><td>3953</td><td>4193</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_05</td><td>60x20</td><td>flowshop</td><td>3794</td><td>4196</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_06</td><td>60x20</td><td>flowshop</td><td>3844</td><td>4202</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_07</td><td>60x20</td><td>flowshop</td><td>3893</td><td>4263</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_08</td><td>60x20</td><td>flowshop</td><td>3822</td><td>4180</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_09</td><td>60x20</td><td>flowshop</td><td>3893</td><td>4221</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_60_20_10</td><td>60x20</td><td>flowshop</td><td>3824</td><td>4202</td><td style="background-color:grey">open</td><td>lb OptalCP / ub OptalCP</td></tr>
<tr><td>vrf_100_20_01</td><td>100x20</td><td>flowshop</td><td>5815</td><td>6198</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_02</td><td>100x20</td><td>flowshop</td><td>5995</td><td>6306</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_03</td><td>100x20</td><td>flowshop</td><td>5841</td><td>6238</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_04</td><td>100x20</td><td>flowshop</td><td>5882</td><td>6245</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_05</td><td>100x20</td><td>flowshop</td><td>5916</td><td>6296</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_06</td><td>100x20</td><td>flowshop</td><td>6018</td><td>6321</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_07</td><td>100x20</td><td>flowshop</td><td>6050</td><td>6434</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_08</td><td>100x20</td><td>flowshop</td><td>5734</td><td>6104</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_09</td><td>100x20</td><td>flowshop</td><td>5974</td><td>6354</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_20_10</td><td>100x20</td><td>flowshop</td><td>5818</td><td>6145</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_01</td><td>100x40</td><td>flowshop</td><td>6707</td><td>7881</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_02</td><td>100x40</td><td>flowshop</td><td>6827</td><td>8007</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_03</td><td>100x40</td><td>flowshop</td><td>6738</td><td>7935</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_04</td><td>100x40</td><td>flowshop</td><td>6782</td><td>7932</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_05</td><td>100x40</td><td>flowshop</td><td>6856</td><td>8011</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_06</td><td>100x40</td><td>flowshop</td><td>6874</td><td>8023</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_07</td><td>100x40</td><td>flowshop</td><td>6923</td><td>8006</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_08</td><td>100x40</td><td>flowshop</td><td>6919</td><td>7979</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_09</td><td>100x40</td><td>flowshop</td><td>6820</td><td>7931</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_40_10</td><td>100x40</td><td>flowshop</td><td>6785</td><td>7952</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_01</td><td>100x60</td><td>flowshop</td><td>7543</td><td>9395</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_02</td><td>100x60</td><td>flowshop</td><td>7801</td><td>9596</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_03</td><td>100x60</td><td>flowshop</td><td>7652</td><td>9349</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_04</td><td>100x60</td><td>flowshop</td><td>7686</td><td>9426</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_05</td><td>100x60</td><td>flowshop</td><td>7820</td><td>9465</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_06</td><td>100x60</td><td>flowshop</td><td>7867</td><td>9667</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_07</td><td>100x60</td><td>flowshop</td><td>7801</td><td>9391</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_08</td><td>100x60</td><td>flowshop</td><td>7807</td><td>9534</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_09</td><td>100x60</td><td>flowshop</td><td>7767</td><td>9527</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_100_60_10</td><td>100x60</td><td>flowshop</td><td>7837</td><td>9598</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_01</td><td>200x20</td><td>flowshop</td><td>10967</td><td>11305</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_02</td><td>200x20</td><td>flowshop</td><td>11040</td><td>11265</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_03</td><td>200x20</td><td>flowshop</td><td>11031</td><td>11327</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_04</td><td>200x20</td><td>flowshop</td><td>10901</td><td>11208</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_05</td><td>200x20</td><td>flowshop</td><td>10890</td><td>11208</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_06</td><td>200x20</td><td>flowshop</td><td>11032</td><td>11367</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_07</td><td>200x20</td><td>flowshop</td><td>11064</td><td>11380</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_08</td><td>200x20</td><td>flowshop</td><td>10853</td><td>11141</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_09</td><td>200x20</td><td>flowshop</td><td>10853</td><td>11123</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_20_10</td><td>200x20</td><td>flowshop</td><td>11006</td><td>11310</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_01</td><td>200x40</td><td>flowshop</td><td>11862</td><td>13132</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_02</td><td>200x40</td><td>flowshop</td><td>11813</td><td>13102</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_03</td><td>200x40</td><td>flowshop</td><td>11974</td><td>13264</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_04</td><td>200x40</td><td>flowshop</td><td>12055</td><td>13232</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_05</td><td>200x40</td><td>flowshop</td><td>11748</td><td>13043</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_06</td><td>200x40</td><td>flowshop</td><td>11818</td><td>13124</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_07</td><td>200x40</td><td>flowshop</td><td>11965</td><td>13299</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_08</td><td>200x40</td><td>flowshop</td><td>11904</td><td>13238</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_09</td><td>200x40</td><td>flowshop</td><td>11879</td><td>13166</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_40_10</td><td>200x40</td><td>flowshop</td><td>11960</td><td>13228</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_01</td><td>200x60</td><td>flowshop</td><td>13001</td><td>14990</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_02</td><td>200x60</td><td>flowshop</td><td>12882</td><td>14954</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_03</td><td>200x60</td><td>flowshop</td><td>13050</td><td>15200</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_04</td><td>200x60</td><td>flowshop</td><td>13008</td><td>15044</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_05</td><td>200x60</td><td>flowshop</td><td>13065</td><td>15130</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_06</td><td>200x60</td><td>flowshop</td><td>12983</td><td>15035</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_07</td><td>200x60</td><td>flowshop</td><td>13011</td><td>15040</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_08</td><td>200x60</td><td>flowshop</td><td>12992</td><td>14968</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_09</td><td>200x60</td><td>flowshop</td><td>12958</td><td>15022</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_200_60_10</td><td>200x60</td><td>flowshop</td><td>12940</td><td>15000</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_01</td><td>300x20</td><td>flowshop</td><td>15789</td><td>16149</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_02</td><td>300x20</td><td>flowshop</td><td>16225</td><td>16512</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_03</td><td>300x20</td><td>flowshop</td><td>15868</td><td>16173</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_04</td><td>300x20</td><td>flowshop</td><td>15894</td><td>16181</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_05</td><td>300x20</td><td>flowshop</td><td>16033</td><td>16342</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_06</td><td>300x20</td><td>flowshop</td><td>15945</td><td>16137</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_07</td><td>300x20</td><td>flowshop</td><td>15983</td><td>16266</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_08</td><td>300x20</td><td>flowshop</td><td>16160</td><td>16416</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_09</td><td>300x20</td><td>flowshop</td><td>16065</td><td>16376</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_20_10</td><td>300x20</td><td>flowshop</td><td>16640</td><td>16899</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_01</td><td>300x40</td><td>flowshop</td><td>17014</td><td>18298</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_02</td><td>300x40</td><td>flowshop</td><td>17095</td><td>18454</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_03</td><td>300x40</td><td>flowshop</td><td>17009</td><td>18457</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_04</td><td>300x40</td><td>flowshop</td><td>16937</td><td>18351</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_05</td><td>300x40</td><td>flowshop</td><td>17128</td><td>18484</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_06</td><td>300x40</td><td>flowshop</td><td>17013</td><td>18449</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_07</td><td>300x40</td><td>flowshop</td><td>17079</td><td>18419</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_08</td><td>300x40</td><td>flowshop</td><td>17078</td><td>18392</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_09</td><td>300x40</td><td>flowshop</td><td>17085</td><td>18394</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_40_10</td><td>300x40</td><td>flowshop</td><td>17054</td><td>18401</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_01</td><td>300x60</td><td>flowshop</td><td>18102</td><td>20522</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_02</td><td>300x60</td><td>flowshop</td><td>17822</td><td>20399</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_03</td><td>300x60</td><td>flowshop</td><td>18155</td><td>20434</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_04</td><td>300x60</td><td>flowshop</td><td>17990</td><td>20395</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_05</td><td>300x60</td><td>flowshop</td><td>17892</td><td>20341</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_06</td><td>300x60</td><td>flowshop</td><td>17908</td><td>20388</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_07</td><td>300x60</td><td>flowshop</td><td>18105</td><td>20457</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_08</td><td>300x60</td><td>flowshop</td><td>18037</td><td>20410</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_09</td><td>300x60</td><td>flowshop</td><td>18029</td><td>20549</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_300_60_10</td><td>300x60</td><td>flowshop</td><td>17977</td><td>20472</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_01</td><td>400x20</td><td>flowshop</td><td>20742</td><td>21120</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_02</td><td>400x20</td><td>flowshop</td><td>21190</td><td>21457</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_03</td><td>400x20</td><td>flowshop</td><td>21231</td><td>21441</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_04</td><td>400x20</td><td>flowshop</td><td>20973</td><td>21247</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_05</td><td>400x20</td><td>flowshop</td><td>21246</td><td>21553</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_06</td><td>400x20</td><td>flowshop</td><td>20970</td><td>21214</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_07</td><td>400x20</td><td>flowshop</td><td>21341</td><td>21625</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_08</td><td>400x20</td><td>flowshop</td><td>21038</td><td>21277</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_09</td><td>400x20</td><td>flowshop</td><td>21136</td><td>21346</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_20_10</td><td>400x20</td><td>flowshop</td><td>21311</td><td>21538</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_01</td><td>400x40</td><td>flowshop</td><td>22099</td><td>23578</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_02</td><td>400x40</td><td>flowshop</td><td>21927</td><td>23456</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_03</td><td>400x40</td><td>flowshop</td><td>22154</td><td>23575</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_04</td><td>400x40</td><td>flowshop</td><td>21967</td><td>23409</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_05</td><td>400x40</td><td>flowshop</td><td>21931</td><td>23339</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_06</td><td>400x40</td><td>flowshop</td><td>22043</td><td>23444</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_07</td><td>400x40</td><td>flowshop</td><td>22145</td><td>23556</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_08</td><td>400x40</td><td>flowshop</td><td>21924</td><td>23411</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_09</td><td>400x40</td><td>flowshop</td><td>22177</td><td>23637</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_40_10</td><td>400x40</td><td>flowshop</td><td>22301</td><td>23720</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_01</td><td>400x60</td><td>flowshop</td><td>22927</td><td>25607</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_02</td><td>400x60</td><td>flowshop</td><td>22914</td><td>25656</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_03</td><td>400x60</td><td>flowshop</td><td>23161</td><td>25821</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_04</td><td>400x60</td><td>flowshop</td><td>23150</td><td>25837</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_05</td><td>400x60</td><td>flowshop</td><td>23140</td><td>25877</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_06</td><td>400x60</td><td>flowshop</td><td>22861</td><td>25536</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_07</td><td>400x60</td><td>flowshop</td><td>23022</td><td>25600</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_08</td><td>400x60</td><td>flowshop</td><td>23127</td><td>25800</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_09</td><td>400x60</td><td>flowshop</td><td>23269</td><td>25882</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_400_60_10</td><td>400x60</td><td>flowshop</td><td>23245</td><td>25767</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_01</td><td>500x20</td><td>flowshop</td><td>26152</td><td>26411</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_02</td><td>500x20</td><td>flowshop</td><td>26394</td><td>26681</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_03</td><td>500x20</td><td>flowshop</td><td>26144</td><td>26409</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_04</td><td>500x20</td><td>flowshop</td><td>25876</td><td>26124</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_05</td><td>500x20</td><td>flowshop</td><td>26537</td><td>26781</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_06</td><td>500x20</td><td>flowshop</td><td>26183</td><td>26443</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_07</td><td>500x20</td><td>flowshop</td><td>26196</td><td>26433</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_08</td><td>500x20</td><td>flowshop</td><td>26098</td><td>26318</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_09</td><td>500x20</td><td>flowshop</td><td>26252</td><td>26442</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_20_10</td><td>500x20</td><td>flowshop</td><td>25871</td><td>26072</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_01</td><td>500x40</td><td>flowshop</td><td>27076</td><td>28548</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_02</td><td>500x40</td><td>flowshop</td><td>27208</td><td>28793</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_03</td><td>500x40</td><td>flowshop</td><td>27113</td><td>28607</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_04</td><td>500x40</td><td>flowshop</td><td>27255</td><td>28828</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_05</td><td>500x40</td><td>flowshop</td><td>27140</td><td>28683</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_06</td><td>500x40</td><td>flowshop</td><td>26950</td><td>28524</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_07</td><td>500x40</td><td>flowshop</td><td>27183</td><td>28760</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_08</td><td>500x40</td><td>flowshop</td><td>27257</td><td>28698</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_09</td><td>500x40</td><td>flowshop</td><td>27336</td><td>28870</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_40_10</td><td>500x40</td><td>flowshop</td><td>27269</td><td>28758</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_01</td><td>500x60</td><td>flowshop</td><td>27992</td><td>30861</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_02</td><td>500x60</td><td>flowshop</td><td>27927</td><td>30828</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_03</td><td>500x60</td><td>flowshop</td><td>28138</td><td>31125</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_04</td><td>500x60</td><td>flowshop</td><td>28090</td><td>30928</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_05</td><td>500x60</td><td>flowshop</td><td>28064</td><td>30935</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_06</td><td>500x60</td><td>flowshop</td><td>28189</td><td>31027</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_07</td><td>500x60</td><td>flowshop</td><td>28231</td><td>30928</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_08</td><td>500x60</td><td>flowshop</td><td>28182</td><td>30988</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_09</td><td>500x60</td><td>flowshop</td><td>28155</td><td>30978</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_500_60_10</td><td>500x60</td><td>flowshop</td><td>28264</td><td>31050</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_01</td><td>600x20</td><td>flowshop</td><td>31139</td><td>31433</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_02</td><td>600x20</td><td>flowshop</td><td>31165</td><td>31418</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_03</td><td>600x20</td><td>flowshop</td><td>31217</td><td>31429</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_04</td><td>600x20</td><td>flowshop</td><td>31281</td><td>31547</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_05</td><td>600x20</td><td>flowshop</td><td>31226</td><td>31448</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_06</td><td>600x20</td><td>flowshop</td><td>31506</td><td>31717</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_07</td><td>600x20</td><td>flowshop</td><td>31346</td><td>31527</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_08</td><td>600x20</td><td>flowshop</td><td>31314</td><td>31564</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_09</td><td>600x20</td><td>flowshop</td><td>31369</td><td>31577</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_20_10</td><td>600x20</td><td>flowshop</td><td>30908</td><td>31130</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_01</td><td>600x40</td><td>flowshop</td><td>32305</td><td>33839</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_02</td><td>600x40</td><td>flowshop</td><td>32214</td><td>33467</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_03</td><td>600x40</td><td>flowshop</td><td>32341</td><td>33866</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_04</td><td>600x40</td><td>flowshop</td><td>32226</td><td>33693</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_05</td><td>600x40</td><td>flowshop</td><td>32101</td><td>33553</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_06</td><td>600x40</td><td>flowshop</td><td>32352</td><td>33809</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_07</td><td>600x40</td><td>flowshop</td><td>32263</td><td>33686</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_08</td><td>600x40</td><td>flowshop</td><td>32108</td><td>33482</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_09</td><td>600x40</td><td>flowshop</td><td>32318</td><td>33697</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_40_10</td><td>600x40</td><td>flowshop</td><td>32261</td><td>33642</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_01</td><td>600x60</td><td>flowshop</td><td>33159</td><td>36198</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_02</td><td>600x60</td><td>flowshop</td><td>33196</td><td>36184</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_03</td><td>600x60</td><td>flowshop</td><td>33179</td><td>36201</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_04</td><td>600x60</td><td>flowshop</td><td>33291</td><td>36136</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_05</td><td>600x60</td><td>flowshop</td><td>3635</td><td>36153</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_06</td><td>600x60</td><td>flowshop</td><td>33235</td><td>36116</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_07</td><td>600x60</td><td>flowshop</td><td>33354</td><td>36179</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_08</td><td>600x60</td><td>flowshop</td><td>33290</td><td>36185</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_09</td><td>600x60</td><td>flowshop</td><td>33332</td><td>36195</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_600_60_10</td><td>600x60</td><td>flowshop</td><td>33261</td><td>36163</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_01</td><td>700x20</td><td>flowshop</td><td>36121</td><td>36394</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_02</td><td>700x20</td><td>flowshop</td><td>36165</td><td>36337</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_03</td><td>700x20</td><td>flowshop</td><td>36307</td><td>36568</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_04</td><td>700x20</td><td>flowshop</td><td>36232</td><td>36452</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_05</td><td>700x20</td><td>flowshop</td><td>36394</td><td>36584</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_06</td><td>700x20</td><td>flowshop</td><td>36403</td><td>36671</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_07</td><td>700x20</td><td>flowshop</td><td>36414</td><td>36624</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_08</td><td>700x20</td><td>flowshop</td><td>36300</td><td>36522</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_09</td><td>700x20</td><td>flowshop</td><td>36091</td><td>36329</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_20_10</td><td>700x20</td><td>flowshop</td><td>36290</td><td>36417</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_01</td><td>700x40</td><td>flowshop</td><td>37364</td><td>38964</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_02</td><td>700x40</td><td>flowshop</td><td>37283</td><td>38775</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_03</td><td>700x40</td><td>flowshop</td><td>37088</td><td>38621</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_04</td><td>700x40</td><td>flowshop</td><td>37276</td><td>38785</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_05</td><td>700x40</td><td>flowshop</td><td>37234</td><td>38671</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_06</td><td>700x40</td><td>flowshop</td><td>37249</td><td>38710</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_07</td><td>700x40</td><td>flowshop</td><td>36994</td><td>38585</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_08</td><td>700x40</td><td>flowshop</td><td>37566</td><td>39059</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_09</td><td>700x40</td><td>flowshop</td><td>37274</td><td>38814</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_40_10</td><td>700x40</td><td>flowshop</td><td>37479</td><td>38850</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_01</td><td>700x60</td><td>flowshop</td><td>38289</td><td>41436</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_02</td><td>700x60</td><td>flowshop</td><td>3713</td><td>41375</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_03</td><td>700x60</td><td>flowshop</td><td>38301</td><td>41317</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_04</td><td>700x60</td><td>flowshop</td><td>38515</td><td>41401</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_05</td><td>700x60</td><td>flowshop</td><td>38339</td><td>41262</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_06</td><td>700x60</td><td>flowshop</td><td>38319</td><td>41340</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_07</td><td>700x60</td><td>flowshop</td><td>37932</td><td>40876</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_08</td><td>700x60</td><td>flowshop</td><td>38496</td><td>41474</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_09</td><td>700x60</td><td>flowshop</td><td>3791</td><td>41291</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_700_60_10</td><td>700x60</td><td>flowshop</td><td>38429</td><td>41377</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_01</td><td>800x20</td><td>flowshop</td><td>41284</td><td>41558</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_02</td><td>800x20</td><td>flowshop</td><td>41155</td><td>41407</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_03</td><td>800x20</td><td>flowshop</td><td>41183</td><td>41425</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_04</td><td>800x20</td><td>flowshop</td><td>41190</td><td>41426</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_05</td><td>800x20</td><td>flowshop</td><td>41495</td><td>41710</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_06</td><td>800x20</td><td>flowshop</td><td>41828</td><td>42010</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_07</td><td>800x20</td><td>flowshop</td><td>41175</td><td>41425</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_08</td><td>800x20</td><td>flowshop</td><td>41379</td><td>41492</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_09</td><td>800x20</td><td>flowshop</td><td>41553</td><td>41796</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_20_10</td><td>800x20</td><td>flowshop</td><td>41350</td><td>41574</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_01</td><td>800x40</td><td>flowshop</td><td>42211</td><td>43671</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_02</td><td>800x40</td><td>flowshop</td><td>42224</td><td>43746</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_03</td><td>800x40</td><td>flowshop</td><td>42190</td><td>43749</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_04</td><td>800x40</td><td>flowshop</td><td>42389</td><td>43892</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_05</td><td>800x40</td><td>flowshop</td><td>42492</td><td>43905</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_06</td><td>800x40</td><td>flowshop</td><td>42261</td><td>43811</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_07</td><td>800x40</td><td>flowshop</td><td>42247</td><td>43766</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_08</td><td>800x40</td><td>flowshop</td><td>42409</td><td>43839</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_09</td><td>800x40</td><td>flowshop</td><td>42380</td><td>43879</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_40_10</td><td>800x40</td><td>flowshop</td><td>42409</td><td>43861</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_01</td><td>800x60</td><td>flowshop</td><td>3698</td><td>46470</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_02</td><td>800x60</td><td>flowshop</td><td>43224</td><td>46493</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_03</td><td>800x60</td><td>flowshop</td><td>43339</td><td>46389</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_04</td><td>800x60</td><td>flowshop</td><td>43289</td><td>46457</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_05</td><td>800x60</td><td>flowshop</td><td>3828</td><td>46401</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_06</td><td>800x60</td><td>flowshop</td><td>3719</td><td>46421</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_07</td><td>800x60</td><td>flowshop</td><td>3690</td><td>46319</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_08</td><td>800x60</td><td>flowshop</td><td>3756</td><td>46474</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_09</td><td>800x60</td><td>flowshop</td><td>3622</td><td>46538</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
<tr><td>vrf_800_60_10</td><td>800x60</td><td>flowshop</td><td>3675</td><td>46244</td><td style="background-color:grey">open</td><td>lb CPO / ub NRR2022</td></tr>
</table>


<br/>


# Recommendations

- We recommend the jobshop instances to be used for all variants of jobshop, flowshop and openshop problems where no extra data is needed. The intra-job precedence can be discarded wherever it makes sense.

- We recommend the deprecation of the following instance families
    - `car` : they are all solved in 0 seconds by OptalCP
    - `ft` : they are solved in <= 1 seconds by OptalCP
    - `orb` : they are solved in <= 2 seconds by OptalCP
    - `la` : the running times in seconds of CPO [NaderiRuizRoshanaei2023], OptalCP (our tests) and ORtools [DaColTeppan2022] are as follows

| Instance | CPO | OptalCP | ORtools
|---|---:|---:|---:|
la01 | 0 | 0 | 0
la02 | 2 | 0 | 0
la03 | 1 | 0 | 0
la04 | 2 | 0 | 0
la05 | 0 | 0 | 0
la06 | 0 | 0 | 0
la07 | 0 | 0 | 0
la08 | 0 | 0 | 0
la09 | 0 | 0 | 0
la10 | 0 | 0 | 0
la11 | 0 | 0 | 0
la12 | 0 | 0 | 0
la13 | 0 | 0 | 0
la14 | 0 | 0 | 0
la15 | 1 | 0 | 2
la16 | 5 | 0 | 0
la17 | 3 | 0 | 0
la18 | 3 | 0 | 1
la19 | 5 | 1 | 1
la20 | 4 | 0 | 1
la21 | 75 | 8 | 85
la22 | 25 | 1 | 5
la23 | 1 | 0 | 2
la24 | 29 | 3 | 14
la25 | 33 | 3 | 24
la26 | 5 | 0 | 12
la27 | 406 | 10 | 480
la28 | 16 | 1 | 7
la29 | 3292| 381 | 3600
la30 | 1 | 0 | 8
la31 | 2 | 0 | 12
la32 | 0 | 0 | 21
la33 | 1 | 0 | 35
la34 | 2 | 0 | 32
la35 | 1 | 0 | 15
la36 | 18 | 1 | 7
la37 | 17 | 1 | 5
la38 | 378 | 16 | 135
la39 | 27 | 1 | 5
la40 | 62 | 7 | 31

Various authors on various machines with various solvers have found that the `la` family of instances is easy to solve (except for `la29` but there are enough hard instances in the rest of the benchmark)
