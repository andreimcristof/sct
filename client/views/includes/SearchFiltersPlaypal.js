SearchFiltersPlaypal = new Meteor.Collection(null);

insertSearchFilterPlaypal = function(filter) {
  SearchFiltersPlaypal.insert(
  	{objectType: filter.objectType, name : filter.name}) 
}




 
removeSearchFilterPlaypal = function(filter) {
  SearchFiltersPlaypal.remove(
  	{objectType: filter.objectType, name : filter.name}) 
}


Template.searchFiltersPlaypal.helpers({  
	searchFiltersPlaypal: function() {  
		return SearchFiltersPlaypal.find();
	},
	isEmpty: function() {  
		return SearchFiltersPlaypal.find().count() == 0;
	}
	
});

Template.searchFiltersPlaypal.playpalRaceFilter = function(){
	
		var racesChosen = SearchFiltersPlaypal.find({objectType : 'race'}).fetch();
		if(racesChosen.length == 0)
			return "all";
		else
		{
			var races = [];
			for(var i = 0; i < racesChosen.length; i++)
			{
				var name = racesChosen[i].name;
				races.push(name);
			}
			return races.join(", ");
		}
}


Template.searchFiltersPlaypal.playpalServerFilter = function(){
	
		var serversChosen = SearchFiltersPlaypal.find({objectType : 'server'}).fetch();
		if(serversChosen.length == 0)
			return "all";
		else
		{
			var servers = [];
			for(var i = 0; i < serversChosen.length; i++)
			{
				var name = serversChosen[i].name;
				servers.push(name);
			}
			return servers.join(", ");
		}
}

Template.searchFiltersPlaypal.playpalLeagueFilter = function(){
	
		var leaguesChosen = SearchFiltersPlaypal.find({objectType : 'league'}).fetch();
		if(leaguesChosen.length == 0)
			return "all";
		else
		{
			var leagues = [];
			for(var i = 0; i < leaguesChosen.length; i++)
			{
				var name = leaguesChosen[i].name;
				leagues.push(name);
			}
			return leagues.join(", ");
		}
}


Template.searchFiltersPlaypal.rendered = function(){
	SearchFiltersPlaypal.remove({});
}


Template.searchFiltersPlaypal.events({
	'click #removeFilters': function(e){
		e.preventDefault();

		SearchFiltersPlaypal.remove({});
		$('.checkboxListItem').prop('checked', false);
	}
});