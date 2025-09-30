---
layout: page
title: Openshop
permalink: /openshop/
nav_order: 3
---

# Openshop

## Table of Contents

- [Openshop instances](#openshop-benchmark-instances)
    - [Overview of the open-shop benchmark](#overview-of-the-openshop-benchmark)
    - [Classification of the openshop instances](#classification-of-the-openshop-instances)
    - [Formats](#formats)
    - [Publications](#publications)
- [Openshop models](#openshop-models)
    - [Openshop](#openshop)
    - [Openshop variants](#variants-of-the-openshop-problem)
- [Openshop benchmark results](#openshop-benchmark-results)

<br/>

# Openshop benchmark instances

## Overview of the openshop benchmark

All instances in the benchmark follow the standard openshop format

Openshop instances (192)
- 60 instances of openshop `ta*x*_*` from Taillard 1993
- 80 instances of openshop `gp` from Gueret and Prins 1999
- 52 instances of openshop `j*-per*` from Brucker, Hurink, Jurisch and Wotmann 1997

## Classification of the openshop instances

We use the following ***engines*** as reference engines the benchmark
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the CP-scheduling family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the lazy clause generation family of engines
- [**OptalCP**](https://optalcp.com) : representative of the CP-scheduling family of engines


Instances are divided into
- **easy** : solved to optimality (with proof) in 1 minute by at least 1 reference engine
- **medium** : solved to optimality (with proof) in 1 hour by at least 1 reference engine
- **hard** : solved to optimality (with proof) in > 1h by at least 1 reference engine
- **closed** : allegedly solved by someone in a paper. Most of the time the optimal solution is known because 2 different methods were used to find upper and lower bounds.
- **open** : no proof of optimality

<br/>

Currently the instances in the openshop benchmark are solved to optimality by OptalCP in < 1 minute.


## Formats

```
#n 
#m
((duration){m}\n){n}
```
For instance `ta4x4_1os` in  format is
```
4 4
34 2 54 61
15 89 70 9
38 19 28 87
95 7 34 29
```

<br/>

## Publications

The instances for the **open shop** come from the following publications

- **Taillard, E.** (1993). Benchmarks for basic scheduling problems. european journal of operational research, 64(2), 278-285.

- **Brucker, P., Hurink, J., Jurisch, B., & Wöstmann, B.** (1997). A branch & bound algorithm for the open-shop problem. Discrete Applied Mathematics, 76(1-3), 43-59.

- **Guéret, C., & Prins, C**. (1999). A new lower bound for the open‐shop problem. Annals of Operations Research, 92(0), 165-183.

<br/>

# Openshop models

## Openshop

The openshop consists in scheduling tasks on machines: there are `n` jobs each one with `m` task, each one having a duration `d` and having to be scheduled on machine `m`. The order in which the tasks within a job are scheduled has no importance, but the tasks for a job need to be scheduled one after the other. Similarly, machines can only process one task at the time.

These results in two constraints for the openshop problem

- no overlap per job

$$\forall j \in \mathrm{jobs} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{start}_j^m + \mathrm{Duration}_j^m ] \mid m \in \mathrm{machines} \ \rbrace$$

- no overlap per machine 

$$\forall m \in \mathrm{machines} \quad \mathrm{noOverlap} \ \lbrace \ [ \mathrm{start}_j^m \dots \ \mathrm{start}_j^m + \mathrm{Duration}_j^m ] \mid j \in \mathrm{jobs} \ \rbrace$$

<br/>

In other words there is an overlap per row and per column

<br/>

## Variants of the openshop problem

The openshop problem can be added the same constraints as the jobshop problem
- no-buffer (blocking) open-shop
- no-wait open-shop
- cumulative open-shop
- openshop with operators

<br/>

# Openshop benchmark results

All the instances in the openshop benchmark are solved to optimality by OptalCP in < 1 minute. As such, they are all easy and comparison with other engines is not very informative. These result are consistent with the results reported by Ruiz and Roshanaei in NRR2022 that noticed all instances were easily solved by CPO.


