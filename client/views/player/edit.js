Template.playerEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPlayerId = this._id;

		var playerProperties= 
		{
			alias: $(e.target).find('[name=alias]').val(),
			name: $(e.target).find('[name=name]').val(),
			race: $(e.target).find('[name=race]').val()
		}

		Players.update(currentPlayerId,{ $set:playerProperties}, function(error){
			if(error){
				//log update error 
			}
			else
			{
				Router.go('player', {_id: currentPlayerId});
			}
		});
	},

	'click .delete': function(e){
		e.preventDefault();

		if(confirm("Delete this player?")){
			var currentPlayerId = this._id;
			Players.remove(currentPlayerId);

			Router.go('allPlayers');
		}
	}
});