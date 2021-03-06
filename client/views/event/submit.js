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
			imageUrl: ImgUrlHelper.ResizeToLarge($('#bannerUploadResultHidden').val()),
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
				console.log(error);
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


Template.eventSubmit.destroyed = function() {
  if(Errors.find().count() > 0)
    {
      Errors.remove({});
    }
};

Template.eventSubmit.rendered = function() {
	$(function() {
    $( "#startDate" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      minDate: 0, 
      onClose: CheckEventClashAndSetStartDate
    });
    $( "#endDate" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      minDate: 0,
      onClose: CheckEventClashAndSetEndDate
    });

    $('#startTime').timepicker( {
      controlType: 'select',
      stepMinute: 15,
      timeFormat: 'HH:mm',
      onSelect: SetStartTime
    });
    $('#startTime').on('click', function(){
        if($(this).val() === "")
          $(this).val("00:00");
    });

    $('#endTime').timepicker({
      controlType: 'select',
      stepMinute: 15,
      timeFormat: 'HH:mm',
      onSelect: SetEndTime
    });
    $('#endTime').on('click', function(){
        if($(this).val() === "")
          $(this).val("00:00");
    });
  });
}

function SetStartTime(dateTimeText, instance)
{
 if(SameDateSelected())
  $( "#endTime" ).timepicker( "option", "hourMin", instance.hour + 1 );
}

function SetEndTime(dateTimeText, instance)
{
  if(SameDateSelected())
    $( "#startTime" ).timepicker( "option", "hourMax", instance.hour );
}

function SameDateSelected()
{
  var isSame = $('#startDate').val() === $('#endDate').val();
  
  return isSame;
}

function CheckEventClashAndSetEndDate(selectedDate){
	$( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
	
  CheckEventClashByDate(selectedDate);
}

function CheckEventClashAndSetStartDate(selectedDate){
  $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
	
  CheckEventClashByDate(selectedDate);  	
}

function CheckEventClashByDate(selectedDate){
	var hasStartDate = $('#startDate').val().length > 0;
	var hasEndDate = $('#endDate').val().length > 0;

	if(hasStartDate && hasEndDate)
	{
		var startD = $('#startDate').datepicker( "getDate" );
		var endD = $('#endDate').datepicker( "getDate" );

		var eventsForDate = getEventsForDateInterval(startD, endD);	

		var eventNames = [];
		eventsForDate.fetch().forEach(function(evt) {
   			eventNames.push(evt.title);
		});

		var  eventCount = eventsForDate.count();
		if(eventCount > 0){
		 	var clashDetailMessage = "The dates you have chosen will coincide with following events:<br/> <strong>"  + eventNames.join(", ") + "</strong>.";
		 	ShowClashMessage(clashDetailMessage);
		}
	}
}

function getEventsForDateInterval(startD, endD){

  var eventsInInterval = Events.find
  (
      {
        "startDate": {"$gte": startD}, "endDate": {"$lte": endD} 
      }
  );
       
  return eventsInInterval;
}

function ShowClashMessage(msg){

  bootbox.dialog({
  message: "<i class='fa fa-warning fa-6' style='font-size:xx-large;float:left;margin-right:20px;'></i>" + msg,
  title: "Warning",
  buttons: {
    
    danger: {
      label: "Reset Dates",
      className: "btn-danger",
      callback: function() {
      	$('#startDate').val('');
        $('#startTime').val('');

        $('#endDate').val('');
        $('#endTime').val('');
      }
    },
    main: {
      label: "It's OK",
      className: "btn-primary",
      callback: function() {
     	   
      }
    }
  }
});
}