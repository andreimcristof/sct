/*

Playpals:

- Server (DDL)
- B.NET ID identifier: 
- Race (DDL)
- Profile URL
- League (DDL)
- Comment
- Submitted
- Submitter 
*/


Playpals = new Meteor.Collection("playpals");

Meteor.methods({
	postPlaypal:function(playpalAttributes){
		var user = Meteor.user(),
		playpalWithSameId = Playpals.findOne({alias: playpalAttributes.alias});

		//ensure user is logged in to post
		if(!user)
			throw new Meteor.Error(401, "You need to login to do this action");

		//ensure playpal has fields completed
		if(!playpalAttributes.race)
			throw new Meteor.Error(402, "Please give the playpal a race");

		//check possible duplicates
		if(playpalAttributes.submitter && playpalWithSameId)
			throw new Meteor.Error(302, "This practice partner already exists", playpalWithSameId._id);

		var playpal = _.extend(_.pick(playpalAttributes, "alias", "name", "race"), {
			userId : user._id,
			submitted : new Date().getTime()
		});

		var playpalId = Playpals.insert(playpal);
		return playpalId;
	}
});
