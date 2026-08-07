---
layout: default
title: About
permalink: /
---

## Benchmark of scheduling problems

This benchmark of scheduling problems is intended to compare scheduling engines to the state-of-the-art techniques (heuristics, meta-heuristics, decompositions, etc)

- [**IBM ILOG Cplex**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : a state-of-the-art ***MIP*** engine
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the ***CP-scheduling*** family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the ***lazy clause generation*** family of engines
- [**OptalCP**](https://optalcp.com) : representative of the ***CP-scheduling*** family of engines

<br/>

The problems that are benchmarked so far are
- [Flexible jobshop (FJSPLib)](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible%20jobshop)
- [Jobshop (JSPLib)](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop)
- [Openshop](https://github.com/ScheduleOpt/benchmarks/tree/main/openshop)

We are working on adding rcpsp and workforce scheduling problems (stay tuned...)

<br/>

The data and source code can be found in the [Github repository](https://github.com/ScheduleOpt/benchmarks). One document per type of problem (jobshop, flexible jobshop, ...) provides
- **Instance repository** — a centralized set of classic instances
- **Engine benchmark** — a standardized 10-minute comparison of reference solvers (CPO, CP-SAT, OptalCP, Cplex), measuring each engine's optimality gap and deviation from the best known bounds.
- **Best-known-solutions archive** — a running record of the best upper/lower bounds ever found for each instance, from any source (published papers, meta-heuristics, or engine runs) — not limited to the reference engines above.

Each summary document is visible as a README.md in the Github folder ([jobshop](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop), [flexible jobshop](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible%20jobshop)) or as webpages ([jobshop](https://scheduleopt.github.io/benchmarks/jsplib), [flexible jobshop](https://scheduleopt.github.io/benchmarks/fjsplib))

<br/>

The benchmark, best known solutions, repository and website are maintained by [OptalCP](https://optalcp.org) that is also the editor of the OptalCP scheduling engine. The benchmark was initially meant as a training dataset for OptalCP tuning and was subsequently made public.

Other interesting repositories include
- [IBM CP Optimizer examples](https://github.com/plaborie/cpoptimizer-examples/tree/main)
- [OptalCP examples](https://github.com/ScheduleOpt/optalcp-benchmarks)