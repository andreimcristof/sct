Template.playpalSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var playpal = 
		{
			server: $(e.target).find('[name=server]').val(),
			bnetid: $(e.target).find('[name=bnetid]').val(),
			race: $(e.target).find('[name=race]').val(),
			profileurl: $(e.target).find('[name=profileurl]').val(),
			league: $(e.target).find('[name=league]').val(),
			comment: $(e.target).find('[name=comment]').val(),
			submitted: new Date().getTime(),
			submitterid: Meteor.user()._id
		}


		Meteor.call('postPlaypal', playpal, function(error, id){
			if(error)
				return;//add logging for insert errors

			Router.go('playpal', {_id: id});	
		});
	}
});
