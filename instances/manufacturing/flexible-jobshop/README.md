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
    - [Results on openshop instances](#results-on-openshop-instances)
    - [Results on jobshop and flowshop instances](#results-on-jobshop-and-flowshop-instances)
    - [Results with added precedences](#results-with-added-precedences)
- [Recommendation](#recommendation)

<br/>


# Openshop benchmark instances

## Overview of the openshop benchmark

### Openshop (and parallel machines) instances

All instances in the benchmark follow the standard openshop format, regardless of the problem they were originally meant for.

Openshop instances
- 60 instances of openshop `tos` from Taillard 1993
- 80 instances of openshop `gp` from Gueret and Prins 1999
- 52 instances of openshop `j*-per*` from Brucker, Hurink, Jurisch and Wotmann 1997

Parallel machines
- 1400 instances of parallel machines `fr` from Fanjul-Peyro and Ruiz 2010

### Jobshop and flowshop instances

The full jobshop benchmark can also be ran as an openshop problem by replacing the intra-job precedences with a `noOverlap` constraint. The data reader also needs to be adapted accordingly.

Flowshop instances
- 2 instances of flowshop `hel` from Heller 1960
- 8 instances of flowshop `car` from Carlier 1978
- 120 instances of flowshop `tfs` from Taillard 1993
- 21 instances of flowshop `reC` from Reeves 1995
- 480 instances of flowshop `vrf` from Vallada, Ruiz and Framinan 2015

Jobshop instances
- 3 instances of jobshop `ft` from Fischer and Thompson 1963 
- 40 instances of jobshop `la` from Lawrence 1984
- 5 instances of jobshop `abz` from Adams, Balas and Zawack 1988
- 10 instances of jobshop `orb` from Applegate and Cook 1991
- 4 instances of jobshop `yn` from Yamada and Nakano 1992
- 20 instances of jobshop `swv` from Storer, Wu and Vaccari 1992
- 80 instances of jobshop `tjs` from Taillard 1993
- 80 instances of jobshop `dmu` from Demirkol, Mehta and Uzsoy 1998

Reentrant jobshop instances
- 12 instances of jobshop `long-js` from Da Col and Teppan 2022
- 12 instances of jobshop `short-js` from Da Col and Teppan 2022
- 90 instances of jobshop `tai_j*_m*_*` from Da Col and Teppan 2022

<br/>


## Classification of the openshop instances

We use the following ***engines*** for the benchmark
- **IBM ILOG Cplex** : representative of the **MIP** family of engines
- **IBM ILOG CP Optimizer** : representative of the **CP-scheduling** family of engines
- **ScheduleOpt OptalCP** : representative of the **CP-scheduling** family of engines
- **Google OR-Tools** : representative of the **CP-SAT** family of engines

*We would like to add a representative of the local search family of engines. Please contact us if you are willing to provide us with licenses for benchmarking purposes.*

The instances are divided into
- **easy** : solved to optimality (with proof) in 1 minute by at least 1 reference engine
- **medium** : solved to optimality (with proof) in 1 hour by at least 1 reference engine
- **hard** : solved to optimality (with proof) by someone, somewhere ... allegedly
- **open** : no proof of optimality

<br/> 

All the instances in the openshop benchmark are solved to optimality by OptalCP in < 1 minute. As such, they are all easy and comparison with other engines is not very informative.

These result are consistent with the results reported by Ruiz and Roshanaei in NRR2022
that noticed all instances were easily solved by CPO.

<br/>


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

-  **Fanjul-Peyro, L., & Ruiz, R.** (2010). Iterated greedy local search methods for unrelated parallel machine scheduling. European Journal of Operational Research, 207(1), 55-69.

<br/>

# Openshop models

## Openshop

The openshop consists in scheduling tasks on machines: there are `n` jobs each one with `m` task, each one having a duration `d`and having to be scheduled on machine `m`. The order in which the tasks within a job are scheduled has no importance, but the tasks for a job need to be scheduled one after the other. Similarly, machines can only process one task at the time.

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

## Results on openshop instances

All the instances in the openshop benchmark are solved to optimality by OptalCP in < 1 minute. As such, they are all easy and comparison with other engines is not very informative.

These result are consistent with the results reported by Ruiz and Roshanaei in NRR2022
that noticed all instances were easily solved by CPO.

<br/>

## Results on jobshop and flowshop instances

The jobshop and flowshop benchmark can be run as an openshop by relaxing the intra-job precedences into a `noOverlap` with the following results

Easy instances
- all 2 flowshop instances `hel` seen as an openshop are solved in < 1 minute
- all 8 flowshop instances `car` seen as an openshop are solved in < 1 minute
- all 21 flowshop instances `reC` seen as an openshop are solved in < 1 minute
- all 3 jobshop instances `ft` seen as an openshop are solved in < 1 minute
- all 40 jobshop instances `la` seen as an openshop are solved in < 1 minute
- all 5 jobshop instances `abz` seen as an openshop are solved in < 1 minute
- all 10 jobshop instances `orb` seen as an openshop are solved in < 1 minute
- all 4 jobshop instances `yn` seen as an openshop are solved in < 1 minute
- all 20 jobshop instances `swv` seen as an openshop are solved in < 1 minute
- all 80 jobshop instances `tjs` seen as an openshop are solved in < 1 minute
- all 80 jobshop instances `dmu` seen as an openshop are solved in < 1 minute

Rerun and check
- all 120 instances `tfs` seen as an openshop are solved in < 1 minute

Medium and open instances
- Out of the 480 instances of flowshop `vrf` 
    - ... are solved < 1 minute
    - ... are solved < 1 hour
    - ... are solved < open
- Out of the 12 instances of jobshop `long-js` 
    - ... are solved < 1 minute
    - ... are solved < 1 hour
    - ... are solved < open
- Out of the 12 instances of jobshop `short-js` 
    - ... are solved < 1 minute
    - ... are solved < 1 hour
    - ... are solved < open
- Out of the 90 instances of jobshop `long-js` 
    - ... are solved < 1 minute
    - ... are solved < 1 hour
    - ... are solved < open

<br/>


## Results with added precedences

Reciprocally, we ran all openshop instances as non-permutation flowshops by adding
precedences between the jobs, in other words

```
4
4
34	2	54	61	
15	89	70	9	
38	19	28	87	
95	7	34	29	
```

implicitly becomes

```
4 4
0 34    1 2     2 54	3 61	
0 15    1 89	2 70	3 9	
0 38    1 19	2 28	3 87	
0 95    1 7	    2 34	3 29	
```

The result of openshop instances solved as flowshop with OptalCP is
- Brucker and al. 1997 instances (up to 8x8) are all solved < 1 minute
- Gueret Prins 1999 instances (up to 10x10) are all solved in < 1 minute
- Taillard 1993 instances (up to 20x20) are mostly solved in < 1 minute with
some instances taking 1h
- Fanjul-Peyro and Ruiz 2010 instances (from 100x10 to 1000x50) are all open, OptalCP is unable to close them in < 1h

<br/>

These results show that the noOverlap constraint makes the problem less difficult than the precedence constraint.


<br/>

# Recommendation

We recommend 
- retiring all the open-shop instances
- transforming the Fanjul-Peyro parallel machines instances into the jobshop format and integrating them to the jobshop / flowshop benchmark
- using the jobshop / flowshop benchmark to benchmark openshop problems by relaxing the intra-job precedence into a `noOverlap`