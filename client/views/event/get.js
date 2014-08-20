Template.allEvents.helpers({  
    allEvents: function() {    
      return Events.find();
    },

    eventsBySelectedDate: function(selectedDate)
    {
      return Events.find({}, {sort: {startDate: 1 }  }).fetch()
    }
});

Template.upcomingEvents.helpers({  
     upcomingEvents: function() {    
        return Events.find({}, {limit:10, sort: {startDate: 1 }  }).fetch()
    }
});

Template.eventSubmit.rendered = function()
{
	$(function() {
    $( "#startDate" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#endDate" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
      }
    });

    $('#startTime').timepicker( {
      controlType: 'select',
      timeFormat: 'hh:mm tt'
    });

    $('#startTime').on('click', function(){
        if($(this).val() === "")
          $(this).val("12:00 am");
    });



    $('#endTime').timepicker({
      controlType: 'select',
      timeFormat: 'hh:mm tt'
    });

    $('#endTime').on('click', function(){
        if($(this).val() === "")
          $(this).val("12:00 am");
    });
  });
}

Template.allEvents.rendered = function()
{
	$('#eventCalendar').datepicker({
		numberOfMonths : 2,
		width: "100%", 
    beforeShowDay : colorCalendarByScheduleStatus,
    onSelect : loadEventForSelectedDate
	});

  function colorCalendarByScheduleStatus(date)
  {
    var newCssClass = IsEventClash(date) ? "busyEventDay" : "";
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
