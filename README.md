# Benchmark of scheduling problems

This benchmark of scheduling problems is intended to compare scheduling engines to the state-of-the-art techniques (heuristics, meta-heuristics, decompositions, etc)

The engines that are benchmarked are
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the **CP-scheduling** family of engines
- [**OptalCP**](https://optalcp.com) : representative of the **CP-scheduling** family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the **CP-SAT** family of engines

<br/>

The problems that are benchmarked so far are
- [Jobshop](https://github.com/ScheduleOpt/benchmarks/tree/main/instances/manufacturing/jobshop-and-variants)
- [Openshop](https://github.com/ScheduleOpt/benchmarks/tree/main/instances/manufacturing/open-shop)

We are working on adding rcpsp and workforce scheduling problems (stay tuned...)

<br/>

For each benchmark you will find
- A mathematical description of the problem and its main variants
- The instance files (usually > 1000) classified in `easy`, `medium`, `hard` or `open`
- A description of the most common data formats for those instances
- The best known solutions from published results or engines 
- A list of relevant publications (for problems and solutions)
- Subsets of problems of interest (large, small but still open)


