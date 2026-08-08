---
layout: default
title: FJSPLib
permalink: /fjsplib/
---

<script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>

## The flexible jobshop scheduling problem benchmark library

FJSPLib is a comprehensive benchmark library for the Flexible Job Shop Scheduling Problem (FJSP), with three components:
- **Instance repository** — a centralized set of classic instances (Brandimarte, Hurink, Dauzere-Perez, Chambers, Kacem, Fattahi, Behnke, Birgin)
- **Engine benchmark** — a standardized 10-minute comparison of reference solvers (CPO, CP-SAT, OptalCP, Cplex), measuring each engine's optimality gap and deviation from the best known bounds.
- **Best-known-solutions archive** — a running record of the best upper/lower bounds ever found for each instance, from any source (published papers, meta-heuristics, or engine runs) — not limited to the reference engines above.

The data and source code can be found in the [Github repository](https://github.com/ScheduleOpt/benchmarks). This document is visible as a README.md in the Github folder [flexible jobshop](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible-jobshop) or as a [webpage](https://scheduleopt.github.io/benchmarks/fjsplib). Instances are now available in [json](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible-jobshop/instances/json) or [text](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible-jobshop/instances/text) formats. The [standardized benchmark results](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible-jobshop/solutions) for each engine on each instance is available in json format. And a json file of [best known solutions](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible-jobshop/solutions/bks.json) is also provided with a trace of the evolution of the bounds.

### Table of Contents

- [Flexible jobshop instances](#flexible-jobshop-benchmark-instances)
    - [Overview of the flexible jobshop benchmark](#overview-of-the-flexible-jobshop-benchmark)
    - [Classification of the flexible jobshop instances](#classification-of-the-flexible-jobshop-instances)
    - [Similar work](#similar-work)
    - [Formats](#formats)
    - [Publications](#publications-instances)
- [Standardized benchmark of engines](#standardized-benchmark-of-engines)
    - [A short history of the reference engines](#a-short-history-of-the-reference-engines)
    - [Comparison of reference solvers](#comparison-of-reference-solvers)
- [Flexible jobshop benchmark](#flexible-jobshop-benchmark)
    - [JSON bks format](#best-known-solutions-json-format)
    - [Best known solutions](#best-known-solutions)
    - [Publications](#publications-best-known-solutions)

<br/>

### Overview of the flexible jobshop benchmark library

Flexible jobshop with machine-independent processing times (264)
- 66 x 4 instances : instances (`abz`, `car`, `la`, `ft` and `orb`) from the jsplib modified in 4 ways (`sdata` `edata` `rdata` and `vdata`) from Hurink, Jurisch and Thole (1994)

Flexible jobshop instances (138)
- 15 instances `mk` from Brandimarte (1993)
- 18 instances `dpp` from Dauzère-Pérès and Paulli (1994)
- 3 x 7 instances `mt`, `setb4` et `seti5` from Chambers and Barnes (1996)
- 4 instances `kacem` from Kacem, Hammadi and Borne (2002)
- 20 instances `fattahi` from Fattahi, Mehrabad and Jolai (2007)
- 60 instances `behnke` from Behnke and Geiger (2012)

Flexible assembly jobshop (50)
- 50 instances `dafjs` and `yfjs` from Birgin et al. 2014


<br/>

### Classification of the flexible jobshop instances

The reference engines used are

- [**IBM ILOG Cplex**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : a state-of-the-art ***MIP*** engine
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the ***CP-scheduling*** family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the ***lazy clause generation*** family of engines
- [**OptalCP**](https://optalcp.com) : representative of the ***CP-scheduling*** family of engines


We use the following criteria to classify instances by difficulty

- <strong style="color:cornflowerblue">toy</strong> : solved to optimality (with proof) in 1 minute by at least 1 reference engine
- <strong style="color:green">easy</strong> : solved to optimality (with proof) in 10 minute by at least 1 reference engine
- <strong style="color:orange">medium</strong> : solved to optimality (with proof) in 1 hour by at least 1 reference engine
- <strong style="color:red">hard</strong> : solved to optimality (with proof) in > 1h by at least 1 reference engine
- <strong style="color:purple">closed</strong> : *allegedly* solved to optimality. Most of the time the optimal solution is known because 2 different methods independently found equal upper and lower bounds. The problem is reclassified into toy, easy, medium or hard when a reference engine is able to reproduce the results.
- <strong style="color:grey">open</strong> : no proof of optimality


The 10 minutes time limit reflects industrial workflows in which schedules are repeatedly regenerated after manual adjustments, parameter tuning, or changes in production data. Furthermore, problems that can be solved to optimality in less than 10 minutes are suitable as sub-problems in decomposition methods like Benders decomposition, Pareto frontier generation or rolling-horizon optimization.

What we expect from a scheduling engine is: 
- prove optimality for as many instances as possible within the 10 minute limit
- for instances that cannot be closed in 10 minutes, to minimize the deviation to the best known upper and lower bounds

Why upper and lower bounds ? Because a decomposition may use the scheduling problem as a dual certificate, not only a primal one.

<br/>

Currently the instances are distributed as follows

machine-independent flexible jobshop
- `abz` : 8 toy, 1 medium, 3 hard, 2 closed, 6 open
- `car` : 27 toy, 3 medium, 2 closed
- `la` : 119 toy, 17 medium, 4 hard, 11 closed, 9 open
- `ft` : 12 toy
- `orb` : 40 toy

flexible jobshop
- `mk` : 9 toy, 2 medium, 2 hard, 2 open
- `dpp` : 4 toy, 1 medium, 1 hard, 2 closed, 10 open
- `mt` : 7 toy
- `setb` : 7 toy
- `seti` : 7 toy
- `kacem` : 4 toy
- `fattahi` : 20 toy
- `behnke` : 15 toy, 12 medium, 1 closed, 32 open

Flexible jobshop with arbitrary precedence graphs / flexible assembly jobshop
- `dafjs` : [status unknown]
- `yfjs` : [status unknown]


<br/>

### Similar work

We have borrowed data and ideas from the following sources

#### Quintiq (2012 - 2014)

Around 2012, the Dutch company Quintiq started keeping track of the best known solutions for flexible jobshop problems (Barnes, Brandimarte, Dauzère and Hurink). Quintiq kept track of the lower and upper bounds, reference and date of the result. They also provided the instances and proven optimal solutions. [Quintiq work](https://web.archive.org/web/20141108055237/http://www.quintiq.com/optimization/flexible-job-shop-scheduling-problem-results.html) is still visible thanks to the Internet Wayback Machine. 

#### Jean-François Puget (2013)

In November 2013 Jean-François Puget benchmarked IBM ILOG CP Optimizer 12.6 on the same instances that Quintiq had worked on, improving 100 bounds and closing 69 new instances.

Time-limit	| %Opt	| #Improved LB	| #Improved UB	| #NewClosed
---|---|---|---|---
15mn	| 64.2%	| 48	| 20| 52
3h	| 68.7%	| 56	| 35	| 65
24h	| 70.0%	| 59	| 41	| 69

JFP highlights the importance of clearly stated experimental protocols 
> A direct comparison between Quintiq Optimizer and CP Optimizer is difficult to perform because (1) the Quintiq page does not describe the experimental protocol and (2) Quintiq results are only available for the instances that were improved by Quintiq Optimizer.  Nevertheless, on these instances improved by Quintiq optimizer, CP Optimizer is worse than Quintiq optimizer on 11 instances and is better on 24 instances.

#### Naderi, Ruiz and Roshanei (2022)

Our work was inspired by the ***outstanding*** work of Naderi, Ruiz and Roshanaei *Mixed-Integer Programming versus Constraint Programming for shop scheduling problems : New Results and Outlook* [**NRR2022**] which compares CPO, Cplex, Gurobi and OR-tools on a benchmark of 6623 instances over 17 benchmarks with a timeout of 1h. They have made all the [raw results available](http://soa.iti.es/problem-instances)

#### Scheduling Lab (2022 - present)

[SchedulingLab](https://github.com/SchedulingLab/jsp-instances) collects instances of various types of scheduling problems, including instances not referenced here.

#### Dauzère-Perès, Ding, Shen and Tamssaouet and (2024)

The paper *The flexible job shop scheduling problem: A review* is an in-depht overview of the state-of-the-art for flexible jobshop and its variants. The [supplementary material](https://ars.els-cdn.com/content/image/1-s2.0-S037722172300382X-mmc1.pdf) contains a summary of the best known solutions at the time of publication.

<br/>

### Formats

There are now three format supported in the FJSPLib
- the json format
- the text fjasp format
- the text fjsp format

#### The JSON format

The JSON format follows closely the new format 

For instance `fattahi1` is
```json
{
   "instance" : "fattahi1",
   "family" : "fattahi",
   "family_long" : "FattahiMehrabadJolai2007",
   "year" : "2007",
   "format" : "fajsp",
   "operations" : [
	   { "operation" : 0, "option" : 0, "machine" : 0, "duration" : 25 },
	   { "operation" : 0, "option" : 1, "machine" : 1, "duration" : 37 },
	   { "operation" : 1, "option" : 0, "machine" : 0, "duration" : 32 },
	   { "operation" : 1, "option" : 1, "machine" : 1, "duration" : 24 },
	   { "operation" : 2, "option" : 0, "machine" : 0, "duration" : 45 },
	   { "operation" : 2, "option" : 1, "machine" : 1, "duration" : 65 },
	   { "operation" : 3, "option" : 0, "machine" : 0, "duration" : 21 },
	   { "operation" : 3, "option" : 1, "machine" : 1, "duration" : 65 }
   ],
   "precedences" : [
	   { "before" : 0, "after" : 1, "job" : 0},
	   { "before" : 2, "after" : 3, "job" : 1}
   ]
}
```

#### The fjsp format

In the fjsp format
- each line represents a **job**
- the first number of the line is the ***number of operations*** in the job
- then for each operation is given the ***number of options*** and as many pairs ***machine*** ***duration*** as there are options

```
#jobs #machines average_flexibility
#operations (#options (duration machine) (duration machine)) (#options (duration machine))

```
For instance `fattahi1` is
```
2 2 2
2 2 1 25 2 37 2 1 32 2 24
2 2 1 45 2 65 2 1 21 2 65
```

meaning
- (2 jobs) (2 machines) (average flexibility 2.0)
- (2 operations) (2 options : (1,25) (2,37)) (2 options : (1,32) (2,24))
- (2 operations) (2 options : (1,45) (2,65)) (2 options : (1,21) (2,65))


#### The fajsp format

The fasp format uses
- the first line is the header with `#operations` `#precedences` `#machines`
- `#precedences` lines of the form `x y j` where `x` and `y` are the indices of 2 operations, and `j` the number of the job that links them
- `#operations` lines of the form `#options m1 d1 m2 d2 ... mk dk` where $k \in 0 .. \mathtt{\#options}-1$, $m_k$ is a machine between $0$ and $\mathtt{\#machines}-1$ and $d_k$ is a duration

Notice that the format doesn't say how many jobs exist in the instance. That number needs to be deduced from the third column of the precedence data.

For instance `fattahi1` is
```
4 2 2
0 1 0
2 3 1
2 0 25 1 37
2 0 32 1 24
2 0 45 1 65
2 0 21 1 65
```

There are 4 operations from 0 to 3 with 2 options in each operation.
There are two jobs `0 -> 1` and `2 -> 3`


<br/>


### Publications (instances)

The instances come from the following publications

- **Brandimarte, P** (1993). Routing and scheduling in a flexible job shop by tabu search. Annals of Operations research, 41(3), 157-183.

- **Hurink, J., Jurisch, B., & Thole, M.** (1994). Tabu search for the job-shop scheduling problem with multi-purpose machines. Operations-Research-Spektrum, 15(4), 205-215.

- **Dauzère-Pérès, S., & Paulli, J.** (1994). Solving the general multiprocessor job-shop scheduling problem.

- **Chambers, J. B., & Barnes, J. W.** (1996). Flexible job shop scheduling by tabu search. The University of Texas, Austin, TX, Technical Report Series ORP96-09, Graduate Program in Operations Research and Industrial Engineering.

- **Kacem, I., Hammadi, S., & Borne, P.** (2002). Pareto-optimality approach for flexible job-shop scheduling problems: hybridization of evolutionary algorithms and fuzzy logic. Mathematics and computers in simulation, 60(3-5), 245-276.

- **Fattahi, P., Saidi Mehrabad, M., & Jolai, F.** (2007). Mathematical modeling and heuristic approaches to flexible job shop scheduling problems. Journal of intelligent manufacturing, 18(3), 331-342.

- **Behnke, D., & Geiger, M. J.** (2012). [Test instances for the flexible job shop scheduling problem with work centers](https://d-nb.info/1023241773/34) Technical report, Helmut-Schmidt-Universität, Lehrstuhl für Betriebswirtschaftslehre, insbes. Logistik-Management, RR 12-01-01.

- **Birgin, E. G., Feofiloff, P., Fernandes, C. G., De Melo, E. L., Oshiro, M. T., & Ronconi, D. P.** (2014). A MILP model for an extended version of the flexible job shop problem. Optimization Letters, 8(4), 1417-1431.

<br/>

## Standardized benchmark of engines

We track the State-Of-The-Art (SOTA) of optimization engines for scheduling with a standardized 10-minute benchmark of the reference engines

The engines that are benchmarked are

- [**IBM ILOG Cplex**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : a state-of-the-art ***MIP*** engine
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the ***CP-scheduling*** family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the ***lazy clause generation*** family of engines
- [**OptalCP**](https://optalcp.com) : representative of the ***CP-scheduling*** family of engines


<br/>

### A short history of the reference engines

#### IBM ILOG Cplex (1988 - present)

**Cplex** is a MIP engine founded by Robert Bixby in 1987, and acquired in 1997 by ILOG, subsequently acquired by IBM in 2009.

Like similar state-of-the-art MIP engines, Cplex features
- a presolve
- various LP algorithms (simplex, dual simplex, barrier)
- search strategies with learning (branching, restarts)
- a large collection of cuts
- primal heuristics
- conflict analysis adapted from SAT
- solution polishing before the time-limit

Improvements in a complex software like Cplex are incremental, but we can broadly divide its evolution as follows
- Cplex 1-3 [**1987-1994**] LP improvements (simplex, dual simplex, interior points), basic presolve and branch-and-cut. Cplex 3.0 is a performance milestone due to its mature dual simplex.
- Cplex 6-7 [**1998-2001**] established what we would recognize today as a modern MIP (presolve + branch-and-cut + heuristics + learning) with a particular emphasis on cuts. Cplex 6.5 (1999) is considered by practitioners as a performance milestone.
- Cplex 9-11 [**2003-2007**] more emphasis on primal approaches : heuristics (RINS, Feasibility pump), search strategies (restart + node presolve), solution polishing, SAT-like conflict analysis. Cplex 11 is considered as a performance milestone.
- Cplex 11/12- [**2007-**] more cuts (GCD-based cuts, multi-commodity flow) sometimes mixed with heuristics (pump reduce) or search (conflict analysis), and systematic cutting plane filtering allowing a more aggressive usage of cuts

From 2008, Bixby, Rothberg and Gu created Gurobi.

References
- [Solving Real-World linear programs: a decade and more of progress](https://pubsonline.informs.org/doi/epdf/10.1287/opre.50.1.3.17780) (Robert Bixby - 2002)
- [Mixed Integer Programming: Analyzing 12 Years of Progress." In Facets of Combinatorial Optimization](https://link.springer.com/chapter/10.1007/978-3-642-38189-8_18) (Tobias Achterberg, Roland Wunderling - 2013)

<br/>

#### IBM ILOG CP Optimizer (2007 - present)

**CP Optimizer** is a descendant of **ILOG Solver** (architectured over the years by Jean-François Puget, Jean-Charles Régin and later Laurent Perron) and **ILOG Scheduler** (architectured by Claude Le Pape, then Philippe Laborie). CP Optimizer (led by Paul Shaw, Laurent Perron and Philippe Laborie) merged the general CP engine and the specific scheduling add-on in a single engine, promoted the model-and-run approach and pioneered a new scheduling language (optional intervals, noOverlap, cumulative functions, etc.) that has become an industry standard.

From a technical perspective CP Optimizer interleaves the following search methods
- **Large Neighbourhood Search** (Shaw and al.) : tree-search based local search
- **Iterative diving** (designed by Philppe Laborie) : a quick diving heuristic for "simple" scheduling problems that often provides fast and good initial solutions
- **Failure Directed Search** (designed by Petr Vilim) : a generalization of the fail-first principle that reduces the search space by eliminating assignments unlikely to succeed
- **Genetic algorithms** on top of the scheduling engine : named "multi-point" search, they are not on by default unless a large number of cores are available

The **temporal linear relaxation** solved by an LP and **objective landscapes** act like a reduced cost / impact based oracle but for scheduling problems.

Because CP Optimizer was designed in a time where multi-core computers weren't common, the engine alternates the different strategies on the same core. And replicates itself over various cores with different parameters if more cores are available

The main propagation algorithms in CP optimizer are 
- **time tabling** and **edge-finding** for disjunctive and cumulative resources (Claude LePape, Wim Nuijten, Philippe Baptiste) later improved by Petr Vilim 
- **logical network** for implications and (dis)equalities between boolean variables
- **simple temporal networks** for precedences

References
- [20+ years of scheduling with constraints at IBM/ILOG](https://link.springer.com/content/pdf/10.1007/s10601-018-9281-x.pdf) (Philippe Laborie, Jérôme Rogerie, Paul Shaw and Petr Vilim - 2018)
- [Introduction to CP Optimizer](https://cp2019.a4cp.org/PDFs/P-Laborie.pdf) (Philippe Laborie - 2019)
- [Self-adapting large neighborhood search: Application to single-mode scheduling problems](http://ppcro.free.fr/pres/070605/Laborie_SelfAdaptingLNS.pdf) (Philippe Laborie and Daniel Godard - 2007)
- [Reasoning with Conditional Time-intervals](https://cdn.aaai.org/FLAIRS/2008/FLAIRS08-126.pdf) (Philippe Laborie and Jérôme Rogerie - 2008)
- [Reasoning with Conditional Time-intervals Part II](https://cdn.aaai.org/ocs/60/60-2374-1-PB.pdf) (Phillipe Laborie, Jérôme Rogerie, Paul Shaw and Petr Vilim - 2009)
- [Temporal linear relaxation in IBM ILOG CP Optimizer](https://link.springer.com/article/10.1007/s10951-014-0408-7) (Philippe Laborie and Jérôme Rogerie - 2014)
- [Failure-Directed Search for Constraint-Based Scheduling](https://link.springer.com/chapter/10.1007/978-3-319-18008-3_30) (Petr Vilim, Philippe Laborie and Paul Shaw - 2015)
- [Objective landscapes for constraint programming](https://link.springer.com/chapter/10.1007/978-3-319-93031-2_28) (Philippe Laborie - 2018)

<br/>

#### Google ORTools CP-SAT (2017 - present)

**CP-SAT** is an open-source lazy clause generation engine augmented with an LP, MIP-style cuts and CP-style propagators designed by Laurent Perron, Frédéric Didier and Steven Gay. 

CP-SAT includes
- LP-based lower bounds + MIP style cuts, in particular MIP cuts specialized for scheduling
- CP-style propagation algorithms (time-tabling, edge-finding)
- SAT-style conflict analysis
- synchronization of MIP and CP style reasonings
- LNS : tree-based local search
- LS with infeasible moves

CP-SAT is the "successor" of a more traditional CP + LS engine by Laurent Perron and Vincent Furnon, focusing more on VRP problems.

CP-SAT team doesn't publish much about how CP SAT works, but maintains very informative comments in the source code.
Here is an overview of the files and what they contain


| Constraint	| Main source files	| Implemented algorithms |
----------------|-------------------|------------------------|
| NoOverlap	    | disjunctive.cc	| Detectable precedences, Edge Finding, Not-First/Not-Last, overload checking |
| Cumulative    | cumulative.cc, timetable.cc, timetable_edgefinding.cc	    | Time-table propagation, Edge Finding, energetic reasoning |
| NoOverlap2D	| diffn.cc	        | DiffN filtering, energetic reasoning |
| Circuit	    | circuit.cc	    | SCC detection, subtour elimination |
| AllDifferent	| all_different.cc	| Matching-based filtering, binary decomposition in some cases
| Linear	    | integer_expr.cc, linear_constraint.cc	| Integer propagation, pseudo-Boolean reasoning
| Element	    | element.cc    	| Bounds consistency
| Automaton	    | table.cc, automaton.cc	| DFA propagation
| Table	        | table.cc	        | Compact table propagation
| Reservoir	    | reservoir.cc	    | Specialized cumulative reasoning

The paper **From Literals to Atomic Constraints: Generalising Conflict-Driven Clause Learning for Constraint Programming** contains  a comparison of the implementation of various LCG-based CP solvers.

> OR-Tools only creates literals for decisions. However, OR-Tools often decomposes constraints into a SAT representation, leading to more existing literals than only decision literals. During conflict analysis, an atomic constraint with no associated literal is repeatedly replaced with its reason until only existing literals are left. OR-Tools’s approach has the benefits that 1) it only creates literals that are “important” enough to be decisions, and 2) decomposed constraints ensure that there are enough literals for conflict analysis. However, OR-Tools suffers from the fact that 1) limiting created literals can lead to less general nogoods, and 2) since explanations are resolved until consisting of existing literals, explanation lifting and nogood minimisation can have less impact

The presolver of CP-SAT does a significant amount of work, closer to a MIP than a typical CP engine
- variable fixing
- domain tightening
- affine relation detection
- duplicate constraint elimination
- implied bound computation
- linear simplification
- clique extraction
- symmetry detection
- interval simplification
- objective simplification

Moreover some of the classic scheduling algorithms have been transformed into cutting planes (`scheduling_cuts.cc`) : energetic reasoning, time-table propagation, cumulative precedence, cumulative completion time, energetic reasoning for disjunctive resources.


References
- [CP-SAT at scheduling seminar](https://schedulingseminar.com/presentations/SchedulingSeminar_LaurentPerron.pdf) (Laurent Perron - 2024)
- [From Literals to Atomic Constraints: Generalising Conflict-Driven Clause Learning for Constraint Programming](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.CP.2026.42) (Imko Marijnissen, Maarten Flippo, Emir Demirović - CP2026) 

<br/>

#### OptalCP (2021 - present)

**OptalCP** was architectured by Petr Vilim, Nicolas Bonifas and Diego Olivier Fernandez Pons (initially with input from Philippe Laborie). Compared to CPO the parallelism is done with one strategy per core instead of interleaving. The strategies used are
- **Large Neighbourhood Search** (LNS) : tree-search based local search
- **Failure Directed Search** (FDS) : generalizes first-fail principle
- **FDSDual** : generalizes destructive lower bounds

OptalCP continues the legacy of CP Optimizer (engine style, modeling language). The hybridization of OptalCP with heuristics and meta-heuristics is done outside by communicating upper and lower bounds in real time (during search)

References
- [OptalCP at scheduling seminar](https://schedulingseminar.com/presentations/schedulingseminar_petrvilim_vilemheinz.pdf) (Petr Vilim - 2026)

<br/>

>
> If your name appears in this section and you notice an error contact me
>

<br/>

### Comparison of reference solvers

We adopt the following metrics to compare the engines

- **Geometric average of lower bound to best known lower bound ratio**

$$LB_{avg} = \exp\left(\sum_k\log\frac{LB}{LB_{best}}\right)$$

- **Geometric average of the upper bound to best known upper bound ratio**

$$UB_{avg} = \exp\left(\sum_k\log\frac{UB}{UB_{best}}\right)$$

- **Geometric shifted average of the gap**

$$GAP = \exp\left(\sum_k\log\left(1 + \frac{UB - LB}{UB}\right)\right) - 1$$


<br/>

Comparisons were performed on a Windows PC with an i7 4-core 3GHz 32GB ram in 600 seconds
- **Cplex** 22.1.1.0
- **CPO** 22.1.1.0
    - with gap tolerance = 0
- **CP-SAT** V9.15.6755 with default configuration
- **OptalCP** Academic Version 2026.4.0 
    - with maximum propagation instead of default, gap tolerance = 0 and some other parameter changes
    - we may benchmark with default parameters later
    

The raw data is in the [solutions](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible-jobshop/solutions) folder

We recommend to run your own benchmarks on your own machines. All required [code](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible-jobshop/code) is provided with HOWTO instructions in each README file.


Important caveats
- Engines have **relative** and **absolute optimality tolerances** (CPO, OptalCP) which can lead to reporting sub-optimal solutions as optimal (for the tolerance). For this test the tolerances have been set to zero
- Engines are very **non-deterministic** (results between two runs of the same engine on the same machine differ significantly) due to parallelism. As a result it makes no sense to consider very accurate values for average deviations or gap.
- Engines have different **bottlenecks** (CPU, memory) that are due to their internal architecture and trade-offs made by their designers. An engine doesn't behave in the same way with 2, 4, 8, 16, 32 or 64 cores, doesn't behave the same in machines with fast / slow memory, etc.
- Engines recommend different **configurations** : CP-SAT recommends a minimum of 8 cores and ideally 16 (due to the high number of strategies that need to be interleaved with less cores). CPO on the other hand gives most of its performance on 1 or 2 cores . The 4 core configuration was chosen because it is a usual laptop configuration, but commercial users will probably run on a larger server.

<br/>


## Best known solutions

In this section are collected the best known solutions (upper and lower bound) for each problem in the benchmark. 

The solutions may come from 
- Published papers (eg. MG2000), the section [publications](#publications-best-known-solutions) provides references
- An engine run by someone else (eg. CPO2013) which results have been published
- An engine run by us with approximate resolution time

The type of hardware and time required to find the best known solution are difficult to track and compare, in particular for bounds coming from published papers. Which is why
- When a reference engine reproduces a published bound, the table credits the engine because of the reproducibility advantage
- An approximative timing for reference engines is provided, in particular when the time to find the solution is unusually long

<br/>

> We ***do not*** systematically run the instances for very long times on large machines. Most of the instances that appear as having been solved after a large comptation time (eg. 40h) had peculiarities (e.g. `best lb + 1 == best ub`) that justified exploring how long it would take to solve them to optimality. We also devote more effort to solve instances which best known solutions are given by papers that are old, difficult to find and difficlt to reproduce. This allows verifying the paper claims and having a more accessible way of generating the result.

<br/>

### Best known solutions json format

The best known solutions are now collected in a [json](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions/bks.json) file with the following syntax

```json
{
    "instance":"dpp06a",
    "size":"10 x 5",
    "type":"flexible jobshop",
    "family":"dpp",
    "family_long":"Dauzère-Pérès and Paulli (1994)",
    "status":"open",
    "lower_bound":2164,
    "upper_bound":2169,
    "lb_data":[{
        "value":2164,
        "date":"2026-01-01",
        "solver":"CdGKGC2025",
        "time":"?",
        "hardware":"?",
        "certificate":"no"
    }],
    "ub_data":[{
        "value":2169,
        "date":"2026-01-01",
        "solver":"CdGKGC2025",
        "time":"?",
        "hardware":"?",
        "certificate":"no"
    }]
}
```


For most of the best known solutions, the date, hardware, running time and certificate (valid primal or valid dual solution) are not known. The data will be progressively updated to the best of our knowledge.

<br/>

### Best known solutions per instance family

#### Hurink, Jurisch and Thole (1994) - Machine independent processing times

The problems in this benchmark are modified versions of the corresponding jobshop problems. They are divided into
- **sdata** : each operation can be assigned to a single machine (jobshop)
- **edata** : a few operations can be assigned to many machines
- **rdata** : most operations can be assigned to a few machines
- **vdata** : all operation can be assigned to many machines

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>abz5</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1234</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1167</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">954</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">859</td><td>OptalCP</td></tr>
<tr><td>abz6</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">943</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">925</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">807</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">742</td><td>OptalCP</td></tr>
<tr><td>abz7</td><td>20 x 15</td><td style="background-color:orange;color:white;font-weight:bold">656</td><td style="background-color:gray;color:white;font-weight:bold">604 / 610</td><td style="background-color:gray;color:white;font-weight:bold">497 / 522</td><td style="background-color:purple;color:white;font-weight:bold">492</td><td>OptalCP | CPO2013 / Quintiq | CdGKGC2025 / DLLSXG2019 | Quintiq</td></tr>
<tr><td>abz8</td><td>20 x 15</td><td style="background-color:red;color:white;font-weight:bold">667</td><td style="background-color:gray;color:white;font-weight:bold">625 / 636</td><td style="background-color:gray;color:white;font-weight:bold">509 / 535</td><td style="background-color:gray;color:white;font-weight:bold">506 / 507</td><td>OptalCP | Quintiq / CPO2013 | CdGKGC2025 / DLLSXG2019 | OptalCP / Quintiq</td></tr>
<tr><td>abz9</td><td>20 x 15</td><td style="background-color:red;color:white;font-weight:bold">678</td><td style="background-color:red;color:white;font-weight:bold">644</td><td style="background-color:gray;color:white;font-weight:bold">517 / 536</td><td style="background-color:purple;color:white;font-weight:bold">497</td><td>OptalCP | CPO2013 | CPO2013 / Quintiq | OptalCP / Quintiq</td></tr>
</table>

<br/>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>car1</td><td>11 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7038</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6176</td><td style="background-color:orange;color:white;font-weight:bold">5034</td><td style="background-color:orange;color:white;font-weight:bold">5005</td><td>OptalCP</td></tr>
<tr><td>car2</td><td>13 x 4</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7166</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6327</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">5985</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">5929</td><td>OptalCP</td></tr>
<tr><td>car3</td><td>12 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7312</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6856</td><td style="background-color:purple;color:white;font-weight:bold">5622</td><td style="background-color:orange;color:white;font-weight:bold">5597</td><td>OptalCP | OptalCP / Quintiq | OptalCP</td></tr>
<tr><td>car4</td><td>14 x 4</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">8003</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7789</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6514</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6514</td><td>OptalCP</td></tr>
<tr><td>car5</td><td>10 x 6</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7702</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7229</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">5615</td><td style="background-color:purple;color:white;font-weight:bold">4909</td><td>OptalCP | OptalCP / CdGKGC2025</td></tr>
<tr><td>car6</td><td>8 x 9</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">8313</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7990</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6147</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">5486</td><td>OptalCP</td></tr>
<tr><td>car7</td><td>7 x 7</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6558</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">6123</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">4425</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">4281</td><td>OptalCP</td></tr>
<tr><td>car8</td><td>8 x 8</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">8264</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">7689</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">5692</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">4613</td><td>OptalCP</td></tr>
</table>

<br/>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>la01</td><td>10 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">666</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">609</td><td style="background-color:orange;color:white;font-weight:bold">570</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">570</td><td>OptalCP</td></tr>
<tr><td>la02</td><td>10 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">655</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">655</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">529</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">529</td><td>OptalCP</td></tr>
<tr><td>la03</td><td>10 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">597</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">550</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">477</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">477</td><td>OptalCP</td></tr>
<tr><td>la04</td><td>10 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">590</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">568</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">502</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">502</td><td>OptalCP</td></tr>
<tr><td>la05</td><td>10 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">593</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">503</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">457</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">457</td><td>OptalCP</td></tr>
<tr><td>la06</td><td>15 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">926</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">833</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">799</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">799</td><td>OptalCP</td></tr>
<tr><td>la07</td><td>15 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">890</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">762</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">749</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">749</td><td>OptalCP</td></tr>
<tr><td>la08</td><td>15 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">863</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">845</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">765</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">765</td><td>OptalCP</td></tr>
<tr><td>la09</td><td>15 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">951</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">878</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">853</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">853</td><td>OptalCP</td></tr>
<tr><td>la10</td><td>15 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">958</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">866</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">804</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">804</td><td>OptalCP</td></tr>
<tr><td>la11</td><td>20 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1222</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1103</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1071</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1071</td><td>OptalCP</td></tr>
<tr><td>la12</td><td>20 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1039</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">960</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">936</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">936</td><td>OptalCP</td></tr>
<tr><td>la13</td><td>20 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1150</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1053</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1038</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1038</td><td>OptalCP</td></tr>
<tr><td>la14</td><td>20 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1292</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1123</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1070</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1070</td><td>OptalCP</td></tr>
<tr><td>la15</td><td>20 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1207</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1111</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1089</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1089</td><td>OptalCP</td></tr>
<tr><td>la16</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">945</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">892</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">717</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">717</td><td>OptalCP</td></tr>
<tr><td>la17</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">784</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">707</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">646</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">646</td><td>OptalCP</td></tr>
<tr><td>la18</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">848</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">842</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">666</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">663</td><td>OptalCP</td></tr>
<tr><td>la19</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">842</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">796</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">700</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">617</td><td>OptalCP</td></tr>
<tr><td>la20</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">902</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">857</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">756</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">756</td><td>OptalCP</td></tr>
<tr><td>la21</td><td>15 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1046</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1009</td><td style="background-color:gray;color:white;font-weight:bold">809 / 825</td><td style="background-color:orange;color:white;font-weight:bold">800</td><td>OptalCP | CdGKGC2025 / Quintiq | OptalCP</td></tr>
<tr><td>la22</td><td>15 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">927</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">880</td><td style="background-color:gray;color:white;font-weight:bold">745 / 753</td><td style="background-color:purple;color:white;font-weight:bold">733</td><td>OptalCP | CdGKGC2025 / DLLSXG2019 | OptalCP / CPO2013</td></tr>
<tr><td>la23</td><td>15 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1032</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">950</td><td style="background-color:gray;color:white;font-weight:bold">820 / 831</td><td style="background-color:orange;color:white;font-weight:bold">809</td><td>OptalCP | CdGKGC2025 / DLLSXG2019 | OptalCP</td></tr>
<tr><td>la24</td><td>15 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">935</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">908</td><td style="background-color:gray;color:white;font-weight:bold">780 / 795</td><td style="background-color:red;color:white;font-weight:bold">773</td><td>OptalCP | CdGKGC2025 / DLLSXG2019 | OptalCP</td></tr>
<tr><td>la25</td><td>15 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">977</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">936</td><td style="background-color:gray;color:white;font-weight:bold">771 / 779</td><td style="background-color:purple;color:white;font-weight:bold">751</td><td>OptalCP | CdGKGC2025 / DLLSXG2019 | OptalCP / Quintiq</td></tr>
<tr><td>la26</td><td>20 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1218</td><td style="background-color:orange;color:white;font-weight:bold">1106</td><td style="background-color:gray;color:white;font-weight:bold">1056 / 1057</td><td style="background-color:orange;color:white;font-weight:bold">1052</td><td>OptalCP | DOFP2026a / Quintiq | OptalCP</td></tr>
<tr><td>la27</td><td>20 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1235</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1181</td><td style="background-color:purple;color:white;font-weight:bold">1085</td><td style="background-color:orange;color:white;font-weight:bold">1084</td><td>OptalCP | DOFP2026a / Quintiq | OptalCP</td></tr>
<tr><td>la28</td><td>20 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1216</td><td style="background-color:red;color:white;font-weight:bold">1142</td><td style="background-color:gray;color:white;font-weight:bold">1075 / 1076</td><td style="background-color:orange;color:white;font-weight:bold">1069</td><td>OptalCP | CPO2013 | DOFP2026a / Quintiq | OptalCP</td></tr>
<tr><td>la29</td><td>20 x 10</td><td style="background-color:orange;color:white;font-weight:bold">1152</td><td style="background-color:red;color:white;font-weight:bold">1107</td><td style="background-color:gray;color:white;font-weight:bold">993 / 994</td><td style="background-color:purple;color:white;font-weight:bold">993</td><td>OptalCP | CPO2013 | OptalCP / Quintiq</td></tr>
<tr><td>la30</td><td>20 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1355</td><td style="background-color:red;color:white;font-weight:bold">1188</td><td style="background-color:gray;color:white;font-weight:bold">1068 / 1071</td><td style="background-color:purple;color:white;font-weight:bold">1068</td><td>OptalCP | CPO2013 | OptalCP / Quintiq</td></tr>
<tr><td>la31</td><td>30 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1784</td><td style="background-color:orange;color:white;font-weight:bold">1532</td><td style="background-color:orange;color:white;font-weight:bold">1520</td><td style="background-color:orange;color:white;font-weight:bold">1520</td><td>OptalCP</td></tr>
<tr><td>la32</td><td>30 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1850</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1698</td><td style="background-color:purple;color:white;font-weight:bold">1657</td><td style="background-color:purple;color:white;font-weight:bold">1657</td><td>OptalCP | OptalCP / Quintiq</td></tr>
<tr><td>la33</td><td>30 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1719</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1547</td><td style="background-color:purple;color:white;font-weight:bold">1497</td><td style="background-color:purple;color:white;font-weight:bold">1497</td><td>OptalCP | OptalCP / Quintiq | OptalCP / MG2000</td></tr>
<tr><td>la34</td><td>30 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1721</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1599</td><td style="background-color:purple;color:white;font-weight:bold">1535</td><td style="background-color:orange;color:white;font-weight:bold">1535</td><td>OptalCP | OptalCP / Quintiq | OptalCP</td></tr>
<tr><td>la35</td><td>30 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1888</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1736</td><td style="background-color:purple;color:white;font-weight:bold">1549</td><td style="background-color:orange;color:white;font-weight:bold">1549</td><td>OptalCP | OptalCP / Quintiq | OptalCP</td></tr>
<tr><td>la36</td><td>15 x 15</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1268</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1160</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1023</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">948</td><td>OptalCP</td></tr>
<tr><td>la37</td><td>15 x 15</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1397</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1397</td><td style="background-color:orange;color:white;font-weight:bold">1062</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">986</td><td>OptalCP</td></tr>
<tr><td>la38</td><td>15 x 15</td><td style="background-color:orange;color:white;font-weight:bold">1196</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1141</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">954</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">943</td><td>OptalCP</td></tr>
<tr><td>la39</td><td>15 x 15</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1233</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1184</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1011</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">922</td><td>OptalCP</td></tr>
<tr><td>la40</td><td>15 x 15</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1222</td><td style="background-color:orange;color:white;font-weight:bold">1144</td><td style="background-color:orange;color:white;font-weight:bold">955</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">955</td><td>OptalCP</td></tr>
</table>

<br/>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>ft06</td><td>6 x 6</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">55</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">55</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">47</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">47</td><td>OptalCP</td></tr>
<tr><td>ft10</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">930</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">871</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">686</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">655</td><td>OptalCP</td></tr>
<tr><td>ft20</td><td>20 x 5</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1165</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1088</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1022</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1022</td><td>OptalCP</td></tr>
</table>

<br/>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>orb1</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1059</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">977</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">746</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">695</td><td>OptalCP</td></tr>
<tr><td>orb2</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">888</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">865</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">696</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">620</td><td>OptalCP</td></tr>
<tr><td>orb3</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1005</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">951</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">712</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">648</td><td>OptalCP</td></tr>
<tr><td>orb4</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1005</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">984</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">753</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">753</td><td>OptalCP</td></tr>
<tr><td>orb5</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">887</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">842</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">639</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">584</td><td>OptalCP</td></tr>
<tr><td>orb6</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">1010</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">958</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">754</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">715</td><td>OptalCP</td></tr>
<tr><td>orb7</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">397</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">389</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">302</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">275</td><td>OptalCP</td></tr>
<tr><td>orb8</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">899</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">894</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">639</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">573</td><td>OptalCP</td></tr>
<tr><td>orb9</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">934</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">933</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">694</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">659</td><td>OptalCP</td></tr>
<tr><td>orb10</td><td>10 x 10</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">944</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">933</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">742</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">681</td><td>OptalCP</td></tr>
</table>

<br/>

*FT instances are also known as MT because the 1963 paper of Fisher and Thompson was published in the book "Industrial scheduling" by Muth and Thompson.*

#### Brandimarte (1993)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>mk01</td><td>10 x 6</td><td>flexible jobshop</td><td>40</td><td>40</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk02</td><td>10 x 6</td><td>flexible jobshop</td><td>26</td><td>26</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk03</td><td>15 x 8</td><td>flexible jobshop</td><td>204</td><td>204</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk04</td><td>15 x 8</td><td>flexible jobshop</td><td>60</td><td>60</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk05</td><td>15 x 4</td><td>flexible jobshop</td><td>172</td><td>172</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk06</td><td>10 x 15</td><td>flexible jobshop</td><td>57</td><td>57</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>mk07</td><td>20 x 5</td><td>flexible jobshop</td><td>139</td><td>139</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>mk08</td><td>20 x 10</td><td>flexible jobshop</td><td>523</td><td>523</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk09</td><td>20 x 10</td><td>flexible jobshop</td><td>307</td><td>307</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk10</td><td>20 x 15</td><td>flexible jobshop</td><td>189</td><td>193</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub Quintiq</td></tr>
<tr><td>mk11</td><td>30 x 5</td><td>flexible jobshop</td><td>609</td><td>609</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 24h</td></tr>
<tr><td>mk12</td><td>30 x 10</td><td>flexible jobshop</td><td>508</td><td>508</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk13</td><td>30 x 10</td><td>flexible jobshop</td><td>381</td><td>390</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>mk14</td><td>30 x 15</td><td>flexible jobshop</td><td>694</td><td>694</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mk15</td><td>30 x 15</td><td>flexible jobshop</td><td>333</td><td>333</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
</table>

***Instances mk11 to mk15 are present in the supplementary material of Test Instances for the Flexible Job Shop Scheduling Problem with Work Centers but absent from other problem repositories***

#### Dauzère-Pérès and Paulli (1994)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>dpp01a</td><td>10 x 5</td><td>flexible jobshop</td><td>2505</td><td>2505</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dpp02a</td><td>10 x 5</td><td>flexible jobshop</td><td>2228</td><td>2228</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dpp03a</td><td>10 x 5</td><td>flexible jobshop</td><td>2228</td><td>2228</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dpp04a</td><td>10 x 5</td><td>flexible jobshop</td><td>2503</td><td>2503</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>dpp05a</td><td>10 x 5</td><td>flexible jobshop</td><td>2195</td><td>2199</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>CdGKGC2025</td></tr>
<tr><td>dpp06a</td><td>10 x 5</td><td>flexible jobshop</td><td>2164</td><td>2169</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>CdGKGC2025</td></tr>
<tr><td>dpp07a</td><td>15 x 8</td><td>flexible jobshop</td><td>2216</td><td>2254</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2013 | ub DLLSXG2019</td></tr>
<tr><td>dpp08a</td><td>15 x 8</td><td>flexible jobshop</td><td>2061</td><td>2061</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 10h</td></tr>
<tr><td>dpp09a</td><td>15 x 8</td><td>flexible jobshop</td><td>2061</td><td>2061</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dpp10a</td><td>15 x 8</td><td>flexible jobshop</td><td>2212</td><td>2241</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2013 | ub Quintiq</td></tr>
<tr><td>dpp11a</td><td>15 x 8</td><td>flexible jobshop</td><td>2019</td><td>2037</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CdGKGC2025 | ub Quintiq</td></tr>
<tr><td>dpp12a</td><td>15 x 8</td><td>flexible jobshop</td><td>1969</td><td>1984</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Quintiq</td></tr>
<tr><td>dpp13a</td><td>20 x 10</td><td>flexible jobshop</td><td>2206</td><td>2236</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CdGKGC2025 | ub DLLSXG2019</td></tr>
<tr><td>dpp14a</td><td>20 x 10</td><td>flexible jobshop</td><td>2161</td><td>2161</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb OptalCP | ub Quintiq</td></tr>
<tr><td>dpp15a</td><td>20 x 10</td><td>flexible jobshop</td><td>2161</td><td>2161</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb OptalCP | ub Quintiq</td></tr>
<tr><td>dpp16a</td><td>20 x 10</td><td>flexible jobshop</td><td>2202</td><td>2231</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CdGKGC2025 | ub Quintiq</td></tr>
<tr><td>dpp17a</td><td>20 x 10</td><td>flexible jobshop</td><td>2089</td><td>2105</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CdGKGC2025 | ub Quintiq</td></tr>
<tr><td>dpp18a</td><td>20 x 10</td><td>flexible jobshop</td><td>2057</td><td>2070</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Quintiq</td></tr>
</table>


#### Chambers and Barnes (1996)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>mt10c1</td><td>10 x 11</td><td>flexible jobshop</td><td>927</td><td>927</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mt10cc</td><td>10 x 12</td><td>flexible jobshop</td><td>908</td><td>908</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mt10x</td><td>10 x 11</td><td>flexible jobshop</td><td>918</td><td>918</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mt10xx</td><td>10 x 12</td><td>flexible jobshop</td><td>918</td><td>918</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mt10xxx</td><td>10 x 13</td><td>flexible jobshop</td><td>918</td><td>918</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mt10xy</td><td>10 x 12</td><td>flexible jobshop</td><td>905</td><td>905</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>mt10xyz</td><td>10 x 13</td><td>flexible jobshop</td><td>847</td><td>847</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>setb4c9</td><td>15 x 11</td><td>flexible jobshop</td><td>914</td><td>914</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>setb4cc</td><td>15 x 12</td><td>flexible jobshop</td><td>907</td><td>907</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>setb4x</td><td>15 x 11</td><td>flexible jobshop</td><td>925</td><td>925</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>setb4xx</td><td>15 x 12</td><td>flexible jobshop</td><td>925</td><td>925</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>setb4xxx</td><td>15 x 13</td><td>flexible jobshop</td><td>925</td><td>925</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>setb4xy</td><td>15 x 12</td><td>flexible jobshop</td><td>910</td><td>910</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>setb4xyz</td><td>15 x 13</td><td>flexible jobshop</td><td>902</td><td>902</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>seti5c12</td><td>15 x 16</td><td>flexible jobshop</td><td>1169</td><td>1169</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>seti5cc</td><td>15 x 17</td><td>flexible jobshop</td><td>1135</td><td>1135</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>seti5x</td><td>15 x 16</td><td>flexible jobshop</td><td>1198</td><td>1198</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>seti5xx</td><td>15 x 17</td><td>flexible jobshop</td><td>1194</td><td>1194</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>seti5xxx</td><td>15 x 18</td><td>flexible jobshop</td><td>1194</td><td>1194</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>seti5xy</td><td>15 x 17</td><td>flexible jobshop</td><td>1135</td><td>1135</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>seti5xyz</td><td>15 x 18</td><td>flexible jobshop</td><td>1125</td><td>1125</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

#### Kacem, Hammadi and Borne (2002)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>kacem1</td><td>4 x 6</td><td>flexible jobshop</td><td>11</td><td>11</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>kacem2</td><td>10 x 7</td><td>flexible jobshop</td><td>11</td><td>11</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>kacem3</td><td>10 x 10</td><td>flexible jobshop</td><td>7</td><td>7</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>kacem4</td><td>15 x 10</td><td>flexible jobshop</td><td>11</td><td>11</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>


#### Fattahi, Mehrabad and Jolai (2007)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>fattahi1</td><td>2 x 2</td><td>flexible jobshop</td><td>66</td><td>66</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi2</td><td>2 x 2</td><td>flexible jobshop</td><td>107</td><td>107</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi3</td><td>3 x 2</td><td>flexible jobshop</td><td>221</td><td>221</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi4</td><td>3 x 2</td><td>flexible jobshop</td><td>355</td><td>355</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi5</td><td>3 x 2</td><td>flexible jobshop</td><td>119</td><td>119</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi6</td><td>3 x 2</td><td>flexible jobshop</td><td>320</td><td>320</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi7</td><td>3 x 5</td><td>flexible jobshop</td><td>397</td><td>397</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi8</td><td>3 x 4</td><td>flexible jobshop</td><td>253</td><td>253</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi9</td><td>3 x 3</td><td>flexible jobshop</td><td>210</td><td>210</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi10</td><td>4 x 5</td><td>flexible jobshop</td><td>516</td><td>516</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi11</td><td>5 x 6</td><td>flexible jobshop</td><td>468</td><td>468</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi12</td><td>5 x 7</td><td>flexible jobshop</td><td>446</td><td>446</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi13</td><td>6 x 7</td><td>flexible jobshop</td><td>466</td><td>466</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi14</td><td>7 x 7</td><td>flexible jobshop</td><td>554</td><td>554</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi15</td><td>7 x 7</td><td>flexible jobshop</td><td>514</td><td>514</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi16</td><td>8 x 7</td><td>flexible jobshop</td><td>634</td><td>634</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi17</td><td>8 x 7</td><td>flexible jobshop</td><td>879</td><td>879</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi18</td><td>9 x 8</td><td>flexible jobshop</td><td>884</td><td>884</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi19</td><td>11 x 8</td><td>flexible jobshop</td><td>1055</td><td>1055</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>fattahi20</td><td>12 x 8</td><td>flexible jobshop</td><td>1196</td><td>1196</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
</table>

#### Behnke and Geiger (2012)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>behnke1</td><td>10 x 20</td><td>flexible jobshop</td><td>90</td><td>90</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke2</td><td>10 x 20</td><td>flexible jobshop</td><td>91</td><td>91</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke3</td><td>10 x 20</td><td>flexible jobshop</td><td>91</td><td>91</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke4</td><td>10 x 20</td><td>flexible jobshop</td><td>97</td><td>97</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke5</td><td>10 x 20</td><td>flexible jobshop</td><td>91</td><td>91</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke6</td><td>20 x 20</td><td>flexible jobshop</td><td>125</td><td>125</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke7</td><td>20 x 20</td><td>flexible jobshop</td><td>117</td><td>124</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>behnke8</td><td>20 x 20</td><td>flexible jobshop</td><td>123</td><td>123</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke9</td><td>20 x 20</td><td>flexible jobshop</td><td>125</td><td>125</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke10</td><td>20 x 20</td><td>flexible jobshop</td><td>127</td><td>127</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke11</td><td>50 x 20</td><td>flexible jobshop</td><td>223</td><td>228</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke12</td><td>50 x 20</td><td>flexible jobshop</td><td>213</td><td>219</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke13</td><td>50 x 20</td><td>flexible jobshop</td><td>223</td><td>229</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke14</td><td>50 x 20</td><td>flexible jobshop</td><td>221</td><td>230</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke15</td><td>50 x 20</td><td>flexible jobshop</td><td>219</td><td>228</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke16</td><td>100 x 20</td><td>flexible jobshop</td><td>391</td><td>412</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke17</td><td>100 x 20</td><td>flexible jobshop</td><td>392</td><td>401</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke18</td><td>100 x 20</td><td>flexible jobshop</td><td>390</td><td>396</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke19</td><td>100 x 20</td><td>flexible jobshop</td><td>395</td><td>400</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke20</td><td>100 x 20</td><td>flexible jobshop</td><td>391</td><td>398</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke21</td><td>10 x 40</td><td>flexible jobshop</td><td>85</td><td>85</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke22</td><td>10 x 40</td><td>flexible jobshop</td><td>87</td><td>87</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke23</td><td>10 x 40</td><td>flexible jobshop</td><td>85</td><td>85</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke24</td><td>10 x 40</td><td>flexible jobshop</td><td>87</td><td>87</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke25</td><td>10 x 40</td><td>flexible jobshop</td><td>87</td><td>87</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke26</td><td>20 x 40</td><td>flexible jobshop</td><td>113</td><td>113</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke27</td><td>20 x 40</td><td>flexible jobshop</td><td>122</td><td>122</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke28</td><td>20 x 40</td><td>flexible jobshop</td><td>114</td><td>114</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke29</td><td>20 x 40</td><td>flexible jobshop</td><td>116</td><td>117</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke30</td><td>20 x 40</td><td>flexible jobshop</td><td>120</td><td>120</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke31</td><td>50 x 40</td><td>flexible jobshop</td><td>226</td><td>226</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke32</td><td>50 x 40</td><td>flexible jobshop</td><td>220</td><td>224</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke33</td><td>50 x 40</td><td>flexible jobshop</td><td>223</td><td>224</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke34</td><td>50 x 40</td><td>flexible jobshop</td><td>219</td><td>223</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke35</td><td>50 x 40</td><td>flexible jobshop</td><td>211</td><td>214</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke36</td><td>100 x 40</td><td>flexible jobshop</td><td>381</td><td>388</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke37</td><td>100 x 40</td><td>flexible jobshop</td><td>387</td><td>391</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke38</td><td>100 x 40</td><td>flexible jobshop</td><td>386</td><td>389</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke39</td><td>100 x 40</td><td>flexible jobshop</td><td>384</td><td>389</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke40</td><td>100 x 40</td><td>flexible jobshop</td><td>415</td><td>419</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>behnke41</td><td>10 x 60</td><td>flexible jobshop</td><td>87</td><td>87</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke42</td><td>10 x 60</td><td>flexible jobshop</td><td>87</td><td>87</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke43</td><td>10 x 60</td><td>flexible jobshop</td><td>86</td><td>86</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke44</td><td>10 x 60</td><td>flexible jobshop</td><td>84</td><td>84</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke45</td><td>10 x 60</td><td>flexible jobshop</td><td>87</td><td>87</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">toy</td><td>OptalCP in < 1m</td></tr>
<tr><td>behnke46</td><td>20 x 60</td><td>flexible jobshop</td><td>114</td><td>114</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke47</td><td>20 x 60</td><td>flexible jobshop</td><td>117</td><td>117</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke48</td><td>20 x 60</td><td>flexible jobshop</td><td>124</td><td>125</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke49</td><td>20 x 60</td><td>flexible jobshop</td><td>113</td><td>113</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke50</td><td>20 x 60</td><td>flexible jobshop</td><td>123</td><td>123</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>behnke51</td><td>50 x 60</td><td>flexible jobshop</td><td>215</td><td>218</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke52</td><td>50 x 60</td><td>flexible jobshop</td><td>210</td><td>212</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke53</td><td>50 x 60</td><td>flexible jobshop</td><td>211</td><td>215</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke54</td><td>50 x 60</td><td>flexible jobshop</td><td>221</td><td>223</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke55</td><td>50 x 60</td><td>flexible jobshop</td><td>221</td><td>223</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke56</td><td>100 x 60</td><td>flexible jobshop</td><td>384</td><td>390</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke57</td><td>100 x 60</td><td>flexible jobshop</td><td>385</td><td>390</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke58</td><td>100 x 60</td><td>flexible jobshop</td><td>392</td><td>397</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke59</td><td>100 x 60</td><td>flexible jobshop</td><td>392</td><td>398</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
<tr><td>behnke60</td><td>100 x 60</td><td>flexible jobshop</td><td>397</td><td>402</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb DOFP2026a | ub OptalCP</td></tr>
</table>

#### Birgin et al. (2014) - arbitrary precedence DAGs

[Results to be published soon]



### Publications (best known solutions)

The upper and lower bounds come from

 - MG2000 (1 bounds in la) : **M. Mastrolilli, L. Gambardella**, Effective neighbourhood functions for the flexible job shop problem, Journal of Scheduling 3 (2000) 3–20

 - Quintiq (31 bounds in  mk, dpp, abz, car and la) : **Quintiq** http://www.quintiq.com/optimization/fjssp-world-records.html (2013) - this site doesn't exist anymore

 - CPO2013 (14 bounds in abz, la and dpp) : **Jean-François Puget** Solving flexible job shop scheduling problems (cp optimizer 12.6)  https://www.ibm.com/developerworks/community/blogs/jfp/entry/solving\_flexible\_job\_shop\_scheduling\_problems?lang=en (2013) - this site doesn't exist anymore

 - DLLSXG2019 (8 bounds in dpp, abz and la) : **J. Ding, Z. Lu, C.-M. Li, L. Shen, L. Xu, F. Glover** (2019) [A two-individual based evolutionary algorithm for the flexible job shop scheduling problem](https://dl.acm.org/doi/pdf/10.1609/aaai.v33i01.33012262), in: Proceedings of the AAAI Conference on Artificial Intelligence, Vol. 33, 2019, pp. 2262–2271

 - CdGKGC2025 (14 bounds in #a, abz, car, la) : **Marc-Emmanuel Coupvent des Graviers, Lotfi Kobrosly, Christophe Guettier, and Tristan Cazenave** (2025). [Updating Lower and Upper Bounds for the Job-Shop Scheduling Problem Test Instances](https://arxiv.org/abs/2504.16106) CoRR abs/2504.16106

- DOFP2026a (36 bounds in mk, behnke and la) : **Diego Olivier Fernandez Pons** (2026) Personal communication, study / test to improve OptalCP


All other bounds were found with OptalCP
