var timer = 256
var tickRate = 16
var visualRate = 256
var resources = {"water":4000, "food": 300, "oxygen":2000, "waterDecrement":1,"oxygenDecrement":1,"foodDecrement":1 };
var increments = [{"input":["waterLoss"],
 		        "output":"water"},
                
                 {"input":["foodLoss"], 
                "output": "food"},

                {"input":["oxygenLoss"], 
                "output": "oxygen"}];

var chance = {"waterFailure": 90, "foodFailure": 90, "oxygenFailure": 90}

var costs = {"waterPurifier":100,
                "foodCreation":50,
                "plantCreation":200};

var unlocks = {
            "redButton":{"water":0, "food":0},
            "waterPurifier": {"water": 4050},
            "foodCreation":{"food": 400},
            "plantCreation":{"oxygen": 2100}   
            };

//actions
function purifyWater(){
    //increment water
    resources["water"] += 1;

    //update text
    updateText();
};

function makeFood(){
    resources["food"] += 1;
    updateText();
};

function makePlants(){
    resources["oxygen"] += 1;
    updateText();
};


//upgrades
function upgradeWaterPurifier(){
    if(resources["water"] >= costs["waterPurifier"]){
        
        //decrement resource
        resources["water"] -= costs["waterPurifier"];
        
        //random number for chance of failure
        var randy = Math.floor(Math.random() * 100);
        
        //It has a chance to fail and when it does water is lost
        //and button is disabled
        if(randy < chance["waterFailure"]){
            if(!resources["waterLoss"]){
                resources["waterLoss"]=0;
            }
            resources["waterLoss"] -= resources["waterDecrement"];
            document.getElementById("purifyWaterButton").disabled = true;
            document.getElementById("upgradeWaterPurifier").disabled = true;
        }
        //If it does not fail we increase the chance of failure
        //and upgrade water collection
        else{
            chance["waterFailure"] *= 1.25;
        }
    }
    updateText();
};

function upgradeFoodCreation(){
    if(resources["food"] >= costs["foodCreation"]){
        
        //decrement resource
        resources["food"] -= costs["foodCreation"];
        
        //random number for chance of failure
        var randy = Math.floor(Math.random() * 100);
        
        //It has a chance to fail and when it does food is lost
        //and button is disabled
        if(randy < chance["foodFailure"]){
            if(!resources["foodLoss"]){
                resources["foodLoss"]=0;
            }
            resources["foodLoss"] -= resources["foodDecrement"];
            document.getElementById("makeFoodButton").disabled = true;
            document.getElementById("upgradeFoodCreation").disabled = true;
        }
        //If it does not fail we increase the chance of failure
        //and upgrade food collection
        else{
            chance["foodFailure"] *= 1.25;
        }
    updateText();
    }
};

function upgradePlantCreation(){
            
        //decrement resource
        resources["oxygen"] -= costs["plantCreation"];
        
        //random number for chance of failure
        var randy = Math.floor(Math.random() * 100);
        
        //It has a chance to fail and when it does food is lost
        //and button is disabled
        if(randy < chance["oxygenFailure"]){
            if(!resources["oxygenLoss"]){
                resources["oxygenLoss"]=0;
            }
            resources["oxygenLoss"] -= resources["oxygenDecrement"];
            document.getElementById("makePlantsButton").disabled = true;
            document.getElementById("upgradePlantCreation").disabled = true;
        }
        //If it does not fail we increase the chance of failure
        //and upgrade food collection
        else{
            chance["oxygenFailure"] *= 1.25;
        }

    updateText();
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