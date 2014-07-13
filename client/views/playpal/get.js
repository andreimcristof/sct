//this is a manager. it serves data to the template. 
Template.allPlaypals.helpers({  
		allPlaypals: function() {    
			return Playpals.find({}, {sort: {Submitted: -1 }  });
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
	var dataAllPlaypals  = JSON.stringify(Template.allPlaypals.allPlaypals().fetch());
	RenderPlaypalD3(dataAllPlaypals);
}