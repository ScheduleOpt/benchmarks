---
layout: default
title: JSPLib
permalink: /jsplib
---

<script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>


## Job shop benchmarks for the engine era

The old job shop problem is changing fast! 
- **Optimization engines are transforming the field**. Modern engines are becoming increasingly robust across large collections of instances and problem variants.
- **Benchmarks are becoming more industrial**. We are moving beyond square, random, non-reentrant instances towards instances that represent real industrial problems
- **Lower bounds matter as much as upper bounds**. From decompositions to pruning and proofs of optimality, lower bounds are essential to performance.

What is in the JSPLib?
- **Instances and results**: a repository of instances, best-known results with their history, primal and dual certificates
- **Engine benchmarks**: a standardized 10-minute comparison of engines with deviations with respect to the best known results
- **Lower bound analysis**: an analysis of lower bounds, their certificates and how they affect the instance difficulty 

Everything is open: the code, the instances, the engine results, and the history of best-known bounds.

- **Code:** [GitHub repository](https://github.com/ScheduleOpt/benchmarks), including the scripts to rerun the benchmarks
- **Instances:** [JSON](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/instances/json) or [text](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/instances/text) format
- **Engine results:** [standardized benchmark results](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions) for each engine on each instance, in JSON
- **Best-known bounds:** a [JSON file](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions/bks.json) of upper and lower bounds, tracing how each one evolved

This page is also the README.md of the [jobshop folder](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop) on GitHub, and is published as a [webpage](https://scheduleopt.github.io/benchmarks/jsplib).

### Table of Contents

- [Engines: the reproducible state of the art](#engines-the-reproducible-state-of-the-art)
  - [What we measure](#what-we-measure)
  - [The reference engines](#the-reference-engines)
  - [Results](#results)
  - [Caveats](#caveats)
- [Instances: shift towards industrial representativity](#instances-shift-towards-industrial-representativity)
  - [New instance organization](#new-instance-organization)
  - [Beyond non-reentrancy](#beyond-non-reentrancy)
  - [Difficulty classification of the jobshop instances](#difficulty-classification-of-the-jobshop-instances)
- [Lower bounds: certification and analysis](#lower-bounds-certification-and-analysis)
  - [Certificates for lower bounds](#certificates-for-lower-bounds)
  - [Analytic Lower bounds](#analytic-lower-bounds)
  - [Relaxation certificates](#relaxation-certificates)
  - [Engine trace certificates](#engine-trace-certificates)
- [Best-known bounds: provenance and history](#best-known-bounds-provenance-and-history)
  - [Industrial instances](#industrial-instances)
  - [Random instances](#random-instances)
  - [Stress-test](#stress-test)
  - [Publications (best known solutions)](#publications-best-known-solutions)
- [Historical appendix](#historical-appendix)
  - [History of jsplib instances](#history-of-jsplib-instances)
  - [History of jsplib](#history-of-jsplib)
  - [History of the engines](#history-of-the-engines)
 
<br/>

## Engines: the reproducible state of the art

Optimization engines have become the reference players in job shop scheduling for their ability to handle complex side constraints, refine heuristic solutions and prove optimality.

JSPLib tracks this with a standardized benchmark of four reference engines with a fixed 10-minute budget, and a record of best known upper and lower bounds. 

### What we measure

- **Proofs:** how many instances the engine solves to proven optimality within 10 minutes
- **Upper bound deviation:** how close its best solution gets to the best known upper bound
- **Lower bound deviation:** how close its proven bound gets to the best known lower bound

We average geometrically, as the MIP community does in the Mittelmann benchmarks, to limit the influence of outliers.

- **Geometric average of the lower bound to best known lower bound ratio**

$$LB_{avg} = \exp\left(\frac{1}{N} \sum_k\log\frac{LB_k}{LB_{best,k}}\right)$$

- **Geometric average of the upper bound to best known upper bound ratio**

$$UB_{avg} = \exp\left(\frac{1}{N} \sum_k\log\frac{UB_k}{UB_{best,k}}\right)$$

- **Geometric shifted average of the gap**

$$GAP = \exp\left(\frac{1}{N} \sum_k\log\left(1 + \frac{UB_k - LB_k}{UB_k}\right)\right) - 1$$


### The reference engines

| Engine | Family | Version tested | Release date |
|---|---|---|---|
| IBM ILOG Cplex | MIP | 22.1.1.0 | 2022-12 |
| IBM ILOG CP Optimizer (CPO) | CP scheduling | 22.1.1.0 | 2022-12 |
| Google OR-Tools CP-SAT | Lazy clause generation | 9.15.6755 | 2026-01 |
| OptalCP | CP scheduling | 2026.4.0 | 2026-04 |

[Engine histories](#appendix-engine-histories) are in the appendix.

### Results

Comparisons were performed on a Windows PC with an i7 4-core 3GHz 32GB RAM in 600 seconds.

When an engine provides upper and lower bounds for an instance, the instance is labelled `solved` and is counted in the geometric mean. Because deviations and gaps are done only counting those instances, engines that fail on the hardest instances have artificially better averages. When this is the case, the corresponding averages are colored in red to signal values should be taken with caution.

<table>
<tr><th>solver</th><th>ran</th><th>solved</th><th>optimal</th><th>opt</th><th>lb_dev</th><th>ub_dev</th><th>gap</th></tr>
<tr><td>Cplex</td><td>231</td><td style="color:red">147</td><td>0</td><td>0%</td><td style="color:red">0.55</td><td style="color:red">1.33</td><td style="color:red">55%</td></tr>
<tr><td>CPO</td><td>231</td><td >231</td><td>52</td><td>23%</td><td >0.83</td><td >1.06</td><td >13%</td></tr>
<tr><td>CP-SAT</td><td>231</td><td style="color:red">205</td><td>46</td><td>20%</td><td style="color:red">0.99</td><td style="color:red">1.05</td><td style="color:red">7%</td></tr>
<tr><td>OptalCP</td><td>231</td><td >231</td><td>80</td><td>35%</td><td >0.99</td><td >1.02</td><td >5%</td></tr>
</table>


#### Detailed results

<details>
<summary>Per type</summary>
<table>
<tr><th>group</th><th>solver</th><th>ran</th><th>solved</th><th>optimal</th><th>opt</th><th>lb_dev</th><th>ub_dev</th><th>gap</th></tr>
<tr><td rowspan="4">industrial</td><td>Cplex</td><td>44</td><td style="color:red">0</td><td>0</td><td>0%</td><td style="color:red">NaN</td><td style="color:red">NaN</td><td style="color:red">NaN%</td></tr>
<tr><td>CPO</td><td>44</td><td >44</td><td>26</td><td>59%</td><td >0.70</td><td >1.10</td><td >16%</td></tr>
<tr><td>CP-SAT</td><td>44</td><td style="color:red">38</td><td>26</td><td>59%</td><td style="color:red">1.00</td><td style="color:red">1.07</td><td style="color:red">5%</td></tr>
<tr><td>OptalCP</td><td>44</td><td >44</td><td>38</td><td>86%</td><td >1.00</td><td >1.04</td><td >2%</td></tr>
<tr><td rowspan="4">random</td><td>Cplex</td><td>177</td><td style="color:red">147</td><td>0</td><td>0%</td><td style="color:red">0.55</td><td style="color:red">1.33</td><td style="color:red">55%</td></tr>
<tr><td>CPO</td><td>177</td><td >177</td><td>26</td><td>15%</td><td >0.86</td><td >1.04</td><td >11%</td></tr>
<tr><td>CP-SAT</td><td>177</td><td style="color:red">167</td><td>20</td><td>11%</td><td style="color:red">0.98</td><td style="color:red">1.04</td><td style="color:red">7%</td></tr>
<tr><td>OptalCP</td><td>177</td><td >177</td><td>42</td><td>24%</td><td >0.99</td><td >1.02</td><td >4%</td></tr>
<tr><td rowspan="4">stress-test</td><td>Cplex</td><td>10</td><td style="color:red">0</td><td>0</td><td>0%</td><td style="color:red">NaN</td><td style="color:red">NaN</td><td style="color:red">NaN%</td></tr>
<tr><td>CPO</td><td>10</td><td >10</td><td>0</td><td>0%</td><td >0.97</td><td >1.23</td><td >47%</td></tr>
<tr><td>CP-SAT</td><td>10</td><td style="color:red">0</td><td>0</td><td>0%</td><td style="color:red">NaN</td><td style="color:red">NaN</td><td style="color:red">NaN%</td></tr>
<tr><td>OptalCP</td><td>10</td><td >10</td><td>0</td><td>0%</td><td >1.00</td><td >1.11</td><td >39%</td></tr>
</table>
</details>

<details>
<summary>Per family</summary>
<table>
<tr><th>group</th><th>solver</th><th>ran</th><th>solved</th><th>optimal</th><th>opt</th><th>lb_dev</th><th>ub_dev</th><th>gap</th></tr>
<tr><td rowspan="4">abz</td><td>Cplex</td><td>3</td><td >3</td><td>0</td><td>0%</td><td >0.71</td><td >1.13</td><td >38%</td></tr>
<tr><td>CPO</td><td>3</td><td >3</td><td>0</td><td>0%</td><td >0.94</td><td >1.01</td><td >7%</td></tr>
<tr><td>CP-SAT</td><td>3</td><td >3</td><td>0</td><td>0%</td><td >0.97</td><td >1.01</td><td >4%</td></tr>
<tr><td>OptalCP</td><td>3</td><td >3</td><td>1</td><td>33%</td><td >0.98</td><td >1.00</td><td >2%</td></tr>
<tr><td rowspan="4">swv</td><td>Cplex</td><td>20</td><td >20</td><td>0</td><td>0%</td><td >0.38</td><td >1.22</td><td >65%</td></tr>
<tr><td>CPO</td><td>20</td><td >20</td><td>7</td><td>35%</td><td >0.98</td><td >1.02</td><td >4%</td></tr>
<tr><td>CP-SAT</td><td>20</td><td >20</td><td>6</td><td>30%</td><td >0.99</td><td >1.02</td><td >4%</td></tr>
<tr><td>OptalCP</td><td>20</td><td >20</td><td>10</td><td>50%</td><td >0.99</td><td >1.01</td><td >2%</td></tr>
<tr><td rowspan="4">yn</td><td>Cplex</td><td>4</td><td >4</td><td>0</td><td>0%</td><td >0.79</td><td >1.13</td><td >30%</td></tr>
<tr><td>CPO</td><td>4</td><td >4</td><td>0</td><td>0%</td><td >0.90</td><td >1.02</td><td >11%</td></tr>
<tr><td>CP-SAT</td><td>4</td><td >4</td><td>0</td><td>0%</td><td >0.94</td><td >1.03</td><td >8%</td></tr>
<tr><td>OptalCP</td><td>4</td><td >4</td><td>0</td><td>0%</td><td >0.95</td><td >1.01</td><td >6%</td></tr>
<tr><td rowspan="4">dmu</td><td>Cplex</td><td>80</td><td >80</td><td>0</td><td>0%</td><td >0.52</td><td >1.41</td><td >60%</td></tr>
<tr><td>CPO</td><td>80</td><td >80</td><td>16</td><td>20%</td><td >0.97</td><td >1.04</td><td >7%</td></tr>
<tr><td>CP-SAT</td><td>80</td><td >80</td><td>10</td><td>13%</td><td >0.99</td><td >1.05</td><td >7%</td></tr>
<tr><td>OptalCP</td><td>80</td><td >80</td><td>23</td><td>29%</td><td >0.99</td><td >1.02</td><td >4%</td></tr>
<tr><td rowspan="4">ta</td><td>Cplex</td><td>40</td><td >40</td><td>0</td><td>0%</td><td >0.68</td><td >1.27</td><td >45%</td></tr>
<tr><td>CPO</td><td>40</td><td >40</td><td>3</td><td>8%</td><td >0.96</td><td >1.02</td><td >6%</td></tr>
<tr><td>CP-SAT</td><td>40</td><td >40</td><td>4</td><td>10%</td><td >0.98</td><td >1.02</td><td >4%</td></tr>
<tr><td>OptalCP</td><td>40</td><td >40</td><td>8</td><td>20%</td><td >0.99</td><td >1.01</td><td >3%</td></tr>
<tr><td rowspan="4">tai</td><td>Cplex</td><td>40</td><td style="color:red">0</td><td>0</td><td>0%</td><td style="color:red">NaN</td><td style="color:red">NaN</td><td style="color:red">NaN%</td></tr>
<tr><td>CPO</td><td>40</td><td >40</td><td>0</td><td>0%</td><td >0.58</td><td >1.11</td><td >39%</td></tr>
<tr><td>CP-SAT</td><td>40</td><td style="color:red">20</td><td>0</td><td>0%</td><td style="color:red">0.99</td><td style="color:red">1.10</td><td style="color:red">18%</td></tr>
<tr><td>OptalCP</td><td>40</td><td >40</td><td>0</td><td>0%</td><td >1.00</td><td >1.04</td><td >15%</td></tr>
<tr><td rowspan="4">dct</td><td>Cplex</td><td>24</td><td style="color:red">0</td><td>0</td><td>0%</td><td style="color:red">NaN</td><td style="color:red">NaN</td><td style="color:red">NaN%</td></tr>
<tr><td>CPO</td><td>24</td><td >24</td><td>6</td><td>25%</td><td >0.52</td><td >1.19</td><td >32%</td></tr>
<tr><td>CP-SAT</td><td>24</td><td style="color:red">18</td><td>6</td><td>25%</td><td style="color:red">1.00</td><td style="color:red">1.16</td><td style="color:red">11%</td></tr>
<tr><td>OptalCP</td><td>24</td><td >24</td><td>18</td><td>75%</td><td >1.00</td><td >1.07</td><td >5%</td></tr>
<tr><td rowspan="4">bel</td><td>Cplex</td><td>20</td><td style="color:red">0</td><td>0</td><td>0%</td><td style="color:red">NaN</td><td style="color:red">NaN</td><td style="color:red">NaN%</td></tr>
<tr><td>CPO</td><td>20</td><td >20</td><td>20</td><td>100%</td><td >1.00</td><td >1.00</td><td >0%</td></tr>
<tr><td>CP-SAT</td><td>20</td><td >20</td><td>20</td><td>100%</td><td >1.00</td><td >1.00</td><td >0%</td></tr>
<tr><td>OptalCP</td><td>20</td><td >20</td><td>20</td><td>100%</td><td >1.00</td><td >1.00</td><td >0%</td></tr>
</table>
</details>

<details>
<summary>Legacy</summary>
<table>
<tr><th>group</th><th>solver</th><th>ran</th><th>solved</th><th>optimal</th><th>opt</th><th>lb_dev</th><th>ub_dev</th><th>gap</th></tr>
<tr><td rowspan="4">legacy</td><td>Cplex</td><td>145</td><td style="color:red">111</td><td>27</td><td>19%</td><td style="color:red">0.71</td><td style="color:red">1.19</td><td style="color:red">29%</td></tr>
<tr><td>CPO</td><td>145</td><td >145</td><td>140</td><td>97%</td><td >1.00</td><td >1.00</td><td >0%</td></tr>
<tr><td>CP-SAT</td><td>145</td><td >145</td><td>119</td><td>82%</td><td >0.94</td><td >1.00</td><td >2%</td></tr>
<tr><td>OptalCP</td><td>145</td><td >145</td><td>143</td><td>99%</td><td >1.00</td><td >1.00</td><td >0%</td></tr>
</table>
</details>


### Caveats

- **Non-determinism.** Two runs of the same engine on the same machine can differ significantly. Do not read much into differences of a few percent.
- **Hardware.** An engine's behavior changes with core count and memory speed. We use a 4-core 3 GHz i7 with 32 GB of RAM, which is a laptop-class machine. CP-SAT recommends 8 to 16 cores and CPO does most of its work on 1 or 2. 

We recommend running the benchmark on your own machines. The [code and instructions](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/code) are in the repository, and the raw results are in the [solutions](https://github.com/ScheduleOpt/benchmarks/tree/main/jobshop/solutions) folder.


## Instances: shift towards industrial representativity

### New instance organization

We have reorganized the instances in new groups
- ***Legacy***: all instances that are too easy for modern software
    - `ft`,  `la`, `orb`, `abz[5-6]`,  `ta[01-10]`, `ta[51-80]` and the 50 easy `tai`
    - `ta62` and `ta67` are not easy, just collateral victims
    - updates on legacy instances will be discontinued
- ***Industrial***: instances that were generated in a way that mimics real problems
    - `bel` and `dct` 
- ***Random***: randomly generated instances without any special structure
    - `abz[7-9]`, `swv`, `yn`, `ta[11-50]`, `dmu`, `tai` 100 x 100, 1000 x 100 and 100 x 1000
- ***Stress-test***: instances generated to test the limit of engines due to their sheer size but without any specific structure
    - `tai` 1000 x 1000

### Beyond non-reentrancy

Not only are industrial instances reentrant but the reentrant-jobshop is a sub-problem of the flexible-jobshop after assignment of tasks to machines. Therefore JSPLib won't make the distinction between jobshop and reentrant jobshop anymore, all instances are considered potentially reentrant.
We have generated jobshop subproblems of the Dauzère-Pérès flexible jobshop problems for users to start testing their algorithms on reentrant jobshops [WORK IN PROGRESS]

### Difficulty classification of the jobshop instances

We use the following criteria for classification of the instances

- <strong style="color:cornflowerblue">trivial</strong>: solved to optimality (with proof) in 1 minute by at least 1 reference engine
- <strong style="color:green">easy</strong>: solved to optimality (with proof) in 10 minute by at least 1 reference engine
- <strong style="color:orange">medium</strong>: solved to optimality (with proof) in 1 hour by at least 1 reference engine
- <strong style="color:red">hard</strong>: solved to optimality (with proof) in more than 1 hour by at least 1 reference engine
- <strong style="color:purple">closed</strong>: *allegedly* solved to optimality. Most of the time the optimal solution is known because 2 different methods independently found equal upper and lower bounds. The problem is reclassified into trivial, easy, medium or hard when a reference engine is able to reproduce the results.
- <strong style="color:grey">open</strong>: no proof of optimality

[`toy` was changed to `trivial` because some commentators consider a toy instance to be a small instance for debugging, and some instances solved in < 1 min have hundreds of thousands of tasks]


Currently there are

Random (177)
- `abz`: 1 easy, 1 medium, 1 hard
- `swv`: 9 trivial, 2 easy, 3 medium, 3 hard, 3 open
- `yn`: 4 hard
- `ta`: 5 trivial, 5 easy, 11 medium, 7 hard, 12 open
- `dmu`: 19 trivial, 5 easy, 6 medium, 5 hard, 45 open
- `tai`: 2 medium, 8 hard, 20 open

Industrial (44)
- `dct`: 21 trivial, 2 medium, 1 open
- `bel`: 20 trivial

Stress-test (10)
- `tai`: 10 open

Legacy (145) : 141 trivial, 2 easy, 1 medium, 1 hard

<br/>

## Lower bounds: certification and analysis 

### Certificates for lower bounds

Schedules are certificates for upper bounds that are easy to verify. Certifying the validity of lower bounds however is more complex. Certificates can come from various origins and depending on the certificate they are more or less difficult to verify.
- **Analytic lower bounds** : Formulas and simple polynomial algorithms. The certification is provided by an external theorem that guarantees their validity. Anyone can easily compute their value to check the result. 
- **Relaxations** : A sub-problem of the jobshop can be solved to optimality leading to a lower bound certificate. An external theorem supports the reduction but the computation relies on third party tools. Confidence in the result is provided by the agreement of the external tools and the trust we place in them. These tools may themselves provide independently verifiable certificates.
- **Propagation strengthening** and **destructive lower bounds** : because lower bounds and relaxations often provide a support (a partial solution), they can be combined with propagation of the constraints in the original problem like precedences and no overlap, and be iterated till fixpoint. This can be seen as a mini-engine without search. While the relaxation is based on a theorem, the code required to embed and propagate requires care.
- **Engine specific certificates** an engine can output a (logically compressed) trace of its deductions for external tools to verify that all the steps it took are correct. This is the case SAT engines that output certificates. While this is considered the golden standard in SAT communities, we see it as a certificate that is poorly informative / lacks minimality.

In the same way we favor reproducibility for solutions, we favor certificates that are easy to reproduce and do not depend on a specific engine.

### Analytic Lower bounds

We consider the following lower bounds 

- **Job length**

$$\max_j \left [ \sum_k p^j_k \right ]$$

- **Machine length**
    - refined with min heads and min tails $\sum_{i \prec j} p_i = head_j$ and $\sum_{i \prec j} p_j = tail_i$

    - refined with the fact that the first and last task must be different (_almost no impact_)

$$\max_m \left [ \min_{i \neq j \in m}\bigg(\mathrm{head}_i + \mathrm{tail}_j \bigg) + \sum_{o \in m} p_o \right ]$$

- **Preemptive single machine relaxation with heads and tails** (Carlier)

The Carlier inequalities describe the polytope of the preemptive relaxation for a single machine with release and due dates (authorized window). The preemptive relaxation can be either solved by Jackson algorithm ($n \log n$) or by maximization of the bound induced by Carlier inequalities ($n^3$)

$$\max_m\ \max_{i,j\in m} \left [ \mathrm{head}_i + \sum_{o \in m\ h_o \geq h_i\ t_o\geq t_j} p_o + \mathrm{tail}_j \right ]$$

- **Two machines and two tasks per job relaxation**

This polynomial relaxation is obtained by considering only two machines $a$ and $b$, and for each job ignoring all the tasks on other machines. If the problem is not reentrant, that leaves at most two tasks per job. All heads, tails and delays between tasks are ignored. This problem can be solved optimally by a variant of Johnson's algorithm. A lower bound is obtained for the full jobshop by solving to optimality the problem for each pair of machines.


- **Two jobs relaxation**

The jobshop with two jobs is polynomial per reduction to the shortest path problem. A lower bound is obtained for the full jobshop by solving to optimality the problem for each pair of jobs.

#### Overall results

We check how many best known lower bounds can be certified with each algorithm out of the 231 instances in the benchmark

<table>
<tr><th>Method</th><th>Number of best LB reached</th></tr>
<tr><td>Job</td><td >0</td></tr>
<tr><td>Machine</td><td >31</td></tr>
<tr><td>Carlier</td><td >41</td></tr>
<tr><td>2-job</td><td >0</td></tr>
<tr><td>2-machine</td><td >24</td></tr>
</table>

#### Lower bound certificates per family

We call **certification gap** the difference between the best known lower bound and the best certified lower bound.

<details>
<summary>abz</summary>
<table>
<tr><th>Instance</th><th>Job</th><th>Machine</th><th>Carlier</th><th>2-job</th><th>2-mach</th><th>Cert Gap</th><th>LB</th></tr>
<tr><td>abz7</td><td >410</td><td >638</td><td >650</td><td >459</td><td >556</td><td style="border-left: 2px solid black;"> -6</td><td>656</td></tr>
<tr><td>abz8</td><td >443</td><td >566</td><td >597</td><td >462</td><td >566</td><td style="border-left: 2px solid black;"> -70</td><td>667</td></tr>
<tr><td>abz9</td><td >467</td><td >606</td><td >616</td><td >495</td><td >563</td><td style="border-left: 2px solid black;"> -62</td><td>678</td></tr>
</table>
</details>

<details>
<summary>dmu</summary>
<table>
<tr><th>Instance</th><th>Job</th><th>Machine</th><th>Carlier</th><th>2-job</th><th>2-mach</th><th>Cert Gap</th><th>LB</th></tr>
<tr><td>dmu01</td><td >1753</td><td >2268</td><td >2363</td><td >1878</td><td >2179</td><td style="border-left: 2px solid black;"> -200</td><td>2563</td></tr>
<tr><td>dmu02</td><td >2167</td><td >2318</td><td >2452</td><td >2201</td><td >2277</td><td style="border-left: 2px solid black;"> -254</td><td>2706</td></tr>
<tr><td>dmu03</td><td >1872</td><td >2540</td><td >2571</td><td >2005</td><td >2350</td><td style="border-left: 2px solid black;"> -160</td><td>2731</td></tr>
<tr><td>dmu04</td><td >1908</td><td >2332</td><td >2486</td><td >2074</td><td >2332</td><td style="border-left: 2px solid black;"> -183</td><td>2669</td></tr>
<tr><td>dmu05</td><td >1827</td><td >2625</td><td >2654</td><td >1972</td><td >2455</td><td style="border-left: 2px solid black;"> -95</td><td>2749</td></tr>
<tr><td>dmu06</td><td >2585</td><td >2783</td><td >2834</td><td >2755</td><td >2533</td><td style="border-left: 2px solid black;"> -410</td><td>3244</td></tr>
<tr><td>dmu07</td><td >2545</td><td >2604</td><td >2677</td><td >2652</td><td >2354</td><td style="border-left: 2px solid black;"> -369</td><td>3046</td></tr>
<tr><td>dmu08</td><td >2493</td><td >2642</td><td >2901</td><td >2668</td><td >2642</td><td style="border-left: 2px solid black;"> -287</td><td>3188</td></tr>
<tr><td>dmu09</td><td >2544</td><td >2706</td><td >2739</td><td >2643</td><td >2466</td><td style="border-left: 2px solid black;"> -353</td><td>3092</td></tr>
<tr><td>dmu10</td><td >2394</td><td >2699</td><td >2716</td><td >2550</td><td >2488</td><td style="border-left: 2px solid black;"> -268</td><td>2984</td></tr>
<tr><td>dmu11</td><td >1913</td><td >3395</td><td >3395</td><td >2011</td><td >3395</td><td style="border-left: 2px solid black;"> -7</td><td>3402</td></tr>
<tr><td>dmu12</td><td >1902</td><td >3465</td><td style="background-color:green">3481</td><td >2044</td><td >3465</td><td style="border-left: 2px solid black;"> 0</td><td>3481</td></tr>
<tr><td>dmu13</td><td >1945</td><td >3450</td><td style="background-color:green">3681</td><td >2048</td><td >3450</td><td style="border-left: 2px solid black;"> 0</td><td>3681</td></tr>
<tr><td>dmu14</td><td >1798</td><td style="background-color:green">3394</td><td style="background-color:green">3394</td><td >1899</td><td style="background-color:green">3394</td><td style="border-left: 2px solid black;"> 0</td><td>3394</td></tr>
<tr><td>dmu15</td><td >1945</td><td >3296</td><td >3332</td><td >2059</td><td >3296</td><td style="border-left: 2px solid black;"> -11</td><td>3343</td></tr>
<tr><td>dmu16</td><td >2351</td><td >3726</td><td >3726</td><td >2466</td><td >3491</td><td style="border-left: 2px solid black;"> -8</td><td>3734</td></tr>
<tr><td>dmu17</td><td >2491</td><td >3697</td><td >3697</td><td >2569</td><td >3670</td><td style="border-left: 2px solid black;"> -36</td><td>3733</td></tr>
<tr><td>dmu18</td><td >2546</td><td style="background-color:green">3844</td><td style="background-color:green">3844</td><td >2652</td><td style="background-color:green">3844</td><td style="border-left: 2px solid black;"> 0</td><td>3844</td></tr>
<tr><td>dmu19</td><td >2315</td><td >3408</td><td >3650</td><td >2462</td><td >3408</td><td style="border-left: 2px solid black;"> -57</td><td>3707</td></tr>
<tr><td>dmu20</td><td >2586</td><td >3604</td><td >3604</td><td >2604</td><td >3604</td><td style="border-left: 2px solid black;"> -28</td><td>3632</td></tr>
<tr><td>dmu21</td><td >1873</td><td >4345</td><td style="background-color:green">4380</td><td >2013</td><td >4345</td><td style="border-left: 2px solid black;"> 0</td><td>4380</td></tr>
<tr><td>dmu22</td><td >1965</td><td >4712</td><td style="background-color:green">4725</td><td >2234</td><td >4712</td><td style="border-left: 2px solid black;"> 0</td><td>4725</td></tr>
<tr><td>dmu23</td><td >2038</td><td >4524</td><td style="background-color:green">4668</td><td >2126</td><td >4524</td><td style="border-left: 2px solid black;"> 0</td><td>4668</td></tr>
<tr><td>dmu24</td><td >2120</td><td style="background-color:green">4648</td><td style="background-color:green">4648</td><td >2182</td><td >4554</td><td style="border-left: 2px solid black;"> 0</td><td>4648</td></tr>
<tr><td>dmu25</td><td >1861</td><td style="background-color:green">4164</td><td style="background-color:green">4164</td><td >2027</td><td style="background-color:green">4164</td><td style="border-left: 2px solid black;"> 0</td><td>4164</td></tr>
<tr><td>dmu26</td><td >2627</td><td >4632</td><td style="background-color:green">4647</td><td >2688</td><td >4559</td><td style="border-left: 2px solid black;"> 0</td><td>4647</td></tr>
<tr><td>dmu27</td><td >2590</td><td style="background-color:green">4848</td><td style="background-color:green">4848</td><td >2731</td><td style="background-color:green">4848</td><td style="border-left: 2px solid black;"> 0</td><td>4848</td></tr>
<tr><td>dmu28</td><td >2537</td><td style="background-color:green">4692</td><td style="background-color:green">4692</td><td >2583</td><td >4538</td><td style="border-left: 2px solid black;"> 0</td><td>4692</td></tr>
<tr><td>dmu29</td><td >2505</td><td style="background-color:green">4691</td><td style="background-color:green">4691</td><td >2666</td><td style="background-color:green">4691</td><td style="border-left: 2px solid black;"> 0</td><td>4691</td></tr>
<tr><td>dmu30</td><td >2606</td><td >4707</td><td style="background-color:green">4732</td><td >2735</td><td >4670</td><td style="border-left: 2px solid black;"> 0</td><td>4732</td></tr>
<tr><td>dmu31</td><td >2159</td><td style="background-color:green">5640</td><td style="background-color:green">5640</td><td >2241</td><td style="background-color:green">5640</td><td style="border-left: 2px solid black;"> 0</td><td>5640</td></tr>
<tr><td>dmu32</td><td >2134</td><td style="background-color:green">5927</td><td style="background-color:green">5927</td><td >2264</td><td style="background-color:green">5927</td><td style="border-left: 2px solid black;"> 0</td><td>5927</td></tr>
<tr><td>dmu33</td><td >1828</td><td >5681</td><td style="background-color:green">5728</td><td >2013</td><td >5681</td><td style="border-left: 2px solid black;"> 0</td><td>5728</td></tr>
<tr><td>dmu34</td><td >2040</td><td style="background-color:green">5385</td><td style="background-color:green">5385</td><td >2134</td><td style="background-color:green">5385</td><td style="border-left: 2px solid black;"> 0</td><td>5385</td></tr>
<tr><td>dmu35</td><td >2241</td><td style="background-color:green">5635</td><td style="background-color:green">5635</td><td >2426</td><td style="background-color:green">5635</td><td style="border-left: 2px solid black;"> 0</td><td>5635</td></tr>
<tr><td>dmu36</td><td >2705</td><td style="background-color:green">5621</td><td style="background-color:green">5621</td><td >2745</td><td style="background-color:green">5621</td><td style="border-left: 2px solid black;"> 0</td><td>5621</td></tr>
<tr><td>dmu37</td><td >2616</td><td style="background-color:green">5851</td><td style="background-color:green">5851</td><td >2733</td><td style="background-color:green">5851</td><td style="border-left: 2px solid black;"> 0</td><td>5851</td></tr>
<tr><td>dmu38</td><td >2436</td><td style="background-color:green">5713</td><td style="background-color:green">5713</td><td >2526</td><td style="background-color:green">5713</td><td style="border-left: 2px solid black;"> 0</td><td>5713</td></tr>
<tr><td>dmu39</td><td >2607</td><td style="background-color:green">5747</td><td style="background-color:green">5747</td><td >2695</td><td style="background-color:green">5747</td><td style="border-left: 2px solid black;"> 0</td><td>5747</td></tr>
<tr><td>dmu40</td><td >2548</td><td style="background-color:green">5577</td><td style="background-color:green">5577</td><td >2670</td><td style="background-color:green">5577</td><td style="border-left: 2px solid black;"> 0</td><td>5577</td></tr>
<tr><td>dmu41</td><td >1842</td><td >2839</td><td >2839</td><td >2019</td><td >2225</td><td style="border-left: 2px solid black;"> -337</td><td>3176</td></tr>
<tr><td>dmu42</td><td >1810</td><td >2897</td><td >3066</td><td >2060</td><td >2520</td><td style="border-left: 2px solid black;"> -273</td><td>3339</td></tr>
<tr><td>dmu43</td><td >1915</td><td >3121</td><td >3121</td><td >2113</td><td >2540</td><td style="border-left: 2px solid black;"> -320</td><td>3441</td></tr>
<tr><td>dmu44</td><td >1975</td><td >3112</td><td >3112</td><td >2113</td><td >2577</td><td style="border-left: 2px solid black;"> -302</td><td>3414</td></tr>
<tr><td>dmu45</td><td >1768</td><td >2930</td><td >2930</td><td >1972</td><td >2363</td><td style="border-left: 2px solid black;"> -287</td><td>3217</td></tr>
<tr><td>dmu46</td><td >2664</td><td >3394</td><td >3425</td><td >2848</td><td >2508</td><td style="border-left: 2px solid black;"> -355</td><td>3780</td></tr>
<tr><td>dmu47</td><td >2689</td><td >3268</td><td >3353</td><td >2782</td><td >2480</td><td style="border-left: 2px solid black;"> -361</td><td>3714</td></tr>
<tr><td>dmu48</td><td >2516</td><td >3268</td><td >3317</td><td >2610</td><td >2405</td><td style="border-left: 2px solid black;"> -311</td><td>3628</td></tr>
<tr><td>dmu49</td><td >2403</td><td >3369</td><td >3369</td><td >2613</td><td >2390</td><td style="border-left: 2px solid black;"> -174</td><td>3543</td></tr>
<tr><td>dmu50</td><td >2494</td><td >3312</td><td >3379</td><td >2559</td><td >2444</td><td style="border-left: 2px solid black;"> -239</td><td>3618</td></tr>
<tr><td>dmu51</td><td >1825</td><td >3827</td><td >3839</td><td >1984</td><td >3348</td><td style="border-left: 2px solid black;"> -231</td><td>4070</td></tr>
<tr><td>dmu52</td><td >1989</td><td >4006</td><td >4012</td><td >2262</td><td >3515</td><td style="border-left: 2px solid black;"> -191</td><td>4203</td></tr>
<tr><td>dmu53</td><td >2229</td><td >4108</td><td >4108</td><td >2408</td><td >3505</td><td style="border-left: 2px solid black;"> -140</td><td>4248</td></tr>
<tr><td>dmu54</td><td >1990</td><td >4165</td><td >4165</td><td >2145</td><td >3567</td><td style="border-left: 2px solid black;"> -112</td><td>4277</td></tr>
<tr><td>dmu55</td><td >1959</td><td >4099</td><td >4099</td><td >2119</td><td >3614</td><td style="border-left: 2px solid black;"> -92</td><td>4191</td></tr>
<tr><td>dmu56</td><td >2778</td><td >4366</td><td >4366</td><td >2850</td><td >3555</td><td style="border-left: 2px solid black;"> -389</td><td>4755</td></tr>
<tr><td>dmu57</td><td >2529</td><td >4182</td><td >4182</td><td >2656</td><td >3281</td><td style="border-left: 2px solid black;"> -280</td><td>4462</td></tr>
<tr><td>dmu58</td><td >2625</td><td >4133</td><td >4214</td><td >2735</td><td >3465</td><td style="border-left: 2px solid black;"> -270</td><td>4484</td></tr>
<tr><td>dmu59</td><td >2546</td><td >4009</td><td >4199</td><td >2773</td><td >3243</td><td style="border-left: 2px solid black;"> -167</td><td>4366</td></tr>
<tr><td>dmu60</td><td >2547</td><td >4098</td><td >4259</td><td >2765</td><td >3399</td><td style="border-left: 2px solid black;"> -209</td><td>4468</td></tr>
<tr><td>dmu61</td><td >1995</td><td >4850</td><td >4886</td><td >2216</td><td >4439</td><td style="border-left: 2px solid black;"> -152</td><td>5038</td></tr>
<tr><td>dmu62</td><td >2079</td><td >5004</td><td >5004</td><td >2216</td><td >4528</td><td style="border-left: 2px solid black;"> -172</td><td>5176</td></tr>
<tr><td>dmu63</td><td >1877</td><td >5049</td><td >5049</td><td >2030</td><td >4478</td><td style="border-left: 2px solid black;"> -196</td><td>5245</td></tr>
<tr><td>dmu64</td><td >2134</td><td >5130</td><td >5130</td><td >2207</td><td >4456</td><td style="border-left: 2px solid black;"> -25</td><td>5155</td></tr>
<tr><td>dmu65</td><td >1892</td><td >5072</td><td >5072</td><td >2202</td><td >4542</td><td style="border-left: 2px solid black;"> -50</td><td>5122</td></tr>
<tr><td>dmu66</td><td >2416</td><td >5206</td><td >5357</td><td >2572</td><td >4488</td><td style="border-left: 2px solid black;"> -169</td><td>5526</td></tr>
<tr><td>dmu67</td><td >2668</td><td >5454</td><td >5484</td><td >2838</td><td >4730</td><td style="border-left: 2px solid black;"> -177</td><td>5661</td></tr>
<tr><td>dmu68</td><td >2542</td><td >5423</td><td >5423</td><td >2735</td><td >4495</td><td style="border-left: 2px solid black;"> -90</td><td>5513</td></tr>
<tr><td>dmu69</td><td >2453</td><td >5384</td><td >5419</td><td >2614</td><td >4653</td><td style="border-left: 2px solid black;"> -92</td><td>5511</td></tr>
<tr><td>dmu70</td><td >2518</td><td >5365</td><td >5492</td><td >2728</td><td >4708</td><td style="border-left: 2px solid black;"> -141</td><td>5633</td></tr>
<tr><td>dmu71</td><td >2029</td><td >6050</td><td >6050</td><td >2328</td><td >5512</td><td style="border-left: 2px solid black;"> -79</td><td>6129</td></tr>
<tr><td>dmu72</td><td >2061</td><td >6216</td><td >6223</td><td >2272</td><td >5897</td><td style="border-left: 2px solid black;"> -211</td><td>6434</td></tr>
<tr><td>dmu73</td><td >2071</td><td >5935</td><td >5935</td><td >2219</td><td >5439</td><td style="border-left: 2px solid black;"> -172</td><td>6107</td></tr>
<tr><td>dmu74</td><td >2017</td><td >5993</td><td >6015</td><td >2265</td><td >5451</td><td style="border-left: 2px solid black;"> -153</td><td>6168</td></tr>
<tr><td>dmu75</td><td >2087</td><td >5915</td><td >6010</td><td >2225</td><td >5389</td><td style="border-left: 2px solid black;"> -113</td><td>6123</td></tr>
<tr><td>dmu76</td><td >2729</td><td >6297</td><td >6329</td><td >2828</td><td >5506</td><td style="border-left: 2px solid black;"> -150</td><td>6479</td></tr>
<tr><td>dmu77</td><td >2542</td><td >6247</td><td >6399</td><td >2708</td><td >5559</td><td style="border-left: 2px solid black;"> -121</td><td>6520</td></tr>
<tr><td>dmu78</td><td >2727</td><td >6447</td><td >6508</td><td >2784</td><td >5753</td><td style="border-left: 2px solid black;"> -135</td><td>6643</td></tr>
<tr><td>dmu79</td><td >2717</td><td >6593</td><td >6593</td><td >2958</td><td >5796</td><td style="border-left: 2px solid black;"> -127</td><td>6720</td></tr>
<tr><td>dmu80</td><td >2642</td><td >6435</td><td >6435</td><td >2757</td><td >5679</td><td style="border-left: 2px solid black;"> -25</td><td>6460</td></tr>
</table>
</details>

<details>
<summary>swv</summary>
<table>
<tr><th>Instance</th><th>Job</th><th>Machine</th><th>Carlier</th><th>2-job</th><th>2-mach</th><th>Cert Gap</th><th>LB</th></tr>
<tr><td>swv01</td><td >727</td><td >1366</td><td >1366</td><td >814</td><td >1226</td><td style="border-left: 2px solid black;"> -41</td><td>1407</td></tr>
<tr><td>swv02</td><td >664</td><td style="background-color:green">1475</td><td style="background-color:green">1475</td><td >758</td><td >1273</td><td style="border-left: 2px solid black;"> 0</td><td>1475</td></tr>
<tr><td>swv03</td><td >647</td><td >1328</td><td >1328</td><td >743</td><td >1189</td><td style="border-left: 2px solid black;"> -70</td><td>1398</td></tr>
<tr><td>swv04</td><td >642</td><td >1366</td><td >1393</td><td >769</td><td >1172</td><td style="border-left: 2px solid black;"> -71</td><td>1464</td></tr>
<tr><td>swv05</td><td >720</td><td >1411</td><td >1411</td><td >810</td><td >1247</td><td style="border-left: 2px solid black;"> -13</td><td>1424</td></tr>
<tr><td>swv06</td><td >974</td><td >1477</td><td >1513</td><td >1079</td><td >1239</td><td style="border-left: 2px solid black;"> -154</td><td>1667</td></tr>
<tr><td>swv07</td><td >947</td><td >1394</td><td >1394</td><td >1026</td><td >1139</td><td style="border-left: 2px solid black;"> -147</td><td>1541</td></tr>
<tr><td>swv08</td><td >1058</td><td >1586</td><td >1586</td><td >1119</td><td >1339</td><td style="border-left: 2px solid black;"> -108</td><td>1694</td></tr>
<tr><td>swv09</td><td >947</td><td >1594</td><td >1594</td><td >1087</td><td >1276</td><td style="border-left: 2px solid black;"> -61</td><td>1655</td></tr>
<tr><td>swv10</td><td >939</td><td >1560</td><td >1560</td><td >1039</td><td >1179</td><td style="border-left: 2px solid black;"> -132</td><td>1692</td></tr>
<tr><td>swv11</td><td >739</td><td style="background-color:green">2983</td><td style="background-color:green">2983</td><td >836</td><td >2812</td><td style="border-left: 2px solid black;"> 0</td><td>2983</td></tr>
<tr><td>swv12</td><td >714</td><td >2949</td><td >2955</td><td >813</td><td >2836</td><td style="border-left: 2px solid black;"> -17</td><td>2972</td></tr>
<tr><td>swv13</td><td >727</td><td style="background-color:green">3104</td><td style="background-color:green">3104</td><td >831</td><td >2981</td><td style="border-left: 2px solid black;"> 0</td><td>3104</td></tr>
<tr><td>swv14</td><td >728</td><td style="background-color:green">2968</td><td style="background-color:green">2968</td><td >824</td><td >2847</td><td style="border-left: 2px solid black;"> 0</td><td>2968</td></tr>
<tr><td>swv15</td><td >687</td><td style="background-color:green">2885</td><td style="background-color:green">2885</td><td >793</td><td >2771</td><td style="border-left: 2px solid black;"> 0</td><td>2885</td></tr>
<tr><td>swv16</td><td >664</td><td style="background-color:green">2924</td><td style="background-color:green">2924</td><td >759</td><td style="background-color:green">2924</td><td style="border-left: 2px solid black;"> 0</td><td>2924</td></tr>
<tr><td>swv17</td><td >683</td><td style="background-color:green">2794</td><td style="background-color:green">2794</td><td >764</td><td style="background-color:green">2794</td><td style="border-left: 2px solid black;"> 0</td><td>2794</td></tr>
<tr><td>swv18</td><td >643</td><td style="background-color:green">2852</td><td style="background-color:green">2852</td><td >737</td><td style="background-color:green">2852</td><td style="border-left: 2px solid black;"> 0</td><td>2852</td></tr>
<tr><td>swv19</td><td >684</td><td style="background-color:green">2843</td><td style="background-color:green">2843</td><td >794</td><td style="background-color:green">2843</td><td style="border-left: 2px solid black;"> 0</td><td>2843</td></tr>
<tr><td>swv20</td><td >684</td><td style="background-color:green">2823</td><td style="background-color:green">2823</td><td >739</td><td style="background-color:green">2823</td><td style="border-left: 2px solid black;"> 0</td><td>2823</td></tr>
</table>
</details>

<details>
<summary>ta</summary>
<table>
<tr><th>Instance</th><th>Job</th><th>Machine</th><th>Carlier</th><th>2-job</th><th>2-mach</th><th>Cert Gap</th><th>LB</th></tr>
<tr><td>ta11js</td><td >949</td><td >1254</td><td >1254</td><td >991</td><td >1139</td><td style="border-left: 2px solid black;"> -103</td><td>1357</td></tr>
<tr><td>ta12js</td><td >1012</td><td >1267</td><td >1284</td><td >1046</td><td >1251</td><td style="border-left: 2px solid black;"> -83</td><td>1367</td></tr>
<tr><td>ta13js</td><td >919</td><td >1243</td><td >1243</td><td >991</td><td >1178</td><td style="border-left: 2px solid black;"> -99</td><td>1342</td></tr>
<tr><td>ta14js</td><td >990</td><td >1329</td><td >1341</td><td >1011</td><td >1130</td><td style="border-left: 2px solid black;"> -4</td><td>1345</td></tr>
<tr><td>ta15js</td><td >880</td><td >1163</td><td >1231</td><td >948</td><td >1148</td><td style="border-left: 2px solid black;"> -108</td><td>1339</td></tr>
<tr><td>ta16js</td><td >932</td><td >1211</td><td >1238</td><td >1031</td><td >1181</td><td style="border-left: 2px solid black;"> -122</td><td>1360</td></tr>
<tr><td>ta17js</td><td >979</td><td >1306</td><td >1433</td><td >1061</td><td >1257</td><td style="border-left: 2px solid black;"> -29</td><td>1462</td></tr>
<tr><td>ta18js</td><td >900</td><td >1315</td><td >1315</td><td >978</td><td >1153</td><td style="border-left: 2px solid black;"> -81</td><td>1396</td></tr>
<tr><td>ta19js</td><td >920</td><td >1202</td><td >1216</td><td >951</td><td >1202</td><td style="border-left: 2px solid black;"> -116</td><td>1332</td></tr>
<tr><td>ta20js</td><td >928</td><td >1213</td><td >1279</td><td >1025</td><td >1186</td><td style="border-left: 2px solid black;"> -69</td><td>1348</td></tr>
<tr><td>ta21js</td><td >1217</td><td >1182</td><td >1435</td><td >1297</td><td >1182</td><td style="border-left: 2px solid black;"> -207</td><td>1642</td></tr>
<tr><td>ta22js</td><td >1223</td><td >1314</td><td >1385</td><td >1274</td><td >1240</td><td style="border-left: 2px solid black;"> -215</td><td>1600</td></tr>
<tr><td>ta23js</td><td >1164</td><td >1248</td><td >1422</td><td >1241</td><td >1185</td><td style="border-left: 2px solid black;"> -135</td><td>1557</td></tr>
<tr><td>ta24js</td><td >1151</td><td >1284</td><td >1466</td><td >1226</td><td >1271</td><td style="border-left: 2px solid black;"> -178</td><td>1644</td></tr>
<tr><td>ta25js</td><td >1170</td><td >1256</td><td >1473</td><td >1256</td><td >1256</td><td style="border-left: 2px solid black;"> -122</td><td>1595</td></tr>
<tr><td>ta26js</td><td >1207</td><td >1245</td><td >1445</td><td >1272</td><td >1205</td><td style="border-left: 2px solid black;"> -198</td><td>1643</td></tr>
<tr><td>ta27js</td><td >1291</td><td >1403</td><td >1567</td><td >1336</td><td >1331</td><td style="border-left: 2px solid black;"> -113</td><td>1680</td></tr>
<tr><td>ta28js</td><td >1221</td><td >1387</td><td >1529</td><td >1276</td><td >1269</td><td style="border-left: 2px solid black;"> -74</td><td>1603</td></tr>
<tr><td>ta29js</td><td >1227</td><td >1352</td><td >1413</td><td >1327</td><td >1267</td><td style="border-left: 2px solid black;"> -212</td><td>1625</td></tr>
<tr><td>ta30js</td><td >1212</td><td >1277</td><td >1363</td><td >1245</td><td >1159</td><td style="border-left: 2px solid black;"> -199</td><td>1562</td></tr>
<tr><td>ta31js</td><td >990</td><td style="background-color:green">1764</td><td style="background-color:green">1764</td><td >1026</td><td style="background-color:green">1764</td><td style="border-left: 2px solid black;"> 0</td><td>1764</td></tr>
<tr><td>ta32js</td><td >972</td><td style="background-color:green">1774</td><td style="background-color:green">1774</td><td >1034</td><td style="background-color:green">1774</td><td style="border-left: 2px solid black;"> 0</td><td>1774</td></tr>
<tr><td>ta33js</td><td >1056</td><td >1733</td><td >1747</td><td >1106</td><td >1729</td><td style="border-left: 2px solid black;"> -44</td><td>1791</td></tr>
<tr><td>ta34js</td><td >975</td><td style="background-color:green">1828</td><td style="background-color:green">1828</td><td >1039</td><td style="background-color:green">1828</td><td style="border-left: 2px solid black;"> 0</td><td>1828</td></tr>
<tr><td>ta35js</td><td >969</td><td >1754</td><td >1997</td><td >1021</td><td >1729</td><td style="border-left: 2px solid black;"> -10</td><td>2007</td></tr>
<tr><td>ta36js</td><td >988</td><td >1777</td><td style="background-color:green">1819</td><td >1040</td><td >1777</td><td style="border-left: 2px solid black;"> 0</td><td>1819</td></tr>
<tr><td>ta37js</td><td >1045</td><td style="background-color:green">1771</td><td style="background-color:green">1771</td><td >1076</td><td style="background-color:green">1771</td><td style="border-left: 2px solid black;"> 0</td><td>1771</td></tr>
<tr><td>ta38js</td><td >952</td><td style="background-color:green">1673</td><td style="background-color:green">1673</td><td >1000</td><td style="background-color:green">1673</td><td style="border-left: 2px solid black;"> 0</td><td>1673</td></tr>
<tr><td>ta39js</td><td >905</td><td >1764</td><td >1791</td><td >925</td><td >1641</td><td style="border-left: 2px solid black;"> -4</td><td>1795</td></tr>
<tr><td>ta40js</td><td >961</td><td >1608</td><td >1617</td><td >1020</td><td >1602</td><td style="border-left: 2px solid black;"> -41</td><td>1658</td></tr>
<tr><td>ta41js</td><td >1232</td><td >1850</td><td >1850</td><td >1297</td><td >1830</td><td style="border-left: 2px solid black;"> -76</td><td>1926</td></tr>
<tr><td>ta42js</td><td >1192</td><td >1761</td><td >1867</td><td >1248</td><td >1761</td><td style="border-left: 2px solid black;"> -33</td><td>1900</td></tr>
<tr><td>ta43js</td><td >1230</td><td >1710</td><td style="background-color:green">1809</td><td >1286</td><td >1694</td><td style="border-left: 2px solid black;"> 0</td><td>1809</td></tr>
<tr><td>ta44js</td><td >1204</td><td >1820</td><td >1887</td><td >1290</td><td >1787</td><td style="border-left: 2px solid black;"> -74</td><td>1961</td></tr>
<tr><td>ta45js</td><td >1253</td><td >1785</td><td >1955</td><td >1282</td><td >1731</td><td style="border-left: 2px solid black;"> -42</td><td>1997</td></tr>
<tr><td>ta46js</td><td >1290</td><td >1940</td><td >1940</td><td >1355</td><td >1856</td><td style="border-left: 2px solid black;"> -36</td><td>1976</td></tr>
<tr><td>ta47js</td><td >1334</td><td >1751</td><td >1768</td><td >1376</td><td >1690</td><td style="border-left: 2px solid black;"> -59</td><td>1827</td></tr>
<tr><td>ta48js</td><td >1282</td><td >1770</td><td >1905</td><td >1314</td><td >1744</td><td style="border-left: 2px solid black;"> -16</td><td>1921</td></tr>
<tr><td>ta49js</td><td >1190</td><td >1758</td><td >1892</td><td >1253</td><td >1758</td><td style="border-left: 2px solid black;"> -46</td><td>1938</td></tr>
<tr><td>ta50js</td><td >1251</td><td >1678</td><td >1804</td><td >1297</td><td >1674</td><td style="border-left: 2px solid black;"> -44</td><td>1848</td></tr>
</table>
</details>

<details>
<summary>tai</summary>
<table>
<tr><th>Instance</th><th>Job</th><th>Machine</th><th>Carlier</th><th>2-job</th><th>2-mach</th><th>Cert Gap</th><th>LB</th></tr>
<tr><td>tai_100_100_1</td><td >58175</td><td >61674</td><td >62485</td><td >58486</td><td >59162</td><td style="border-left: 2px solid black;"> -358</td><td>62843</td></tr>
<tr><td>tai_100_100_2</td><td >55304</td><td >58160</td><td >62367</td><td >56161</td><td >57126</td><td style="border-left: 2px solid black;"> -447</td><td>62814</td></tr>
<tr><td>tai_100_100_3</td><td >56728</td><td >57806</td><td >60958</td><td >57304</td><td >57806</td><td style="border-left: 2px solid black;"> -575</td><td>61533</td></tr>
<tr><td>tai_100_100_4</td><td >59359</td><td >59383</td><td >64165</td><td >59359</td><td >57965</td><td style="border-left: 2px solid black;"> -577</td><td>64742</td></tr>
<tr><td>tai_100_100_5</td><td >56381</td><td >57369</td><td >61003</td><td >56486</td><td >55764</td><td style="border-left: 2px solid black;"> -763</td><td>61766</td></tr>
<tr><td>tai_100_100_6</td><td >56191</td><td >56270</td><td >60706</td><td >56924</td><td >55408</td><td style="border-left: 2px solid black;"> -654</td><td>61360</td></tr>
<tr><td>tai_100_100_7</td><td >56064</td><td >57412</td><td >63353</td><td >56869</td><td >57317</td><td style="border-left: 2px solid black;"> -687</td><td>64040</td></tr>
<tr><td>tai_100_100_8</td><td >58951</td><td >57570</td><td >62426</td><td >58951</td><td >57570</td><td style="border-left: 2px solid black;"> -798</td><td>63224</td></tr>
<tr><td>tai_100_100_9</td><td >58494</td><td >57824</td><td >62220</td><td >58505</td><td >57148</td><td style="border-left: 2px solid black;"> -411</td><td>62631</td></tr>
<tr><td>tai_100_100_10</td><td >57454</td><td >59747</td><td >64625</td><td >57480</td><td >56194</td><td style="border-left: 2px solid black;"> -241</td><td>64866</td></tr>
</table>
</details>

<details>
<summary>yn</summary>
<table>
<tr><th>Instance</th><th>Job</th><th>Machine</th><th>Carlier</th><th>2-job</th><th>2-mach</th><th>Cert Gap</th><th>LB</th></tr>
<tr><td>yn1</td><td >694</td><td >689</td><td >763</td><td >736</td><td >643</td><td style="border-left: 2px solid black;"> -121</td><td>884</td></tr>
<tr><td>yn2</td><td >713</td><td >732</td><td >795</td><td >730</td><td >686</td><td style="border-left: 2px solid black;"> -109</td><td>904</td></tr>
<tr><td>yn3</td><td >680</td><td >733</td><td >793</td><td >715</td><td >659</td><td style="border-left: 2px solid black;"> -99</td><td>892</td></tr>
<tr><td>yn4</td><td >719</td><td >818</td><td >871</td><td >739</td><td >676</td><td style="border-left: 2px solid black;"> -96</td><td>967</td></tr>
</table>
</details>

### Relaxation certificates

A relaxation certificate would be something like identifying the 2 most critical machines and ignoring all tasks but the tasks on these machines, and transforming all precedences into delays.

[Work in progress]

### Engine trace certificates

An engine trace certificate is the search tree of an engine (logically) compressed to be verifiable externally. SAT engines have pioneered this approach.

[Work in progress]

### Understanding instance hardness

Streeter and Smith ("How the Landscape of Random Job Shop Scheduling Instances Depends on the Ratio of Jobs to Machines" 2006) showed that random instances are hardest when the ratio of jobs to machines $n/m$ is close to one. Their statistical study shows that as size grows the best solutions become more and more distant from each other. Landscape statistics miss a lot, however: `ta39` and `ta40` have the same size (30 x 15) and the same generator, yet one is solved in under a minute and the other is still open.

The lower bounds can be used to refine the understanding of instance difficulty: 
- on `ta39`, Carlier's bound is 1791 for an optimum of 1795
- on `ta40`, Carlier's bound is 1617 for an optimum between 1658 and 1669

Any engine that embeds a Carlier bound into a propagation step is likely to quickly close the gap between 1791 and 1795, and with the help of heuristics close `ta39`.


<br/>

## Best-known bounds: provenance and history 

JSPLib records, for every instance, the best upper and lower bounds found by any method. We register date, solver, hardware, running time and certificate status, whenever these available.

***We have done our best to retrospectively rebuild the history of the bounds for the jsplib instances*** from Hoorn 2018 and subsequent publications.

The bounds come from various sources:

- **Published papers**, referenced in the [publications](#publications-best-known-solutions) list
- **Communications to JSPLib** (via GitHub issues, email, etc.) double checked by us
- **Engines run by others**, whose results have been made public (e.g. CPO2015)
- **Engines run by us** (CPO, OptalCP, CP-SAT), with approximate running times

Hardware and running times are hard to compare. When a reference engine reproduces a published bound, the table credits the engine, because anyone can reproduce it.

### Industrial instances

<details>
<summary>Da Col and Teppan 2022</summary>
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>dct-long-100-10000-1</td><td>103 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-10000-2</td><td>103 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-10000-3</td><td>103 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-100000-1</td><td>109 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-100000-2</td><td>114 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-100-100000-3</td><td>109 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-10000-1</td><td>1002 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-10000-2</td><td>1002 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-10000-3</td><td>1002 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-100000-1</td><td>1002 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-100000-2</td><td>1002 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-long-1000-100000-3</td><td>1003 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-10000-1</td><td>2162 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-10000-2</td><td>2192 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-10000-3</td><td>2169 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-100000-1</td><td>20685 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-100000-2</td><td>20870 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-100-100000-3</td><td>20767 x 100</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-10000-1</td><td>2882 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-10000-2</td><td>2863 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-10000-3</td><td>2897 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dct-short-1000-100000-1</td><td>21280 x 1000</td><td>industrial</td><td>600000</td><td>600019</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>dct-short-1000-100000-2</td><td>21349 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dct-short-1000-100000-3</td><td>21338 x 1000</td><td>industrial</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
</table>


*Da Col and Teppan report that instance dct-short-1000-100000-1 was solved to optimality by CP Optimizer in 6h which we haven't been able to reproduce (with CPO or any other solver). We are still investigating*. 
We have recently noticed some regression in OptalCP on two of these instances, hence you may need specific parameters to reach the solution in the time announced.

</details>

<details>
<summary>Boveroux, Ernst and Louveaux 2025</summary>
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>bel00</td><td>792 x 48</td><td>industrial</td><td>766329</td><td>766329</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel01</td><td>627 x 52</td><td>industrial</td><td>428900</td><td>428900</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel02</td><td>660 x 59</td><td>industrial</td><td>270437</td><td>270437</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel03</td><td>691 x 52</td><td>industrial</td><td>670943</td><td>670943</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel04</td><td>952 x 63</td><td>industrial</td><td>408633</td><td>408633</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel05</td><td>929 x 59</td><td>industrial</td><td>620171</td><td>620171</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel06</td><td>678 x 57</td><td>industrial</td><td>502510</td><td>502510</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel07</td><td>968 x 55</td><td>industrial</td><td>750360</td><td>750360</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel08</td><td>822 x 65</td><td>industrial</td><td>484451</td><td>484451</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel09</td><td>651 x 53</td><td>industrial</td><td>534811</td><td>534811</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel10</td><td>733 x 61</td><td>industrial</td><td>468304</td><td>468304</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel11</td><td>761 x 66</td><td>industrial</td><td>509503</td><td>509503</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel12</td><td>897 x 64</td><td>industrial</td><td>388715</td><td>388715</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel13</td><td>836 x 54</td><td>industrial</td><td>420576</td><td>420576</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel14</td><td>935 x 57</td><td>industrial</td><td>1115063</td><td>1115063</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel15</td><td>818 x 48</td><td>industrial</td><td>610946</td><td>610946</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel16</td><td>855 x 59</td><td>industrial</td><td>575843</td><td>575843</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel17</td><td>662 x 47</td><td>industrial</td><td>520426</td><td>520426</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel18</td><td>677 x 50</td><td>industrial</td><td>347889</td><td>347889</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>bel19</td><td>806 x 69</td><td>industrial</td><td>529239</td><td>529239</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
</table>
</details>

### Random instances

<details>
<summary>Adams, Balas and Zawack 1988</summary>
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>abz7</td><td>20 x 15</td><td>random</td><td>656</td><td>656</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>abz8</td><td>20 x 15</td><td>random</td><td>667</td><td>667</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 10h</td></tr>
<tr><td>abz9</td><td>20 x 15</td><td>random</td><td>678</td><td>678</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
</table>


*Various places report "Henning A (2002). Praktische Job-Shop Scheduling-Probleme. Ph.D. thesis, Friedrich-Schiller-Universität Jena, Jena, Germany" as having found a solution of 665 for abz8, but the original document says their solution is 667 and 665 is a "solution from the literature". Jelke J. van Hoorn attributes the 665 bound to "Paul Douglas Martin. A time-oriented approach to computing optimal schedules for the job-shop scheduling problem. PhD thesis. 1996".
However, OptalCP proves a lower bound of 667 and Optimizizer only provides a verified solution for 667. We advise caution until this result is confirmed by independent means.*

</details>

<details>
<summary>Storer, Wu and Vaccari 1992</summary>
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>swv01</td><td>20 x 10</td><td>random</td><td>1407</td><td>1407</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv02</td><td>20 x 10</td><td>random</td><td>1475</td><td>1475</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv03</td><td>20 x 10</td><td>random</td><td>1398</td><td>1398</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>swv04</td><td>20 x 10</td><td>random</td><td>1464</td><td>1464</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv05</td><td>20 x 10</td><td>random</td><td>1424</td><td>1424</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>swv06</td><td>20 x 15</td><td>random</td><td>1667</td><td>1667</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 40h</td></tr>
<tr><td>swv07</td><td>20 x 15</td><td>random</td><td>1541</td><td>1594</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>swv08</td><td>20 x 15</td><td>random</td><td>1694</td><td>1751</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Murovec2015</td></tr>
<tr><td>swv09</td><td>20 x 15</td><td>random</td><td>1655</td><td>1655</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 15h</td></tr>
<tr><td>swv10</td><td>20 x 15</td><td>random</td><td>1692</td><td>1743</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>swv11</td><td>50 x 10</td><td>random</td><td>2983</td><td>2983</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv12</td><td>50 x 10</td><td>random</td><td>2972</td><td>2972</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv13</td><td>50 x 10</td><td>random</td><td>3104</td><td>3104</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv14</td><td>50 x 10</td><td>random</td><td>2968</td><td>2968</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv15</td><td>50 x 10</td><td>random</td><td>2885</td><td>2885</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 9h</td></tr>
<tr><td>swv16</td><td>50 x 10</td><td>random</td><td>2924</td><td>2924</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv17</td><td>50 x 10</td><td>random</td><td>2794</td><td>2794</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv18</td><td>50 x 10</td><td>random</td><td>2852</td><td>2852</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv19</td><td>50 x 10</td><td>random</td><td>2843</td><td>2843</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>swv20</td><td>50 x 10</td><td>random</td><td>2823</td><td>2823</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
</table>
</details>

<details>
<summary>Yamada Nakano 1992</summary>
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>yn1</td><td>20 x 20</td><td>random</td><td>884</td><td>884</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 6h</td></tr>
<tr><td>yn2</td><td>20 x 20</td><td>random</td><td>904</td><td>904</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 40h</td></tr>
<tr><td>yn3</td><td>20 x 20</td><td>random</td><td>892</td><td>892</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 40h</td></tr>
<tr><td>yn4</td><td>20 x 20</td><td>random</td><td>967</td><td>967</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 16h</td></tr>
</table>
</details>

<details>
<summary>Taillard 1993</summary>

*We add the suffix `js` to distinguish the instance from other instances generated by Taillard for other problems*

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>ta11js</td><td>20 x 15</td><td>random</td><td>1357</td><td>1357</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta12js</td><td>20 x 15</td><td>random</td><td>1367</td><td>1367</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta13js</td><td>20 x 15</td><td>random</td><td>1342</td><td>1342</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta14js</td><td>20 x 15</td><td>random</td><td>1345</td><td>1345</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta15js</td><td>20 x 15</td><td>random</td><td>1339</td><td>1339</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta16js</td><td>20 x 15</td><td>random</td><td>1360</td><td>1360</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta17js</td><td>20 x 15</td><td>random</td><td>1462</td><td>1462</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta18js</td><td>20 x 15</td><td>random</td><td>1396</td><td>1396</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta19js</td><td>20 x 15</td><td>random</td><td>1332</td><td>1332</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta20js</td><td>20 x 15</td><td>random</td><td>1348</td><td>1348</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta21js</td><td>20 x 20</td><td>random</td><td>1642</td><td>1642</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta22js</td><td>20 x 20</td><td>random</td><td>1600</td><td>1600</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta23js</td><td>20 x 20</td><td>random</td><td>1557</td><td>1557</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta24js</td><td>20 x 20</td><td>random</td><td>1644</td><td>1644</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta25js</td><td>20 x 20</td><td>random</td><td>1595</td><td>1595</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta26js</td><td>20 x 20</td><td>random</td><td>1643</td><td>1643</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 7h</td></tr>
<tr><td>ta27js</td><td>20 x 20</td><td>random</td><td>1680</td><td>1680</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta28js</td><td>20 x 20</td><td>random</td><td>1603</td><td>1603</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta29js</td><td>20 x 20</td><td>random</td><td>1625</td><td>1625</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta30js</td><td>20 x 20</td><td>random</td><td>1562</td><td>1584</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub NS2005</td></tr>
<tr><td>ta31js</td><td>30 x 15</td><td>random</td><td>1764</td><td>1764</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>ta32js</td><td>30 x 15</td><td>random</td><td>1774</td><td>1783</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 | ub LLG2026</td></tr>
<tr><td>ta33js</td><td>30 x 15</td><td>random</td><td>1791</td><td>1791</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 10h</td></tr>
<tr><td>ta34js</td><td>30 x 15</td><td>random</td><td>1828</td><td>1828</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta35js</td><td>30 x 15</td><td>random</td><td>2007</td><td>2007</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta36js</td><td>30 x 15</td><td>random</td><td>1819</td><td>1819</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta37js</td><td>30 x 15</td><td>random</td><td>1771</td><td>1771</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>ta38js</td><td>30 x 15</td><td>random</td><td>1673</td><td>1673</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 7h</td></tr>
<tr><td>ta39js</td><td>30 x 15</td><td>random</td><td>1795</td><td>1795</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>ta40js</td><td>30 x 15</td><td>random</td><td>1658</td><td>1669</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>ta41js</td><td>30 x 20</td><td>random</td><td>1926</td><td>2005</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CPO2015</td></tr>
<tr><td>ta42js</td><td>30 x 20</td><td>random</td><td>1900</td><td>1937</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>ta43js</td><td>30 x 20</td><td>random</td><td>1809</td><td>1846</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 | ub PLC2015</td></tr>
<tr><td>ta44js</td><td>30 x 20</td><td>random</td><td>1961</td><td>1978</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>ta45js</td><td>30 x 20</td><td>random</td><td>1997</td><td>1997</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CP-SAT in < 10m</td></tr>
<tr><td>ta46js</td><td>30 x 20</td><td>random</td><td>1976</td><td>2002</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>ta47js</td><td>30 x 20</td><td>random</td><td>1827</td><td>1889</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>ta48js</td><td>30 x 20</td><td>random</td><td>1921</td><td>1937</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>ta49js</td><td>30 x 20</td><td>random</td><td>1938</td><td>1960</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>ta50js</td><td>30 x 20</td><td>random</td><td>1848</td><td>1923</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
</table>
</details>

<details>
<summary>Demirkol, Mehta and Uzsoy 1998</summary>
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>dmu01</td><td>20 x 15</td><td>random</td><td>2563</td><td>2563</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu02</td><td>20 x 15</td><td>random</td><td>2706</td><td>2706</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu03</td><td>20 x 15</td><td>random</td><td>2731</td><td>2731</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu04</td><td>20 x 15</td><td>random</td><td>2669</td><td>2669</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu05</td><td>20 x 15</td><td>random</td><td>2749</td><td>2749</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu06</td><td>20 x 20</td><td>random</td><td>3244</td><td>3244</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>dmu07</td><td>20 x 20</td><td>random</td><td>3046</td><td>3046</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>dmu08</td><td>20 x 20</td><td>random</td><td>3188</td><td>3188</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu09</td><td>20 x 20</td><td>random</td><td>3092</td><td>3092</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu10</td><td>20 x 20</td><td>random</td><td>2984</td><td>2984</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu11</td><td>30 x 15</td><td>random</td><td>3402</td><td>3430</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>dmu12</td><td>30 x 15</td><td>random</td><td>3481</td><td>3492</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu13</td><td>30 x 15</td><td>random</td><td>3681</td><td>3681</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>dmu14</td><td>30 x 15</td><td>random</td><td>3394</td><td>3394</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>CP-SAT in < 1m</td></tr>
<tr><td>dmu15</td><td>30 x 15</td><td>random</td><td>3343</td><td>3343</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 10m</td></tr>
<tr><td>dmu16</td><td>30 x 20</td><td>random</td><td>3734</td><td>3744</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 | ub Diaz2026</td></tr>
<tr><td>dmu17</td><td>30 x 20</td><td>random</td><td>3733</td><td>3811</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>dmu18</td><td>30 x 20</td><td>random</td><td>3844</td><td>3844</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 10h</td></tr>
<tr><td>dmu19</td><td>30 x 20</td><td>random</td><td>3707</td><td>3764</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu20</td><td>30 x 20</td><td>random</td><td>3632</td><td>3699</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu21</td><td>40 x 15</td><td>random</td><td>4380</td><td>4380</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu22</td><td>40 x 15</td><td>random</td><td>4725</td><td>4725</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu23</td><td>40 x 15</td><td>random</td><td>4668</td><td>4668</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu24</td><td>40 x 15</td><td>random</td><td>4648</td><td>4648</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu25</td><td>40 x 15</td><td>random</td><td>4164</td><td>4164</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu26</td><td>40 x 20</td><td>random</td><td>4647</td><td>4647</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu27</td><td>40 x 20</td><td>random</td><td>4848</td><td>4848</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu28</td><td>40 x 20</td><td>random</td><td>4692</td><td>4692</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu29</td><td>40 x 20</td><td>random</td><td>4691</td><td>4691</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu30</td><td>40 x 20</td><td>random</td><td>4732</td><td>4732</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu31</td><td>50 x 15</td><td>random</td><td>5640</td><td>5640</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu32</td><td>50 x 15</td><td>random</td><td>5927</td><td>5927</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu33</td><td>50 x 15</td><td>random</td><td>5728</td><td>5728</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu34</td><td>50 x 15</td><td>random</td><td>5385</td><td>5385</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu35</td><td>50 x 15</td><td>random</td><td>5635</td><td>5635</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu36</td><td>50 x 20</td><td>random</td><td>5621</td><td>5621</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu37</td><td>50 x 20</td><td>random</td><td>5851</td><td>5851</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu38</td><td>50 x 20</td><td>random</td><td>5713</td><td>5713</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu39</td><td>50 x 20</td><td>random</td><td>5747</td><td>5747</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu40</td><td>50 x 20</td><td>random</td><td>5577</td><td>5577</td><td style="background-color:cornflowerblue;color:white;font-weight:bold">trivial</td><td>OptalCP in < 1m</td></tr>
<tr><td>dmu41</td><td>20 x 15</td><td>random</td><td>3176</td><td>3248</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>dmu42</td><td>20 x 15</td><td>random</td><td>3339</td><td>3390</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu43</td><td>20 x 15</td><td>random</td><td>3441</td><td>3441</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 7h</td></tr>
<tr><td>dmu44</td><td>20 x 15</td><td>random</td><td>3414</td><td>3475</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu45</td><td>20 x 15</td><td>random</td><td>3217</td><td>3266</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu46</td><td>20 x 20</td><td>random</td><td>3780</td><td>4035</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>dmu47</td><td>20 x 20</td><td>random</td><td>3714</td><td>3939</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub GR2014</td></tr>
<tr><td>dmu48</td><td>20 x 20</td><td>random</td><td>3628</td><td>3763</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu49</td><td>20 x 20</td><td>random</td><td>3543</td><td>3706</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu50</td><td>20 x 20</td><td>random</td><td>3618</td><td>3729</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub PLC2015</td></tr>
<tr><td>dmu51</td><td>30 x 15</td><td>random</td><td>4070</td><td>4151</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu52</td><td>30 x 15</td><td>random</td><td>4203</td><td>4297</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu53</td><td>30 x 15</td><td>random</td><td>4248</td><td>4378</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu54</td><td>30 x 15</td><td>random</td><td>4277</td><td>4360</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu55</td><td>30 x 15</td><td>random</td><td>4191</td><td>4258</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu56</td><td>30 x 20</td><td>random</td><td>4755</td><td>4934</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu57</td><td>30 x 20</td><td>random</td><td>4462</td><td>4643</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu58</td><td>30 x 20</td><td>random</td><td>4484</td><td>4701</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu59</td><td>30 x 20</td><td>random</td><td>4366</td><td>4607</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LHW2024</td></tr>
<tr><td>dmu60</td><td>30 x 20</td><td>random</td><td>4468</td><td>4721</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu61</td><td>40 x 15</td><td>random</td><td>5038</td><td>5166</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Diaz2026</td></tr>
<tr><td>dmu62</td><td>40 x 15</td><td>random</td><td>5176</td><td>5244</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu63</td><td>40 x 15</td><td>random</td><td>5245</td><td>5296</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu64</td><td>40 x 15</td><td>random</td><td>5155</td><td>5225</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu65</td><td>40 x 15</td><td>random</td><td>5122</td><td>5158</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>dmu66</td><td>40 x 20</td><td>random</td><td>5526</td><td>5685</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>dmu67</td><td>40 x 20</td><td>random</td><td>5661</td><td>5774</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu68</td><td>40 x 20</td><td>random</td><td>5513</td><td>5733</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>dmu69</td><td>40 x 20</td><td>random</td><td>5511</td><td>5682</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>dmu70</td><td>40 x 20</td><td>random</td><td>5633</td><td>5868</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub CS2022</td></tr>
<tr><td>dmu71</td><td>50 x 15</td><td>random</td><td>6129</td><td>6204</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>dmu72</td><td>50 x 15</td><td>random</td><td>6434</td><td>6448</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CdGKGC2025 | ub LLG2026</td></tr>
<tr><td>dmu73</td><td>50 x 15</td><td>random</td><td>6107</td><td>6132</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu74</td><td>50 x 15</td><td>random</td><td>6168</td><td>6196</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub SS2018</td></tr>
<tr><td>dmu75</td><td>50 x 15</td><td>random</td><td>6123</td><td>6186</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>dmu76</td><td>50 x 20</td><td>random</td><td>6479</td><td>6708</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>dmu77</td><td>50 x 20</td><td>random</td><td>6520</td><td>6739</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu78</td><td>50 x 20</td><td>random</td><td>6643</td><td>6744</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu79</td><td>50 x 20</td><td>random</td><td>6720</td><td>6899</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub LLG2026</td></tr>
<tr><td>dmu80</td><td>50 x 20</td><td>random</td><td>6460</td><td>6621</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
</table>
</details>

### Stress-test

<details>
<summary>Da Col and Teppan 2022 - Taillard like instances `tai`</summary>
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>tai_100_100_1</td><td>100 x 100</td><td>random</td><td>62843</td><td>76118</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_2</td><td>100 x 100</td><td>random</td><td>62814</td><td>75478</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_3</td><td>100 x 100</td><td>random</td><td>61533</td><td>75366</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_4</td><td>100 x 100</td><td>random</td><td>64742</td><td>77307</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_5</td><td>100 x 100</td><td>random</td><td>61766</td><td>76403</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_6</td><td>100 x 100</td><td>random</td><td>61360</td><td>76060</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_7</td><td>100 x 100</td><td>random</td><td>64040</td><td>76713</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_8</td><td>100 x 100</td><td>random</td><td>63224</td><td>76767</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_9</td><td>100 x 100</td><td>random</td><td>62631</td><td>77337</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_100_10</td><td>100 x 100</td><td>random</td><td>64866</td><td>75827</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_1000_1</td><td>100 x 1000</td><td>random</td><td>522298</td><td>525389</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_2</td><td>100 x 1000</td><td>random</td><td>530375</td><td>530375</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_3</td><td>100 x 1000</td><td>random</td><td>530560</td><td>530560</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_4</td><td>100 x 1000</td><td>random</td><td>527101</td><td>527101</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_5</td><td>100 x 1000</td><td>random</td><td>517728</td><td>523876</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub DOFP2026</td></tr>
<tr><td>tai_100_1000_6</td><td>100 x 1000</td><td>random</td><td>522907</td><td>523503</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_7</td><td>100 x 1000</td><td>random</td><td>522537</td><td>525283</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_8</td><td>100 x 1000</td><td>random</td><td>526428</td><td>526428</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_9</td><td>100 x 1000</td><td>random</td><td>528097</td><td>528097</td><td style="background-color:purple;color:white;font-weight:bold">closed</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_100_1000_10</td><td>100 x 1000</td><td>random</td><td>521766</td><td>524358</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub AMFCV2026</td></tr>
<tr><td>tai_1000_100_1</td><td>1000 x 100</td><td>random</td><td>525343</td><td>525343</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tai_1000_100_2</td><td>1000 x 100</td><td>random</td><td>528088</td><td>528088</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_3</td><td>1000 x 100</td><td>random</td><td>522793</td><td>522793</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_4</td><td>1000 x 100</td><td>random</td><td>524271</td><td>524271</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_5</td><td>1000 x 100</td><td>random</td><td>531216</td><td>531216</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tai_1000_100_6</td><td>1000 x 100</td><td>random</td><td>518763</td><td>518763</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_100_7</td><td>1000 x 100</td><td>random</td><td>527093</td><td>527093</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 2h</td></tr>
<tr><td>tai_1000_100_8</td><td>1000 x 100</td><td>random</td><td>519524</td><td>519524</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_100_9</td><td>1000 x 100</td><td>random</td><td>520889</td><td>520889</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_100_10</td><td>1000 x 100</td><td>random</td><td>529112</td><td>529112</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in < 3h</td></tr>
<tr><td>tai_1000_1000_1</td><td>1000 x 1000</td><td>stress-test</td><td>549392</td><td>796759</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_2</td><td>1000 x 1000</td><td>stress-test</td><td>549043</td><td>797337</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_3</td><td>1000 x 1000</td><td>stress-test</td><td>552580</td><td>798050</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_4</td><td>1000 x 1000</td><td>stress-test</td><td>547670</td><td>795789</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_5</td><td>1000 x 1000</td><td>stress-test</td><td>545193</td><td>798296</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_6</td><td>1000 x 1000</td><td>stress-test</td><td>547286</td><td>795615</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_7</td><td>1000 x 1000</td><td>stress-test</td><td>545877</td><td>796445</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_8</td><td>1000 x 1000</td><td>stress-test</td><td>549220</td><td>797763</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_9</td><td>1000 x 1000</td><td>stress-test</td><td>543559</td><td>796605</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP | ub Schwemin2026</td></tr>
<tr><td>tai_1000_1000_10</td><td>1000 x 1000</td><td>stress-test</td><td>549075</td><td>795154</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb Hexaly2026 | ub Schwemin2026</td></tr>
</table>
</details>

### Publications (best known solutions)
The upper and lower bounds come from: 

- NS2005 (1 bounds - ta30js) : **Nowicki, E., & Smutnicki, C.** (2002). Some new tools to solve the job shop problem. Raport serii: Preprinty, 60.

- GR2014 (5 bounds in swv, ta and dmu) : **Gonçalves, J. F., & Resende, M. G.** (2014). An extended Akers graphical method with a biased random‐key genetic algorithm for job‐shop scheduling. International Transactions in Operational Research, 21(2), 215-246.

- Murovec2015 (1 bounds - swv08) : Personal communication to Optimizizer probably based on **Murovec, B.** (2015). Job-shop local-search move evaluation without direct consideration of the criterion’s value. European Journal of Operational Research, 241(2), 320-329.

- CPO2015 (4 bounds in ta and dmu) : **Vilím, P., Laborie, P., & Shaw, P.** (2015). [Failure-directed search for constraint-based scheduling](https://vilim.eu/petr/cpaior2015.pdf). In CPAIOR 2015 proceedings. [Detailed experimental results](https://vilim.eu/petr/cpaior2015-results.pdf).

- PLC2015 (6 bounds in ta and dmu) : **Peng, B., Lü, Z., & Cheng, T. C. E.** (2015). [A tabu search/path relinking algorithm to solve the job shop scheduling problem](https://arxiv.org/abs/1402.5613). Computers & Operations Research, 53, 154-164.

- SS2018 (7 bounds in swv, ta and dmu) : **Shylo, O. V., & Shams, H.** (2018). [Boosting binary optimization via binary classification: A case study of job shop scheduling](https://arxiv.org/abs/1808.10813).

- CS2022 (6 bounds in dmu) : **Constantino, O. H., & Segura, C.** (2022). A parallel memetic algorithm with explicit management of diversity for the job shop scheduling problem. Applied Intelligence, 52(1), 141-153. [available online](https://doi.org/10.1007/s10489-021-02406-2)

- LHW2024 (6 bounds in ta and dmu) : **Mingjie Li, Jin-Kao Hao & Qinghua Wu** (2025). Combining Hash-based Tabu Search and Frequent Pattern Mining for Job-Shop Scheduling. IISE Transactions.

- CdGKGC2025 (1 bounds - dmu72) : **Marc-Emmanuel Coupvent des Graviers, Lotfi Kobrosly, Christophe Guettier, and Tristan Cazenave** (2025). [Updating Lower and Upper Bounds for the Job-Shop Scheduling Problem Test Instances](https://arxiv.org/abs/2504.16106).

- LLG2026 (16 bounds in ta and dmu) : **Qihao Liu, Xinyu Li, and Liang Gao** (2026) A Knowledge-Driven Decoupling and Coordinated Optimization Framework Based on Decision-Variable Parameterization and Release for the Job-Shop Scheduling Problem'

- DOFP2026 (19 bounds in dmu and tai) : **Diego Olivier Fernandez Pons** (2026) [Personal communication] Best known so far upper-bounds were given as starting solution to OptalCP, and ran for 10 minutes

- Diaz2026 (2 bounds - dmu16 and dmu61) : **Hernan Diaz Rodriguez** (2026) [Personal communication] A memetic algorithm with path-relinking crossover between elite schedules, tabu search on the N7 neighbourhood (Zhang et al. tenure) with GTA-style guided tenure, and restarts; The initial population holds good solutions already.

- Schwemin2026 (11 bounds in dmu and tai) : **Marcel Schwemin** (2026) [Personal communication](https://github.com/ScheduleOpt/benchmarks/issues/15) N7 Tabu with time-slabs from initial population, on GPU

- AMFCV2026 (9 bounds in tai) : **Andre Albrecht, Enzo Morosini Frazzon, Leandro C. Coelho and Bruno Vieira** (2026) [Personal communication](https://github.com/ScheduleOpt/benchmarks/issues/19) Corridor search + min-conflict repair + cp initial propagation + compaction


All other bounds were found by OptalCP except 4 bounds by CP-SAT and 1 by Hexaly. The cited papers may use an engine directly like [CPO2015] or as part of an algorithm like [CdGKGC2025].

<br/>

## Historical appendix

### History of jsplib instances

[WORK IN PROGRESS]

### History of jsplib

[WORK IN PROGRESS]

### History of the engines

<details>
<summary>IBM ILOG Cplex (1987 - present)</summary>

<br/>

**Cplex** is a MIP engine founded by Robert Bixby in 1987, and acquired in 1997 by ILOG, subsequently acquired by IBM in 2009.

Like similar state-of-the-art MIP engines, Cplex features
- a presolve
- various LP algorithms (simplex, dual simplex, barrier)
- search strategies with learning (branching, restarts)
- a large collection of cuts
- primal heuristics
- conflict analysis adapted from SAT
- solution polishing before the time-limit

Improvements in complex software like Cplex are incremental, but we can broadly divide its evolution as follows
- Cplex 1-3 [**1987-1994**] LP improvements (simplex, dual simplex, interior points), basic presolve and branch-and-cut. Cplex 3.0 is a performance milestone due to its mature dual simplex.
- Cplex 6-7 [**1998-2001**] established what we would recognize today as a modern MIP (presolve + branch-and-cut + heuristics + learning) with a particular emphasis on cuts. Cplex 6.5 (1999) is considered by practitioners as a performance milestone.
- Cplex 9-11 [**2003-2007**] more emphasis on primal approaches: heuristics (RINS, Feasibility pump), search strategies (restart + node presolve), solution polishing, SAT-like conflict analysis. Cplex 11 is considered as a performance milestone.
- Cplex 11/12- [**2007-**] more cuts (GCD-based cuts, multi-commodity flow) sometimes mixed with heuristics (pump reduce) or search (conflict analysis), and systematic cutting plane filtering allowing a more aggressive usage of cuts.

From 2008, Bixby, Rothberg and Gu created Gurobi.

References
- [Solving Real-World linear programs: a decade and more of progress](https://pubsonline.informs.org/doi/epdf/10.1287/opre.50.1.3.17780) (Robert Bixby - 2002)
- [Mixed Integer Programming: Analyzing 12 Years of Progress." In Facets of Combinatorial Optimization](https://link.springer.com/chapter/10.1007/978-3-642-38189-8_18) (Tobias Achterberg, Roland Wunderling - 2013)

<br/>

</details>

<details>
<summary>IBM ILOG CP Optimizer (2007 - present)</summary>

<br/>

**CP Optimizer** is a descendant of **ILOG Solver** developed over the years by Jean-François Puget, Jean-Charles Régin and later Laurent Perron and **ILOG Scheduler** developed by Claude Le Pape, Wim Nuijten and later Philippe Laborie. CP Optimizer (led by Paul Shaw, Laurent Perron and Philippe Laborie) merged the general CP engine and the specific scheduling add-on in a single engine, promoted the model-and-run approach and pioneered a new scheduling language (optional intervals, noOverlap, cumulative functions, etc.) that has become an industry standard.

From a technical perspective, CP Optimizer interleaves the following search methods
- **Large Neighbourhood Search** (Shaw et al.): tree-search based local search
- **Iterative diving** (designed by Philippe Laborie): a quick diving heuristic for "simple" scheduling problems that often provides fast and good initial solutions
- **Failure Directed Search** (designed by Petr Vilim): a generalization of the fail-first principle that reduces the search space by eliminating assignments unlikely to succeed
- **Genetic algorithms** on top of the scheduling engine: named "multi-point" search, they are not on by default unless a large number of cores are available

The **temporal linear relaxation** solved by an LP and **objective landscapes** act like a reduced cost / impact based oracle but for scheduling problems.

Because CP Optimizer was designed in a time where multi-core computers were not common, the engine alternates the different strategies on the same core, and replicates itself over various cores with different parameters if more cores are available.

The main propagation algorithms in CP Optimizer are 
- **time tabling** and **edge-finding** for disjunctive and cumulative resources (Claude Le Pape, Wim Nuijten, Philippe Baptiste) later improved by Petr Vilim 
- **logical network** for implications and (dis)equalities between boolean variables
- **simple temporal networks** for precedences

References
- [20+ years of scheduling with constraints at IBM/ILOG](https://link.springer.com/content/pdf/10.1007/s10601018-9281-x.pdf) (Philippe Laborie, Jérôme Rogerie, Paul Shaw and Petr Vilim - 2018)
- [Introduction to CP Optimizer](https://cp2019.a4cp.org/PDFs/P-Laborie.pdf) (Philippe Laborie - 2019)
- [Self-adapting large neighborhood search: Application to single-mode scheduling problems](http://ppcro.free.fr/pres/070605/Laborie_SelfAdaptingLNS.pdf) (Philippe Laborie and Daniel Godard - 2007)
- [Reasoning with Conditional Time-intervals](https://cdn.aaai.org/FLAIRS/2008/FLAIRS08-126.pdf) (Philippe Laborie and Jérôme Rogerie - 2008)
- [Reasoning with Conditional Time-intervals Part II](https://cdn.aaai.org/ocs/60/60-2374-1-PB.pdf) (Philippe Laborie, Jérôme Rogerie, Paul Shaw and Petr Vilim - 2009)
- [Temporal linear relaxation in IBM ILOG CP Optimizer](https://link.springer.com/article/10.1007/s109510140408-7) (Philippe Laborie and Jérôme Rogerie - 2014)
- [Failure-Directed Search for Constraint-Based Scheduling](https://link.springer.com/chapter/10.1007/978-3-319-18008-3_30) (Petr Vilim, Philippe Laborie and Paul Shaw - 2015)
- [Objective landscapes for constraint programming](https://link.springer.com/chapter/10.1007/978-3-319-93031-2_28) (Philippe Laborie - 2018)

<br/>

</details>

<details>
<summary>Google OR-Tools CP-SAT (2018–present)</summary>

<br/>

CP-SAT is an open-source constraint-programming solver in Google [OR-Tools](https://developers.google.com/optimization) since July 2018. It is distinct from OR-Tools' older classic CP solver, which remains the foundation of the vehicle-routing library.

CP-SAT combines lazy clause generation (LCG), specialized constraint propagation, linear programming (LP) relaxation, and mixed-integer programming (MIP) techniques within a parallel search architecture.

#### Solver architecture

The main components are:

- **Lazy Clause Generation and SAT.** A SAT component handles boolean propagation, conflict analysis, and clause learning. Integer variables are lazily encoded as booleans with clauses linking them. Constraint propagators generate clauses or improve existing ones with the deductions they make.
- **Constraint propagation.** Constraint propagators implement filtering algorithms which are translated into clauses that improve bounds (e.g. $x = 2 \vee x = 3$) or reify a more complex deduction (e.g. $y = 0 \vee x\geq 5$). Scheduling propagators include overload checking, detectable precedences, not-first/not-last reasoning, edge finding, time-table propagation, and energetic reasoning.
- **LP relaxation and MIP techniques.** An LP relaxation is maintained. It incorporates cutting planes, reduced-cost reasoning, and dual information. The LP receives inequalities and bounds from constraints and cut generators.
- **Portfolio search (MIP heuristics, large-neighborhood search and violationLS).** Multiple parallel workers run complementary search strategies. They share information including feasible solutions and objective bounds, as well as learned clauses and other search information.

##### Scheduling reasoning: CP propagators and LP cuts

CP-SAT has two types of "deduction generators":

- **CP propagators**, which filter variable domains and provide explanations for their deductions.
- **LP cut generators**, which add valid inequalities to strengthen the linear relaxation.

While often exploiting the same underlying reasoning, the two types of generators don't always compute the same deductions.

**NoOverlap (disjunctive resource)**

| Reasoning | CP propagation | LP cut | Relationship |
|---|---|---|---|
| Overload checking | Theta-tree-based overload checker | Energy cuts | Both exploit the impossibility of packing required processing into an insufficient time span |
| Detectable precedences | Pairwise and task-set detectable precedences | Mandatory-precedence and Balas disjunctive cuts | Pairwise analogues exist; the LP cuts do not reproduce the full task-set filtering algorithm |
| Not-first / not-last | Dedicated task-set filtering | No dedicated cut family | No direct counterpart |
| Edge finding | Theta-tree-based task-set edge finding | No dedicated edge-finding cut | Completion-time inequalities are related, but are not an equivalent implementation |
| Completion time | No dedicated completion-time propagator | Queyranne area-based and exhaustive completion-time cuts | An LP-side polyhedral family |

**Cumulative resource**

| Reasoning | CP propagation | LP cut | Relationship |
|---|---|---|---|
| Time-table | Compulsory-part profile filtering | Time-table cuts | Closest correspondence: both exploit mandatory resource usage |
| Energetic reasoning | Theta-tree-based energy propagation | Energy cuts | Same energy principle, different deductions |
| Time-table edge finding | Combined compulsory-part and residual-energy filtering | Separate time-table and energy cuts | The LP generators use overlapping ingredients but do not implement the combined filtering algorithm |
| Resource-induced precedences | Subset-based precedence reasoning | Mandatory-precedence cuts | Related deductions, but not one-to-one implementations |
| Dual-feasible functions (DFF) | Conservative-scale overload checker | No dedicated DFF cut family | No direct counterpart |
| Completion time | Partial overlap with other propagators | Cumulative completion-time cuts | The LP relaxation uses a transformation based on replacing a task of duration \(d\) and demand \(k\) by a disjunctive task of duration \(dk/C_{\max}\) |

##### Implementation

The principal implementation files in OR-Tools v9.15 are:

| Component | Source files |
|---|---|
| Disjunctive propagation | `disjunctive.cc`, `disjunctive.h` |
| Cumulative propagation | `cumulative.cc`, `cumulative.h` |
| Time-table propagation | `timetable.cc`, `timetable_edgefinding.cc` |
| Cumulative energy and DFF reasoning | `cumulative_energy.cc` |
| Scheduling cut generators | `scheduling_cuts.cc`, `scheduling_cuts.h` |
| LP integration | `linear_programming_constraint.h`, `linear_relaxation.cc` |
| Solver parameters | `sat_parameters.proto` |

##### References

- Laurent Perron, Frédéric Didier, and Steven Gay. **The CP-SAT-LP Solver (Invited Talk)**. CP 2023. [DOI: 10.4230/LIPIcs.CP.2023.3](https://doi.org/10.4230/LIPIcs.CP.2023.3).
- Laurent Perron. **CP-SAT for Scheduling**. Scheduling Seminar, 2024. [Presentation](https://schedulingseminar.com/presentations/SchedulingSeminar_LaurentPerron.pdf).
- Google OR-Tools. [CP-SAT source code, v9.15](https://github.com/google/or-tools/tree/v9.15/ortools/sat).
- Google OR-Tools. [Scheduling documentation](https://developers.google.com/optimization/scheduling).
- Google OR-Tools. [Release notes](https://developers.google.com/optimization/support/release_notes).

<br/>

</details>

<details>
<summary>OptalCP (2021 - present)</summary>

<br/>

**OptalCP** was designed by Petr Vilim, Nicolas Bonifas and Diego Olivier Fernandez Pons (initially with input from Philippe Laborie). Compared to CPO, the parallelism is done with one strategy per core instead of interleaving. The strategies used are:
- **Large Neighbourhood Search** (LNS): tree-search-based local search
- **Failure Directed Search** (FDS): generalizes first-fail principle
- **FDSDual**: generalizes destructive lower bounds

OptalCP continues the legacy of CP Optimizer (engine style, modeling language). The hybridization of OptalCP with heuristics and meta-heuristics is done outside by communicating upper and lower bounds in real time (during search).

References
- [OptalCP at scheduling seminar](https://schedulingseminar.com/presentations/schedulingseminar_petrvilim_vilemheinz.pdf) (Petr Vilim - 2026)

<br/>

</details>

<br/>

>
> If your name appears in this section and you notice an error, contact me
>

<br/>

