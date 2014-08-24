Template.eventSubmit.events({
	
	'submit form': function(e){
		e.preventDefault();

		if(Errors.find().count() > 0)
		{
			Errors.remove({});
		}
		
		var event = 
		{
			title: $('#title').val(),
			imageUrl: $('#imageUrl').val(),
			startDate: $('#startDate').datepicker( "getDate" ),
			startTime: $('#startTime').val(),
			endDate: $('#endDate').datepicker( "getDate" ),
			endTime: $('#endTime').val(),
			timezone: $('#timezones').val(),
			streamLink: $('#streamLink').val(),
			comment: $('#comment').val(),
			submitterTwitter: Meteor.user().profile.name
		}

		Meteor.call('postEvent', event, function(error, id){
			if(error)
			{
				console.log(error);//add logging for insert errors
				return;
			}
			

			Router.go('allEvents');	
		});
	}
});

Template.allTimezones.helpers({  
		allTimezones: function() {    
			return Timezones.find();
		}
});