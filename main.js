//class creation
class Location {
	constructor(name, quip) {
	  this.name = name;
	  this.quip = quip;
	}
  }

//data
var currentIndex=0;
var tier=1;
var counter=0;
var resources = {"asteroid":0,"uranium":0,"nuke":1, "nukeAdder":1, "nukeDecrement":1};
var costs = {"nuke":100, "weaponsFacility": 200};
var unlocks = {
	"asteroid":{"asteroid":35},
	"uranium": {"uranium":35}
};
//cost to change in accordance to tiers
var asteroidCost = 4;
var uraniumCost = 6;
//collect to change in accordance to upgrades 
var asteroidCollect = 1; //click per asteroid
var uraniumCollect = 1; //clicks per uranium

var asteroidCollectAdder = 2.0; 
var uraniumCollectAdder = 2.0;

//table 
var asteroidUpgradeCost = 35;
var uraniumUpgradeCost = 35;

//tier 1
//cost 1
var locations1 = [
	new Location("Alabama", "not such a sweet home anymore"),
	new Location("Alaska", "there was nothing there anyways"), 
	new Location("Arizona", "Arizona state should've seen it coming"),
	new Location("Arkansas", "ITS PRONOUNCED ARKANSAW"), 
	new Location("California", "They thought they were too important to be nuked"), 
	new Location("Colorado", "Nukes are now legal in South Park"), 
	new Location("Connecticut", "No more dressing Connecticut Casual"), 
	new Location("Delaware", "Aubrey Plaza WAS the most famous person in this state"), 
	new Location("District of Columbia", "The newest insurrection has arrived"), 
	new Location("Florida", "Even Florida man did not survive (Pitbull is mad)"), 
	new Location("Georgia", "They need a runoff nuke to verify"), 
	new Location("Hawaii", "We beat the volcanoes!"), 
	new Location("Idaho", "no u da ho"), 
	new Location("Illinois", "I will miss the cows"), 
	new Location("Indiana", "Not at all related to Indiana Jones"), 
	new Location("Iowa", "Why is the caucus in Iowa, the most boring state"), 
	new Location("Kansas", "We dont call it kAnSAw"), 
	new Location("Kentucky","KFC is horrible"), 
	new Location("Louisiana", "We nuked the swamps"), 
	new Location("Maine", "Im gonna miss the lobsters"), 
	new Location("Maryland", "Logic isn't a good rapper"), 
	new Location("Massachusetts", "I bet you couldn't spell this state"), 
	new Location("Michigan", "Everything was nuked except Detroit, they've had it hard c'mon!"), 
	new Location("Minnesota", "Its always snowing so lets have a nuclear winter"), 
	new Location("Mississippi", "I really dont know how many 's' letters there are."), 
	new Location("Missouri", "Missouri is feeling missery now!"), 
	new Location("Montana", "Yeah Hannah Montana isn't from Montana"), 
	new Location("Nebraska", "I know nothing of this state, make your own joke up!"), 
	new Location("Nevada", "Bye Vegas wont miss you"), 
	new Location("New Hampshire", "More like NUKED Hamphsire am I right?"), 
	new Location("New Jersey", "This is revenge for Jersey Shore"), 
	new Location("New Mexico", "I preferred old mexico"), 
	new Location("New York", "Now NEW New York"),
	new Location("North Carolina", "South Carolina was better"), 
	new Location("North Dakota", "Now merging with south dakota"), 
	new Location("Ohio", "Cleveland came back from a 3-1 lead, but not a nuke"), 
	new Location("Oklahoma", "Always confused for Oakland"), 
	new Location("Oregon", "Portland was the only cool thing"), 
	new Location("Pennsylvania", "Scranton is only cool because of The Office"), 
	new Location("Rhode Island", "R.I. is only cool because of Family Guy"), 
	new Location("South Carolina", "North Carolina sucks!"), 
	new Location("South Dakota", "Just merge with North Dakota after the Nuke"),
	new Location("Tennessee" , "Hannah Montana isnt real and she's from Tennessee"), 
	new Location("Texas", "what am I stupid? No im Texas! Whats the Difference?"), 
	new Location("Utah", "Salt Lake City just got Saltier"), 
	new Location("Vermont", "The state I always forget"), 
	new Location("Washington", "Not Washington 2 electric boogaloo "), 
	new Location("West Virginia", "Country roads wont be going home this time..."), 
	new Location("Wisconsin", "That 70's show has the worst final season"), 
	new Location("Wyoming", "Why I dont care about this state!")];
//tier 2 nukes
//cost of 4 	
var locations2 = [
	new Location("UK", "London Bridge has fallen down again!"),
	new Location("France", "They didn't even have a chance to surrender"),
	new Location("Germany", "NEIN"),
	new Location("Spain", "They can run from bulls, not from nukes"),
	new Location("Portugal", "Ronaldo actually outran the nuke"),
	new Location("Turkey", "Note: Does not actually have Turkey"),
	new Location("Italy", "The Tower of Pisa is not leaning anymore"),
	new Location("Iceland", "Theres more ice in Greenland?! Make it make sense"),
	new Location("Canada", "They apologized"),
	new Location("Russia", "I guess you could say they were RUSSIAN to leave the country" ),
	new Location("Sweden", "Swedish fish are GROSS"),
	new Location("Denmark", "Im gonna miss LEGO'S"),
	new Location("Australia", "The nuke was upside down"),
	new Location("Austria", "Whoops I thought that was Australia"),
	new Location("New Zealand", "We just got another hole in the ozone layer")];
//tier 3 nukes
//cost of 8 
var locations3= [
	new Location("Mars", "The red giant is no more. Any chance of life on mars has probably been ruined "),
	new Location("Mercury","Suprise! The planet is still Hot!" ),
	new Location("Venus", "Venus just got greener"),
	new Location("Jupiter", "Jupiter absorbed the nuke"),
	new Location("Saturn", "Okay at this point I dont even know what happened to the nuke"),
	new Location("Uranus", "Guess what! It's still Blue"),
	new Location("Pluto", "It is literally destroyed")
	];
var locations4= [
	new Location("Earth", "You have nuked your Homeworld and your entire loved ones. You could've stopped at anytime but you just had to keep clicking...")
	];

var locations = locations1;

currentIndex= Math.floor(Math.random() * locations.length);
updateButton();
updateText();

//functions for buttons
//nuke something
function nuke(){
	if(resources["nuke"] >= 1){
		//decrement nukes
		resources["nuke"] -= resources["nukeDecrement"];
		
		//change text messages
		let nukedMessage = document.getElementById("nukedMessage");
		let messageBox = document.getElementById("message");	
		nukedMessage.textContent = locations[currentIndex].name + " has been nuked"
		messageBox.textContent = locations[currentIndex].quip;
		
		//delete entry 
		delete locations[currentIndex];
		locations = locations.filter(loc => loc != undefined);
		currentIndex= Math.floor(Math.random() * locations.length);
		checkGame();
		updateButton();
		updateText();
		clearError();
		counter++;
	}

	else {
		let errorMessage = document.getElementById("error");
		errorMessage.textContent = "Manufacture Nukes!";  
	}
};

//create a nuke
function manufactureNuke(){
	if(resources["asteroid"]>=asteroidCost && resources["uranium"]>= uraniumCost){
		//increase nukes
		resources["nuke"] += resources["nukeAdder"]
		resources["asteroid"] -= asteroidCost;
		resources["uranium"] -= uraniumCost;
		updateText();
		clearError();
	}
	else{
		let errorMessage = document.getElementById("error");
		errorMessage.textContent = "Collect Materials!";  
	}

};

//collect Asteroid metal
function collectAsteroidMetal(){
	resources["asteroid"] += asteroidCollect ;
	updateText();
};

//collect Space Uranium
function collectUranium(){
	resources["uranium"] += uraniumCollect;
	updateText();
};

//upgrade Asteroid metal Collection
function upgradeAsteroidMetal(){
	if(resources["asteroid"]>=asteroidUpgradeCost && resources["uranium"]>= asteroidUpgradeCost){
		//asteroid collect is upgraded by its adder and changes MpS
		asteroidCollect = asteroidCollectAdder;
		let metalPerClick = document.getElementById("metalPerClick");
		metalPerClick.textContent = "Metal per Click: " +  asteroidCollectAdder;
		
		//decrementing asteroid resources
		resources["asteroid"] -= asteroidUpgradeCost; 
		resources["uranium"] -= asteroidUpgradeCost;

		//multiplying resource cost for next upgrade 
		asteroidUpgradeCost *= 2;

		//adder for MpS
		asteroidCollectAdder *= 1.5;

		//updating table to doubled value
		let asteroidTableUpgradeCost = document.getElementById("asteroidTableUpgradeCost");
		asteroidTableUpgradeCost.textContent = asteroidUpgradeCost;

		let asteroidTableUpgradeCost2 = document.getElementById("asteroidTableUpgradeCost2");
		asteroidTableUpgradeCost2.textContent = asteroidUpgradeCost;
		updateText();
	}
	else{
		let errorMessage = document.getElementById("error");
		errorMessage.textContent = "Collect Materials!";  
	}
}

function upgradeUranium(){
	if(resources["asteroid"]>=uraniumUpgradeCost && resources["uranium"]>= uraniumUpgradeCost){
		//Uranium collect is upgraded by its adder and changes Ups
		uraniumCollect = uraniumCollectAdder;
		let uraniumPerClick = document.getElementById("uraniumPerClick");
		uraniumPerClick.textContent = "uranium per Click: " +  uraniumCollectAdder;
	
		//decrementing uranium resources
		resources["asteroid"] -= uraniumUpgradeCost; 
		resources["uranium"] -= uraniumUpgradeCost;

		//multiplying resource cost for next upgrade 
		uraniumUpgradeCost *= 2;

		//adder for UpS
		uraniumCollectAdder *= 1.5;

		//updating table to doubled value
		let uraniumTableUpgradeCost = document.getElementById("uraniumTableUpgradeCost");
		uraniumTableUpgradeCost.textContent = uraniumUpgradeCost;

		let uraniumTableUpgradeCost2 = document.getElementById("uraniumTableUpgradeCost2");
		uraniumTableUpgradeCost2.textContent = uraniumUpgradeCost;
		updateText();
	}
	else{
		let errorMessage = document.getElementById("error");
		errorMessage.textContent = "Collect Materials!";  
	}
}
//clear warning
function clearError(){
	let errorMessage = document.getElementById("error");
	errorMessage.textContent = " ";  
};

//change button name
function updateButton(){
	let button = document.getElementById("NukeButton");
	button.textContent = "Nuke " + locations[currentIndex].name;
};


//check game completion
function checkGame(){
	if(locations.length==0){
		let asteroidTableCost = document.getElementById("asteroidTableCost");
		let uraniumTableCost = document.getElementById("uraniumTableCost");
		tier++;
		switch(tier){
			case 2:
				locations = locations2;
				asteroidCost = 8;
				uraniumCost = 12;
				asteroidTableCost.textContent="8";
				uraniumTableCost.textContent="12";
			break;
			case 3:
				locations = locations3;
				asteroidCost = 16;
				uraniumCost = 24;
				asteroidTableCost.textContent = "16";
				uraniumTableCost.textContent="24";
			break;
			case 4:
				locations = locations4;
				asteroidCost = 32;
				uraniumCost = 48;
				asteroidTableCost.textContent = "32";
				uraniumTableCost.textContent ="48";
			break

		}
	}

};
//update text section for each execution of a button 
//This code is from my Professor Adam Summerville 
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