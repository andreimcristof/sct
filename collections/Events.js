

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

		//if(!eventAttributes.imageUrl)
		//	throwVisualErrorHint("Please choose an image banner for your event.");

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

		//start date conversion
		var pStartDateJson = GetJsonObject(eventAttributes.startDate, eventAttributes.startTime, eventAttributes.timezone);
		var pEndDateJson = GetJsonObject(eventAttributes.endDate, eventAttributes.endTime, eventAttributes.timezone);

		var pStartDate = GetDateAndTimeFromPostData(pStartDateJson);
		var pEndDate = GetDateAndTimeFromPostData(pEndDateJson);

		var pStartDateWithoutTime = GetDateWithoutTime(pStartDate);
		var pEndDateWithoutTime = GetDateWithoutTime(pEndDate);

		var event = _.extend(_.pick(eventAttributes, "title", "imageUrl", "timezone",  "comment", "submitterTwitter" ), {
			startDate : pStartDate,
			endDate : pEndDate,
			startDateJson : JSON.stringify(pStartDateJson),
			endDateJson : JSON.stringify(pEndDateJson),
			startDateWithoutTime: pStartDateWithoutTime,
			endDateWithoutTime: pEndDateWithoutTime,
			submitted : new Date().getTime(),
			submitterId: this.userId
		});

		//do insert
		var eventId = Events.insert(event);

		return eventId;

		function GetDateWithoutTime(pDate)
		{
			return moment([pDate.getFullYear(), pDate.getMonth(), pDate.getDate()]).toDate();
		}

		//helper methods
		function GetJsonObject(dt, tm, timezone)
		{
			var t = tm.split(":");
			var hour = 	t[0];
			var min = t[1];

			var dateJsonObject = {
				Year :dt.getFullYear(),
				Month: dt.getMonth(),
				Day : dt.getDate(),
				Hour: hour,
				Min : min,
				Timezone : timezone
			};

			return dateJsonObject;
		}

		function GetDateAndTimeFromPostData(dateJsonObject)
		{
			var utcConverted = ConvertUserTimezoneToServerTimezone(dateJsonObject);
			return utcConverted;
		}

		function ConvertUserTimezoneToServerTimezone(o)
		{
			var convertedDate = moment.tz([o.Year,o.Month,o.Day,o.Hour,o.Min],o.Timezone).toDate();
			return convertedDate;
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

function toTimeZone(time, zone) {
   	var format = 'YYYY/MM/DD HH:mm:ss ZZ';
   	return moment(time, format).tz(zone).format(format);
}