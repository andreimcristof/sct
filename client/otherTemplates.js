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
