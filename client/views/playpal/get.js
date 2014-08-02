Template.allPlaypals.helpers({  
		allPlaypals: function(filter) {    
			return Playpals.find(filter, {sort: {submitted: -1 }  });
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
	RerenderPlaypalGraphicAfterFilterChange();
	InitializeTooltipForNodes();
}

Meteor.autosubscribe(function()
{
	SearchFiltersPlaypal.find().observe({
		added: function(item)
		{
			RerenderPlaypalGraphicAfterFilterChange();
			InitializeTooltipForNodes();
		},

		removed: function(item)
		{
			RerenderPlaypalGraphicAfterFilterChange();
			InitializeTooltipForNodes();
		},
	})
})

function RerenderPlaypalGraphicAfterFilterChange()
{
	var GetSearchFilterPlaypal = function()
	{
		var filter = GetCumulatedFilterFromUserSelection();
		var	dataAllPlaypals  = JSON.stringify(Template.allPlaypals.allPlaypals(filter).fetch());
		return dataAllPlaypals;	
	}

	var filterData = GetSearchFilterPlaypal();
	
	$('#resultsVisualizer').empty();
	RenderPlaypalD3(filterData);
}



var InitializeTooltipForNodes  = function()
{
	$('svg g.nodePlaypal').qtip({
		content:
		{
			text: "aaa"
		},
		style: {height: 100, width: 175, classes: 'qtip-pos-bc qtip qtip-blue qtip-rounded qtip-shadow'},
		show: { delay: 0 }
	});	
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

4