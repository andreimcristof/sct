//this is a manager. it serves data to the template. 
Template.allPlayers.helpers({  
		allPlayers: function() 
		{    return Players.find({}, {sort: {alias: -1 }  });
}
});
/*
Template.onePlayerByAlias.helpers({  
		findScarlett: function() 
		{    return Players.findOne({'alias': 'Scarlett'});  }
});*/


