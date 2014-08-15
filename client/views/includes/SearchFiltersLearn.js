SearchFiltersLearn = new Meteor.Collection(null);

insertSearchFilterLearn = function(filter) {
  SearchFiltersLearn.insert(
  	{objectType: filter.objectType, name : filter.name})
}


removeSearchFilterLearn = function(filter) {
  SearchFiltersLearn.remove(
  	{objectType: filter.objectType, name : filter.name})
}


Template.searchFiltersLearn.helpers({  
	searchFiltersLearn: function() {  
		return SearchFiltersLearn.find();
	},
	isEmpty: function() {  
		return SearchFiltersLearn.find().count() == 0;
	}
});

Template.searchFiltersLearn.learnRaceFilter = function(){
	
		var racesChosen = SearchFiltersLearn.find({objectType : 'race'}).fetch();
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

Template.searchFiltersLearn.learnBestAgainstFilter = function(){
	
		var bestagainstChosen = SearchFiltersLearn.find({objectType : 'bestagainst'}).fetch();
		if(bestagainstChosen.length == 0)
			return "all";
		else
		{
			var bestagainst = [];
			for(var i = 0; i < bestagainstChosen.length; i++)
			{
				var name = bestagainstChosen[i].name;
				bestagainst.push(name);
			}
			return bestagainst.join(", ");
		}
}


Template.searchFiltersLearn.rendered = function(){
	SearchFiltersLearn.remove({});
}


Template.searchFiltersLearn.events({
	'click #removeFilters': function(e){
		e.preventDefault();

		SearchFiltersLearn.remove({});
		$('.checkboxListItemLearn').prop('checked', false);
	}
});