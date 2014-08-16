Template.eventSubmit.rendered = function()
{
	$(function() {
    $( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });
}

Template.allEvents.rendered = function()
{
	$('#eventCalendar').datepicker({
		numberOfMonths : 3,
		width: "100%", 
    beforeShowDay : colorCalendarByScheduleStatus,
    onSelect : loadEventForSelectedDate
	});

  function colorCalendarByScheduleStatus(date)
  {
    var newCssClass = IsEventClash(date) ? CalendarEventColorsCss.Busy : CalendarEventColorsCss.Free;
    var selectable = true;
    var tooltip = "";
    var returnValue = [selectable, newCssClass, tooltip]
    return returnValue;
  }

  function loadEventForSelectedDate(date, inst)
  {
      
  }

  function IsEventClash(date)
  {
    //check event clash here.
    //check an array of events saved as json with key as unix date
    return true;
  }
}

var CalendarEventColorsCss = 
  {
    Busy : "busyEventDay",
    Free: "freeEventDay"
  }