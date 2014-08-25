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
      stepMinute: 15,
      timeFormat: 'HH:mm'
    });

    $('#startTime').on('click', function(){
        if($(this).val() === "")
          $(this).val("00:00");
    });



    $('#endTime').timepicker({
      controlType: 'select',
      hourGrid: 4,
      stepMinute: 15,
      timeFormat: 'HH:mm'
    });

    $('#endTime').on('click', function(){
        if($(this).val() === "")
          $(this).val("00:00");
    });
  });
}

Template.allEvents.rendered = function()
{
	$('#eventCalendar').datepicker({
		numberOfMonths : 2,
		width: "100%", 
    beforeShowDay : colorCalendarByScheduleStatus,
    onSelect : loadEventForSelectedDateInEventDetailView
	});

  function colorCalendarByScheduleStatus(date)
  {
    
    var cnt = getEventsForDate(date).count();
    
    
    var newCssClass = cnt > 0 ? "busyEventDay" : "";
    var selectable = true;
    var tooltip = "";
    var returnValue = [selectable, newCssClass, tooltip]
    return returnValue;
  }

  function loadEventForSelectedDateInEventDetailView(date, inst)
  {
      var pDate = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
      
      var container = $('#selectedEventsContainer');
      container.empty();

      UI.insert(UI.renderWithData(Template.selectedEvents, {param: pDate}), container[0]);
  };
}

Template.event.destroyed= function(){
  clearInterval(EventPageGlobals.EventCountdownTimer);
}

function getEventsForDate(pDate) {
  
  var eventsOnThatDate = Events.find
  (
      {
        "startDate": {"$lt": pDate}, "endDate": {"$gte": pDate} 
      }
  );
       
  return eventsOnThatDate;
}


Template.selectedEvents.helpers({  
    selectedEvents: function(pDate) {    
      var eventsOnDate = getEventsForDate(pDate);

      return eventsOnDate;
    }
});
