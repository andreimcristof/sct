/* Players:

alias,
name,
race

*/


Players = new Meteor.Collection("players");

Meteor.methods({
	postPlayer:function(playerAttributes){
		var user = Meteor.user(),
		playerWithSameId = Players.findOne({alias: playerAttributes.alias});

		//ensure user is logged in to post
		if(!user)
			throw new Meteor.Error(401, "You need to login to do this action");

		//ensure player has fields completed
		if(!playerAttributes.alias)
			throw new Meteor.Error(402, "Please give the player an alias");

		//check possible duplicates
		if(playerAttributes.alias && playerWithSameId)
			throw new Meteor.Error(302, "This player already exists", playerWithSameId._id);

		var player = _.extend(_.pick(playerAttributes, "alias", "name", "race"), {
			userId : user._id,
			submitted : new Date().getTime()
		});

		var playerId = Players.insert(player);
		return playerId;
	}
});

/*
Players.allow({
	insert:function(userId, doc)
	{
		return !! userId;
	}
})
*/

//objects pro user logged:
// var myMessages = Messages.find({userId: Session.get('myUserId')}).fetch();

