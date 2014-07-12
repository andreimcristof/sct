Template.allRaces.helpers({  
		allRaces: function() {    
			return Races.find();
		}
});

Template.allLeagues.helpers({  
		allLeagues: function() {    
			return Leagues.find();
		}
});

Template.allServers.helpers({  
		allServers: function() {    
			return Servers.find();
		}
});



Template.checkboxListItem.events({  
		'click .checkboxListItem': function(event) {    
			var clickedObject = $(this);

			var name = clickedObject.attr('name');
			var type = clickedObject.attr('objectType');
			var isChecked = event.target.checked;

			var filterObject = { "objectType" :  type, "name" : name }
			if(isChecked)
				insertSearchFilterPlaypal(filterObject);
			else
				removeSearchFilterPlaypal(filterObject);
		
		}
});