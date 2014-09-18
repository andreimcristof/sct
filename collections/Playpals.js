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
	deleteMyPlaypal:function()
	{
		Playpals.remove({"submitter":this.userId });
	},

	
	postPlaypal:function(playpalAttributes){

		var user = Meteor.user();

		//ensure user is logged in to post
		if(!user)
			throwVisualErrorHint("You need to login to do this action");


		//fields 
		if(!playpalAttributes.bnetid)
			throwVisualErrorHint("Please enter a Battle.net ID");

		if(!playpalAttributes.profileurl)
			throwVisualErrorHint("Please enter a Battle.net URL");

		if(playpalAttributes.profileurl && !IsProperBNetURL(playpalAttributes.profileurl))
			throwVisualErrorHint("The URL you entered is not a Battle.net URL");

		if(!playpalAttributes.comment)
			throwVisualErrorHint("Please enter a short description in the comment field.");

		var playpal = _.extend(_.pick(playpalAttributes, "server", "bnetid", "race", "profileurl", "league", "comment", "submitted"), {
			userId : user._id,
			submitter: this.userId,
			submitted: moment().utc().toDate()
		});

		var playpalId = Playpals.insert(playpal);

		return playpalId;
	}
});

function IsProperBNetURL(value) {

	if(	!URLstartsWithBNet(value, "http://eu.battle.net") && 
		!URLstartsWithBNet(value, "http://kr.battle.net") && 
		!URLstartsWithBNet(value, "http://tw.battle.net") && 
		!URLstartsWithBNet(value, "http://sea.battle.net") && 
		!URLstartsWithBNet(value, "http://us.battle.net") 
		)
		return false;

    return /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/i.test(value);
 }

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

function URLstartsWithBNet(value, properURL)
{
	return value.startsWith(properURL);
}