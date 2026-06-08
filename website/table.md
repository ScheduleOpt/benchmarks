# JSPLib

### Overview of the jobshop benchmark library

jobshop instances (332)
- 3 instances `ft` from Fisher and Thompson (1963)
- 40 instances `la` from Lawrence (1984)
- 5 instances `abz` from Adams, Balas and Zawack (1988)
- 10 instances `orb` from Applegate and Cook (1991)
- 20 instances `swv` from Storer, Wu and Vaccari (1992)
- 4 instances `yn` from Yamada Nakano (1992)
- 80 instances `ta` from Taillard (1993)
- 80 instances `dmu` from Demikol, Mehta and Uzsoy (1998)
- 90 instances `tai` from Da Col and Teppan (2022)

reentrant jobshop instances (43)
- 12 instances `long` from Da Col and Teppan (2022)
- 12 instances `short` from Da Col and Teppan (2022)
- 19 instances `bel` from Boveroux, Ernst and Louveaux (2025)

### Classification of the jobshop instances

Currently the instances divide as follows

jobshop
- `ft` : 3 easy
- `la` : 39 easy, 1 medium
- `abz` : 2 easy, 2 medium, 1 hard
- `orb` : 10 easy
- `swv` : 7 easy, 7 medium, 3 hard, 3 open
- `yn` : 4 hard
- `ta` : 40 easy, 20 medium, 8 hard, 12 open
- `dmu` : 17 easy, 13 medium, 5 hard, 45 open
- `tai` : 50 easy, 1 medium, 9 hard, 30 open

reentrant jobshop
- `long` : 11 easy, 1 medium
- `short` : 5 easy, 6 medium, 1 open
- `bel` : 19 easy


<!-- Static SVG status chart (inline) -->
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="460" viewBox="0 0 800 460" role="img" aria-label="Status distribution by family">
<title>Status distribution by family</title>
<style>.jssp-title{font:16px system-ui,Arial;fill:gray}.jssp-label{font:12px system-ui,Arial;fill:gray}.jssp-legend{font:12px system-ui,Arial;fill:gray}</style>
<text x="64" y="84" class="jssp-title">Status distribution by family</text>
<rect x="64" y="100" width="12" height="12" fill="green" />
<text x="82" y="110" text-anchor="start" class="jssp-legend">easy</text>
<rect x="204" y="100" width="12" height="12" fill="orange" />
<text x="222" y="110" text-anchor="start" class="jssp-legend">medium</text>
<rect x="344" y="100" width="12" height="12" fill="red" />
<text x="362" y="110" text-anchor="start" class="jssp-legend">hard</text>
<rect x="64" y="126" width="12" height="12" fill="purple" />
<text x="82" y="136" text-anchor="start" class="jssp-legend">closed</text>
<rect x="204" y="126" width="12" height="12" fill="gray" />
<text x="222" y="136" text-anchor="start" class="jssp-legend">open</text>
<line x1="64" y1="300" x2="780" y2="300" stroke="#e0e0e0" />
<text x="56" y="304" text-anchor="end" class="jssp-label">0</text>
<line x1="64" y1="268" x2="780" y2="268" stroke="#e0e0e0" />
<text x="56" y="272" text-anchor="end" class="jssp-label">18</text>
<line x1="64" y1="236" x2="780" y2="236" stroke="#e0e0e0" />
<text x="56" y="240" text-anchor="end" class="jssp-label">36</text>
<line x1="64" y1="204" x2="780" y2="204" stroke="#e0e0e0" />
<text x="56" y="208" text-anchor="end" class="jssp-label">54</text>
<line x1="64" y1="172" x2="780" y2="172" stroke="#e0e0e0" />
<text x="56" y="176" text-anchor="end" class="jssp-label">72</text>
<line x1="64" y1="140" x2="780" y2="140" stroke="#e0e0e0" />
<text x="56" y="144" text-anchor="end" class="jssp-label">90</text>
<rect x="64" y="295" width="52" height="5" fill="green" />
<g transform="translate(90, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">ft</text></g>
<text x="90" y="289" text-anchor="middle" class="jssp-label">3</text>
<rect x="124" y="231" width="52" height="69" fill="green" />
<rect x="124" y="229" width="52" height="2" fill="orange" />
<g transform="translate(151, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">la</text></g>
<text x="151" y="223" text-anchor="middle" class="jssp-label">40</text>
<rect x="185" y="296" width="52" height="4" fill="green" />
<rect x="185" y="293" width="52" height="4" fill="orange" />
<rect x="185" y="291" width="52" height="2" fill="red" />
<g transform="translate(211, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">abz</text></g>
<text x="211" y="285" text-anchor="middle" class="jssp-label">5</text>
<rect x="245" y="282" width="52" height="18" fill="green" />
<g transform="translate(271, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">orb</text></g>
<text x="271" y="276" text-anchor="middle" class="jssp-label">10</text>
<rect x="305" y="288" width="52" height="12" fill="green" />
<rect x="305" y="275" width="52" height="12" fill="orange" />
<rect x="305" y="270" width="52" height="5" fill="red" />
<rect x="305" y="264" width="52" height="5" fill="gray" />
<g transform="translate(332, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">swv</text></g>
<text x="332" y="258" text-anchor="middle" class="jssp-label">20</text>
<rect x="366" y="293" width="52" height="7" fill="red" />
<g transform="translate(392, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">yn</text></g>
<text x="392" y="287" text-anchor="middle" class="jssp-label">4</text>
<rect x="426" y="229" width="52" height="71" fill="green" />
<rect x="426" y="193" width="52" height="36" fill="orange" />
<rect x="426" y="179" width="52" height="14" fill="red" />
<rect x="426" y="158" width="52" height="21" fill="gray" />
<g transform="translate(452, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">ta</text></g>
<text x="452" y="152" text-anchor="middle" class="jssp-label">80</text>
<rect x="486" y="270" width="52" height="30" fill="green" />
<rect x="486" y="247" width="52" height="23" fill="orange" />
<rect x="486" y="238" width="52" height="9" fill="red" />
<rect x="486" y="158" width="52" height="80" fill="gray" />
<g transform="translate(513, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">dmu</text></g>
<text x="513" y="152" text-anchor="middle" class="jssp-label">80</text>
<rect x="547" y="211" width="52" height="89" fill="green" />
<rect x="547" y="209" width="52" height="2" fill="orange" />
<rect x="547" y="193" width="52" height="16" fill="red" />
<rect x="547" y="140" width="52" height="53" fill="gray" />
<g transform="translate(573, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">tai</text></g>
<text x="573" y="134" text-anchor="middle" class="jssp-label">90</text>
<rect x="607" y="280" width="52" height="20" fill="green" />
<rect x="607" y="279" width="52" height="2" fill="orange" />
<g transform="translate(633, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">long</text></g>
<text x="633" y="273" text-anchor="middle" class="jssp-label">12</text>
<rect x="667" y="291" width="52" height="9" fill="green" />
<rect x="667" y="280" width="52" height="11" fill="orange" />
<rect x="667" y="279" width="52" height="2" fill="gray" />
<g transform="translate(694, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">short</text></g>
<text x="694" y="273" text-anchor="middle" class="jssp-label">12</text>
<rect x="728" y="266" width="52" height="34" fill="green" />
<g transform="translate(754, 322) rotate(-45)"><text x="0" y="0" text-anchor="end" class="jssp-label">bel</text></g>
<text x="754" y="260" text-anchor="middle" class="jssp-label">19</text>
<line x1="64" y1="300" x2="780" y2="300" stroke="gray" />
</svg>
<!-- End SVG -->


### Best known solutions - JSPLib

#### Fisher and Thompson (1963)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>ft06</td><td>6 x 6</td><td>jobshop</td><td>55</td><td>55</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ft10</td><td>10 x 10</td><td>jobshop</td><td>930</td><td>930</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ft20</td><td>20 x 5</td><td>jobshop</td><td>1165</td><td>1165</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
</table>

#### Lawrence (1984)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>la01</td><td>10 x 5</td><td>jobshop</td><td>666</td><td>666</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la02</td><td>10 x 5</td><td>jobshop</td><td>655</td><td>655</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la03</td><td>10 x 5</td><td>jobshop</td><td>597</td><td>597</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la04</td><td>10 x 5</td><td>jobshop</td><td>590</td><td>590</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la05</td><td>10 x 5</td><td>jobshop</td><td>593</td><td>593</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la06</td><td>15 x 5</td><td>jobshop</td><td>926</td><td>926</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la07</td><td>15 x 5</td><td>jobshop</td><td>890</td><td>890</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la08</td><td>15 x 5</td><td>jobshop</td><td>863</td><td>863</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la09</td><td>15 x 5</td><td>jobshop</td><td>951</td><td>951</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la10</td><td>15 x 5</td><td>jobshop</td><td>958</td><td>958</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la11</td><td>20 x 5</td><td>jobshop</td><td>1222</td><td>1222</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la12</td><td>20 x 5</td><td>jobshop</td><td>1039</td><td>1039</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la13</td><td>20 x 5</td><td>jobshop</td><td>1150</td><td>1150</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la14</td><td>20 x 5</td><td>jobshop</td><td>1292</td><td>1292</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la15</td><td>20 x 5</td><td>jobshop</td><td>1207</td><td>1207</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la16</td><td>10 x 10</td><td>jobshop</td><td>945</td><td>945</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la17</td><td>10 x 10</td><td>jobshop</td><td>784</td><td>784</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la18</td><td>10 x 10</td><td>jobshop</td><td>848</td><td>848</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la19</td><td>10 x 10</td><td>jobshop</td><td>842</td><td>842</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la20</td><td>10 x 10</td><td>jobshop</td><td>902</td><td>902</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la21</td><td>15 x 10</td><td>jobshop</td><td>1046</td><td>1046</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>la22</td><td>15 x 10</td><td>jobshop</td><td>927</td><td>927</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la23</td><td>15 x 10</td><td>jobshop</td><td>1032</td><td>1032</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la24</td><td>15 x 10</td><td>jobshop</td><td>935</td><td>935</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la25</td><td>15 x 10</td><td>jobshop</td><td>977</td><td>977</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la26</td><td>20 x 10</td><td>jobshop</td><td>1218</td><td>1218</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la27</td><td>20 x 10</td><td>jobshop</td><td>1235</td><td>1235</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>la28</td><td>20 x 10</td><td>jobshop</td><td>1216</td><td>1216</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la29</td><td>20 x 10</td><td>jobshop</td><td>1152</td><td>1152</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in 5 min</td></tr>
<tr><td>la30</td><td>20 x 10</td><td>jobshop</td><td>1355</td><td>1355</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la31</td><td>30 x 10</td><td>jobshop</td><td>1784</td><td>1784</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la32</td><td>30 x 10</td><td>jobshop</td><td>1850</td><td>1850</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la33</td><td>30 x 10</td><td>jobshop</td><td>1719</td><td>1719</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la34</td><td>30 x 10</td><td>jobshop</td><td>1721</td><td>1721</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la35</td><td>30 x 10</td><td>jobshop</td><td>1888</td><td>1888</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la36</td><td>15 x 15</td><td>jobshop</td><td>1268</td><td>1268</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la37</td><td>15 x 15</td><td>jobshop</td><td>1397</td><td>1397</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la38</td><td>15 x 15</td><td>jobshop</td><td>1196</td><td>1196</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>la39</td><td>15 x 15</td><td>jobshop</td><td>1233</td><td>1233</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>la40</td><td>15 x 15</td><td>jobshop</td><td>1222</td><td>1222</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
</table>

#### Adams, Balas and Zawack (1988)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>abz5</td><td>10 x 10</td><td>jobshop</td><td>1234</td><td>1234</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>abz6</td><td>10 x 10</td><td>jobshop</td><td>943</td><td>943</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>abz7</td><td>20 x 15</td><td>jobshop</td><td>656</td><td>656</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>abz8</td><td>20 x 15</td><td>jobshop</td><td>667</td><td>667</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 10h</td></tr>
<tr><td>abz9</td><td>20 x 15</td><td>jobshop</td><td>678</td><td>678</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
</table>

#### Applegate and Cook (1991)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>orb01</td><td>10 x 10</td><td>jobshop</td><td>1059</td><td>1059</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb02</td><td>10 x 10</td><td>jobshop</td><td>888</td><td>888</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb03</td><td>10 x 10</td><td>jobshop</td><td>1005</td><td>1005</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb04</td><td>10 x 10</td><td>jobshop</td><td>1005</td><td>1005</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb05</td><td>10 x 10</td><td>jobshop</td><td>887</td><td>887</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb06</td><td>10 x 10</td><td>jobshop</td><td>1010</td><td>1010</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb07</td><td>10 x 10</td><td>jobshop</td><td>397</td><td>397</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb08</td><td>10 x 10</td><td>jobshop</td><td>899</td><td>899</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb09</td><td>10 x 10</td><td>jobshop</td><td>934</td><td>934</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>orb10</td><td>10 x 10</td><td>jobshop</td><td>944</td><td>944</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
</table>

#### Storer, Wu and Vaccari (1992)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>swv01</td><td>20 x 10</td><td>jobshop</td><td>1407</td><td>1407</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>swv02</td><td>20 x 10</td><td>jobshop</td><td>1475</td><td>1475</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>swv03</td><td>20 x 10</td><td>jobshop</td><td>1398</td><td>1398</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>CPO in < 1h</td></tr>
<tr><td>swv04</td><td>20 x 10</td><td>jobshop</td><td>1464</td><td>1464</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv05</td><td>20 x 10</td><td>jobshop</td><td>1424</td><td>1424</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv06</td><td>20 x 15</td><td>jobshop</td><td>1667</td><td>1667</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 40h</td></tr>
<tr><td>swv07</td><td>20 x 15</td><td>jobshop</td><td>1541</td><td>1594</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub GR2014</td></tr>
<tr><td>swv08</td><td>20 x 15</td><td>jobshop</td><td>1694</td><td>1751</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Mu2015</td></tr>
<tr><td>swv09</td><td>20 x 15</td><td>jobshop</td><td>1655</td><td>1655</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 15h</td></tr>
<tr><td>swv10</td><td>20 x 15</td><td>jobshop</td><td>1692</td><td>1743</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>swv11</td><td>50 x 10</td><td>jobshop</td><td>2983</td><td>2983</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv12</td><td>50 x 10</td><td>jobshop</td><td>2972</td><td>2972</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv13</td><td>50 x 10</td><td>jobshop</td><td>3104</td><td>3104</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>swv14</td><td>50 x 10</td><td>jobshop</td><td>2968</td><td>2968</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>CPO in < 1h</td></tr>
<tr><td>swv15</td><td>50 x 10</td><td>jobshop</td><td>2885</td><td>2885</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 9h</td></tr>
<tr><td>swv16</td><td>50 x 10</td><td>jobshop</td><td>2924</td><td>2924</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv17</td><td>50 x 10</td><td>jobshop</td><td>2794</td><td>2794</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv18</td><td>50 x 10</td><td>jobshop</td><td>2852</td><td>2852</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv19</td><td>50 x 10</td><td>jobshop</td><td>2843</td><td>2843</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>swv20</td><td>50 x 10</td><td>jobshop</td><td>2823</td><td>2823</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
</table>

#### Yamada Nakano (1992)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>yn1</td><td>20 x 20</td><td>jobshop</td><td>884</td><td>884</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 6h</td></tr>
<tr><td>yn2</td><td>20 x 20</td><td>jobshop</td><td>904</td><td>904</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 40h</td></tr>
<tr><td>yn3</td><td>20 x 20</td><td>jobshop</td><td>892</td><td>892</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 40h</td></tr>
<tr><td>yn4</td><td>20 x 20</td><td>jobshop</td><td>967</td><td>967</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 16h</td></tr>
</table>

#### Taillard (1993)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>ta01js</td><td>15 x 15</td><td>jobshop</td><td>1231</td><td>1231</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ta02js</td><td>15 x 15</td><td>jobshop</td><td>1244</td><td>1244</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta03js</td><td>15 x 15</td><td>jobshop</td><td>1218</td><td>1218</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta04js</td><td>15 x 15</td><td>jobshop</td><td>1175</td><td>1175</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta05js</td><td>15 x 15</td><td>jobshop</td><td>1224</td><td>1224</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta06js</td><td>15 x 15</td><td>jobshop</td><td>1238</td><td>1238</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta07js</td><td>15 x 15</td><td>jobshop</td><td>1227</td><td>1227</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta08js</td><td>15 x 15</td><td>jobshop</td><td>1217</td><td>1217</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta09js</td><td>15 x 15</td><td>jobshop</td><td>1274</td><td>1274</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta10js</td><td>15 x 15</td><td>jobshop</td><td>1241</td><td>1241</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta11js</td><td>20 x 15</td><td>jobshop</td><td>1357</td><td>1357</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta12js</td><td>20 x 15</td><td>jobshop</td><td>1367</td><td>1367</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta13js</td><td>20 x 15</td><td>jobshop</td><td>1342</td><td>1342</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta14js</td><td>20 x 15</td><td>jobshop</td><td>1345</td><td>1345</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ta15js</td><td>20 x 15</td><td>jobshop</td><td>1339</td><td>1339</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta16js</td><td>20 x 15</td><td>jobshop</td><td>1360</td><td>1360</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta17js</td><td>20 x 15</td><td>jobshop</td><td>1462</td><td>1462</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta18js</td><td>20 x 15</td><td>jobshop</td><td>1396</td><td>1396</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta19js</td><td>20 x 15</td><td>jobshop</td><td>1332</td><td>1332</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta20js</td><td>20 x 15</td><td>jobshop</td><td>1348</td><td>1348</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta21js</td><td>20 x 20</td><td>jobshop</td><td>1642</td><td>1642</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>ta22js</td><td>20 x 20</td><td>jobshop</td><td>1600</td><td>1600</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h</td></tr>
<tr><td>ta23js</td><td>20 x 20</td><td>jobshop</td><td>1557</td><td>1557</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h</td></tr>
<tr><td>ta24js</td><td>20 x 20</td><td>jobshop</td><td>1644</td><td>1644</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta25js</td><td>20 x 20</td><td>jobshop</td><td>1595</td><td>1595</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta26js</td><td>20 x 20</td><td>jobshop</td><td>1643</td><td>1643</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 7h</td></tr>
<tr><td>ta27js</td><td>20 x 20</td><td>jobshop</td><td>1680</td><td>1680</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta28js</td><td>20 x 20</td><td>jobshop</td><td>1603</td><td>1603</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta29js</td><td>20 x 20</td><td>jobshop</td><td>1625</td><td>1625</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h</td></tr>
<tr><td>ta30js</td><td>20 x 20</td><td>jobshop</td><td>1562</td><td>1584</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub NS2002</td></tr>
<tr><td>ta31js</td><td>30 x 15</td><td>jobshop</td><td>1764</td><td>1764</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>CPO in < 1h</td></tr>
<tr><td>ta32js</td><td>30 x 15</td><td>jobshop</td><td>1774</td><td>1784</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 / ub PSV2010</td></tr>
<tr><td>ta33js</td><td>30 x 15</td><td>jobshop</td><td>1791</td><td>1791</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 10h</td></tr>
<tr><td>ta34js</td><td>30 x 15</td><td>jobshop</td><td>1828</td><td>1828</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta35js</td><td>30 x 15</td><td>jobshop</td><td>2007</td><td>2007</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta36js</td><td>30 x 15</td><td>jobshop</td><td>1819</td><td>1819</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta37js</td><td>30 x 15</td><td>jobshop</td><td>1771</td><td>1771</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h</td></tr>
<tr><td>ta38js</td><td>30 x 15</td><td>jobshop</td><td>1673</td><td>1673</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 7h</td></tr>
<tr><td>ta39js</td><td>30 x 15</td><td>jobshop</td><td>1795</td><td>1795</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta40js</td><td>30 x 15</td><td>jobshop</td><td>1658</td><td>1669</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub GR2014</td></tr>
<tr><td>ta41js</td><td>30 x 20</td><td>jobshop</td><td>1926</td><td>2005</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CPO2015</td></tr>
<tr><td>ta42js</td><td>30 x 20</td><td>jobshop</td><td>1900</td><td>1937</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub GR2014</td></tr>
<tr><td>ta43js</td><td>30 x 20</td><td>jobshop</td><td>1809</td><td>1846</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 / ub PLC2015</td></tr>
<tr><td>ta44js</td><td>30 x 20</td><td>jobshop</td><td>1961</td><td>1979</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>ta45js</td><td>30 x 20</td><td>jobshop</td><td>1997</td><td>1997</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta46js</td><td>30 x 20</td><td>jobshop</td><td>1976</td><td>2004</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub GR2014</td></tr>
<tr><td>ta47js</td><td>30 x 20</td><td>jobshop</td><td>1827</td><td>1889</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub PLC2015</td></tr>
<tr><td>ta48js</td><td>30 x 20</td><td>jobshop</td><td>1921</td><td>1937</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>ta49js</td><td>30 x 20</td><td>jobshop</td><td>1938</td><td>1960</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>ta50js</td><td>30 x 20</td><td>jobshop</td><td>1848</td><td>1923</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub PLC2015</td></tr>
<tr><td>ta51js</td><td>50 x 15</td><td>jobshop</td><td>2760</td><td>2760</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ta52js</td><td>50 x 15</td><td>jobshop</td><td>2756</td><td>2756</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta53js</td><td>50 x 15</td><td>jobshop</td><td>2717</td><td>2717</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta54js</td><td>50 x 15</td><td>jobshop</td><td>2839</td><td>2839</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ta55js</td><td>50 x 15</td><td>jobshop</td><td>2679</td><td>2679</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta56js</td><td>50 x 15</td><td>jobshop</td><td>2781</td><td>2781</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta57js</td><td>50 x 15</td><td>jobshop</td><td>2943</td><td>2943</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ta58js</td><td>50 x 15</td><td>jobshop</td><td>2885</td><td>2885</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>ta59js</td><td>50 x 15</td><td>jobshop</td><td>2655</td><td>2655</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta60js</td><td>50 x 15</td><td>jobshop</td><td>2723</td><td>2723</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta61js</td><td>50 x 20</td><td>jobshop</td><td>2868</td><td>2868</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta62js</td><td>50 x 20</td><td>jobshop</td><td>2869</td><td>2869</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>ta63js</td><td>50 x 20</td><td>jobshop</td><td>2755</td><td>2755</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta64js</td><td>50 x 20</td><td>jobshop</td><td>2702</td><td>2702</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta65js</td><td>50 x 20</td><td>jobshop</td><td>2725</td><td>2725</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta66js</td><td>50 x 20</td><td>jobshop</td><td>2845</td><td>2845</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta67js</td><td>50 x 20</td><td>jobshop</td><td>2825</td><td>2825</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 4h</td></tr>
<tr><td>ta68js</td><td>50 x 20</td><td>jobshop</td><td>2784</td><td>2784</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta69js</td><td>50 x 20</td><td>jobshop</td><td>3071</td><td>3071</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta70js</td><td>50 x 20</td><td>jobshop</td><td>2995</td><td>2995</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>CPO in < 1h</td></tr>
<tr><td>ta71js</td><td>100 x 20</td><td>jobshop</td><td>5464</td><td>5464</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta72js</td><td>100 x 20</td><td>jobshop</td><td>5181</td><td>5181</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta73js</td><td>100 x 20</td><td>jobshop</td><td>5568</td><td>5568</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta74js</td><td>100 x 20</td><td>jobshop</td><td>5339</td><td>5339</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta75js</td><td>100 x 20</td><td>jobshop</td><td>5392</td><td>5392</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>CPO in < 1h</td></tr>
<tr><td>ta76js</td><td>100 x 20</td><td>jobshop</td><td>5342</td><td>5342</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta77js</td><td>100 x 20</td><td>jobshop</td><td>5436</td><td>5436</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta78js</td><td>100 x 20</td><td>jobshop</td><td>5394</td><td>5394</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta79js</td><td>100 x 20</td><td>jobshop</td><td>5358</td><td>5358</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>ta80js</td><td>100 x 20</td><td>jobshop</td><td>5183</td><td>5183</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
</table>

#### Demikol, Mehta and Uzsoy (1998)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>dmu01</td><td>20 x 15</td><td>jobshop</td><td>2563</td><td>2563</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu02</td><td>20 x 15</td><td>jobshop</td><td>2706</td><td>2706</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu03</td><td>20 x 15</td><td>jobshop</td><td>2731</td><td>2731</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>CPO in < 1h</td></tr>
<tr><td>dmu04</td><td>20 x 15</td><td>jobshop</td><td>2669</td><td>2669</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu05</td><td>20 x 15</td><td>jobshop</td><td>2749</td><td>2749</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu06</td><td>20 x 20</td><td>jobshop</td><td>3244</td><td>3244</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h</td></tr>
<tr><td>dmu07</td><td>20 x 20</td><td>jobshop</td><td>3046</td><td>3046</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 3h</td></tr>
<tr><td>dmu08</td><td>20 x 20</td><td>jobshop</td><td>3188</td><td>3188</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu09</td><td>20 x 20</td><td>jobshop</td><td>3092</td><td>3092</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu10</td><td>20 x 20</td><td>jobshop</td><td>2984</td><td>2984</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu11</td><td>30 x 15</td><td>jobshop</td><td>3402</td><td>3430</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub PLC2015</td></tr>
<tr><td>dmu12</td><td>30 x 15</td><td>jobshop</td><td>3481</td><td>3492</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu13</td><td>30 x 15</td><td>jobshop</td><td>3681</td><td>3681</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 3h</td></tr>
<tr><td>dmu14</td><td>30 x 15</td><td>jobshop</td><td>3394</td><td>3394</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu15</td><td>30 x 15</td><td>jobshop</td><td>3343</td><td>3343</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu16</td><td>30 x 20</td><td>jobshop</td><td>3734</td><td>3750</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CPO2015 / ub LHW2024</td></tr>
<tr><td>dmu17</td><td>30 x 20</td><td>jobshop</td><td>3733</td><td>3812</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu18</td><td>30 x 20</td><td>jobshop</td><td>3844</td><td>3844</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 10h</td></tr>
<tr><td>dmu19</td><td>30 x 20</td><td>jobshop</td><td>3707</td><td>3764</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu20</td><td>30 x 20</td><td>jobshop</td><td>3632</td><td>3699</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu21</td><td>40 x 15</td><td>jobshop</td><td>4380</td><td>4380</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu22</td><td>40 x 15</td><td>jobshop</td><td>4725</td><td>4725</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu23</td><td>40 x 15</td><td>jobshop</td><td>4668</td><td>4668</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu24</td><td>40 x 15</td><td>jobshop</td><td>4648</td><td>4648</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu25</td><td>40 x 15</td><td>jobshop</td><td>4164</td><td>4164</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu26</td><td>40 x 20</td><td>jobshop</td><td>4647</td><td>4647</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>dmu27</td><td>40 x 20</td><td>jobshop</td><td>4848</td><td>4848</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu28</td><td>40 x 20</td><td>jobshop</td><td>4692</td><td>4692</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu29</td><td>40 x 20</td><td>jobshop</td><td>4691</td><td>4691</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu30</td><td>40 x 20</td><td>jobshop</td><td>4732</td><td>4732</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP < 1h</td></tr>
<tr><td>dmu31</td><td>50 x 15</td><td>jobshop</td><td>5640</td><td>5640</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu32</td><td>50 x 15</td><td>jobshop</td><td>5927</td><td>5927</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu33</td><td>50 x 15</td><td>jobshop</td><td>5728</td><td>5728</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu34</td><td>50 x 15</td><td>jobshop</td><td>5385</td><td>5385</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu35</td><td>50 x 15</td><td>jobshop</td><td>5635</td><td>5635</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>CPO in < 1 min</td></tr>
<tr><td>dmu36</td><td>50 x 20</td><td>jobshop</td><td>5621</td><td>5621</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu37</td><td>50 x 20</td><td>jobshop</td><td>5851</td><td>5851</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>CPO in < 1h</td></tr>
<tr><td>dmu38</td><td>50 x 20</td><td>jobshop</td><td>5713</td><td>5713</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>dmu39</td><td>50 x 20</td><td>jobshop</td><td>5747</td><td>5747</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu40</td><td>50 x 20</td><td>jobshop</td><td>5577</td><td>5577</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>dmu41</td><td>20 x 15</td><td>jobshop</td><td>3176</td><td>3248</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub PLC2015</td></tr>
<tr><td>dmu42</td><td>20 x 15</td><td>jobshop</td><td>3339</td><td>3390</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu43</td><td>20 x 15</td><td>jobshop</td><td>3441</td><td>3441</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 8h</td></tr>
<tr><td>dmu44</td><td>20 x 15</td><td>jobshop</td><td>3414</td><td>3475</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu45</td><td>20 x 15</td><td>jobshop</td><td>3217</td><td>3266</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu46</td><td>20 x 20</td><td>jobshop</td><td>3780</td><td>4035</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub GR2014</td></tr>
<tr><td>dmu47</td><td>20 x 20</td><td>jobshop</td><td>3714</td><td>3939</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub GR2014</td></tr>
<tr><td>dmu48</td><td>20 x 20</td><td>jobshop</td><td>3628</td><td>3763</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu49</td><td>20 x 20</td><td>jobshop</td><td>3543</td><td>3706</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu50</td><td>20 x 20</td><td>jobshop</td><td>3618</td><td>3729</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub PLC2015</td></tr>
<tr><td>dmu51</td><td>30 x 15</td><td>jobshop</td><td>4070</td><td>4156</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu52</td><td>30 x 15</td><td>jobshop</td><td>4203</td><td>4297</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu53</td><td>30 x 15</td><td>jobshop</td><td>4248</td><td>4378</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu54</td><td>30 x 15</td><td>jobshop</td><td>4277</td><td>4361</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu55</td><td>30 x 15</td><td>jobshop</td><td>4191</td><td>4258</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu56</td><td>30 x 20</td><td>jobshop</td><td>4755</td><td>4939</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub XLGG2022</td></tr>
<tr><td>dmu57</td><td>30 x 20</td><td>jobshop</td><td>4462</td><td>4647</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub XLGG2022</td></tr>
<tr><td>dmu58</td><td>30 x 20</td><td>jobshop</td><td>4484</td><td>4701</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu59</td><td>30 x 20</td><td>jobshop</td><td>4366</td><td>4607</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu60</td><td>30 x 20</td><td>jobshop</td><td>4468</td><td>4721</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu61</td><td>40 x 15</td><td>jobshop</td><td>5038</td><td>5169</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu62</td><td>40 x 15</td><td>jobshop</td><td>5176</td><td>5247</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu63</td><td>40 x 15</td><td>jobshop</td><td>5245</td><td>5312</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu64</td><td>40 x 15</td><td>jobshop</td><td>5155</td><td>5226</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu65</td><td>40 x 15</td><td>jobshop</td><td>5122</td><td>5173</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub LHW2024</td></tr>
<tr><td>dmu66</td><td>40 x 20</td><td>jobshop</td><td>5526</td><td>5701</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu67</td><td>40 x 20</td><td>jobshop</td><td>5661</td><td>5779</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu68</td><td>40 x 20</td><td>jobshop</td><td>5513</td><td>5763</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu69</td><td>40 x 20</td><td>jobshop</td><td>5511</td><td>5688</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu70</td><td>40 x 20</td><td>jobshop</td><td>5633</td><td>5868</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu71</td><td>50 x 15</td><td>jobshop</td><td>6129</td><td>6207</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu72</td><td>50 x 15</td><td>jobshop</td><td>6434</td><td>6463</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb CdGKGC2025 / ub SS2018</td></tr>
<tr><td>dmu73</td><td>50 x 15</td><td>jobshop</td><td>6107</td><td>6136</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu74</td><td>50 x 15</td><td>jobshop</td><td>6168</td><td>6196</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu75</td><td>50 x 15</td><td>jobshop</td><td>6123</td><td>6189</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub SS2018</td></tr>
<tr><td>dmu76</td><td>50 x 20</td><td>jobshop</td><td>6479</td><td>6718</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu77</td><td>50 x 20</td><td>jobshop</td><td>6520</td><td>6747</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu78</td><td>50 x 20</td><td>jobshop</td><td>6643</td><td>6755</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu79</td><td>50 x 20</td><td>jobshop</td><td>6720</td><td>6910</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
<tr><td>dmu80</td><td>50 x 20</td><td>jobshop</td><td>6460</td><td>6634</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub CS2022</td></tr>
</table>

#### Da Col and Teppan (2022)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>tai_10_10_1</td><td>10 x 10</td><td>jobshop</td><td>8219</td><td>8219</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_2</td><td>10 x 10</td><td>jobshop</td><td>7416</td><td>7416</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_3</td><td>10 x 10</td><td>jobshop</td><td>8094</td><td>8094</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_4</td><td>10 x 10</td><td>jobshop</td><td>8657</td><td>8657</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_5</td><td>10 x 10</td><td>jobshop</td><td>7936</td><td>7936</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_6</td><td>10 x 10</td><td>jobshop</td><td>8509</td><td>8509</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_7</td><td>10 x 10</td><td>jobshop</td><td>8299</td><td>8299</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_8</td><td>10 x 10</td><td>jobshop</td><td>7788</td><td>7788</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_9</td><td>10 x 10</td><td>jobshop</td><td>8300</td><td>8300</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_10_10</td><td>10 x 10</td><td>jobshop</td><td>8481</td><td>8481</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_1</td><td>10 x 100</td><td>jobshop</td><td>56609</td><td>56609</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_2</td><td>10 x 100</td><td>jobshop</td><td>52330</td><td>52330</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_3</td><td>10 x 100</td><td>jobshop</td><td>56412</td><td>56412</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_4</td><td>10 x 100</td><td>jobshop</td><td>54889</td><td>54889</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_5</td><td>10 x 100</td><td>jobshop</td><td>54603</td><td>54603</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_6</td><td>10 x 100</td><td>jobshop</td><td>53723</td><td>53723</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_7</td><td>10 x 100</td><td>jobshop</td><td>55456</td><td>55456</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_8</td><td>10 x 100</td><td>jobshop</td><td>56466</td><td>56466</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_9</td><td>10 x 100</td><td>jobshop</td><td>55096</td><td>55096</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_100_10</td><td>10 x 100</td><td>jobshop</td><td>56661</td><td>56661</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_1</td><td>10 x 1000</td><td>jobshop</td><td>515370</td><td>515370</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_2</td><td>10 x 1000</td><td>jobshop</td><td>513525</td><td>513525</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_3</td><td>10 x 1000</td><td>jobshop</td><td>508161</td><td>508161</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_4</td><td>10 x 1000</td><td>jobshop</td><td>513814</td><td>513814</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_5</td><td>10 x 1000</td><td>jobshop</td><td>517020</td><td>517020</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_6</td><td>10 x 1000</td><td>jobshop</td><td>517777</td><td>517777</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_7</td><td>10 x 1000</td><td>jobshop</td><td>514921</td><td>514921</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_8</td><td>10 x 1000</td><td>jobshop</td><td>522277</td><td>522277</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_9</td><td>10 x 1000</td><td>jobshop</td><td>511213</td><td>511213</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_10_1000_10</td><td>10 x 1000</td><td>jobshop</td><td>509855</td><td>509855</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_1</td><td>100 x 10</td><td>jobshop</td><td>54951</td><td>54951</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_2</td><td>100 x 10</td><td>jobshop</td><td>57160</td><td>57160</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_3</td><td>100 x 10</td><td>jobshop</td><td>54166</td><td>54166</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_4</td><td>100 x 10</td><td>jobshop</td><td>54371</td><td>54371</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_5</td><td>100 x 10</td><td>jobshop</td><td>56142</td><td>56142</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_6</td><td>100 x 10</td><td>jobshop</td><td>52447</td><td>52447</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_7</td><td>100 x 10</td><td>jobshop</td><td>54051</td><td>54051</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_8</td><td>100 x 10</td><td>jobshop</td><td>55624</td><td>55624</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_9</td><td>100 x 10</td><td>jobshop</td><td>54210</td><td>54210</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_10_10</td><td>100 x 10</td><td>jobshop</td><td>55464</td><td>55464</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_100_100_1</td><td>100 x 100</td><td>jobshop</td><td>62843</td><td>76926</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_2</td><td>100 x 100</td><td>jobshop</td><td>62814</td><td>77322</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_3</td><td>100 x 100</td><td>jobshop</td><td>61533</td><td>76910</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_4</td><td>100 x 100</td><td>jobshop</td><td>64742</td><td>78604</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_5</td><td>100 x 100</td><td>jobshop</td><td>61766</td><td>78023</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_6</td><td>100 x 100</td><td>jobshop</td><td>61360</td><td>77895</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_7</td><td>100 x 100</td><td>jobshop</td><td>64040</td><td>77670</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_8</td><td>100 x 100</td><td>jobshop</td><td>63224</td><td>78031</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_9</td><td>100 x 100</td><td>jobshop</td><td>62631</td><td>79419</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_100_10</td><td>100 x 100</td><td>jobshop</td><td>64866</td><td>77837</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>tai_100_1000_1</td><td>100 x 1000</td><td>jobshop</td><td>522298</td><td>533080</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_2</td><td>100 x 1000</td><td>jobshop</td><td>530375</td><td>538067</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_3</td><td>100 x 1000</td><td>jobshop</td><td>530560</td><td>538757</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_4</td><td>100 x 1000</td><td>jobshop</td><td>527101</td><td>534746</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_5</td><td>100 x 1000</td><td>jobshop</td><td>517728</td><td>529580</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_6</td><td>100 x 1000</td><td>jobshop</td><td>522907</td><td>534969</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_7</td><td>100 x 1000</td><td>jobshop</td><td>522537</td><td>534974</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_8</td><td>100 x 1000</td><td>jobshop</td><td>526428</td><td>535757</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_9</td><td>100 x 1000</td><td>jobshop</td><td>528097</td><td>536993</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_100_1000_10</td><td>100 x 1000</td><td>jobshop</td><td>521766</td><td>529918</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP in 3h 16cores</td></tr>
<tr><td>tai_1000_10_1</td><td>1000 x 10</td><td>jobshop</td><td>515334</td><td>515334</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_2</td><td>1000 x 10</td><td>jobshop</td><td>509226</td><td>509226</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_3</td><td>1000 x 10</td><td>jobshop</td><td>517493</td><td>517493</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_4</td><td>1000 x 10</td><td>jobshop</td><td>519369</td><td>519369</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_5</td><td>1000 x 10</td><td>jobshop</td><td>513881</td><td>513881</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_6</td><td>1000 x 10</td><td>jobshop</td><td>511932</td><td>511932</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_7</td><td>1000 x 10</td><td>jobshop</td><td>523900</td><td>523900</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_8</td><td>1000 x 10</td><td>jobshop</td><td>513101</td><td>513101</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_9</td><td>1000 x 10</td><td>jobshop</td><td>508701</td><td>508701</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_10_10</td><td>1000 x 10</td><td>jobshop</td><td>521360</td><td>521360</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>tai_1000_100_1</td><td>1000 x 100</td><td>jobshop</td><td>525343</td><td>525343</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 1h 16cores</td></tr>
<tr><td>tai_1000_100_2</td><td>1000 x 100</td><td>jobshop</td><td>528088</td><td>528088</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h 16 cores</td></tr>
<tr><td>tai_1000_100_3</td><td>1000 x 100</td><td>jobshop</td><td>522793</td><td>522793</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h 16 cores</td></tr>
<tr><td>tai_1000_100_4</td><td>1000 x 100</td><td>jobshop</td><td>524271</td><td>524271</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h 16 cores</td></tr>
<tr><td>tai_1000_100_5</td><td>1000 x 100</td><td>jobshop</td><td>531216</td><td>531216</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>tai_1000_100_6</td><td>1000 x 100</td><td>jobshop</td><td>518763</td><td>518763</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 3h 16 cores</td></tr>
<tr><td>tai_1000_100_7</td><td>1000 x 100</td><td>jobshop</td><td>527093</td><td>527093</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 2h 16 cores</td></tr>
<tr><td>tai_1000_100_8</td><td>1000 x 100</td><td>jobshop</td><td>519524</td><td>519524</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 3h 16 cores</td></tr>
<tr><td>tai_1000_100_9</td><td>1000 x 100</td><td>jobshop</td><td>520889</td><td>520889</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 3h 16 cores</td></tr>
<tr><td>tai_1000_100_10</td><td>1000 x 100</td><td>jobshop</td><td>529112</td><td>529112</td><td style="background-color:red;color:white;font-weight:bold">hard</td><td>OptalCP in 3h 16 cores</td></tr>
<tr><td>tai_1000_1000_1</td><td>1000 x 1000</td><td>jobshop</td><td>549392</td><td>877052</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_2</td><td>1000 x 1000</td><td>jobshop</td><td>549043</td><td>877115</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly</td></tr>
<tr><td>tai_1000_1000_3</td><td>1000 x 1000</td><td>jobshop</td><td>552580</td><td>878296</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly</td></tr>
<tr><td>tai_1000_1000_4</td><td>1000 x 1000</td><td>jobshop</td><td>547670</td><td>876363</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_5</td><td>1000 x 1000</td><td>jobshop</td><td>545193</td><td>877562</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_6</td><td>1000 x 1000</td><td>jobshop</td><td>547286</td><td>876067</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_7</td><td>1000 x 1000</td><td>jobshop</td><td>545877</td><td>875891</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_8</td><td>1000 x 1000</td><td>jobshop</td><td>549220</td><td>876456</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_9</td><td>1000 x 1000</td><td>jobshop</td><td>543559</td><td>875914</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb OptalCP / ub Hexaly2024</td></tr>
<tr><td>tai_1000_1000_10</td><td>1000 x 1000</td><td>jobshop</td><td>549075</td><td>874820</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>lb Hexaly / ub Hexaly2024</td></tr>
</table>

#### Da Col and Teppan (2022)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>long-100-10000-1</td><td>103 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-100-10000-2</td><td>103 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-100-10000-3</td><td>103 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-100-100000-1</td><td>109 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-100-100000-2</td><td>114 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>long-100-100000-3</td><td>109 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-1000-10000-1</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-1000-10000-2</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-1000-10000-3</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-1000-100000-1</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-1000-100000-2</td><td>1002 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>long-1000-100000-3</td><td>1003 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
</table>

#### Da Col and Teppan (2022)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>short-100-10000-1</td><td>2162 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-100-10000-2</td><td>2192 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-100-10000-3</td><td>2169 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-100-100000-1</td><td>20685 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-100-100000-2</td><td>20870 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-100-100000-3</td><td>20767 x 100</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-1000-10000-1</td><td>2882 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-1000-10000-2</td><td>2863 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1 min</td></tr>
<tr><td>short-1000-10000-3</td><td>2897 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-1000-100000-1</td><td>21280 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600038</td><td style="background-color:gray;color:white;font-weight:bold">open</td><td>OptalCP</td></tr>
<tr><td>short-1000-100000-2</td><td>21349 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
<tr><td>short-1000-100000-3</td><td>21338 x 1000</td><td>reentrant jobshop</td><td>600000</td><td>600000</td><td style="background-color:orange;color:white;font-weight:bold">medium</td><td>OptalCP in < 1h</td></tr>
</table>

#### Boveroux, Ernst and Louveaux (2025)
<table>
<tr><th>Instance</th><th>Size</th><th>Problem</th><th>LB</th><th>UB</th><th>Type</th><th>Solved by</th></tr>
<tr><td>bel00</td><td>792 x 48</td><td>reentrant jobshop</td><td>766329</td><td>766329</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel01</td><td>627 x 52</td><td>reentrant jobshop</td><td>428900</td><td>428900</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel02</td><td>660 x 59</td><td>reentrant jobshop</td><td>270437</td><td>270437</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel03</td><td>691 x 52</td><td>reentrant jobshop</td><td>670943</td><td>670943</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel04</td><td>952 x 63</td><td>reentrant jobshop</td><td>408633</td><td>408633</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel05</td><td>929 x 59</td><td>reentrant jobshop</td><td>620171</td><td>620171</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel06</td><td>678 x 57</td><td>reentrant jobshop</td><td>502510</td><td>502510</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel07</td><td>968 x 55</td><td>reentrant jobshop</td><td>750360</td><td>750360</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel08</td><td>822 x 65</td><td>reentrant jobshop</td><td>484451</td><td>484451</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel09</td><td>651 x 53</td><td>reentrant jobshop</td><td>534811</td><td>534811</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel10</td><td>733 x 61</td><td>reentrant jobshop</td><td>468304</td><td>468304</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel11</td><td>761 x 66</td><td>reentrant jobshop</td><td>509503</td><td>509503</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel12</td><td>897 x 64</td><td>reentrant jobshop</td><td>388715</td><td>388715</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel13</td><td>836 x 54</td><td>reentrant jobshop</td><td>420576</td><td>420576</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel14</td><td>935 x 57</td><td>reentrant jobshop</td><td>1115063</td><td>1115063</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel15</td><td>818 x 48</td><td>reentrant jobshop</td><td>610946</td><td>610946</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel16</td><td>855 x 59</td><td>reentrant jobshop</td><td>575843</td><td>575843</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel17</td><td>662 x 47</td><td>reentrant jobshop</td><td>520426</td><td>520426</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
<tr><td>bel18</td><td>677 x 50</td><td>reentrant jobshop</td><td>347889</td><td>347889</td><td style="background-color:green;color:white;font-weight:bold">easy</td><td>OptalCP in < 1min</td></tr>
</table>

### Publications (best known solutions)

The upper and lower bounds come from

- NS2002 (1 bound in ta) : **Nowicki, E., & Smutnicki, C.** (2002). Some new tools to solve the job shop problem. Raport serii: Preprinty, 60.
- PSV2010 (1 bound in ta) : **Pardalos, P. M., Shylo, O. V., & Vazacopoulos, A.** (2010). Solving job shop scheduling problems utilizing the properties of backbone and “big valley”. Computational Optimization and Applications, 47, 61-76.
- GR2014 (6 bounds in dmu, swv and ta) : **Gonçalves, J. F., & Resende, M. G.** (2014). An extended Akers graphical method with a biased random‐key genetic algorithm for job‐shop scheduling. International Transactions in Operational Research, 21(2), 215-246.
- CPO2015 (4 bounds in dmu and ta) : **Vilím, P., Laborie, P., & Shaw, P.** (2015). [Failure-directed search for constraint-based scheduling](https://vilim.eu/petr/cpaior2015.pdf). In CPAIOR 2015 proceedings.

**Vilím, P., Laborie, P., & Shaw, P.**. [Detailed experimental results](https://vilim.eu/petr/cpaior2015-results.pdf).
- Mu2015 (1 bound in swv) : Personal communication to Optimizizer probably based on **Murovec, B.** (2015). Job-shop local-search move evaluation without direct consideration of the criterion’s value. European Journal of Operational Research, 241(2), 320-329.
- PLC2015 (6 bounds in dmu and ta) : **Peng, B., Lü, Z., & Cheng, T. C. E.** (2015). [A tabu search/path relinking algorithm to solve the job shop scheduling problem](https://arxiv.org/abs/1402.5613). Computers & Operations Research, 53, 154-164.
- SS2018 (11 bounds in dmu, swv and ta) : **Shylo, O. V., & Shams, H.** (2018). [Boosting binary optimization via binary classification: A case study of job shop scheduling](https://arxiv.org/abs/1808.10813).
- CS2022 (19 bounds in dmu and ta) : **Constantino, O. H., & Segura, C.** (2022). A parallel memetic algorithm with explicit management of diversity for the job shop scheduling problem. Applied Intelligence, 52(1), 141-153.
- XLGG2022 (2 bounds in dmu) : **Xie, J., Li, X., Gao, L., & Gui, L.** (2022). A hybrid algorithm with a new neighborhood structure for job shop scheduling problems. Computers & Industrial Engineering, 169, 108205.
- Hexaly2024 (8 bounds in tai) : **Lea Blaise** (2014). [Hexaly benchmarks and comparisons](https://www.hexaly.com/benchmarks/hexaly-vs-cp-optimizer-vs-CP-SAT-on-the-job-shop-scheduling-problem-jssp).
- LHW2024 (12 bounds in dmu and ta) : **Mingjie Li, Jin-Kao Hao & Qinghua Wu** (2025). Combining Hash-based Tabu Search and Frequent Pattern Mining for Job-Shop Scheduling. IISE Transactions.
- CdGKGC2025 (1 bound in dmu) : **Marc-Emmanuel Coupvent des Graviers, Lotfi Kobrosly, Christophe Guettier, and Tristan Cazenave** (2025). [Updating Lower and Upper Bounds for the Job-Shop Scheduling Problem Test Instances](https://arxiv.org/abs/2504.16106).

All other bounds were found by OptalCP
