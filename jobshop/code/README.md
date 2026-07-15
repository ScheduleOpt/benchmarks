# How to run a benchmark

## Requirements

The benchmark code is provided for
- CPO using the OPL language
- CP-SAT using Python
- OptalCP using JavaScript

You will need
- A working installation of IBM ILOG Cplex Studio which contains CP Optimizer and OPL
- A working installation of Python and ORTools
- A working installation of NodeJS (or Bun) and OptalCP

## Installation

These instructions are biased towards Windows and have been tested on Windows machines only

### Download the benchmarks and code

There are many ways to download the benchmarks and code (~170Mb)
- clone the github repository (with GitHub Desktop or any other Git UI)
- download the repository from Github as a zip file 
    - Go to https://github.com/ScheduleOpt/benchmarks
    - Press the green button that says "code"
    - At the end of the dropdown there is a "Download ZIP" option

Install the code in a folder of your choice but keep in mind that the `node_modules` folder has to be in the path to the root for the system to find OptalCP automatically (or you can add an environment variable `OPTALCP_SOLVER` pointing directly to the optalcp executable - not the folder, the executable)

### Install IBM ILOG Cplex Studio

- Request an academic licence from IBM
- Install the Java download manager
- Download the installer
- Double click and follow the instructions (location, path)

Make sure the `opl` executable is in the path and you can run the `opl` command from any folder


### Install CP-SAT

- Install Python and pip (most of the time already installed in your system) 
- Install ortools with `pip install ortools` [official installation guide](https://developers.google.com/optimization/install)
    - If you have an old version and the system complains of outdated packages, delete all with `pip uninstall ortools`  and start again
- Check the installed version with `pip show ortools`

### Install OptalCP

- Install NodeJS or Bun
- Install OptalCP via npm with `npm install scheduleopt/optalcp-js-bin-preview#latest` or `npm install scheduleopt/optalcp-js-bin-academic#latest`
    - The preview only gives you the objective of the solution found, the academic version also gives you the solution itself
    - Request an academic version if you want to see the content of the solution
- The npm installation process creates a folder named `node_modules` that contains the executable under `@scheduleopt\optalcp-bin-xxx`
- Check the installed code with `npx optalcp --version`


## Test that everything works

### Test OptalCP
- Enter in `benchmarks/jobshop/code/optalcp`
- Type `node jobshop.mjs ft06`
The engine should solve the jobshop problem ft06 and show a log

The files are read in `/benchmark/instances/json` therefore any other problem should work as well like `node jobshhop.mjs dmu11`

### Test CP-SAT
- Enter in `benchmarks/jobshop/code/cpsat`
- Type `python jobshop.py ft06`
The engine should solve the jobshop problem ft06 and show a log

The files are read in `/benchmark/instances/json` therefore any other problem should work as well like `python jobshhop.py dmu11`

### Test CP Optimizer
- Enter in `benchmarks/jobshop/code/cpo`
- Type `oplrun jobshop.mod data/ft06.dat`
The engine should solve the jobshop problem ft06 and show a log

The files are read in `./data` in the `.dat` format that OPL uses. In other to populate the `./data` folder from `benchmarks/instances/json` you need to run the script `transform.mjs`


## Run a benchmark

Find the instructions to run benchmarks in the dedicated HOWTO inside each engine's folder
- `benchmarks/jobshop/code/cpo/README.md`
- `benchmarks/jobshop/code/cpsat/README.md`
- `benchmarks/jobshop/code/optalcp/README.md`
