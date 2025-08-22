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
- **presumed closed** : allegedly solved by someone in a paper. Most of the time the optimal solution is known because 2 different methods were used to find upper and lower bounds.
- **open** : no proof of optimality

<br/>

Currently the instances in the openshop benchmark are solved to optimality by OptalCP in < 1 minute.


## Formats

There are two main formats, the ***standard***, and the ***taillard***

### Standard format

```
#n 
#m
((duration){m}\n){n}
```
For instance `tfs001` in standard format is
```
20
5
54	79	16	66	58	
83	3	89	58	56	
15	11	49	31	20	
71	99	15	68	85	
77	56	89	78	53	
36	70	45	91	35	
53	99	60	13	53	
38	60	23	59	41	
27	5	57	49	69	
87	56	64	85	13	
76	3	7	85	86	
91	61	1	9	72	
14	73	63	39	8	
29	75	41	41	49	
12	47	63	56	47	
77	14	47	40	87	
32	21	26	54	58	
87	86	75	77	18	
68	5	77	51	68	
94	77	40	31	28	
```

### Taillard format

The taillard format is the transposed

```
#n #m
((duration ){m}\n){n}
```

For instance `tfs001` in taillard format is
```
20
5

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


