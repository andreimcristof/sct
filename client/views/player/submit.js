Template.playerSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var player = 
		{
			alias: $(e.target).find('[name=alias]').val(),
			name: $(e.target).find('[name=name]').val(),
			race: $(e.target).find('[name=race]').val()
		}



		Meteor.call('post', player, function(error, id){
			if(error)
				return;//add logging for insert errors

			Router.go('player', {_id: id});	
		});
	}
});
