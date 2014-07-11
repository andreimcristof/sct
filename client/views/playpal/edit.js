Template.playpalEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPlaypalId = this._id;

		var playpalProperties = 
		{
			server: $('#servers').val(),
			bnetid: $(e.target).find('[name=bnetid]').val(),
			race: $('#races').val(),
			profileurl: $(e.target).find('[name=profileurl]').val(),
			league: $('#leagues').val(),
			comment: $(e.target).find('[name=comment]').val(),
			submitted : new Date().getTime()
		}

		Playpals.update(currentPlaypalId,{ $set:playpalProperties}, function(error){
			if(error){
				console.log(error);
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

/*Template.playpalEdit.comment = function()
{
	Meteor.defer (function(){
		$.find('[name=comment]').val("cccc");
		
	})
}*/




