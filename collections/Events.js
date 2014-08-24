

Events = new Meteor.Collection("events");



Meteor.methods({
	postEvent:function(eventAttributes){

		var user = Meteor.user();

		//ensure user is logged in to post
		if(!user)
			throwVisualErrorHint("You need to login to do this action");

		//fields 
		if(!eventAttributes.title)
			throwVisualErrorHint("Please enter a title for your event.");

		if(eventAttributes.title.length < 10)
			throwVisualErrorHint("Your title is too short. Please enter a more descriptive title for the event.");

		if(!eventAttributes.imageUrl)
			throwVisualErrorHint("Please choose an image banner for your event.");

		if(!eventAttributes.startDate)
			throwVisualErrorHint("Please choose the starting date for your event.");

		if(!eventAttributes.startTime)
			throwVisualErrorHint("Please choose the starting time for your event.");

		if(!eventAttributes.endDate)
			throwVisualErrorHint("Please choose the ending date for your event.");

		if(!eventAttributes.endTime)
			throwVisualErrorHint("Please choose the ending time for your event.");

		if(!eventAttributes.streamLink)
			throwVisualErrorHint("Please enter the stream link for your event, so that people know where to tune in.");

		if(!eventAttributes.comment)
			throwVisualErrorHint("Please enter a few details in the comment field.");

		if(eventAttributes.comment.length < 40)
			throwVisualErrorHint("The comment you entered is too short. Please add more details.");

		var pStartDate = GetDateAndTimeFromPostData(eventAttributes.startDate, eventAttributes.startTime, eventAttributes.timezone);
		var pEndDate = GetDateAndTimeFromPostData(eventAttributes.endDate, eventAttributes.endTime, eventAttributes.timezone);

		var event = _.extend(_.pick(eventAttributes, "title", "imageUrl", /*"startDate", "startTime", "endDate", "endTime",*/ "timezone",  "comment", "submitterTwitter" ), {
			startDate : pStartDate,
			endDate : pEndDate,
			submitted : new Date().getTime(),
			submitterId: this.userId
		});

		var eventId = Events.insert(event);

		return eventId;

		function GetDateAndTimeFromPostData(dt, tm, timezone)
		{
			var t = tm.split(":");
			var hour = 	t[0];
			var min = t[1];

			var finalDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), hour, min);
			var utcConverted = ConvertUserTimezoneToServerTimezone(finalDate, timezone);
			var finalDateUTCTimezone = ConvertUTCStringToDateObject(utcConverted);

			return finalDateUTCTimezone;
		}

		function ConvertUTCStringToDateObject(utcConvertedString)
		{
			return moment(utcConvertedString).toDate();
		}

		function ConvertUserTimezoneToServerTimezone(dateToConvert, tz)
		{
			var userTimezonedDate;

			switch(tz)
			{
				case "EDT":
				{
					userTimezonedDate = moment.tz(dateToConvert, "America/New_York");
					break;
				}
				case "CEST":
				{
					userTimezonedDate = moment.tz(dateToConvert, "Europe/Berlin");
					break;
				}
				case "KST":
				{
					userTimezonedDate = moment.tz(dateToConvert, "Asia/Seoul");
					break;
				}
				case "CST":
				{
					userTimezonedDate = moment.tz(dateToConvert, "Asia/Shanghai");
					break;
				}
			}

			var utcDateFromUserTimezonedDate = userTimezonedDate.toISOString();
			return utcDateFromUserTimezonedDate;
		}
	},

	getEventsStartingInDateRange : function(pStartDate, pEndDate){
		var eventsInRange = Events.find({"startDate": {"$gte": pStartDate, "$lt": pEndDate}});
		return eventsInRange;
	},

	getEventsOccurringOnDate: function(pDate){
		var eventsOnThatDate = Events.find(
			{"startDate": {"$lt": pDate}},
			{"endDate": {"$gte": pDate}}
			  );
		
		return eventsOnThatDate;
	}
});