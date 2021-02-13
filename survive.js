//framerate settings 
var timer = 256
var tickRate = 16
var visualRate = 256

//resources 
var resources = {"water":500, "food": 300, "oxygen":1000, "waterDecrement":1,"oxygenDecrement":.5,"foodDecrement":1 };

//increments for automatic adjustments
var increments = [{"input":["waterLoss"],
 		        "output":"water"},
                
                 {"input":["foodLoss"], 
                "output": "food"},

                {"input":["oxygenLoss"], 
                "output": "oxygen"}];

//upgrades variables 
var upgrades = {"water":1,"food":1, "oxygen":1} 

//failure chance for RnG
var chance = {"waterFailure": 5, "foodFailure": 5, "oxygenFailure": 5}

//costs of actual upgrades
var costs = {"waterPurifier":150,
                "foodCreation":60,
                "plantCreation":300};


//costs to reveal certain buttons 
var unlocks = {
            "waterPurifier": {"water": 600},
            "foodCreation":{"food": 400},
            "plantCreation":{"oxygen": 1100}   
            };

//actions
function purifyWater(){
    //increment water
    resources["water"] += upgrades["water"];

    //update text
    updateText();
};

function makeFood(){
    resources["food"] += upgrades["food"];
    updateText();
};

function makePlants(){
    resources["oxygen"] += upgrades["oxygen"];
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
            
            //indicate water collection and upgrades have failed
            let waterFailure = document.getElementById("waterFailure");
            waterFailure.textContent = "Water purification and upgrades have failed. There is also a water leakage."

        }
        //If it does not fail we increase the chance of failure by 1.25
        //upgrade water collection
        //increase cost by 1.25
        else{
            chance["waterFailure"] *= 2;
            upgrades["water"] += 1;
            costs["waterPurifier"] *= 1.25;
            
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

            //indicate food creation and upgrades have failed
            let foodFailure = document.getElementById("foodFailure");
            foodFailure.textContent = "Food creation and upgrades have failed. Food cannot be made";
        }
        //If it does not fail we increase the chance of failure by 1.25
        //and upgrade food collection
        //increase cost by 1.25
        else{
            chance["foodFailure"] *= 2;
            upgrades["food"] += 1;
            costs["foodCreation"] *= 1.25;
        }
    updateText();
    }
};

function upgradePlantCreation(){
    if(resources["oxygen"]>= costs["foodCreation"]){
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

            //indicate oxygen collection has failed and upgrades cannot be made
            let oxyegenFailure = document.getElementById("oxygenFailure");
            oxygenFailure.textContent = "Garden is ruined. Oxygen collection and upgrades cannot be made."
        }
        //If it does not fail we increase the chance of failure by 1.25
        //and upgrade food collection
        //increase cost by 1.25
        else{
            chance["oxygenFailure"] *= 2;
            upgrades["oxygen"] += 1;
            costs["plantCreation"] *= 1.25;
        }
    updateText();
    }
};

//This will ensure no negative values exist
//and the red button will appear at the right time 
function checkIntegrity()
{
    //if any values equate to zero we will end the decrementing
    if(resources["water"] <= 1){
        resources["waterLoss"] = 0;
    }
    if(resources["food"] <= 1){
        resources["foodLoss"] = 0;
    } 
    if(resources["oxygen"] <= 1){
        resources["oxygenLoss"] =0 ;
    }

    //redButton Check
    if (resources["water"] <= 1 && resources["food"] <= 1){
        let redButton = document.getElementById("redButton");
        redButton.style.display = "block"
    }
};

//text-update functioon to properly display items 
function updateText(){
    checkIntegrity();
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

//framerate adjusting
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