/*********************************************
 * OPL 22.1.1.0 Model
 * Author: DOFP
 * Creation Date: Jun 21, 2026 at 1:34:49 AM
 *********************************************/

int timeLimit = ...;
string hardware = ...;
{string} instances = ...;

main {
	function currentDate() {
    	var today = new Date()
    	var year = today.getYear()
    	var month = String(today.getMonth() + 1)
    	var day = String(today.getDate())
    	return year + "-" + month + "-" + day;
	}

  	var date = currentDate();
	var hardware = thisOplModel.hardware

    function b (label, v, t) {
		return "\"" + label + "\" : {" + 
		"\"value\":" +  v + "," +
		"\"date\":\"" + date + "\"," +
		"\"solver\":\"CPO\"," +
		"\"hardware\":\"" + thisOplModel.hardware + "\"," +
		"\"time\":" +  t + "," +
		"\"certificate\":\"no\" }"
    }
    
    function writeResult(file, lb, ub, instance, time) {
		file.writeln("{");
		file.writeln("\"instance\" : \"" + instance + "\",");
		file.writeln(b("lb", lb, time) + ",");
		file.writeln(b("ub", ub, time));
		file.write("}");
    }
    
    function writeSolution (file, instance, makespan, seq) {
		file.writeln("{");
		file.writeln("    \"instance\":\"" + instance + "\",");
		file.writeln("    \"makespan\":" + makespan + ",");
		file.writeln("    \"solver\":\"CPO\",");
		file.write  ("    \"date\":\"" + date + "\"");
		for (var m in model.seq) {
				file.writeln(",");
				var r = "    \"machine_" + m + "\" : [";
				var first_ = true;
				for (var sj in model.seq[m]) {
					if (!first_) r = r + ", ";
				  	r = r + sj.job;
					first_ = false;
				}
				r = r + "]";
				file.write(r);
    	}
    	file.writeln("");
    	file.write("}");			  
    }
    
  	var resultsFile = new IloOplOutputFile("results_CPO_" + date + ".json");
  	var solutionsFile = new IloOplOutputFile("solutions_CPO_" + date + ".json");

	var solver = new IloCP()
    var source = new IloOplModelSource ("jobshop.mod")
    var def = new IloOplModelDefinition (source)
    
    
    var first_result = true;
    var first_solution = true;
    resultsFile.writeln("[");
    solutionsFile.writeln("[");
    for (var instance in thisOplModel.instances) {
    	var model = new IloOplModel (def, solver);
    	var data = new IloOplDataSource ("./data/" + instance + ".dat");
    	model.addDataSource(data);

        solver.param.TimeLimit = thisOplModel.timeLimit;
        model.generate();
		var status = solver.solve()
		if (status) {
			model.postProcess();
			if (!first_solution) solutionsFile.writeln(",");
			writeSolution (solutionsFile, instance, solver.getObjValue(), model.seq);
			first_solution = false;
		} 
        else writeln(instance, " no solution")

		var lb = solver.getObjBound();
		var ub = status ? solver.getObjValue() : -1;
		var time = Math.ceil(solver.info.SolveTime / 60);
		writeln(instance, " ", lb, " .. ", ub, " ", time);
		if (!first_result) resultsFile.writeln(",");
		writeResult (resultsFile, ub, lb, instance, time)
		first_result = false;

  		model.end();
  	}  		  		
	resultsFile.writeln("]")
	solutionsFile.writeln("]")
	resultsFile.close();
	solutionsFile.close();
    solver.end()  	   
}