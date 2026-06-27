---
layout: page
title: JSPLib
permalink: /jsplib/
---

<script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>



## The jobshop scheduling problem benchmark library

JSPLib is a comprehensive benchmark library for the Job Shop Scheduling Problem (JSP). It serves as a centralized repository for both classic synthetic instances (`ft`, `la`, `abz`, `orb`, `yn`, `swv`, `ta`, `dmu`, and `tai`) and more industrial instances (`dct` and `bel`). 
JSPLib tracks the engines State-of-the-Art (SOTA) through a standardized 10-minute benchmark of reference solvers (CPO, CP-SAT, OptalCP), comparing their optimality gaps and deviations from best known bounds across all instance families. In addition, JSPLib maintains an archive verified Best Known Solutions (BKS).

The data and source code can be found in the [Github repository](https://github.com/ScheduleOpt/benchmarks)
This document is visible as a README.md in the Github folder [jobshop](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop) or as a [webpage](https://scheduleopt.github.io/benchmarks/jsplib). Instances are now available in [json](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/instances/json) or [text](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/instances/text) formats. The [raw data](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions) of the performance benchmark is available. A json file of [best known solutions](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions/bks.json) is also provided.

### Table of Contents

- [Jobshop instances](#jobshop-benchmark-instances)
    - [Overview of the jobshop benchmark](#overview-of-the-jsplib)
    - [Classification of the jobshop instances](#classification-of-the-jobshop-instances)
    - [Similar work](#similar-work)
    - [Formats](#formats)
    - [Publications](#publications-instances)
- [Standardized benchmark of engines](#standardized-benchmark-of-engines)
    - [A short history of the reference engines](#a-short-history-of-the-reference-engines)
    - [Incorrect best-known solutions used in publications and better metrics](#incorrect-best-known-solutions-used-in-publications-and-better-metrics)
    - [Comparison of reference solvers](#comparison-of-reference-solvers)
- [Best known solutions](#jsplib-solutions---the-state-of-the-art)
    - [JSON bks format](#best-known-solutions-json-format)
    - [Best known solutions](#best-known-solutions---jsplib)
    - [Publications](#publications-best-known-solutions)

<br/>

### Overview of the jsplib

jobshop instances (332)
- 3 instances `ft` from Fisher and Thompson 1963
- 40 instances `la` from Lawrence 1984
- 5 instances `abz` from Adams, Balas and Zawack 1988
- 10 instances `orb` from Applegate and Cook 1991
- 20 instances `swv` from Storer, Wu and Vaccari 1992
- 4 instances `yn` from Yamada Nakano 1992
- 80 instances `ta` from Taillard 1993
- 80 instances `dmu` from Demikol, Mehta and Uzsoy 1998
- 90 instances `tai` from Da Col and Teppan 2022

reentrant jobshop instances (44)
- 24 instances `dct` from Da Col and Teppan 2022
- 20 instances `bel` from Boveroux, Ernst and Louveaux 2025


<br/>

### The lack of industrial instances

> There is a gap in the existing literature regarding job shop scheduling benchmarks. Most commonly referenced instances, such as those proposed by Taillard et al., Adams et al.  or Demirkol et al. , focus on small and rectangular configurations where the number of machines equals the number of operations for each job. This structure does not adequately represent the complexities of larger, unbalanced scenarios commonly encountered in real-world manufacturing.
>
> To address this gap, we first analyzed an industrial dataset from a real manufacturing facility that includes 51 machines, 828 jobs and a total of 6057 operations. In this instance, the workload distribution is unbalanced, with some machines heavily loaded while others are lightly used. Furthermore, the number of operations per job varies significantly, ranging from 1 to 20.
>
> Boveroux, Ernst and Louveaux (2025)

All 332 classic instances are randomly generated which creates situations like `ta39` and `ta40` that are the same size (30 x 15) and generated with the same generator, but one is solved in < 1 minute while the other is still open, resisting all solution techniques. 

We would like to augment the jsplib with more instances based on real data and have therefore included the `long` and `short` data from Teppan 2022 that while still random attempts to recreate the situation where jobs have different number of operations and can require multiple operations on a given machine (reentrancy) mimiking metal fabrication and aircraft component machining problems. We have added the instances `bal` of Boveroux et al. that statistically reproduce the features of the manufavturing data they were working with.

We strongly encourage anyone that has access to real jobshop instances to share them with us and the scheduling commmunity.

<br/>

### Classification of the jobshop instances

We use the following engines as reference engines for the benchmark for they are widely considered the strongest engines for scheduling, and to provide a balanced benchmark across different solver technologies
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : a classic CP-scheduling engine
- [**Google CP-SAT**](https://developers.google.com/optimization) : a lazy clause generation + LP + local search engine
- [**OptalCP**](https://optalcp.com) : a modern CP-scheduling engine


Instances are divided into
- <strong style="color:cornflowerblue">toy</strong> : solved to optimality (with proof) in 1 minute by at least 1 reference engine
- <strong style="color:green">easy</strong> : solved to optimality (with proof) in 10 minute by at least 1 reference engine
- <strong style="color:orange">medium</strong> : solved to optimality (with proof) in 1 hour by at least 1 reference engine
- <strong style="color:red">hard</strong> : solved to optimality (with proof) in > 1h by at least 1 reference engine
- <strong style="color:purple">closed</strong> : *allegedly* solved to optimality. Most of the time the optimal solution is known because 2 different methods independently found equal upper and lower bounds. The problem moves to <span style="color:red">hard</span> only when the optimality proof can be reproduced by a reference engine.
- <strong style="color:grey">open</strong> : no proof of optimality

<br/>

> 2026-06-10: We have introduced the <strong style="color:cornflowerblue">toy</strong> category for < 1 minute, and moved the <strong style="color:green">easy</strong> category to < 10 minutes, making official that we consider 10 minutes the standard benchmarking time unlike 1h in [NRR2022]

<br/>


Currently there are

jobshop

- `ft` : 3 toy
- `la` : 39 toy, 1 easy
- `abz` : 2 toy, 1 easy, 1 medium, 1 hard
- `orb` : 10 toy
- `swv` : 9 toy, 2 easy, 3 medium, 3 hard, 3 open
- `yn` : 4 hard
- `ta` : 42 toy, 6 easy, 12 medium, 8 hard, 12 open
- `dmu` : 19 toy, 5 easy, 6 medium, 5 hard, 45 open
- `tai` : 50 toy, 2 medium, 8 hard, 30 open

reentrant jobshop
- `dct` : 16 toy, 7 medium, 1 open
- `bel` : 20 toy

<br/>

### Similar work

We have borrowed data and ideas from the following sources

#### Naderi, Ruiz and Roshanei (2022)

Our work was inspired by the ***outstanding*** work of Naderi, Ruiz and Roshanaei *Mixed-Integer Programming versus Constraint Programming for shop scheduling problems : New Results and Outlook* [**NRR2022**] which compares CPO, Cplex, Gurobi and OR-tools on a benchmark of 6623 instances over 17 benchmarks with a timeout of 1h. They have made all the [raw results available](http://soa.iti.es/problem-instances)

#### Jelke J. van Hoorn (2017)

Jelke J. van Hoorn collected and verified in 2017 all available upper and lower bounds for jobshop problems and published them in *The Current state of bounds on benchmark instances of the job-shop scheduling problem. J Sched 21, 127–128 (2018)*. The online [Appendix](https://static-content.springer.com/esm/art%3A10.1007%2Fs10951-017-0547-8/MediaObjects/10951_2017_547_MOESM_ESM.pdf) contains the data.

#### Oleg V. Shylo (2014 - present)

Since 2014 [Optimizizer](https://optimizizer.com/jobshop.php) has been the reference in terms of published upper and lower bounds for jobshop problems. For each problem is given the publication that explains the method used to find the upper or lower bound, and upper bounds are explicitly provided and verified. Optimizizer is a repository of ***published*** results, while jsplib.org is a repository of ***engine*** results. JSPLib is interested in  non-engine results (meta-heuristics, etc) only to investigate what changes are needed for engines to surpass them! We do not report improved bounds to optimizizer (there are no peer-reviewed publications supporting them and we don't consider "I ran an engine for a while because I am very patient" a scientific contribution). The authors of the benchmarked engines are invited to write papers about how their engines work, submit them for peer-review and report the bounds to Optimizizer.

***There may be some lag between jsplib.org and optimizizer, always check both.***

#### Scheduling Lab

[SchedulingLab](https://github.com/SchedulingLab/jsp-instances) collects instances of various types of scheduling problems, including instances not referenced here.

<br/>

### Formats

There are four main formats, ***standard***, ***DaColTeppan***, ***taillard*** and ***json***. 

*The [flexible jobshop library](https://fjsplib.org) preferred format represents precedences explicitly. The jobshop problem being a special case of the flexible jobshop problem, this library may at some point in the future use that same format*


#### Standard format

```
#n #m
((machine duration ){m}\n){n}
```

For instance `la01` on standard format is
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


#### Da Col Teppan format

```
#n #m
((machine duration )+ -1 -1\n){n}
```

In the DaColTeppan format
- there can be any number of tasks per job
- there can be various tasks in a job running on the same machine (reentrance)
- the jobs end in a -1 -1


The DaColTeppan format is actually a format for the reentrant jobshop problem which
is a generalization of the jobshop, common in some industrial environments like semiconductors


A modified instance of `la01` would look like
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


#### Taillard format

The taillard format first lists the machines, then the durations

```
#n #m
((machine ){m}\n){n}
((duration ){m}\n){n}
```

For instance `la01` in taillard format is
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

#### JSON format

The json format is more verbose but probably easier to use and contains meta-data about the instance that is useful for automating benchmarks

```json
{
  "instance": "la01",
  "family": "la",
  "family_long": "Lawrence",
  "year": "1984",
  "machines": 5,
  "jobs": 10,
  "data": [
    {"job": 0, "operation": 0, "machine": 1, "duration": 21},
    {"job": 0, "operation": 1, "machine": 0, "duration": 53},
    {"job": 0, "operation": 2, "machine": 4, "duration": 95},
    {"job": 0, "operation": 3, "machine": 3, "duration": 55},
    {"job": 0, "operation": 4, "machine": 2, "duration": 34},
    {"job": 1, "operation": 0, "machine": 0, "duration": 21},
    {"job": 1, "operation": 1, "machine": 3, "duration": 52},
    {"job": 1, "operation": 2, "machine": 4, "duration": 16},
    {"job": 1, "operation": 3, "machine": 2, "duration": 26},
  ...
    {"job": 9, "operation": 4, "machine": 0, "duration": 96}
  ]
}
```

<br/>

### Publications (instances)

The instances come from the following publications

- **H. Fisher, G.L. Thompson** (1963), Probabilistic learning combinations of local job-shop scheduling rules, J.F. Muth, G.L. Thompson (eds.), Industrial Scheduling,  Prentice Hall, Englewood Cliffs, New Jersey, 225-251.

- **Lawrence, S.** (1984). Resource constrained project scheduling: An experimental investigation of heuristic scheduling techniques (Supplement). Graduate School of Industrial Administration, Carnegie-Mellon University.

- **Adams, J., Balas, E., & Zawack, D.** (1988). The shifting bottleneck procedure for job shop scheduling. Management science, 34(3), 391-401.

- **Applagate, D., & Cook, W.** (1991). A computational study of the job-shop scheduling instance. ORSA J. Comput, 3, 49-51.

- **Storer, R. H., Wu, S. D., & Vaccari, R.** (1992). New search spaces for sequencing instances with application to job shop 38 (1992) 1495–1509 Manage. Sci, 38, 1495-1509.

- **T. Yamada, R. Nakano** (1992), A genetic algorithm applicable to large-scale job-shop instances, R. Manner, B. Manderick (eds.),Parallel instance solving from nature 2,    North-Holland, Amsterdam,  281-290

- **Taillard, E.** (1993). Benchmarks for basic scheduling problems. european journal of operational research, 64(2), 278-285.

- **Demirkol, E., Mehta, S., & Uzsoy, R.** (1998). Benchmarks for shop scheduling problems. European Journal of Operational Research, 109(1), 137-141.

- **Da Col, G., & Teppan, E. C.** (2022). Industrial-size job shop scheduling with constraint programming. Operations Research Perspectives, 9, 100249.

- **Boveroux, L., Ernst, D., & Louveaux, Q.** (2025). Investigating the Monte-Carlo Tree Search approach for the job shop scheduling problem. EURO Journal on Computational Optimization, 100118.

<br/>


## Standardized benchmark of engines

We track the State-Of-The-Art (SOTA) of optimization engines for scheduling with a standardized 10 minutes benchmark of the reference engines

The engines that are benchmarked are
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the ***CP-scheduling*** family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the ***lazy clause generation*** family of engines
- [**OptalCP**](https://optalcp.com) : representative of the ***CP-scheduling*** family of engines

<br/>

### A short history of the reference engines

#### IBM CP Optimizer (2007 - present)

**IBM ILOG CP Optimizer** is a descendant of **ILOG Solver** (architectured over the years by Jean-François Puget, Jean-Charles Régin and later Laurent Perron) and **ILOG Scheduler** (architectured by Claude Le Pape, then Philippe Laborie). CP Optimizer (led by Paul Shaw, Laurent Perron and Philippe Laborie) merged the general CP engine and the specific scheduling add-on in a single engine, promoted the model-and-run approach and pioneered a new scheduling language (optional intervals, noOverlap, cumulative functions, etc.) that has become an industry standard.

From a technical perspective CP Optimizer interleaves the following search methods
- **LNS** (Shaw and al.) : tree-search based local search
- **Iterative deepening** (designed by Philppe Laborie) : a quick diving heuristic for "simple" scheduling problems that often provides fast and good initial solutions
- **Failure Directed Search** (designed by Petr Vilim) : a generalization of the fail-first principle that reduces the search space by eliminating unlikely assignments to succeed
- **Genetic algorithms** on top of the scheduling engine (not on by default)

Because CP Optimizer was designed in a time where multi-core computers weren't common, the engine alternates the different strategies on the same core. And replicates itself over various cores with different parameters if more cores are available

The main propagation algorithms in CP optimizer are
- Time tabling and edge-finding (Claude LePape, Wim Nuijten, Philippe Baptiste) later improved by Petr Vilim 
- Precedence-energy (Philippe Laborie)

References
- [20+ years of scheduling with constraints at IBM/ILOG](https://link.springer.com/content/pdf/10.1007/s10601-018-9281-x.pdf) (Philippe Laborie, Jérôme Rogerie, Paul Shaw and Petr Vilim - 2018)
- [Reasoning with Conditional Time-intervals](https://cdn.aaai.org/FLAIRS/2008/FLAIRS08-126.pdf) (Philippe Laborie and Jérôme Rogerie - 2008)
- [Reasoning with Conditional Time-intervals Part II](https://cdn.aaai.org/ocs/60/60-2374-1-PB.pdf) (Phillipe Laborie, Jérôme Rogerie, Paul Shaw and Petr Vilim - 2009)
- [Failure-Directed Search for Constraint-Based Scheduling](https://link.springer.com/chapter/10.1007/978-3-319-18008-3_30) (Petr Vilim, Philippe Laborie and Paul Shaw - 2015)
- [Introduction to CP Optimizer](https://cp2019.a4cp.org/PDFs/P-Laborie.pdf) (Philippe Laborie - 2019)

#### Google ORTools CP-SAT (2017 - present)

CP-SAT is an open-source lazy clause generation engine augmented with an LP, MIP-style cuts and CP-style propagators designed by Laurent Perron, Frédéric Didier and Steven Gay. CP-SAT includes
- LP-based lower bounds + MIP style cuts
- CP-style propagation algorithms
- SAT-style conflict analysis
- synchronization of MIP and CP style reasonings
- LNS : tree-based local search
- LS with infeasible moves

CP-SAT follows the work done on a more traditional CP + LS engine by Laurent Perron and Vincent Furnon, focusing more on VRP problems.

ORTools (CP-SAT and its FD predecessor) has won every year the MiniZinc competition since 2013

References
- [CP-SAT at scheduling seminar](https://schedulingseminar.com/presentations/SchedulingSeminar_LaurentPerron.pdf)


#### OptalCP (2021 - present)

OptalCP was architectured by Petr Vilim, Nicolas Bonifas and Diego Olivier Fernandez Pons (initially with input from Philippe Laborie). Compared to CPO the parallelism is done with one strategy per core instead of interleaving. The strategies used are
- **LNS** : tree-search based local search
- **FDS** : generalizes first-fail principle
- **FDSDual** : generalizes destructive lower bounds

OptalCP continues the legacy of CP Optimizer (engine style, modeling language). The hybridization of OptalCP with heuristics and meta-heuristics is done outside by communicating upper and lower bounds in real time (during search)

References
- [OptalCP at scheduling seminar](https://schedulingseminar.com/presentations/schedulingseminar_petrvilim_vilemheinz.pdf)

<br/>

>
> If your name appears in this section and you notice an     error contact me
>

<br/>

### Incorrect best-known solutions used in publications and better metrics

> Scheduling problems have received considerable attention over the last decade. Several sets of benchmark instances are available for comparing the quality of the different methods developed. A large number of publications achieve either the current best known or improved bounds for a subset of these instances. It is unfortunate, however, that several publications erroneously reference the current state of these bounds. 
>
> Jelke J. van Hoorn, The Current state of bounds on benchmark instances of the job-shop scheduling problem (2017)

While the effort of van Hoorn is commendable, having accurate best-known solutions does not solve the problem of poorly reported results in publications. Announcing a best-known solution while having little scientific interest in itself (e.g. a random solution) has sadly become a central "contribution" of papers.

By giving to much importance to best-known solutions we miss what really matters:
- An approach that finds a best known solution for a single problem but is unable to provide good results for other problems is totally unusable in practice (e.g. a random solution)
- An approach that systematically gets close to the best known solutions in a short time may not improve any best known bound but be of significant practical interest


We therefore adopt the following metrics instead
- Average deviation with respect to best-known lower-bound 
$$UB_{deviation} = \frac{UB - UB_{best}}{UB_{best}}$$
- Average deviation with respect to best-known upper-bound
$$LB_{deviation} = \frac{UL_{best} - LB}{LB_{best}}$$
- Average gap
$$GAP = \frac{UB - LB}{UB}$$

***The MIP community uses geometric averages instead of arithmetic averages to correct against methods that solve extremely well a single instance and perform poorly on others. We may adopt geometric averages in the future, for the moment we use arithmetic ones***

<br/>

### Comparison of reference solvers

Comparisons done on an Windows PC with an i7 4-core 3GHz 32GB ram in 600 seconds
- **OptalCP** Academic Version 2026.4.0 
    - with maximum propagation instead of default, gap tolerance = 0 and some other parameter changes
    - we may benchmark with default parameters later
- **CP-SAT** V9.15.6755 with default configuration
- **CPO** 22.1.1.0
    - with gap tolerance = 0
    

The raw data is in the [solutions](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions) folder

We recommend to run your own benchmarks on your own machines. All required [code](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/code) is provided with HOWTO instructions in each README file.


Important caveats
- Engines have **relative** and **absolute optimality tolerances** (CPO, OptalCP) which can lead to reporting sub-optimal solutions as optimal (for the tolerance). For this test the tolerances have been set to zero
- Engines are very **non-deterministic** (results between two runs of the same engine on the same machine differ significantly) due to parallelism. As a result it makes no sense to consider very accurate values for average deviations or gap.
- Engines have different **bottlenecks** (CPU, memory) that are due to their internal architecture and trade-offs made by their designers. An engine doesn't behave in the same way with 2, 4, 8, 16, 32 or 64 cores, doesn't behave the same in machines with fast / slow memory, etc.

<br/>

#### Per types of instances

The types are defined as follows
- *outdated* : `ft`, `la`, `orb`
- *classic* : `abz`, `swv`, `yn`, `dmu`, `ta`
- *challenge* : classic + still open
- *large* : `tai`
- *reentrant*: `bel`, `dct`
- *open* : all instances still open

<br/>

Averages are made on instances solved. Outlier solutions returned by the engine (e.g. a schedule of makespan equal to the sum of processing times - all tasks scheduled one at the time) have been manually removed as they distort the arithmetic average, instead the engine is considered as having not solved. We may formalize this in the future (e.g. only solutions better than a left-to-right greedy are accepted).

<table>
<tr><th>Group</th><th>Solver</th><th>Ran</th><th>Solved</th><th>Optimal</th><th>%opt</th><th>lb dev</th><th>ub dev</th><th>gap</th></tr>
<tr><td rowspan="3">all</td><td>CPO</td><td>376</td><td>376</td><td>144</td><td>38%</td><td>5%</td><td>3%</td><td>9%</td></tr>
<tr><td>CP-SAT</td><td>376</td><td style="color:red">350</td><td>165</td><td>44%</td><td>7%</td><td>3%</td><td>5%</td></tr>
<tr><td>OptalCP</td><td>376</td><td>376</td><td>223</td><td>59%</td><td>0%</td><td>1%</td><td>3%</td></tr>
<tr><td rowspan="3">outdated</td><td>CPO</td><td>53</td><td>53</td><td>51</td><td>96%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>CP-SAT</td><td>53</td><td>53</td><td>52</td><td>98%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>OptalCP</td><td>53</td><td>53</td><td>53</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td rowspan="3">classic</td><td>CPO</td><td>189</td><td>189</td><td>65</td><td>34%</td><td>2%</td><td>2%</td><td>5%</td></tr>
<tr><td>CP-SAT</td><td>189</td><td>189</td><td>41</td><td>22%</td><td>1%</td><td>3%</td><td>5%</td></tr>
<tr><td>OptalCP</td><td>189</td><td>189</td><td>82</td><td>43%</td><td>1%</td><td>1%</td><td>3%</td></tr>
<tr><td rowspan="3">challenge</td><td>CPO</td><td>60</td><td>60</td><td>0</td><td>0%</td><td>3%</td><td>6%</td><td>10%</td></tr>
<tr><td>CP-SAT</td><td>60</td><td>60</td><td>0</td><td>0%</td><td>2%</td><td>7%</td><td>10%</td></tr>
<tr><td>OptalCP</td><td>60</td><td>60</td><td>0</td><td>0%</td><td>1%</td><td>3%</td><td>7%</td></tr>
<tr><td rowspan="3">large</td><td>CPO</td><td>90</td><td>90</td><td>27</td><td>30%</td><td>10%</td><td>4%</td><td>19%</td></tr>
<tr><td>CP-SAT</td><td>90</td><td style="color:red">70</td><td>46</td><td>51%</td><td>25%</td><td>3%</td><td>10%</td></tr>
<tr><td>OptalCP</td><td>90</td><td>90</td><td>50</td><td>56%</td><td>0%</td><td>1%</td><td>7%</td></tr>
<tr><td rowspan="3">reentrant</td><td>CPO</td><td>44</td><td>44</td><td>1</td><td>2%</td><td>12%</td><td>11%</td><td>19%</td></tr>
<tr><td>CP-SAT</td><td>44</td><td style="color:red">38</td><td>26</td><td>59%</td><td>3%</td><td>9%</td><td>6%</td></tr>
<tr><td>OptalCP</td><td>44</td><td>44</td><td>38</td><td>86%</td><td>0%</td><td>5%</td><td>3%</td></tr>
<tr><td rowspan="3">open</td><td>CPO</td><td>90</td><td>90</td><td>0</td><td>0%</td><td>2%</td><td>7%</td><td>16%</td></tr>
<tr><td>CP-SAT</td><td>90</td><td style="color:red">80</td><td>0</td><td>0%</td><td>12%</td><td>8%</td><td>12%</td></tr>
<tr><td>OptalCP</td><td>90</td><td>90</td><td>0</td><td>0%</td><td>1%</td><td>3%</td><td>12%</td></tr>
</table>

#### Per family

<table>
<tr><th>Group</th><th>Solver</th><th>Ran</th><th>Solved</th><th>Optimal</th><th>%opt</th><th>lb dev</th><th>ub dev</th><th>gap</th></tr>
<tr><td rowspan="3">ft</td><td>CPO</td><td>3</td><td>3</td><td>3</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>CP-SAT</td><td>3</td><td>3</td><td>3</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>OptalCP</td><td>3</td><td>3</td><td>3</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td rowspan="3">la</td><td>CPO</td><td>40</td><td>40</td><td>38</td><td>95%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>CP-SAT</td><td>40</td><td>40</td><td>39</td><td>98%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>OptalCP</td><td>40</td><td>40</td><td>40</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td rowspan="3">orb</td><td>CPO</td><td>10</td><td>10</td><td>10</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>CP-SAT</td><td>10</td><td>10</td><td>10</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>OptalCP</td><td>10</td><td>10</td><td>10</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td rowspan="3">abz</td><td>CPO</td><td>5</td><td>5</td><td>2</td><td>40%</td><td>3%</td><td>1%</td><td>4%</td></tr>
<tr><td>CP-SAT</td><td>5</td><td>5</td><td>2</td><td>40%</td><td>2%</td><td>1%</td><td>3%</td></tr>
<tr><td>OptalCP</td><td>5</td><td>5</td><td>3</td><td>60%</td><td>1%</td><td>0%</td><td>1%</td></tr>
<tr><td rowspan="3">swv</td><td>CPO</td><td>20</td><td>20</td><td>7</td><td>35%</td><td>2%</td><td>2%</td><td>4%</td></tr>
<tr><td>CP-SAT</td><td>20</td><td>20</td><td>6</td><td>30%</td><td>1%</td><td>2%</td><td>4%</td></tr>
<tr><td>OptalCP</td><td>20</td><td>20</td><td>10</td><td>50%</td><td>1%</td><td>1%</td><td>2%</td></tr>
<tr><td rowspan="3">yn</td><td>CPO</td><td>4</td><td>4</td><td>0</td><td>0%</td><td>10%</td><td>2%</td><td>11%</td></tr>
<tr><td>CP-SAT</td><td>4</td><td>4</td><td>0</td><td>0%</td><td>6%</td><td>3%</td><td>8%</td></tr>
<tr><td>OptalCP</td><td>4</td><td>4</td><td>0</td><td>0%</td><td>5%</td><td>1%</td><td>6%</td></tr>
<tr><td rowspan="3">dmu</td><td>CPO</td><td>80</td><td>80</td><td>16</td><td>20%</td><td>2%</td><td>4%</td><td>7%</td></tr>
<tr><td>CP-SAT</td><td>80</td><td>80</td><td>10</td><td>13%</td><td>1%</td><td>5%</td><td>7%</td></tr>
<tr><td>OptalCP</td><td>80</td><td>80</td><td>23</td><td>29%</td><td>1%</td><td>2%</td><td>4%</td></tr>
<tr><td rowspan="3">ta</td><td>CPO</td><td>80</td><td>80</td><td>40</td><td>50%</td><td>2%</td><td>1%</td><td>3%</td></tr>
<tr><td>CP-SAT</td><td>80</td><td>80</td><td>23</td><td>29%</td><td>1%</td><td>2%</td><td>3%</td></tr>
<tr><td>OptalCP</td><td>80</td><td>80</td><td>46</td><td>58%</td><td>1%</td><td>0%</td><td>1%</td></tr>
<tr><td rowspan="3">tai</td><td>CPO</td><td>90</td><td>90</td><td>27</td><td>30%</td><td>10%</td><td>4%</td><td>19%</td></tr>
<tr><td>CP-SAT</td><td>90</td><td style="color:red">70</td><td>46</td><td>51%</td><td>25%</td><td>3%</td><td>10%</td></tr>
<tr><td>OptalCP</td><td>90</td><td>90</td><td>50</td><td>56%</td><td>0%</td><td>1%</td><td>7%</td></tr>
<tr><td rowspan="3">dct</td><td>CPO</td><td>24</td><td>24</td><td>1</td><td>4%</td><td>22%</td><td>21%</td><td>35%</td></tr>
<tr><td>CP-SAT</td><td>24</td><td style="color:red">18</td><td>6</td><td>25%</td><td>5%</td><td>18%</td><td>12%</td></tr>
<tr><td>OptalCP</td><td>24</td><td>24</td><td>18</td><td>75%</td><td>0%</td><td>9%</td><td>5%</td></tr>
<tr><td rowspan="3">bel</td><td>CPO</td><td>20</td><td>20</td><td>0</td><td>0%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>CP-SAT</td><td>20</td><td>20</td><td>20</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
<tr><td>OptalCP</td><td>20</td><td>20</td><td>20</td><td>100%</td><td>0%</td><td>0%</td><td>0%</td></tr>
</table>


<br/>

## Best known solutions

In this section are collected the best known solutions (upper and lower bounds) for each problem in the benchmark. 

The solutions may come from 
- Published papers (eg. NS2002), the section [publications](#publications-best-known-solutions) provides references
- An engine run by someone else (eg. CPO2015) which results have been published
- An engine run by us (CPO, OptalCP, CP-SAT) with approximate resolution time

The type of hardware and time required to find the best known solution are difficult to track and compare, in particular for bounds coming from published papers. Which is why
- Every time an engine equals a published result the engine appears in the table instead
- An approximative timing for reference engines is provided, in particular when the time to find the solution is unusually long

<br/>

> We ***do not*** systematically run the instances for very long times on large machines. Most of the instances that appear as having been solved after a large computation time (eg. 40h) had peculiarities (e.g. `best lb + 1 == best ub`) that justified exploring how long it would take to solve them to optimality. We also devote more effort to solve instances which best known solutions are given by papers that are old, difficult to find and difficult to reproduce. This allows verifying the paper claims and having a more accessible way of generating the result.

<br/>

### Best known solutions json format

The best known solutions are now collected in a [json](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions/bks.json) file with the following syntax

```json
    {
        "instance" : "dmu80",
        "size" : "50 x 20",
        "type" : "jobshop",
        "family" : "dmu",
        "family_long" : "Demikol, Mehta and Uzsoy 1998",
        "status" : "open",
        "lower_bound" : 6460,
        "upper_bound" : 6634,
        "lb_data" : [{ 
            "value" : 6460, 
            "date" : "2026-06-01", 
            "solver" : "OptalCP", 
            "hardware" : "Intel 11th Gen Core i7-1185G7", 
            "time" : 10, 
            "certificate" : "no" 
            }],
        "ub_data" : [{ 
            "value" : 6634, 
            "date" : "2022-01-01", 
            "solver" : "CS2022", 
            "hardware" : null, 
            "time" : null, 
            "certificate" : null 
        }]
    }
```

For most of the best known solutions, the date, hardware, running time and certificate (valid primal or valid dual solution) are not known. The data will be progressively updated to the best of our knowledge.

<br/>

#### Fisher and Thompson 1963

*FT instances are also known as MT because the 1963 paper of Fisher and Thompson was published in the book "Industrial scheduling" by Muth and Thompson.*

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>ft06</td><td>6 x 6</td><td>jobshop</td><td>55</td><td>55</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ft10</td><td>10 x 10</td><td>jobshop</td><td>930</td><td>930</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ft20</td><td>20 x 5</td><td>jobshop</td><td>1165</td><td>1165</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

#### Lawrence 1984

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>la01</td><td>10 x 5</td><td>jobshop</td><td>666</td><td>666</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la02</td><td>10 x 5</td><td>jobshop</td><td>655</td><td>655</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la03</td><td>10 x 5</td><td>jobshop</td><td>597</td><td>597</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la04</td><td>10 x 5</td><td>jobshop</td><td>590</td><td>590</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la05</td><td>10 x 5</td><td>jobshop</td><td>593</td><td>593</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la06</td><td>15 x 5</td><td>jobshop</td><td>926</td><td>926</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la07</td><td>15 x 5</td><td>jobshop</td><td>890</td><td>890</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la08</td><td>15 x 5</td><td>jobshop</td><td>863</td><td>863</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la09</td><td>15 x 5</td><td>jobshop</td><td>951</td><td>951</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la10</td><td>15 x 5</td><td>jobshop</td><td>958</td><td>958</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la11</td><td>20 x 5</td><td>jobshop</td><td>1222</td><td>1222</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la12</td><td>20 x 5</td><td>jobshop</td><td>1039</td><td>1039</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la13</td><td>20 x 5</td><td>jobshop</td><td>1150</td><td>1150</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la14</td><td>20 x 5</td><td>jobshop</td><td>1292</td><td>1292</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la15</td><td>20 x 5</td><td>jobshop</td><td>1207</td><td>1207</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la16</td><td>10 x 10</td><td>jobshop</td><td>945</td><td>945</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la17</td><td>10 x 10</td><td>jobshop</td><td>784</td><td>784</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la18</td><td>10 x 10</td><td>jobshop</td><td>848</td><td>848</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la19</td><td>10 x 10</td><td>jobshop</td><td>842</td><td>842</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la20</td><td>10 x 10</td><td>jobshop</td><td>902</td><td>902</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la21</td><td>15 x 10</td><td>jobshop</td><td>1046</td><td>1046</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la22</td><td>15 x 10</td><td>jobshop</td><td>927</td><td>927</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la23</td><td>15 x 10</td><td>jobshop</td><td>1032</td><td>1032</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la24</td><td>15 x 10</td><td>jobshop</td><td>935</td><td>935</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la25</td><td>15 x 10</td><td>jobshop</td><td>977</td><td>977</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la26</td><td>20 x 10</td><td>jobshop</td><td>1218</td><td>1218</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la27</td><td>20 x 10</td><td>jobshop</td><td>1235</td><td>1235</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la28</td><td>20 x 10</td><td>jobshop</td><td>1216</td><td>1216</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la29</td><td>20 x 10</td><td>jobshop</td><td>1152</td><td>1152</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 5m</td></tr>
<tr><td>la30</td><td>20 x 10</td><td>jobshop</td><td>1355</td><td>1355</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la31</td><td>30 x 10</td><td>jobshop</td><td>1784</td><td>1784</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la32</td><td>30 x 10</td><td>jobshop</td><td>1850</td><td>1850</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la33</td><td>30 x 10</td><td>jobshop</td><td>1719</td><td>1719</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la34</td><td>30 x 10</td><td>jobshop</td><td>1721</td><td>1721</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la35</td><td>30 x 10</td><td>jobshop</td><td>1888</td><td>1888</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la36</td><td>15 x 15</td><td>jobshop</td><td>1268</td><td>1268</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la37</td><td>15 x 15</td><td>jobshop</td><td>1397</td><td>1397</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la38</td><td>15 x 15</td><td>jobshop</td><td>1196</td><td>1196</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la39</td><td>15 x 15</td><td>jobshop</td><td>1233</td><td>1233</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>la40</td><td>15 x 15</td><td>jobshop</td><td>1222</td><td>1222</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

#### Adams, Balas and Zawack 1988

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>abz5</td><td>10 x 10</td><td>jobshop</td><td>1234</td><td>1234</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>abz6</td><td>10 x 10</td><td>jobshop</td><td>943</td><td>943</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>abz7</td><td>20 x 15</td><td>jobshop</td><td>656</td><td>656</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>abz8</td><td>20 x 15</td><td>jobshop</td><td>667</td><td>667</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 10h</td></tr>
<tr><td>abz9</td><td>20 x 15</td><td>jobshop</td><td>678</td><td>678</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
</table>

*Various places report that "Henning A (2002). Praktische Job-Shop Scheduling-Probleme. Ph.D. thesis, Friedrich-Schiller-Universität Jena, Jena, Germany" as having found a solution of 665 for abz8, but the original document says their solution is 667 and 665 is a "solution from the literature". Jelke J. van Hoorn attributes the 665 bond to "Paul Douglas Martin. A time-oriented approach to computing optimal schedules for the job-shop scheduling problem. PhD thesis. 1996".
However OptalCP proves a lower bound of 667 and Optimizizer only provides a verified solution for 667. We advise caution until this result is confirmed by independent means.*

#### Applegate and Cook 1991

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>orb01</td><td>10 x 10</td><td>jobshop</td><td>1059</td><td>1059</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb02</td><td>10 x 10</td><td>jobshop</td><td>888</td><td>888</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb03</td><td>10 x 10</td><td>jobshop</td><td>1005</td><td>1005</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb04</td><td>10 x 10</td><td>jobshop</td><td>1005</td><td>1005</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb05</td><td>10 x 10</td><td>jobshop</td><td>887</td><td>887</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb06</td><td>10 x 10</td><td>jobshop</td><td>1010</td><td>1010</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb07</td><td>10 x 10</td><td>jobshop</td><td>397</td><td>397</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb08</td><td>10 x 10</td><td>jobshop</td><td>899</td><td>899</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb09</td><td>10 x 10</td><td>jobshop</td><td>934</td><td>934</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>orb10</td><td>10 x 10</td><td>jobshop</td><td>944</td><td>944</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

#### Storer, Wu and Vaccari 1992
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>swv01</td><td>20 x 10</td><td>jobshop</td><td>1407</td><td>1407</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv02</td><td>20 x 10</td><td>jobshop</td><td>1475</td><td>1475</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv03</td><td>20 x 10</td><td>jobshop</td><td>1398</td><td>1398</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>swv04</td><td>20 x 10</td><td>jobshop</td><td>1464</td><td>1464</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv05</td><td>20 x 10</td><td>jobshop</td><td>1424</td><td>1424</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>swv06</td><td>20 x 15</td><td>jobshop</td><td>1667</td><td>1667</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 40h</td></tr>
<tr><td>swv07</td><td>20 x 15</td><td>jobshop</td><td>1541</td><td>1594</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>swv08</td><td>20 x 15</td><td>jobshop</td><td>1694</td><td>1751</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Mu2015</td></tr>
<tr><td>swv09</td><td>20 x 15</td><td>jobshop</td><td>1655</td><td>1655</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 15h</td></tr>
<tr><td>swv10</td><td>20 x 15</td><td>jobshop</td><td>1692</td><td>1743</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>swv11</td><td>50 x 10</td><td>jobshop</td><td>2983</td><td>2983</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv12</td><td>50 x 10</td><td>jobshop</td><td>2972</td><td>2972</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv13</td><td>50 x 10</td><td>jobshop</td><td>3104</td><td>3104</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv14</td><td>50 x 10</td><td>jobshop</td><td>2968</td><td>2968</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv15</td><td>50 x 10</td><td>jobshop</td><td>2885</td><td>2885</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 9h</td></tr>
<tr><td>swv16</td><td>50 x 10</td><td>jobshop</td><td>2924</td><td>2924</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv17</td><td>50 x 10</td><td>jobshop</td><td>2794</td><td>2794</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv18</td><td>50 x 10</td><td>jobshop</td><td>2852</td><td>2852</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv19</td><td>50 x 10</td><td>jobshop</td><td>2843</td><td>2843</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv20</td><td>50 x 10</td><td>jobshop</td><td>2823</td><td>2823</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

#### Yamada Nakano 1992
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>yn1</td><td>20 x 20</td><td>jobshop</td><td>884</td><td>884</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 6h</td></tr>
<tr><td>yn2</td><td>20 x 20</td><td>jobshop</td><td>904</td><td>904</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 40h</td></tr>
<tr><td>yn3</td><td>20 x 20</td><td>jobshop</td><td>892</td><td>892</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 40h</td></tr>
<tr><td>yn4</td><td>20 x 20</td><td>jobshop</td><td>967</td><td>967</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 16h</td></tr>
</table>

#### Taillard 1993
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>ta01js</td><td>15 x 15</td><td>jobshop</td><td>1231</td><td>1231</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta02js</td><td>15 x 15</td><td>jobshop</td><td>1244</td><td>1244</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta03js</td><td>15 x 15</td><td>jobshop</td><td>1218</td><td>1218</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta04js</td><td>15 x 15</td><td>jobshop</td><td>1175</td><td>1175</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta05js</td><td>15 x 15</td><td>jobshop</td><td>1224</td><td>1224</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta06js</td><td>15 x 15</td><td>jobshop</td><td>1238</td><td>1238</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta07js</td><td>15 x 15</td><td>jobshop</td><td>1227</td><td>1227</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta08js</td><td>15 x 15</td><td>jobshop</td><td>1217</td><td>1217</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta09js</td><td>15 x 15</td><td>jobshop</td><td>1274</td><td>1274</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta10js</td><td>15 x 15</td><td>jobshop</td><td>1241</td><td>1241</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta11js</td><td>20 x 15</td><td>jobshop</td><td>1357</td><td>1357</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta12js</td><td>20 x 15</td><td>jobshop</td><td>1367</td><td>1367</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta13js</td><td>20 x 15</td><td>jobshop</td><td>1342</td><td>1342</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta14js</td><td>20 x 15</td><td>jobshop</td><td>1345</td><td>1345</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta15js</td><td>20 x 15</td><td>jobshop</td><td>1339</td><td>1339</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta16js</td><td>20 x 15</td><td>jobshop</td><td>1360</td><td>1360</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta17js</td><td>20 x 15</td><td>jobshop</td><td>1462</td><td>1462</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta18js</td><td>20 x 15</td><td>jobshop</td><td>1396</td><td>1396</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta19js</td><td>20 x 15</td><td>jobshop</td><td>1332</td><td>1332</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta20js</td><td>20 x 15</td><td>jobshop</td><td>1348</td><td>1348</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta21js</td><td>20 x 20</td><td>jobshop</td><td>1642</td><td>1642</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta22js</td><td>20 x 20</td><td>jobshop</td><td>1600</td><td>1600</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta23js</td><td>20 x 20</td><td>jobshop</td><td>1557</td><td>1557</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta24js</td><td>20 x 20</td><td>jobshop</td><td>1644</td><td>1644</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta25js</td><td>20 x 20</td><td>jobshop</td><td>1595</td><td>1595</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta26js</td><td>20 x 20</td><td>jobshop</td><td>1643</td><td>1643</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 7h</td></tr>
<tr><td>ta27js</td><td>20 x 20</td><td>jobshop</td><td>1680</td><td>1680</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta28js</td><td>20 x 20</td><td>jobshop</td><td>1603</td><td>1603</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta29js</td><td>20 x 20</td><td>jobshop</td><td>1625</td><td>1625</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta30js</td><td>20 x 20</td><td>jobshop</td><td>1562</td><td>1584</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub NS2002</td></tr>
<tr><td>ta31js</td><td>30 x 15</td><td>jobshop</td><td>1764</td><td>1764</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta32js</td><td>30 x 15</td><td>jobshop</td><td>1774</td><td>1783</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 | ub HUSTLLG2026</td></tr>
<tr><td>ta33js</td><td>30 x 15</td><td>jobshop</td><td>1791</td><td>1791</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 10h</td></tr>
<tr><td>ta34js</td><td>30 x 15</td><td>jobshop</td><td>1828</td><td>1828</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta35js</td><td>30 x 15</td><td>jobshop</td><td>2007</td><td>2007</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta36js</td><td>30 x 15</td><td>jobshop</td><td>1819</td><td>1819</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta37js</td><td>30 x 15</td><td>jobshop</td><td>1771</td><td>1771</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta38js</td><td>30 x 15</td><td>jobshop</td><td>1673</td><td>1673</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 7h</td></tr>
<tr><td>ta39js</td><td>30 x 15</td><td>jobshop</td><td>1795</td><td>1795</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta40js</td><td>30 x 15</td><td>jobshop</td><td>1658</td><td>1669</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>ta41js</td><td>30 x 20</td><td>jobshop</td><td>1926</td><td>2005</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CPO2015</td></tr>
<tr><td>ta42js</td><td>30 x 20</td><td>jobshop</td><td>1900</td><td>1937</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>ta43js</td><td>30 x 20</td><td>jobshop</td><td>1809</td><td>1846</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 | ub PLC2015</td></tr>
<tr><td>ta44js</td><td>30 x 20</td><td>jobshop</td><td>1961</td><td>1978</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>ta45js</td><td>30 x 20</td><td>jobshop</td><td>1997</td><td>1997</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CP-SAT in < 10m</td></tr>
<tr><td>ta46js</td><td>30 x 20</td><td>jobshop</td><td>1976</td><td>2002</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>ta47js</td><td>30 x 20</td><td>jobshop</td><td>1827</td><td>1889</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>ta48js</td><td>30 x 20</td><td>jobshop</td><td>1921</td><td>1937</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>ta49js</td><td>30 x 20</td><td>jobshop</td><td>1938</td><td>1960</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>ta50js</td><td>30 x 20</td><td>jobshop</td><td>1848</td><td>1923</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>ta51js</td><td>50 x 15</td><td>jobshop</td><td>2760</td><td>2760</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta52js</td><td>50 x 15</td><td>jobshop</td><td>2756</td><td>2756</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta53js</td><td>50 x 15</td><td>jobshop</td><td>2717</td><td>2717</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta54js</td><td>50 x 15</td><td>jobshop</td><td>2839</td><td>2839</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta55js</td><td>50 x 15</td><td>jobshop</td><td>2679</td><td>2679</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta56js</td><td>50 x 15</td><td>jobshop</td><td>2781</td><td>2781</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta57js</td><td>50 x 15</td><td>jobshop</td><td>2943</td><td>2943</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta58js</td><td>50 x 15</td><td>jobshop</td><td>2885</td><td>2885</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta59js</td><td>50 x 15</td><td>jobshop</td><td>2655</td><td>2655</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta60js</td><td>50 x 15</td><td>jobshop</td><td>2723</td><td>2723</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta61js</td><td>50 x 20</td><td>jobshop</td><td>2868</td><td>2868</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta62js</td><td>50 x 20</td><td>jobshop</td><td>2869</td><td>2869</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta63js</td><td>50 x 20</td><td>jobshop</td><td>2755</td><td>2755</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta64js</td><td>50 x 20</td><td>jobshop</td><td>2702</td><td>2702</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta65js</td><td>50 x 20</td><td>jobshop</td><td>2725</td><td>2725</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta66js</td><td>50 x 20</td><td>jobshop</td><td>2845</td><td>2845</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta67js</td><td>50 x 20</td><td>jobshop</td><td>2825</td><td>2825</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 4h</td></tr>
<tr><td>ta68js</td><td>50 x 20</td><td>jobshop</td><td>2784</td><td>2784</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta69js</td><td>50 x 20</td><td>jobshop</td><td>3071</td><td>3071</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta70js</td><td>50 x 20</td><td>jobshop</td><td>2995</td><td>2995</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta71js</td><td>100 x 20</td><td>jobshop</td><td>5464</td><td>5464</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta72js</td><td>100 x 20</td><td>jobshop</td><td>5181</td><td>5181</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta73js</td><td>100 x 20</td><td>jobshop</td><td>5568</td><td>5568</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta74js</td><td>100 x 20</td><td>jobshop</td><td>5339</td><td>5339</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta75js</td><td>100 x 20</td><td>jobshop</td><td>5392</td><td>5392</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta76js</td><td>100 x 20</td><td>jobshop</td><td>5342</td><td>5342</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta77js</td><td>100 x 20</td><td>jobshop</td><td>5436</td><td>5436</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta78js</td><td>100 x 20</td><td>jobshop</td><td>5394</td><td>5394</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta79js</td><td>100 x 20</td><td>jobshop</td><td>5358</td><td>5358</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta80js</td><td>100 x 20</td><td>jobshop</td><td>5183</td><td>5183</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

#### Demikol, Mehta and Uzsoy 1998
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>dmu01</td><td>20 x 15</td><td>jobshop</td><td>2563</td><td>2563</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu02</td><td>20 x 15</td><td>jobshop</td><td>2706</td><td>2706</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu03</td><td>20 x 15</td><td>jobshop</td><td>2731</td><td>2731</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu04</td><td>20 x 15</td><td>jobshop</td><td>2669</td><td>2669</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu05</td><td>20 x 15</td><td>jobshop</td><td>2749</td><td>2749</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu06</td><td>20 x 20</td><td>jobshop</td><td>3244</td><td>3244</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>dmu07</td><td>20 x 20</td><td>jobshop</td><td>3046</td><td>3046</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>dmu08</td><td>20 x 20</td><td>jobshop</td><td>3188</td><td>3188</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu09</td><td>20 x 20</td><td>jobshop</td><td>3092</td><td>3092</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu10</td><td>20 x 20</td><td>jobshop</td><td>2984</td><td>2984</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu11</td><td>30 x 15</td><td>jobshop</td><td>3402</td><td>3430</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>dmu12</td><td>30 x 15</td><td>jobshop</td><td>3481</td><td>3492</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu13</td><td>30 x 15</td><td>jobshop</td><td>3681</td><td>3681</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>dmu14</td><td>30 x 15</td><td>jobshop</td><td>3394</td><td>3394</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>CP-SAT in < 1m</td></tr>
<tr><td>dmu15</td><td>30 x 15</td><td>jobshop</td><td>3343</td><td>3343</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu16</td><td>30 x 20</td><td>jobshop</td><td>3734</td><td>3750</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 | ub LHW2024</td></tr>
<tr><td>dmu17</td><td>30 x 20</td><td>jobshop</td><td>3733</td><td>3812</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu18</td><td>30 x 20</td><td>jobshop</td><td>3844</td><td>3844</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 10h</td></tr>
<tr><td>dmu19</td><td>30 x 20</td><td>jobshop</td><td>3707</td><td>3764</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu20</td><td>30 x 20</td><td>jobshop</td><td>3632</td><td>3699</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu21</td><td>40 x 15</td><td>jobshop</td><td>4380</td><td>4380</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu22</td><td>40 x 15</td><td>jobshop</td><td>4725</td><td>4725</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu23</td><td>40 x 15</td><td>jobshop</td><td>4668</td><td>4668</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu24</td><td>40 x 15</td><td>jobshop</td><td>4648</td><td>4648</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu25</td><td>40 x 15</td><td>jobshop</td><td>4164</td><td>4164</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu26</td><td>40 x 20</td><td>jobshop</td><td>4647</td><td>4647</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu27</td><td>40 x 20</td><td>jobshop</td><td>4848</td><td>4848</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu28</td><td>40 x 20</td><td>jobshop</td><td>4692</td><td>4692</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu29</td><td>40 x 20</td><td>jobshop</td><td>4691</td><td>4691</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu30</td><td>40 x 20</td><td>jobshop</td><td>4732</td><td>4732</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu31</td><td>50 x 15</td><td>jobshop</td><td>5640</td><td>5640</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu32</td><td>50 x 15</td><td>jobshop</td><td>5927</td><td>5927</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu33</td><td>50 x 15</td><td>jobshop</td><td>5728</td><td>5728</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu34</td><td>50 x 15</td><td>jobshop</td><td>5385</td><td>5385</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu35</td><td>50 x 15</td><td>jobshop</td><td>5635</td><td>5635</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu36</td><td>50 x 20</td><td>jobshop</td><td>5621</td><td>5621</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu37</td><td>50 x 20</td><td>jobshop</td><td>5851</td><td>5851</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu38</td><td>50 x 20</td><td>jobshop</td><td>5713</td><td>5713</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu39</td><td>50 x 20</td><td>jobshop</td><td>5747</td><td>5747</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu40</td><td>50 x 20</td><td>jobshop</td><td>5577</td><td>5577</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu41</td><td>20 x 15</td><td>jobshop</td><td>3176</td><td>3248</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>dmu42</td><td>20 x 15</td><td>jobshop</td><td>3339</td><td>3390</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu43</td><td>20 x 15</td><td>jobshop</td><td>3441</td><td>3441</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 7h</td></tr>
<tr><td>dmu44</td><td>20 x 15</td><td>jobshop</td><td>3414</td><td>3475</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu45</td><td>20 x 15</td><td>jobshop</td><td>3217</td><td>3266</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu46</td><td>20 x 20</td><td>jobshop</td><td>3780</td><td>4035</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>dmu47</td><td>20 x 20</td><td>jobshop</td><td>3714</td><td>3939</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>dmu48</td><td>20 x 20</td><td>jobshop</td><td>3628</td><td>3763</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu49</td><td>20 x 20</td><td>jobshop</td><td>3543</td><td>3706</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu50</td><td>20 x 20</td><td>jobshop</td><td>3618</td><td>3729</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>dmu51</td><td>30 x 15</td><td>jobshop</td><td>4070</td><td>4151</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu52</td><td>30 x 15</td><td>jobshop</td><td>4203</td><td>4297</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu53</td><td>30 x 15</td><td>jobshop</td><td>4248</td><td>4378</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu54</td><td>30 x 15</td><td>jobshop</td><td>4277</td><td>4360</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu55</td><td>30 x 15</td><td>jobshop</td><td>4191</td><td>4258</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu56</td><td>30 x 20</td><td>jobshop</td><td>4755</td><td>4934</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu57</td><td>30 x 20</td><td>jobshop</td><td>4462</td><td>4643</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu58</td><td>30 x 20</td><td>jobshop</td><td>4484</td><td>4701</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu59</td><td>30 x 20</td><td>jobshop</td><td>4366</td><td>4607</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu60</td><td>30 x 20</td><td>jobshop</td><td>4468</td><td>4721</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu61</td><td>40 x 15</td><td>jobshop</td><td>5038</td><td>5167</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu62</td><td>40 x 15</td><td>jobshop</td><td>5176</td><td>5244</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu63</td><td>40 x 15</td><td>jobshop</td><td>5245</td><td>5296</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu64</td><td>40 x 15</td><td>jobshop</td><td>5155</td><td>5225</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu65</td><td>40 x 15</td><td>jobshop</td><td>5122</td><td>5168</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu66</td><td>40 x 20</td><td>jobshop</td><td>5526</td><td>5700</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu67</td><td>40 x 20</td><td>jobshop</td><td>5661</td><td>5774</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu68</td><td>40 x 20</td><td>jobshop</td><td>5513</td><td>5758</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu69</td><td>40 x 20</td><td>jobshop</td><td>5511</td><td>5687</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu70</td><td>40 x 20</td><td>jobshop</td><td>5633</td><td>5868</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu71</td><td>50 x 15</td><td>jobshop</td><td>6129</td><td>6206</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu72</td><td>50 x 15</td><td>jobshop</td><td>6434</td><td>6448</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CdGKGC2025 | ub HUSTLLG2026</td></tr>
<tr><td>dmu73</td><td>50 x 15</td><td>jobshop</td><td>6107</td><td>6132</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu74</td><td>50 x 15</td><td>jobshop</td><td>6168</td><td>6196</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GTA2017</td></tr>
<tr><td>dmu75</td><td>50 x 15</td><td>jobshop</td><td>6123</td><td>6187</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu76</td><td>50 x 20</td><td>jobshop</td><td>6479</td><td>6718</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PMAEDC2019</td></tr>
<tr><td>dmu77</td><td>50 x 20</td><td>jobshop</td><td>6520</td><td>6739</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu78</td><td>50 x 20</td><td>jobshop</td><td>6643</td><td>6744</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu79</td><td>50 x 20</td><td>jobshop</td><td>6720</td><td>6899</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
<tr><td>dmu80</td><td>50 x 20</td><td>jobshop</td><td>6460</td><td>6633</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub HUSTLLG2026</td></tr>
</table>

#### Da Col and Teppan 2022
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>tai_10_10_1</td><td>10 x 10</td><td>jobshop</td><td>8219</td><td>8219</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_2</td><td>10 x 10</td><td>jobshop</td><td>7416</td><td>7416</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_3</td><td>10 x 10</td><td>jobshop</td><td>8094</td><td>8094</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_4</td><td>10 x 10</td><td>jobshop</td><td>8657</td><td>8657</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_5</td><td>10 x 10</td><td>jobshop</td><td>7936</td><td>7936</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_6</td><td>10 x 10</td><td>jobshop</td><td>8509</td><td>8509</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_7</td><td>10 x 10</td><td>jobshop</td><td>8299</td><td>8299</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_8</td><td>10 x 10</td><td>jobshop</td><td>7788</td><td>7788</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_9</td><td>10 x 10</td><td>jobshop</td><td>8300</td><td>8300</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_10_10</td><td>10 x 10</td><td>jobshop</td><td>8481</td><td>8481</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_1</td><td>10 x 100</td><td>jobshop</td><td>56609</td><td>56609</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_2</td><td>10 x 100</td><td>jobshop</td><td>52330</td><td>52330</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_3</td><td>10 x 100</td><td>jobshop</td><td>56412</td><td>56412</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_4</td><td>10 x 100</td><td>jobshop</td><td>54889</td><td>54889</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_5</td><td>10 x 100</td><td>jobshop</td><td>54603</td><td>54603</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_6</td><td>10 x 100</td><td>jobshop</td><td>53723</td><td>53723</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_7</td><td>10 x 100</td><td>jobshop</td><td>55456</td><td>55456</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_8</td><td>10 x 100</td><td>jobshop</td><td>56466</td><td>56466</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_9</td><td>10 x 100</td><td>jobshop</td><td>55096</td><td>55096</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_100_10</td><td>10 x 100</td><td>jobshop</td><td>56661</td><td>56661</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_1</td><td>10 x 1000</td><td>jobshop</td><td>515370</td><td>515370</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_2</td><td>10 x 1000</td><td>jobshop</td><td>513525</td><td>513525</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_3</td><td>10 x 1000</td><td>jobshop</td><td>508161</td><td>508161</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_4</td><td>10 x 1000</td><td>jobshop</td><td>513814</td><td>513814</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_5</td><td>10 x 1000</td><td>jobshop</td><td>517020</td><td>517020</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_6</td><td>10 x 1000</td><td>jobshop</td><td>517777</td><td>517777</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_7</td><td>10 x 1000</td><td>jobshop</td><td>514921</td><td>514921</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_8</td><td>10 x 1000</td><td>jobshop</td><td>522277</td><td>522277</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_9</td><td>10 x 1000</td><td>jobshop</td><td>511213</td><td>511213</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_10_1000_10</td><td>10 x 1000</td><td>jobshop</td><td>509855</td><td>509855</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_1</td><td>100 x 10</td><td>jobshop</td><td>54951</td><td>54951</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_2</td><td>100 x 10</td><td>jobshop</td><td>57160</td><td>57160</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_3</td><td>100 x 10</td><td>jobshop</td><td>54166</td><td>54166</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_4</td><td>100 x 10</td><td>jobshop</td><td>54371</td><td>54371</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_5</td><td>100 x 10</td><td>jobshop</td><td>56142</td><td>56142</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_6</td><td>100 x 10</td><td>jobshop</td><td>52447</td><td>52447</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_7</td><td>100 x 10</td><td>jobshop</td><td>54051</td><td>54051</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_8</td><td>100 x 10</td><td>jobshop</td><td>55624</td><td>55624</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_9</td><td>100 x 10</td><td>jobshop</td><td>54210</td><td>54210</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_10_10</td><td>100 x 10</td><td>jobshop</td><td>55464</td><td>55464</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_100_100_1</td><td>100 x 100</td><td>jobshop</td><td>62843</td><td>76926</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_2</td><td>100 x 100</td><td>jobshop</td><td>62814</td><td>77322</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_3</td><td>100 x 100</td><td>jobshop</td><td>61533</td><td>76910</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_4</td><td>100 x 100</td><td>jobshop</td><td>64742</td><td>78604</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_5</td><td>100 x 100</td><td>jobshop</td><td>61766</td><td>78023</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_6</td><td>100 x 100</td><td>jobshop</td><td>61360</td><td>77895</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_7</td><td>100 x 100</td><td>jobshop</td><td>64040</td><td>77670</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_8</td><td>100 x 100</td><td>jobshop</td><td>63224</td><td>78031</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_9</td><td>100 x 100</td><td>jobshop</td><td>62631</td><td>79419</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_10</td><td>100 x 100</td><td>jobshop</td><td>64866</td><td>77837</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_1</td><td>100 x 1000</td><td>jobshop</td><td>522298</td><td>533080</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_2</td><td>100 x 1000</td><td>jobshop</td><td>530375</td><td>538067</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_3</td><td>100 x 1000</td><td>jobshop</td><td>530560</td><td>538757</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_4</td><td>100 x 1000</td><td>jobshop</td><td>527101</td><td>534746</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_5</td><td>100 x 1000</td><td>jobshop</td><td>517728</td><td>529580</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_6</td><td>100 x 1000</td><td>jobshop</td><td>522907</td><td>534969</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_7</td><td>100 x 1000</td><td>jobshop</td><td>522537</td><td>534974</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_8</td><td>100 x 1000</td><td>jobshop</td><td>526428</td><td>535757</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_9</td><td>100 x 1000</td><td>jobshop</td><td>528097</td><td>536993</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_10</td><td>100 x 1000</td><td>jobshop</td><td>521766</td><td>529918</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_1000_10_1</td><td>1000 x 10</td><td>jobshop</td><td>515334</td><td>515334</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_2</td><td>1000 x 10</td><td>jobshop</td><td>509226</td><td>509226</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_3</td><td>1000 x 10</td><td>jobshop</td><td>517493</td><td>517493</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_4</td><td>1000 x 10</td><td>jobshop</td><td>519369</td><td>519369</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_5</td><td>1000 x 10</td><td>jobshop</td><td>513881</td><td>513881</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_6</td><td>1000 x 10</td><td>jobshop</td><td>511932</td><td>511932</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_7</td><td>1000 x 10</td><td>jobshop</td><td>523900</td><td>523900</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_8</td><td>1000 x 10</td><td>jobshop</td><td>513101</td><td>513101</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_9</td><td>1000 x 10</td><td>jobshop</td><td>508701</td><td>508701</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_10_10</td><td>1000 x 10</td><td>jobshop</td><td>521360</td><td>521360</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>tai_1000_100_1</td><td>1000 x 100</td><td>jobshop</td><td>525343</td><td>525343</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tai_1000_100_2</td><td>1000 x 100</td><td>jobshop</td><td>528088</td><td>528088</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_3</td><td>1000 x 100</td><td>jobshop</td><td>522793</td><td>522793</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_4</td><td>1000 x 100</td><td>jobshop</td><td>524271</td><td>524271</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_5</td><td>1000 x 100</td><td>jobshop</td><td>531216</td><td>531216</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tai_1000_100_6</td><td>1000 x 100</td><td>jobshop</td><td>518763</td><td>518763</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_100_7</td><td>1000 x 100</td><td>jobshop</td><td>527093</td><td>527093</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_8</td><td>1000 x 100</td><td>jobshop</td><td>519524</td><td>519524</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_100_9</td><td>1000 x 100</td><td>jobshop</td><td>520889</td><td>520889</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_100_10</td><td>1000 x 100</td><td>jobshop</td><td>529112</td><td>529112</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_1000_1</td><td>1000 x 1000</td><td>jobshop</td><td>549392</td><td>877052</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly</td></tr>
<tr><td>tai_1000_1000_2</td><td>1000 x 1000</td><td>jobshop</td><td>549043</td><td>877115</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_3</td><td>1000 x 1000</td><td>jobshop</td><td>552580</td><td>878296</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly</td></tr>
<tr><td>tai_1000_1000_4</td><td>1000 x 1000</td><td>jobshop</td><td>547670</td><td>876363</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_5</td><td>1000 x 1000</td><td>jobshop</td><td>545193</td><td>877562</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_6</td><td>1000 x 1000</td><td>jobshop</td><td>547286</td><td>876067</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_7</td><td>1000 x 1000</td><td>jobshop</td><td>545877</td><td>875891</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_8</td><td>1000 x 1000</td><td>jobshop</td><td>549220</td><td>876456</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_9</td><td>1000 x 1000</td><td>jobshop</td><td>543559</td><td>875914</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_10</td><td>1000 x 1000</td><td>jobshop</td><td>549075</td><td>874820</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb Hexaly | ub Hexaly2024</td></tr>
</table>

*We consider the tai 1000 x 1000 instances a curiosity, a benchmark to test the internals of the engines (memory allocation, complexity of internal algorithms and data structures, etc.) We don't believe these instances represent any reasonable industrial problem, less because of their size, and more because they are random, unstructured, square and non-reentrant : your manufacturing plant produces exactly 1000 different products, each one needs 1000 operations on exactly one of the 1000 machines in the plant, and for each product the operations must be done in a completely different order !*

#### Da Col and Teppan (2022) - reentrant jobshop
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>dct-long-100-10000-1</td><td>103 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-10000-2</td><td>103 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-10000-3</td><td>103 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-100000-1</td><td>109 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-100000-2</td><td>114 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-100000-3</td><td>109 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-10000-1</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-10000-2</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-10000-3</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-100000-1</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-100000-2</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-100000-3</td><td>1003 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-10000-1</td><td>2162 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-10000-2</td><td>2192 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-10000-3</td><td>2169 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-100000-1</td><td>20685 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-100000-2</td><td>20870 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-100000-3</td><td>20767 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-10000-1</td><td>2882 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-10000-2</td><td>2863 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-10000-3</td><td>2897 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-100000-1</td><td>21280 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600019</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>dct-short-1000-100000-2</td><td>21349 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dct-short-1000-100000-3</td><td>21338 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
</table>

*DaCol and Tepan report instance dct-short-1000-100000-1 was solved to optimality by CP Optimizer in 6h which we haven't been able to reproduce (with CPO any other solver). We are still investigating*. 
We have recently noticed some regression in OptalCP on two of these instances hence you may need specific parameters to reach the solution in the time announced.


#### Boveroux, Ernst and Louveaux 2025
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>bel00</td><td>792 x 48</td><td>reentrant jobshop</td><td>766329</td><td>766329</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel01</td><td>627 x 52</td><td>reentrant jobshop</td><td>428900</td><td>428900</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel02</td><td>660 x 59</td><td>reentrant jobshop</td><td>270437</td><td>270437</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel03</td><td>691 x 52</td><td>reentrant jobshop</td><td>670943</td><td>670943</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel04</td><td>952 x 63</td><td>reentrant jobshop</td><td>408633</td><td>408633</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel05</td><td>929 x 59</td><td>reentrant jobshop</td><td>620171</td><td>620171</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel06</td><td>678 x 57</td><td>reentrant jobshop</td><td>502510</td><td>502510</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel07</td><td>968 x 55</td><td>reentrant jobshop</td><td>750360</td><td>750360</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel08</td><td>822 x 65</td><td>reentrant jobshop</td><td>484451</td><td>484451</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel09</td><td>651 x 53</td><td>reentrant jobshop</td><td>534811</td><td>534811</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel10</td><td>733 x 61</td><td>reentrant jobshop</td><td>468304</td><td>468304</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel11</td><td>761 x 66</td><td>reentrant jobshop</td><td>509503</td><td>509503</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel12</td><td>897 x 64</td><td>reentrant jobshop</td><td>388715</td><td>388715</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel13</td><td>836 x 54</td><td>reentrant jobshop</td><td>420576</td><td>420576</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel14</td><td>935 x 57</td><td>reentrant jobshop</td><td>1115063</td><td>1115063</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel15</td><td>818 x 48</td><td>reentrant jobshop</td><td>610946</td><td>610946</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel16</td><td>855 x 59</td><td>reentrant jobshop</td><td>575843</td><td>575843</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel17</td><td>662 x 47</td><td>reentrant jobshop</td><td>520426</td><td>520426</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel18</td><td>677 x 50</td><td>reentrant jobshop</td><td>347889</td><td>347889</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel19</td><td>806 x 69</td><td>reentrant jobshop</td><td>529239</td><td>529239</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

<br/>

### Publications (best known solutions)

The upper and lower bounds come from

- NS2002 (1 bound - ta30js) : **Nowicki, E., & Smutnicki, C.** (2002). Some new tools to solve the job shop problem. Raport serii: Preprinty, 60.

- GR2014 (5 bounds in swv, ta and dmu) : **Gonçalves, J. F., & Resende, M. G.** (2014). An extended Akers graphical method with a biased random‐key genetic algorithm for job‐shop scheduling. International Transactions in Operational Research, 21(2), 215-246.

- CPO2015 (4 bounds in ta and dmu) : 

    - **Vilím, P., Laborie, P., & Shaw, P.** (2015). [Failure-directed search for constraint-based scheduling](https://vilim.eu/petr/cpaior2015.pdf). In CPAIOR 2015 proceedings.

    - **Vilím, P., Laborie, P., & Shaw, P.**. [Detailed experimental results](https://vilim.eu/petr/cpaior2015-results.pdf).

- Mu2015 (1 bound - swv08) : Personal communication to Optimizizer probably based on **Murovec, B.** (2015). Job-shop local-search move evaluation without direct consideration of the criterion’s value. European Journal of Operational Research, 241(2), 320-329.

- PLC2015 (6 bounds in ta and dmu) : **Peng, B., Lü, Z., & Cheng, T. C. E.** (2015). [A tabu search/path relinking algorithm to solve the job shop scheduling problem](https://arxiv.org/abs/1402.5613). Computers & Operations Research, 53, 154-164.

- SS2018 (7 bounds in swv, ta and dmu) : **Shylo, O. V., & Shams, H.** (2018). [Boosting binary optimization via binary classification: A case study of job shop scheduling](https://arxiv.org/abs/1808.10813).

- CS2022 (7 bounds in dmu) : **Constantino, O. H., & Segura, C.** (2022). A parallel memetic algorithm with explicit management of diversity for the job shop scheduling problem. Applied Intelligence, 52(1), 141-153. [available online](https://doi.org/10.1007/s10489-021-02406-2)

- LHW2024 (8 bounds in ta and dmu) : **Mingjie Li, Jin-Kao Hao & Qinghua Wu** (2025). Combining Hash-based Tabu Search and Frequent Pattern Mining for Job-Shop Scheduling. IISE Transactions.

- Hexaly2024 (8 bounds in tai) : **Lea Blaise** (2014). [Hexaly benchmarks and comparisons](https://www.hexaly.com/benchmarks/hexaly-vs-cp-optimizer-vs-CP-SAT-on-the-job-shop-scheduling-problem-jssp).

- CdGKGC2025 (1 bound - dmu72) : **Marc-Emmanuel Coupvent des Graviers, Lotfi Kobrosly, Christophe Guettier, and Tristan Cazenave** (2025). [Updating Lower and Upper Bounds for the Job-Shop Scheduling Problem Test Instances](https://arxiv.org/abs/2504.16106).

- QXL2026 (24 bounds in ta and dmu) : **Qihao Liu, Xinyu Li, and Liang Gao** (2026) A Knowledge-Driven Decoupling and Coordinated Optimization Framework Based on Decision-Variable Parameterization and Release for the Job-Shop Scheduling Problem

All other bounds were found by OptalCP except 2 bounds by CP-SAT (equal but faster) and 3 bounds by Hexaly (strictly better than all other solvers). The cited papers also may use an engine directly like [CPO2015], [Hexaly2024] or as part of an algorithm like [CdGKGC2025] which uses CP-SAT.

<br/>
