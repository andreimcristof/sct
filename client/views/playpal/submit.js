Template.playpalSubmit.events({
	'change #servers':function(e)
	{
		
	},
	'change #races':function(e)
	{
	
	},
	'change #leagues':function(e)
	{
	
	},


	'submit form': function(e){
		e.preventDefault();

		if(Errors.find().count() > 0)
		{
			Errors.remove({});
		}
		
		var playpal = 
		{
			server: $('#servers').val(),
			bnetid: $(e.target).find('[name=bnetid]').val(),
			race: $('#races').val(),
			profileurl: $(e.target).find('[name=profileurl]').val(),
			league: $('#leagues').val(),
			comment: $(e.target).find('[name=comment]').val(),
			submitted : new Date().getTime()
		}


		Meteor.call('postPlaypal', playpal, function(error, id){
			if(error)
			{
				console.log(error);//add logging for insert errors
				return;
			}
			

			Router.go('allPlaypals');	
		});
	}
});
