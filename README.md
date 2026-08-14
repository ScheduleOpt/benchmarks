---
layout: default
title: Benchmark of scheduling problems
permalink: /
---

## Benchmark of scheduling problems

This is a comprehensive benchmark library for various scheduling problem  with three components:
- **Instance repository** — a centralized set of instances 
- **Engine benchmark** — a standardized 10-minute comparison of reference solvers (CPO, CP-SAT, OptalCP, Cplex), measuring each engine's optimality gap and deviation from the best known bounds.
- **Best-known-solutions archive** — a running record of the best upper/lower bounds ever found for each instance, from any source (published papers, meta-heuristics, or engine runs) — not limited to the reference engines above.

<br/>

The problems that are benchmarked so far are
- [Jobshop (JSPLib)](https://scheduleopt.github.io/benchmarks/jsplib/)
- [Flexible jobshop (FJSPLib)](https://scheduleopt.github.io/benchmarks/fjsplib/)

We are working on adding rcpsp and workforce scheduling problems (stay tuned...)

<br/>

The reference engines used are
- [**IBM ILOG Cplex**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : a state-of-the-art ***MIP*** engine
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the ***CP-scheduling*** family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the ***lazy clause generation*** family of engines
- [**OptalCP**](https://optalcp.com) : representative of the ***CP-scheduling*** family of engines


<br/>

Other interesting repositories include
- [IBM CP Optimizer examples](https://github.com/plaborie/cpoptimizer-examples/tree/main)
- [OptalCP examples](https://github.com/ScheduleOpt/optalcp-benchmarks)