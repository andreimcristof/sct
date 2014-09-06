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
        return Events.find({"startDate": {"$gte": new Date()}}, {limit:10, sort: {startDate: 1 }  }).fetch()
    }
});


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
        "startDate": {"$lte": pDate}, "endDate": {"$gte": pDate} 
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


