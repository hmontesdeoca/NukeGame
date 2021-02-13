var timer = 256
var tickRate = 16
var visualRate = 256
var resources = {"water":4000, "food": 300, "oxygen":2000, "waterDecrement":1,"oxygenDecrement":1,"foodDecrement":1 }

var increments = [{"input":["waterLoss"],
 		        "output":"water"},
                
                 {"input":["foodLoss"], 
                "output": "food"},

                {"input":["oxygenLoss"], 
                "output": "oxygen"}]

var costs = {"pickaxe":15,
                "miner":200,
                "miner_pickaxe":15}

var unlocks = {"redButton":{"water":0, "food":0}}

function purifyWater(){
    //increment water
    resources["water"] += 1;

    //initialize and reduce
    if(!resources["waterLoss"]){
        resources["waterLoss"] =0;
    }
    resources["waterLoss"] -= 2;

    //update text
    updateText();
};

function makeFood(){
     //initialize and reduce
    if(!resources["foodLoss"]){
        resources["foodLoss"] =0;
    }
};

function makePlants(){
    //initialize and reduce
    if(!resources["oxygenLoss"]){
        resources["oxygenLoss"] =0;
    }
};

function updateText(){
    for (var key in unlocks){
	var unlocked = true
	for (var criterion in unlocks[key]){
	    unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
	}
	if (unlocked){
	    for (var element of document.getElementsByClassName("show_"+key)){		
		element.style.display = "block"
	    }
	}
    }
    
    for (var key in resources){
	 for (var element of document.getElementsByClassName(key)){
	    element.innerHTML = resources[key].toFixed(2)
	}
    }
    for (var key in costs){
	for (var element of document.getElementsByClassName(key+"_cost")){
	    element.innerHTML = costs[key].toFixed(2)
	}
    }
};


window.setInterval(function(){
    timer += tickRate

    
    for (var increment of increments){
	total = 1
	for (var input of increment["input"]){
	    total *= resources[input]
	    console.log(resources[input])
	}
	if (total){
	    console.log(total)
	    resources[increment["output"]] += total/tickRate
	}
    }
    
    if (timer > visualRate){
	timer -= visualRate
	updateText()
    }
  

}, tickRate);