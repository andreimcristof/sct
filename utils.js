Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toDateString()
});

Handlebars.registerHelper("readableMomentDate", function(pDate) {
    return moment(pDate).format("dddd, MMMM Do YYYY");
});

Handlebars.registerHelper("toMomentDateAndTime", function(timestamp) {
	return moment(timestamp).format("dddd, MMMM Do YYYY, hh:mm a");
	;
});


replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

Handlebars.registerHelper("toShortened", function(eventTitle) {
    var maxTitleLength = 40;

    if(eventTitle.length > maxTitleLength)
    	return eventTitle.substring(0, maxTitleLength) + "...";
    else
    	return eventTitle;
});

EventPageGlobals =
{
    EventCountdownTimer : null   
};


Handlebars.registerHelper("countDownUntilDate", function(eventStartDate, eventEndDate, containerClientId){

	var endDateTimeOfCounter = moment(eventStartDate).toDate();
	var eventEndsOnDate = moment(eventEndDate).toDate();
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    function showRemaining() {
        var now = new Date();
        var distance = endDateTimeOfCounter - now;
        if (distance < 0) {

            clearInterval(EventPageGlobals.EventCountdownTimer);

            var distanceToEventEnd = eventEndsOnDate - now;
            if(distanceToEventEnd < 0)
				document.getElementById(containerClientId).innerHTML = 'Event has finished.';            	
			else
            	document.getElementById(containerClientId).innerHTML = 'Event is currently running!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(containerClientId).innerHTML = days + ' days, ';
        document.getElementById(containerClientId).innerHTML += hours + ' hrs, ';
        document.getElementById(containerClientId).innerHTML += minutes + ' min, ';
        document.getElementById(containerClientId).innerHTML += seconds + ' sec ';
    }

    EventPageGlobals.EventCountdownTimer = setInterval(showRemaining, 1000);
});

Handlebars.registerHelper("convertUTCDateToReadableFormatInUserTimezone", function(utcDate, timezone) {
		var userTimezonedDate;

		switch(timezone)
		{
			case "EDT":
			{
				userTimezonedDate = moment.tz(utcDate, "America/New_York");
				break;
			}
			case "CEST":
			{
				userTimezonedDate = moment.tz(utcDate, "Europe/Berlin");
				break;
			}
			case "KST":
			{
				userTimezonedDate = moment.tz(utcDate, "Asia/Seoul");
				break;
			}
			case "CST":
			{
				userTimezonedDate = moment.tz(utcDate, "Asia/Shanghai");
				break;
			}
		}
		return userTimezonedDate.format("dddd, MMMM Do YYYY, HH:mm a");
});


