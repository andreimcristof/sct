Template.playpalEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPlaypalId = this._id;

		var playpalProperties = 
		{
			server: $(e.target).find('[name=server]').val(),
			bnetid: $(e.target).find('[name=bnetid]').val(),
			race: $(e.target).find('[name=race]').val(),
			profileurl: $(e.target).find('[name=profileurl]').val(),
			league: $(e.target).find('[name=league]').val(),
			comment: $(e.target).find('[name=comment]').val(),
			submitted: $(e.target).find('[name=submitted]').val()
		}

		Playpals.update(currentPlaypalId,{ $set:playpalProperties}, function(error){
			if(error){
				//log update error 
			}
			else
			{
				Router.go('playpal', {_id: currentPlaypalId});
			}
		});
	},

	'click .delete': function(e){
		e.preventDefault();

		if(confirm("Delete this practice partner?")){
			var currentPlaypalId = this._id;
			Playpals.remove(currentPlaypalId);

			Router.go('allPlaypals');
		}
	}
});