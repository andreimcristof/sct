//this is a manager. it serves data to the template. 
Template.allPlaypals.helpers({  
		allPlaypals: function(filter) {    
			return Playpals.find(filter, {sort: {Submitted: -1 }  });
		},

		ownPlaypal: function() 	{    
			return Playpals.findOne({"submitter":Meteor.userId() });
		},

		allServers: function()	{
			return Servers.find();
		}, 

		allLeagues: function()	{
			return Leagues.find();
		},


		allRaces: function() {
			return Races.find();
		}
});



Template.allPlaypals.rendered = function()
{
	//mock SearchFiltersPlaypal
	//SearchFiltersPlaypal.insert({objectType: "league", name:"Diamond"});
	//SearchFiltersPlaypal.insert({objectType: "race", name:"Protoss"});
	//SearchFiltersPlaypal.insert({objectType: "server", name:"North America"});

	Deps.autorun(function(){
		var filter = GetCumulatedFilterFromUserSelection();

		var dataAllPlaypals  = JSON.stringify(Template.allPlaypals.allPlaypals(filter).fetch());	

		//clear container
		$('#resultsVisualizer').empty();
		RenderPlaypalD3(dataAllPlaypals);
	})	
}

function GetCumulatedFilterFromUserSelection()
{
	var serverFilter = BuildFilter(Template.searchFiltersPlaypal.playpalServerFilter(), "server");

	var leagueFilter = BuildFilter(Template.searchFiltersPlaypal.playpalLeagueFilter(), "league");
	var raceFilter = BuildFilter(Template.searchFiltersPlaypal.playpalRaceFilter(), "race");

	var combinedFilter = [serverFilter, leagueFilter, raceFilter];
	var jsonResult = ({$and : combinedFilter});
	return jsonResult;
}

function BuildFilter(templateResult, prop)
{
	var rawFilter = templateResult.split(", ");

	rawFilter = RemoveAllElementInCaseItExists(rawFilter);
	
	if(rawFilter.length == 0)
	{
		return ({});
	}

	var filterArr = [];
	
	for(var i = 0; i < rawFilter.length; i++)
	{
		if(prop === "server")
			filterArr.push({ server : rawFilter[i] });
		else if (prop === "race")
			filterArr.push({ race : rawFilter[i] });
		else if (prop === "league")
			filterArr.push({ league : rawFilter[i] });
	}

	var jsonResult = ({$or : filterArr});
	return jsonResult;


	//helper function 
	function RemoveAllElementInCaseItExists(filter)
	{
		var allIndex = filter.indexOf("all");
		if(allIndex > -1)
			filter.splice(allIndex, 1);

		return filter;
	}
}

