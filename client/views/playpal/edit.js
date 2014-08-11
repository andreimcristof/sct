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
			else{
				Router.go('allPlaypals');
			}
		});
	},

	'click .delete': function(e){
		e.preventDefault();
			//disabled delete playpal button for now
		}
	});

Template.playpalEdit.rendered = function()
{
	var ownPP = Template.allPlaypals.ownPlaypal();
		$('#races').val(ownPP.race);
		$('#servers').val(ownPP.server);
		$('#leagues').val(ownPP.league);
}





