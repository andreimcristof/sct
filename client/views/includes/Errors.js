Errors = new Meteor.Collection(null);

throwVisualErrorHint = function(message) {  Errors.insert({message: message}) }

Template.errors.helpers({  
	errors: function() {  
		return Errors.find();
	} 
});
