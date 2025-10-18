---
layout: page
title: About
permalink: /
---

## Benchmark of scheduling problems

This benchmark of scheduling problems is intended to compare scheduling engines to the state-of-the-art techniques (heuristics, meta-heuristics, decompositions, etc)

The engines that are benchmarked are
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
- A mathematical description of the problem and its main variants
- The instance classified in `easy`, `medium`, `hard`, (presumed) `closed` or `open`
- A description of the most common data formats for those instances
- The best known solutions from published results or engines 
- A list of relevant publications (for problems and solutions)

Each summary document is visible as a README.md in the Github folder ([jobshop](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop), [flexible jobshop](https://github.com/ScheduleOpt/benchmarks/tree/main/flexible%20jobshop)) or as webpages ([jobshop](https://scheduleopt.github.io/benchmarks/jsplib), [flexible jobshop](https://scheduleopt.github.io/benchmarks/fjsplib))

<br/>

The benchmark, best known solutions, repository and website are maintained by [OptalCP](https://optalcp.org) that is also the editor of the OptalCP scheduling engine. The benchmark was initially meant as a training dataset for OptalCP tuning and was subsequently made public.

Other interesting repositories include
- [IBM CP Optimizer examples](https://github.com/plaborie/cpoptimizer-examples/tree/main)
- [OptalCP examples](https://github.com/ScheduleOpt/optalcp-benchmarks)