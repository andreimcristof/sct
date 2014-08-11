Template.allStrategies.helpers({  
		allStrategies: function(filter) {    
			return Strategies.find(filter);//Strategies.find(filter, {sort: {name: -1 }  });
		}
});

Template.allStrategies.rendered = function()
{
	var data = ToGridStructure();
}


var ToGridStructure = function()
{
	var zergStrategiesFilter = {race : "Zerg"};
	var terranStrategiesFilter = {race: "Terran"};
	var protossStrategiesFilter = {race: "Protoss"};


	var zergJson = {
		name: "Zerg", 
		children:JSON.stringify(Template.allStrategies.allStrategies(zergStrategiesFilter).fetch())
	}
	
	var terranJson = 
	{
		name: "Terran",
		children: JSON.stringify(Template.allStrategies.allStrategies(terranStrategiesFilter).fetch())
	}

	var protossJson = 
	{
		name: "Protoss",
		children: JSON.stringify(Template.allStrategies.allStrategies(protossStrategiesFilter).fetch())
	}

	var collapsibleTreeStructuredJson = 
	{
		name: "Strategies",
		children: [terranJson, protossJson, zergJson]
	}
	return JSON.stringify(collapsibleTreeStructuredJson);
}