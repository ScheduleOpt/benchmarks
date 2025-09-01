# The flexible jobshop problem and benchmark

## Table of Contents

- [Flexible jobshop instances](#flexible-jobshop-benchmark-instances)
    - [Overview of the flexible jobshop benchmark](#overview-of-the-flexible-jobshop-benchmark)
    - [Classification of the flexible jobshop instances](#classification-of-the-flexible-jobshop-instances)
    - [Formats](#formats)
    - [Publications](#publications-instances)
- [Flexible jobshop benchmark](#flexible-jobshop-benchmark)
    - [Best known solutions](#best-known-solutions)
    - [Publications](#publications-best-known-solutions)

<br/>

# Flexible jobshop benchmark instances

The flexible jobshop benchmark problems have been collected from the literature from 1993 to 2012. Some are modified versions of JSPLIB jobshop problems, but some instances come from industrial problems.

On this page we keep track of the best known solutions (BKS) and classify the instances based on difficulty.

## Overview of the flexible jobshop benchmark

Flexible jobshop instances (332)
- 10 instances `mk` from Brandimarte 1993
- 4 x 66 instances `edata` `rdata` `sdata` and `vdata` from Hurink, Jurisch and Thole 1994
- 18 instances `#a` from Dauzère-Pérès and Paulli 1994
- 3 x 7 instances `mt` `setb4` and `seti5` from Chambers and Barnes 1996 
- 4 instances `kacem` from Kacem, Hammadi and Borne 2002
- 20 instances `fattahi` from Fattahi, Mehrabad and Jolai 2007
- 60 instances `behnke` from Behnke and Geiger 2012

The Hurinkm Jurisch and Thole instances are classic jobshop problems modified into flexible jobshops

## Classification of the flexible jobshop instances

We use the following engines as references for the benchmark
- [**IBM ILOG CP Optimizer**](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-cp-optimizer) : representative of the CP-scheduling family of engines
- [**Google CP-SAT**](https://developers.google.com/optimization) : representative of the lazy clause generation family of engines
- [**OptalCP**](https://optalcp.com) : representative of the lazy clause generation family of engines

We have dropped Cplex from the flexible jobshop tests due to poor performance of linear solvers as reported by multiple authors in the literature and confirmed by ourselves.


Instances are divided into
- **easy** : solved to optimality (with proof) in 1 minute by at least 1 reference engine
- **medium** : solved to optimality (with proof) in 1 hour by at least 1 reference engine
- **hard** : solved to optimality (with proof) in > 1h by at least 1 reference engine
- **closed** : allegedly solved to optimality. Most of the time the optimal solution is known because 2 different methods were used to find upper and lower bounds.
- **open** : no proof of optimality

Currently the instances divide as follows
- `mk` : 7 easy, 2 medium, 1 open
- `edata` : 57 easy, 3 medium, 4 hard, 2 open
- `rdata` : 43 easy, 5 medium, 6 closed, 12 open
- `vdata` : 47 easy, 8 medium, 1 hard, 9 closed, 1 open
- `#a` : 3 easy, 1 medium, 14 open
- `mt` : 7 easy
- `setb4` : 7 easy
- `seti5` : 7 easy
- `kacem` : 4 easy
- `fattahi` : 20 easy
- `behnke` : 15 easy, 12 medium, 33 open

## Formats

The flexible jobshop format is a variant of the standard jobshop format.

First some terminology
- a ***job*** is a sequence of ***operations*** done on an object
- each operation has multiple ***options*** (also called modes) 
    - in the case of the flexible jobshop a ***machine*** and a ***duration***

Hence in a flexible jobshop file
- each line represents a ***job**
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

<br/>


## Publications (instances)

The instances come from the following publications

- **Brandimarte, P** (1993). Routing and scheduling in a flexible job shop by tabu search. Annals of Operations research, 41(3), 157-183.

- **Hurink, J., Jurisch, B., & Thole, M.** (1994). Tabu search for the job-shop scheduling problem with multi-purpose machines. Operations-Research-Spektrum, 15(4), 205-215.

- **Dauzère-Pérès, S., & Paulli, J.** (1994). Solving the general multiprocessor job-shop scheduling problem.

- **Chambers, J. B., & Barnes, J. W.** (1996). Flexible job shop scheduling by tabu search. The University of Texas, Austin, TX, Technical Report Series ORP96-09, Graduate Program in Operations Research and Industrial Engineering.

- **Kacem, I., Hammadi, S., & Borne, P.** (2002). Pareto-optimality approach for flexible job-shop scheduling problems: hybridization of evolutionary algorithms and fuzzy logic. Mathematics and computers in simulation, 60(3-5), 245-276.

- **Fattahi, P., Saidi Mehrabad, M., & Jolai, F.** (2007). Mathematical modeling and heuristic approaches to flexible job shop scheduling problems. Journal of intelligent manufacturing, 18(3), 331-342.

- **Behnke, D., & Geiger, M. J.** (2012). Test instances for the flexible job shop scheduling problem with work centers.


<br/>



# Flexible jobshop benchmark

The flexible jobshop benchmark problems have been collected from the literature from 1993 to 2012. Some are modified versions of JSPLIB jobshop problems, but some instances come from industrial problems. On this page we keep track of the best known solutions (BKS) and classify the instances based on difficulty.

An instance is considered
- `easy` if it is solved to optimality by a reference engine in < 1 minute
- `medium` if it is solved to optimality by a reference engine in < 1h
- `hard` if it is solved to optimality by a reference engine in > 1h
- `closed` if the combination of upper and lower bounds found in the literature allows concluding the value of the optimal solution is known
- `open` otherwise

<br/>

For each instance we indicate the publication or engine that reaches that bound (lower or upper). When reporting the results:
- we give priority to engines over publications because of reproductibility of the results
- we give priority to the fastest engine to attain the bound
- when an engine attains a bound previously reported in the literature, we attribute the bound to the engine and remove the correponding paper from the list of relevant references

Other databases keep instead the ***first*** publication or method to have achieved that bound for historical reference. This work instead is meant for engine and algorithm developers to have means of reproducing the claimed results for comparison.

## Best known solutions 

If you visualize the markdown in Visual Studio Code you will have colors !

### Brandimarte (1993)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>mk01</td><td>10 x 6</td><td>fjsp</td><td>40</td><td>40</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mk02</td><td>10 x 6</td><td>fjsp</td><td>26</td><td>26</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mk03</td><td>15 x 8</td><td>fjsp</td><td>204</td><td>204</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mk04</td><td>15 x 8</td><td>fjsp</td><td>60</td><td>60</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mk05</td><td>15 x 4</td><td>fjsp</td><td>172</td><td>172</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mk06</td><td>10 x 15</td><td>fjsp</td><td>57</td><td>57</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>mk07</td><td>20 x 5</td><td>fjsp</td><td>139</td><td>139</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>mk08</td><td>20 x 10</td><td>fjsp</td><td>523</td><td>523</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mk09</td><td>20 x 10</td><td>fjsp</td><td>307</td><td>307</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mk10</td><td>20 x 15</td><td>fjsp</td><td>189</td><td>193</td><td style="background-color:grey">open</td><td>lb Quintiq / ub Quintiq</td></tr>
<tr><td>mk11</td><td>30 x 5</td><td>fjsp</td><td>594</td><td>615</td><td style="background-color:grey">open</td><td>CPO in 2012</td></tr>
<tr><td>mk12</td><td>30 x 10</td><td>fjsp</td><td>320</td><td>508</td><td style="background-color:grey">open</td><td>CPO in 2012</td></tr>
<tr><td>mk13</td><td>30 x 10</td><td>fjsp</td><td>353</td><td>430</td><td style="background-color:grey">open</td><td>CPO in 2012</td></tr>
<tr><td>mk14</td><td>30 x 15</td><td>fjsp</td><td>694</td><td>694</td><td style="background-color:purple">closed</td><td>CPO in 2012</td></tr>
<tr><td>mk15</td><td>30 x 15</td><td>fjsp</td><td>283</td><td>341</td><td style="background-color:grey">open</td><td>CPO in 2012</td></tr>
</table>

***Instances mk11 to mk15 are only available from the supplementary material of Test Instances for the Flexible Job Shop Scheduling Problem with Work Centers  Research Report RR-12-01-01 · January 2012 · ISSN 2192-0826***

### Hurink, Jurisch and Thole (1994)

The problems in this benchmark are modified versions of the corresponding jobshop problems. They are divided into
- **sdata** : each operation can be assigned to a single machine (jobshop)
- **edata** : a few operations can be assigned to many machines
- **rdata** : most operations can be assigned to a few machines
- **vdata** : all operation can be assigned to many machines

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>abz5</td><td>10 x 10</td><td style="background-color:green">1234</td><td style="background-color:green">1167</td><td style="background-color:green">954</td><td style="background-color:green">859</td><td>OptalCP</td></tr>
<tr><td>abz6</td><td>10 x 10</td><td style="background-color:green">943</td><td style="background-color:green">925</td><td style="background-color:green">807</td><td style="background-color:green">742</td><td>OptalCP</td></tr>
<tr><td>abz7</td><td>20 x 15</td><td style="background-color:orange">656</td><td style="background-color:grey">604 / 610</td><td style="background-color:grey">497 / 522</td><td style="background-color:purple">492</td><td>OptalCP, CPO2013 / Quintiq, CdGKGC2025 / DLLSXG2019, Quintiq / Quintiq</td></tr>
<tr><td>abz8</td><td>20 x 15</td><td style="background-color:red">667</td><td style="background-color:grey">625 / 636</td><td style="background-color:grey">509 / 535</td><td style="background-color:grey">506 / 507</td><td>OptalCP, CPO2013 / Quintiq, CdGKGC2025 / DLLSXG2019, OptalCP / Quintiq</td></tr>
<tr><td>abz9</td><td>20 x 15</td><td style="background-color:red">678</td><td style="background-color:red">644</td><td style="background-color:grey">517 / 536</td><td style="background-color:purple">497</td><td>OptalCP, CPO2013 / CPO2013, CPO2013 / Quintiq, OptalCP / Quintiq</td></tr>
</table>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>car1</td><td>11 x 5</td><td style="background-color:green">7038</td><td style="background-color:green">6176</td><td style="background-color:orange">5034</td><td style="background-color:purple">5005</td><td>OptalCP, OptalCP / Quintiq</td></tr>
<tr><td>car2</td><td>13 x 4</td><td style="background-color:green">7166</td><td style="background-color:green">6327</td><td style="background-color:green">5985</td><td style="background-color:green">5929</td><td>OptalCP</td></tr>
<tr><td>car3</td><td>12 x 5</td><td style="background-color:green">7312</td><td style="background-color:green">6856</td><td style="background-color:purple">5622</td><td style="background-color:orange">5597</td><td>OptalCP, Quintiq / Quintiq</td></tr>
<tr><td>car4</td><td>14 x 4</td><td style="background-color:green">8003</td><td style="background-color:green">7789</td><td style="background-color:green">6514</td><td style="background-color:green">6514</td><td>OptalCP</td></tr>
<tr><td>car5</td><td>10 x 6</td><td style="background-color:green">7702</td><td style="background-color:green">7229</td><td style="background-color:green">5615</td><td style="background-color:purple">4909</td><td>OptalCP, OptalCP / CdGKGC2025</td></tr>
<tr><td>car6</td><td>8 x 9</td><td style="background-color:green">8313</td><td style="background-color:green">7990</td><td style="background-color:green">6147</td><td style="background-color:green">5486</td><td>OptalCP</td></tr>
<tr><td>car7</td><td>7 x 7</td><td style="background-color:green">6558</td><td style="background-color:green">6123</td><td style="background-color:green">4425</td><td style="background-color:green">4281</td><td>OptalCP</td></tr>
<tr><td>car8</td><td>8 x 8</td><td style="background-color:green">8264</td><td style="background-color:green">7689</td><td style="background-color:green">5692</td><td style="background-color:green">4613</td><td>OptalCP</td></tr>
</table>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>la01</td><td>10 x 5</td><td style="background-color:green">666</td><td style="background-color:green">609</td><td style="background-color:orange">570</td><td style="background-color:green">570</td><td>OptalCP</td></tr>
<tr><td>la02</td><td>10 x 5</td><td style="background-color:green">655</td><td style="background-color:green">655</td><td style="background-color:green">529</td><td style="background-color:green">529</td><td>OptalCP</td></tr>
<tr><td>la03</td><td>10 x 5</td><td style="background-color:green">597</td><td style="background-color:green">550</td><td style="background-color:green">477</td><td style="background-color:green">477</td><td>OptalCP</td></tr>
<tr><td>la04</td><td>10 x 5</td><td style="background-color:green">590</td><td style="background-color:green">568</td><td style="background-color:green">502</td><td style="background-color:green">502</td><td>OptalCP</td></tr>
<tr><td>la05</td><td>10 x 5</td><td style="background-color:green">593</td><td style="background-color:green">503</td><td style="background-color:green">457</td><td style="background-color:green">457</td><td>OptalCP</td></tr>
<tr><td>la06</td><td>15 x 5</td><td style="background-color:green">926</td><td style="background-color:green">833</td><td style="background-color:green">799</td><td style="background-color:green">799</td><td>OptalCP</td></tr>
<tr><td>la07</td><td>15 x 5</td><td style="background-color:green">890</td><td style="background-color:green">762</td><td style="background-color:green">749</td><td style="background-color:green">749</td><td>OptalCP</td></tr>
<tr><td>la08</td><td>15 x 5</td><td style="background-color:green">863</td><td style="background-color:green">845</td><td style="background-color:green">765</td><td style="background-color:green">765</td><td>OptalCP</td></tr>
<tr><td>la09</td><td>15 x 5</td><td style="background-color:green">951</td><td style="background-color:green">878</td><td style="background-color:green">853</td><td style="background-color:green">853</td><td>OptalCP</td></tr>
<tr><td>la10</td><td>15 x 5</td><td style="background-color:green">958</td><td style="background-color:green">866</td><td style="background-color:green">804</td><td style="background-color:green">804</td><td>OptalCP</td></tr>
<tr><td>la11</td><td>20 x 5</td><td style="background-color:green">1222</td><td style="background-color:green">1103</td><td style="background-color:green">1071</td><td style="background-color:green">1071</td><td>OptalCP</td></tr>
<tr><td>la12</td><td>20 x 5</td><td style="background-color:green">1039</td><td style="background-color:green">960</td><td style="background-color:green">936</td><td style="background-color:green">936</td><td>OptalCP</td></tr>
<tr><td>la13</td><td>20 x 5</td><td style="background-color:green">1150</td><td style="background-color:green">1053</td><td style="background-color:green">1038</td><td style="background-color:green">1038</td><td>OptalCP</td></tr>
<tr><td>la14</td><td>20 x 5</td><td style="background-color:green">1292</td><td style="background-color:green">1123</td><td style="background-color:green">1070</td><td style="background-color:green">1070</td><td>OptalCP</td></tr>
<tr><td>la15</td><td>20 x 5</td><td style="background-color:green">1207</td><td style="background-color:green">1111</td><td style="background-color:green">1089</td><td style="background-color:green">1089</td><td>OptalCP</td></tr>
<tr><td>la16</td><td>10 x 10</td><td style="background-color:green">945</td><td style="background-color:green">892</td><td style="background-color:green">717</td><td style="background-color:green">717</td><td>OptalCP</td></tr>
<tr><td>la17</td><td>10 x 10</td><td style="background-color:green">784</td><td style="background-color:green">707</td><td style="background-color:green">646</td><td style="background-color:green">646</td><td>OptalCP</td></tr>
<tr><td>la18</td><td>10 x 10</td><td style="background-color:green">848</td><td style="background-color:green">842</td><td style="background-color:green">666</td><td style="background-color:green">663</td><td>OptalCP</td></tr>
<tr><td>la19</td><td>10 x 10</td><td style="background-color:green">842</td><td style="background-color:green">796</td><td style="background-color:green">700</td><td style="background-color:green">617</td><td>OptalCP</td></tr>
<tr><td>la20</td><td>10 x 10</td><td style="background-color:green">902</td><td style="background-color:green">857</td><td style="background-color:green">756</td><td style="background-color:green">756</td><td>OptalCP</td></tr>
<tr><td>la21</td><td>15 x 10</td><td style="background-color:green">1046</td><td style="background-color:green">1009</td><td style="background-color:grey">809 / 825</td><td style="background-color:orange">800</td><td>OptalCP, CdGKGC2025 / Quintiq</td></tr>
<tr><td>la22</td><td>15 x 10</td><td style="background-color:green">927</td><td style="background-color:green">880</td><td style="background-color:grey">745 / 753</td><td style="background-color:red">733</td><td>OptalCP, CdGKGC2025 / DLLSXG2019, OptalCP / CPO2013</td></tr>
<tr><td>la23</td><td>15 x 10</td><td style="background-color:green">1032</td><td style="background-color:green">950</td><td style="background-color:grey">820 / 831</td><td style="background-color:purple">809</td><td>OptalCP, CdGKGC2025 / DLLSXG2019, OptalCP / Quintiq</td></tr>
<tr><td>la24</td><td>15 x 10</td><td style="background-color:green">935</td><td style="background-color:green">908</td><td style="background-color:grey">780 / 795</td><td style="background-color:purple">773</td><td>OptalCP, CdGKGC2025 / DLLSXG2019, OptalCP / Quintiq</td></tr>
<tr><td>la25</td><td>15 x 10</td><td style="background-color:green">977</td><td style="background-color:green">936</td><td style="background-color:grey">771 / 779</td><td style="background-color:purple">751</td><td>OptalCP, CdGKGC2025 / DLLSXG2019, OptalCP / Quintiq</td></tr>
<tr><td>la26</td><td>20 x 10</td><td style="background-color:green">1218</td><td style="background-color:orange">1106</td><td style="background-color:grey">1056 / 1057</td><td style="background-color:orange">1052</td><td>OptalCP, MG2000 / Quintiq</td></tr>
<tr><td>la27</td><td>20 x 10</td><td style="background-color:green">1235</td><td style="background-color:green">1181</td><td style="background-color:purple">1085</td><td style="background-color:orange">1084</td><td>OptalCP, MG2000 / Quintiq</td></tr>
<tr><td>la28</td><td>20 x 10</td><td style="background-color:green">1216</td><td style="background-color:red">1142</td><td style="background-color:grey">1075 / 1076</td><td style="background-color:orange">1069</td><td>OptalCP, CPO2013, MG2000 / Quintiq</td></tr>
<tr><td>la29</td><td>20 x 10</td><td style="background-color:orange">1152</td><td style="background-color:red">1107</td><td style="background-color:grey">993 / 994</td><td style="background-color:purple">993</td><td>OptalCP, CPO2013, OptalCP / Quintiq, OptalCP / Quintiq</td></tr>
<tr><td>la30</td><td>20 x 10</td><td style="background-color:green">1355</td><td style="background-color:red">1188</td><td style="background-color:grey">1068 / 1071</td><td style="background-color:purple">1068</td><td>OptalCP, CPO2013, OptalCP / Quintiq, OptalCP / Quintiq</td></tr>
<tr><td>la31</td><td>30 x 10</td><td style="background-color:green">1784</td><td style="background-color:orange">1532</td><td style="background-color:orange">1520</td><td style="background-color:orange">1520</td><td>OptalCP</td></tr>
<tr><td>la32</td><td>30 x 10</td><td style="background-color:green">1850</td><td style="background-color:green">1698</td><td style="background-color:purple">1657</td><td style="background-color:purple">1657</td><td>OptalCP, OptalCP / Quintiq, OptalCP / Quintiq</td></tr>
<tr><td>la33</td><td>30 x 10</td><td style="background-color:green">1719</td><td style="background-color:green">1547</td><td style="background-color:purple">1497</td><td style="background-color:purple">1497</td><td>OptalCP, OptalCP / Quintiq, OptalCP / MG2000</td></tr>
<tr><td>la34</td><td>30 x 10</td><td style="background-color:green">1721</td><td style="background-color:green">1599</td><td style="background-color:purple">1535</td><td style="background-color:orange">1535</td><td>OptalCP, OptalCP / Quintiq,</td></tr>
<tr><td>la35</td><td>30 x 10</td><td style="background-color:green">1888</td><td style="background-color:green">1736</td><td style="background-color:purple">1549</td><td style="background-color:orange">1549</td><td>OptalCP, OptalCP / Quintiq</td></tr>
<tr><td>la36</td><td>15 x 15</td><td style="background-color:green">1268</td><td style="background-color:green">1160</td><td style="background-color:green">1023</td><td style="background-color:green">948</td><td>OptalCP</td></tr>
<tr><td>la37</td><td>15 x 15</td><td style="background-color:green">1397</td><td style="background-color:green">1397</td><td style="background-color:orange">1062</td><td style="background-color:green">986</td><td>OptalCP</td></tr>
<tr><td>la38</td><td>15 x 15</td><td style="background-color:orange">1196</td><td style="background-color:green">1141</td><td style="background-color:green">954</td><td style="background-color:green">943</td><td>OptalCP</td></tr>
<tr><td>la39</td><td>15 x 15</td><td style="background-color:green">1233</td><td style="background-color:green">1184</td><td style="background-color:green">1011</td><td style="background-color:green">922</td><td>OptalCP</td></tr>
<tr><td>la40</td><td>15 x 15</td><td style="background-color:green">1222</td><td style="background-color:orange">1144</td><td style="background-color:orange">955</td><td style="background-color:green">955</td><td>OptalCP</td></tr>
</table>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>ft06</td><td>6 x 6</td><td style="background-color:green">55</td><td style="background-color:green">55</td><td style="background-color:green">47</td><td style="background-color:green">47</td><td>OptalCP</td></tr>
<tr><td>ft10</td><td>10 x 10</td><td style="background-color:green">930</td><td style="background-color:green">871</td><td style="background-color:green">686</td><td style="background-color:green">655</td><td>OptalCP</td></tr>
<tr><td>ft20</td><td>20 x 5</td><td style="background-color:green">1165</td><td style="background-color:green">1088</td><td style="background-color:green">1022</td><td style="background-color:green">1022</td><td>OptalCP</td></tr>
</table>

<table>
<tr><th>Instance</th><th>Size</th><th>sdata</th><th>edata</th><th>rdata</th><th>vdata</th><td>Solved by</td></tr>
<tr><td>orb1</td><td>10 x 10</td><td style="background-color:green">1059</td><td style="background-color:green">977</td><td style="background-color:green">746</td><td style="background-color:green">695</td><td>OptalCP</td></tr>
<tr><td>orb2</td><td>10 x 10</td><td style="background-color:green">888</td><td style="background-color:green">865</td><td style="background-color:green">696</td><td style="background-color:green">620</td><td>OptalCP</td></tr>
<tr><td>orb3</td><td>10 x 10</td><td style="background-color:green">1005</td><td style="background-color:green">951</td><td style="background-color:green">712</td><td style="background-color:green">648</td><td>OptalCP</td></tr>
<tr><td>orb4</td><td>10 x 10</td><td style="background-color:green">1005</td><td style="background-color:green">984</td><td style="background-color:green">753</td><td style="background-color:green">753</td><td>OptalCP</td></tr>
<tr><td>orb5</td><td>10 x 10</td><td style="background-color:green">887</td><td style="background-color:green">842</td><td style="background-color:green">639</td><td style="background-color:green">584</td><td>OptalCP</td></tr>
<tr><td>orb6</td><td>10 x 10</td><td style="background-color:green">1010</td><td style="background-color:green">958</td><td style="background-color:green">754</td><td style="background-color:green">715</td><td>OptalCP</td></tr>
<tr><td>orb7</td><td>10 x 10</td><td style="background-color:green">397</td><td style="background-color:green">389</td><td style="background-color:green">302</td><td style="background-color:green">275</td><td>OptalCP</td></tr>
<tr><td>orb8</td><td>10 x 10</td><td style="background-color:green">899</td><td style="background-color:green">894</td><td style="background-color:green">639</td><td style="background-color:green">573</td><td>OptalCP</td></tr>
<tr><td>orb9</td><td>10 x 10</td><td style="background-color:green">934</td><td style="background-color:green">933</td><td style="background-color:green">694</td><td style="background-color:green">659</td><td>OptalCP</td></tr>
<tr><td>orb10</td><td>10 x 10</td><td style="background-color:green">944</td><td style="background-color:green">933</td><td style="background-color:green">742</td><td style="background-color:green">681</td><td>OptalCP</td></tr>
</table>



### Dauzère-Pérès and Paulli (1994)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>01a</td><td>10 x 5</td><td>fjsp</td><td>2505</td><td>2505</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>02a</td><td>10 x 5</td><td>fjsp</td><td>2228</td><td>2228</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>03a</td><td>10 x 5</td><td>fjsp</td><td>2228</td><td>2228</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>04a</td><td>10 x 5</td><td>fjsp</td><td>2503</td><td>2503</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>05a</td><td>10 x 5</td><td>fjsp</td><td>2195</td><td>2199</td><td style="background-color:grey">open</td><td>lb CdGKGC2025 / ub CdGKGC2025</td></tr>
<tr><td>06a</td><td>10 x 5</td><td>fjsp</td><td>2164</td><td>2169</td><td style="background-color:grey">open</td><td>lb CdGKGC2025 / ub CdGKGC2025 </td></tr>
<tr><td>07a</td><td>15 x 8</td><td>fjsp</td><td>2216</td><td>2254</td><td style="background-color:grey">open</td><td>lb CPO2013 / ub DLLSXG2019</td></tr>
<tr><td>08a</td><td>15 x 8</td><td>fjsp</td><td>2061</td><td>2061</td><td style="background-color:purple">closed</td><td>lb HHHL2010 / ub Quintiq</td></tr>
<tr><td>09a</td><td>15 x 8</td><td>fjsp</td><td>2061</td><td>2061</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>10a</td><td>15 x 8</td><td>fjsp</td><td>2212</td><td>2241</td><td style="background-color:grey">open</td><td>lb CPO2013 / ub Quintiq</td></tr>
<tr><td>11a</td><td>15 x 8</td><td>fjsp</td><td>2019</td><td>2037</td><td style="background-color:grey">open</td><td>lb CdGKGC2025 / ub Quintiq</td></tr>
<tr><td>12a</td><td>15 x 8</td><td>fjsp</td><td>1969</td><td>1984</td><td style="background-color:grey">open</td><td>lb OptalCP / ub Quintiq</td></tr>
<tr><td>13a</td><td>20 x 10</td><td>fjsp</td><td>2206</td><td>2236</td><td style="background-color:grey">open</td><td>lb CdGKGC2025 / ub DLLSXG2019</td></tr>
<tr><td>14a</td><td>20 x 10</td><td>fjsp</td><td>2161</td><td>2161</td><td style="background-color:purple">closed</td><td>lb HHHL2010 / ub Quintiq</td></tr>
<tr><td>15a</td><td>20 x 10</td><td>fjsp</td><td>2161</td><td>2161</td><td style="background-color:purple">closed</td><td>lb HHHL2010 / ub Quintiq</td></tr>
<tr><td>16a</td><td>20 x 10</td><td>fjsp</td><td>2202</td><td>2231</td><td style="background-color:grey">open</td><td>lb CdGKGC2025 / ub Quintiq</td></tr>
<tr><td>17a</td><td>20 x 10</td><td>fjsp</td><td>2089</td><td>2105</td><td style="background-color:grey">open</td><td>lb CdGKGC2025 / ub Quintiq</td></tr>
<tr><td>18a</td><td>20 x 10</td><td>fjsp</td><td>2057</td><td>2070</td><td style="background-color:grey">open</td><td>lb OptalCP / ub Quintiq</td></tr>
</table>

### Chambers and Barnes (1996)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>mt10c1</td><td>10 x 11</td><td>fjsp</td><td>927</td><td>927</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mt10cc</td><td>10 x 12</td><td>fjsp</td><td>908</td><td>908</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mt10x</td><td>10 x 11</td><td>fjsp</td><td>918</td><td>918</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mt10xx</td><td>10 x 12</td><td>fjsp</td><td>918</td><td>918</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mt10xxx</td><td>10 x 13</td><td>fjsp</td><td>918</td><td>918</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mt10xy</td><td>10 x 12</td><td>fjsp</td><td>905</td><td>905</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mt10xyz</td><td>10 x 13</td><td>fjsp</td><td>847</td><td>847</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>mtb4c9</td><td>15 x 11</td><td>fjsp</td><td>914</td><td>914</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>setb4cc</td><td>15 x 12</td><td>fjsp</td><td>907</td><td>907</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>setb4x</td><td>15 x 11</td><td>fjsp</td><td>925</td><td>925</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>setb4xx</td><td>15 x 12</td><td>fjsp</td><td>925</td><td>925</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>setb4xxx</td><td>15 x 13</td><td>fjsp</td><td>925</td><td>925</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>setb4xy</td><td>15 x 12</td><td>fjsp</td><td>910</td><td>910</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>setb4xyz</td><td>15 x 13</td><td>fjsp</td><td>902</td><td>902</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>seti5c12</td><td>15 x 16</td><td>fjsp</td><td>1169</td><td>1169</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>seti5cc</td><td>15 x 17</td><td>fjsp</td><td>1135</td><td>1135</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>seti5x</td><td>15 x 16</td><td>fjsp</td><td>1198</td><td>1198</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>seti5xx</td><td>15 x 17</td><td>fjsp</td><td>1194</td><td>1194</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>seti5xxx</td><td>15 x 18</td><td>fjsp</td><td>1194</td><td>1194</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>seti5xy</td><td>15 x 17</td><td>fjsp</td><td>1135</td><td>1135</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>seti5xyz</td><td>15 x 18</td><td>fjsp</td><td>1125</td><td>1125</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
</table>

### Kacem, Hammadi and Borne (2002)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>kacem1</td><td>4 x 6</td><td>fjsp</td><td>11</td><td>11</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>kacem2</td><td>10 x 7</td><td>fjsp</td><td>11</td><td>11</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>kacem3</td><td>10 x 10</td><td>fjsp</td><td>7</td><td>7</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>kacem4</td><td>15 x 10</td><td>fjsp</td><td>11</td><td>11</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
</table>

### Fattahi, Mehrabad and Jolai (2007)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>fattahi1</td><td>2 x 2</td><td>fjsp</td><td>66</td><td>66</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi2</td><td>2 x 2</td><td>fjsp</td><td>107</td><td>107</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi3</td><td>3 x 2</td><td>fjsp</td><td>221</td><td>221</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi4</td><td>3 x 2</td><td>fjsp</td><td>355</td><td>355</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi5</td><td>3 x 2</td><td>fjsp</td><td>119</td><td>119</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi6</td><td>3 x 2</td><td>fjsp</td><td>320</td><td>320</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi7</td><td>3 x 5</td><td>fjsp</td><td>397</td><td>397</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi8</td><td>3 x 4</td><td>fjsp</td><td>253</td><td>253</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi9</td><td>3 x 3</td><td>fjsp</td><td>210</td><td>210</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi10</td><td>4 x 5</td><td>fjsp</td><td>516</td><td>516</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi11</td><td>5 x 6</td><td>fjsp</td><td>468</td><td>468</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi12</td><td>5 x 7</td><td>fjsp</td><td>446</td><td>446</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi13</td><td>6 x 7</td><td>fjsp</td><td>466</td><td>466</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi14</td><td>7 x 7</td><td>fjsp</td><td>554</td><td>554</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi15</td><td>7 x 7</td><td>fjsp</td><td>514</td><td>514</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi16</td><td>8 x 7</td><td>fjsp</td><td>634</td><td>634</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi17</td><td>8 x 7</td><td>fjsp</td><td>879</td><td>879</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi18</td><td>9 x 8</td><td>fjsp</td><td>884</td><td>884</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi19</td><td>11 x 8</td><td>fjsp</td><td>1055</td><td>1055</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>fattahi20</td><td>12 x 8</td><td>fjsp</td><td>1196</td><td>1196</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
</table>

### Behnke and Geiger (2012)

<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>behnke1</td><td>10 x 20</td><td>fjsp</td><td>90</td><td>90</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke2</td><td>10 x 20</td><td>fjsp</td><td>91</td><td>91</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke3</td><td>10 x 20</td><td>fjsp</td><td>91</td><td>91</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke4</td><td>10 x 20</td><td>fjsp</td><td>97</td><td>97</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke5</td><td>10 x 20</td><td>fjsp</td><td>91</td><td>91</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke6</td><td>20 x 20</td><td>fjsp</td><td>125</td><td>125</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke7</td><td>20 x 20</td><td>fjsp</td><td>89</td><td>124</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke8</td><td>20 x 20</td><td>fjsp</td><td>123</td><td>123</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke9</td><td>20 x 20</td><td>fjsp</td><td>125</td><td>125</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke10</td><td>20 x 20</td><td>fjsp</td><td>127</td><td>127</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke11</td><td>50 x 20</td><td>fjsp</td><td>163</td><td>228</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke12</td><td>50 x 20</td><td>fjsp</td><td>157</td><td>219</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke13</td><td>50 x 20</td><td>fjsp</td><td>160</td><td>229</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke14</td><td>50 x 20</td><td>fjsp</td><td>164</td><td>230</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke15</td><td>50 x 20</td><td>fjsp</td><td>159</td><td>228</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke16</td><td>100 x 20</td><td>fjsp</td><td>327</td><td>412</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke17</td><td>100 x 20</td><td>fjsp</td><td>320</td><td>401</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke18</td><td>100 x 20</td><td>fjsp</td><td>321</td><td>396</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke19</td><td>100 x 20</td><td>fjsp</td><td>323</td><td>400</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke20</td><td>100 x 20</td><td>fjsp</td><td>322</td><td>398</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke21</td><td>10 x 40</td><td>fjsp</td><td>85</td><td>85</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke22</td><td>10 x 40</td><td>fjsp</td><td>87</td><td>87</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke23</td><td>10 x 40</td><td>fjsp</td><td>85</td><td>85</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke24</td><td>10 x 40</td><td>fjsp</td><td>87</td><td>87</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke25</td><td>10 x 40</td><td>fjsp</td><td>87</td><td>87</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke26</td><td>20 x 40</td><td>fjsp</td><td>113</td><td>113</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke27</td><td>20 x 40</td><td>fjsp</td><td>122</td><td>122</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke28</td><td>20 x 40</td><td>fjsp</td><td>114</td><td>114</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke29</td><td>20 x 40</td><td>fjsp</td><td>76</td><td>117</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke30</td><td>20 x 40</td><td>fjsp</td><td>120</td><td>120</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke31</td><td>50 x 40</td><td>fjsp</td><td>85</td><td>226</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke32</td><td>50 x 40</td><td>fjsp</td><td>79</td><td>224</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke33</td><td>50 x 40</td><td>fjsp</td><td>80</td><td>224</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke34</td><td>50 x 40</td><td>fjsp</td><td>80</td><td>223</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke35</td><td>50 x 40</td><td>fjsp</td><td>82</td><td>214</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke36</td><td>100 x 40</td><td>fjsp</td><td>152</td><td>388</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke37</td><td>100 x 40</td><td>fjsp</td><td>153</td><td>391</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke38</td><td>100 x 40</td><td>fjsp</td><td>151</td><td>389</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke39</td><td>100 x 40</td><td>fjsp</td><td>153</td><td>389</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke40</td><td>100 x 40</td><td>fjsp</td><td>156</td><td>419</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke41</td><td>10 x 60</td><td>fjsp</td><td>87</td><td>87</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke42</td><td>10 x 60</td><td>fjsp</td><td>87</td><td>87</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke43</td><td>10 x 60</td><td>fjsp</td><td>86</td><td>86</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke44</td><td>10 x 60</td><td>fjsp</td><td>84</td><td>84</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke45</td><td>10 x 60</td><td>fjsp</td><td>87</td><td>87</td><td style="background-color:green">easy</td><td>OptalCP < 1 min</td></tr>
<tr><td>behnke46</td><td>20 x 60</td><td>fjsp</td><td>114</td><td>114</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke47</td><td>20 x 60</td><td>fjsp</td><td>117</td><td>117</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke48</td><td>20 x 60</td><td>fjsp</td><td>78</td><td>125</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke49</td><td>20 x 60</td><td>fjsp</td><td>113</td><td>113</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke50</td><td>20 x 60</td><td>fjsp</td><td>123</td><td>123</td><td style="background-color:orange">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>behnke51</td><td>50 x 60</td><td>fjsp</td><td>77</td><td>218</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke52</td><td>50 x 60</td><td>fjsp</td><td>81</td><td>212</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke53</td><td>50 x 60</td><td>fjsp</td><td>76</td><td>215</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke54</td><td>50 x 60</td><td>fjsp</td><td>81</td><td>223</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke55</td><td>50 x 60</td><td>fjsp</td><td>79</td><td>223</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke56</td><td>100 x 60</td><td>fjsp</td><td>99</td><td>390</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke57</td><td>100 x 60</td><td>fjsp</td><td>99</td><td>390</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke58</td><td>100 x 60</td><td>fjsp</td><td>100</td><td>397</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke59</td><td>100 x 60</td><td>fjsp</td><td>99</td><td>398</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
<tr><td>behnke60</td><td>100 x 60</td><td>fjsp</td><td>101</td><td>402</td><td style="background-color:grey">open</td><td>OptalCP</td></tr>
</table>


## Publications (best known solutions)

The upper and lower bounds come from

 - MG2000 (4 bounds in la) : **M. Mastrolilli, L. Gambardella**, Effective neighbourhood functions for the flexible job shop problem, Journal of Scheduling 3 (2000) 3–20

 - Quintiq (37 bounds in mk, #a, abz, car and la) : **Quintiq** http://www.quintiq.com/optimization/fjssp-world-records.html (2013) - this site doesn't exist anymore

- CPO2013 (11 bounds in #a, abz and la) : **Jean-François Puget** Solving flexible job shop scheduling problems (cp optimizer 12.6)  https://www.ibm.com/developerworks/community/blogs/jfp/entry/solving\_flexible\_job\_shop\_scheduling\_problems?lang=en (2013) - this site doesn't exist anymore

- HHHL2010 (3 bounds in #a) : **A. B. Hmida, M. Haouari, M.-J. Huguet, P. Lopez**, Discrepancy search for the flexible job shop scheduling problem, Computers & Operations Research 37 (12) (2010) 2192–2201

- DLLSXG2019 (8 bonds in #a, abz, car and la ) : **J. Ding, Z. Lu, C.-M. Li, L. Shen, L. Xu, F. Glover** (2019) A two-individual based evolutionary algorithm for the flexible job shop scheduling problem, in: Proceedings of the AAAI Conference on Artificial Intelligence, Vol. 33, 2019, pp. 2262–2271

- CdGKGC2025 (16 bounds in #a, abz, car and la) : **Marc-Emmanuel Coupvent des Graviers, Lotfi Kobrosly, Christophe Guettier, and Tristan Cazenave** (2025). Updating Lower and Upper Bounds for the Job-Shop Scheduling Problem Test Instances CoRR abs/2504.16106


All other bounds were found with OptalCP
