SearchFiltersPlaypal = new Meteor.Collection(null);
//SearchFiltersPlaypal.insert({"objectType": "test1", "name": "test1"});

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
	} 
});