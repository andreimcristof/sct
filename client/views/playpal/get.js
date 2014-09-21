Template.allPlaypals.helpers({  
		allPlaypals: function(filter) {    
			return Playpals.find(filter, {sort: {submitted: -1 }  });
		},

		ownPlaypal: function() 	{    
			return Playpals.findOne({"submitter":Meteor.userId() });
		},

		allServers: function()	{
			return Servers.find();
		}, 

		allLeagues: function()	{
			return Leagues.find();
		},

		allRaces: function() {
			return Races.find();
		}
});

Template.allPlaypals.events({  
	 'click #btnRemoveMyPlaypalProfile' : function(e)
	 {
	 	e.preventDefault();
	 	var msg = "Are you sure? Other players will no longer be able to find you. However, you can add yourself again later to the list.";
	 	ConfirmMyPlaypalDeletion(msg);
	 }
});

function ConfirmMyPlaypalDeletion(msg){

  bootbox.dialog({
  message: "<i class='fa fa-warning fa-6' style='font-size:xx-large;float:left;margin-right:20px;'></i>" + msg,
  title: "Warning",
  buttons: {
    
    danger: {
      label: "No, I changed my mind",
      className: "btn-danger",
      callback: function() {
      	
      }
    },
    main: {
      label: "Yes, I'm sure",
      className: "btn-primary",
      callback: function() {
     	 RemoveMyPlaypal();  
      }
    }
  }
});
}

function RemoveMyPlaypal()
{
	Meteor.call('deleteMyPlaypal', function(error, id){
		if(error)
		{
			console.log(error);
			return;
		}
		
		RerenderPlaypalGraphicAfterFilterChange();
	});
}

Template.allPlaypals.destroyed = function(){
	if(ReactiveMonthTrigger)
		ReactiveMonthTrigger.stop();
}
Template.allPlaypals.rendered = function()
{
	RenderDatePickerFunctionality();
	ActivateReactiveTriggerOnMonthChange();
}


var ReactiveMonthTrigger;
function ActivateReactiveTriggerOnMonthChange(){
	ReactiveMonthTrigger = Deps.autorun(function(){
		Playpals.find();
		RerenderPlaypalGraphicAfterFilterChange();
		InitializeTooltipForNodes();			
	});
}

function RenderDatePickerFunctionality(){
	$('#playpalMonthSelector').datepicker( {
        changeMonth: true,
        changeYear: false,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        onClose: function(dateText, inst) { 
        },
        onSelect: function(dateText, inst){
        },
        onChangeMonthYear: function(year, month, inst){
   		  var newDate = new Date(year, month-1, 1);
   		  $(this).datepicker( "setDate",  newDate);
   		  RenderMonthYearInContainer(newDate);
  		}
    });
	
    var today= new Date();
    var newDate = new Date(today.getFullYear(), today.getMonth(), 1);
   	$('#playpalMonthSelector').datepicker( "setDate",  newDate);
   	 RenderMonthYearInContainer(newDate);

    $('.btnForwardMonth').on('click', function(e){
    	$('#ui-datepicker-div').find('.ui-datepicker-next').click();
		GetNewPlaypalsFromGivenDate();
    });
		
	$('.btnBackwardMonth').on('click', function(e){
    	$('#ui-datepicker-div').find('.ui-datepicker-prev').click();
    	GetNewPlaypalsFromGivenDate();
    });

    function RenderMonthYearInContainer(pDate){
		var monthWithYear = moment(pDate).format('MMMM YYYY');     
	    $('#monthYearSelected').text(monthWithYear);
	}
}

function GetNewPlaypalsFromGivenDate(){
	var selectedDate = new Date($('#playpalMonthSelector').datepicker()[0].value);
	 Session.set("selectedPlaypalDate", selectedDate);
}

Meteor.autosubscribe(function()
{
	SearchFiltersPlaypal.find().observe({
		added: function(item)
		{
			RerenderPlaypalGraphicAfterFilterChange();
			InitializeTooltipForNodes();
		},

		removed: function(item)
		{
			RerenderPlaypalGraphicAfterFilterChange();
			InitializeTooltipForNodes();
		}
	})
})


function RerenderPlaypalGraphicAfterFilterChange()
{
	var GetSearchFilterPlaypal = function()
	{
		var filter = GetCumulatedFilterFromUserSelection();
		var selectedDate = $('#playpalMonthSelector').datepicker()[0];
		var data = Template.allPlaypals.allPlaypals(filter).fetch();
		
		if(typeof selectedDate !== "undefined")
		{
			var pDate = new Date(selectedDate.value);
			var thisMonth = pDate.getMonth();
			var thisYear = pDate.getFullYear();
			var ownPlaypal = Template.allPlaypals.ownPlaypal();
			if(typeof ownPlaypal !== "undefined")
			{
				var ownPlaypalMonth = ownPlaypal.submitted.getMonth();
				var ownPlaypalYear = ownPlaypal.submitted.getFullYear();
				var needsRemoval = ((thisYear !== ownPlaypalYear) || (thisYear === ownPlaypalYear &&thisMonth !== ownPlaypalMonth));

				if(!needsRemoval)
					data =  Template.allPlaypals.allPlaypals(filter).fetch();
				else
				{
					var removeOwnFilter = {"submitter": {$not:Meteor.userId()}}; 
					var withoutOwnPlaypalFilter = {$and: [filter, removeOwnFilter]}
					data =  Template.allPlaypals.allPlaypals(withoutOwnPlaypalFilter).fetch();
				}
			}
		}
		var dataAllPlaypalsForSelectedMonth = JSON.stringify(data);
		return dataAllPlaypalsForSelectedMonth;	
	}

	var filteredData = GetSearchFilterPlaypal();

	$('#resultsVisualizer').empty();
	RenderPlaypalD3(filteredData);
}

var InitializeTooltipForNodes  = function()
{
	$('#resultsVisualizer g.nodePlaypal').each(function(){
		$(this).qtip({
			content:
			{
				text: "<div> \
					<h5>BattleNet ID: " + d3.select(this)[0][0].__data__.bnetid + "</h5> \
					<strong><a href='" + d3.select(this)[0][0].__data__.profileurl + "' target='_blank'>See BattleNet profile</a></strong> \
					<br /><br /> \
					Server: <strong>" + d3.select(this)[0][0].__data__.server + "</strong> \
					<br /><br /> \
					League: <strong>" + d3.select(this)[0][0].__data__.league + "</strong> \
					<br /><br /> \
					Race: <strong>" + d3.select(this)[0][0].__data__.race + "</strong> \
					<br /><br /> \
					<strong><a href='/playpal/" + d3.select(this)[0][0].__data__._id + "' target='_blank'>Contact player</a></strong> \
					<br /><br /> \
					</div>" 
			},
			style: {height: 170, width: 200, classes: 'qtip-pos-rt qtip qtip-blue qtip-rounded qtip-shadow'},
			  position: {
			        viewport: $(window)
			    },
			show: { delay: 0 },
			hide: { delay: 200, fixed : true }
		});
	});

	
}

function GetCumulatedFilterFromUserSelection()
{
	var serverFilter = BuildFilterPlaypal(Template.searchFiltersPlaypal.playpalServerFilter(), "server");
	var leagueFilter = BuildFilterPlaypal(Template.searchFiltersPlaypal.playpalLeagueFilter(), "league");
	var raceFilter = BuildFilterPlaypal(Template.searchFiltersPlaypal.playpalRaceFilter(), "race");

	var combinedFilter = [serverFilter, leagueFilter, raceFilter];
	var jsonResult = ({$and : combinedFilter});
	return jsonResult;
}

function BuildFilterPlaypal(templateResult, prop)
{
	var rawFilter = templateResult.split(", ");

	rawFilter = RemoveAllElementInCaseItExists(rawFilter);
	
	if(rawFilter.length == 0)
	{
		return ({});
	}

	var filterArr = [];
	
	for(var i = 0; i < rawFilter.length; i++)
	{
		if(prop === "server")
			filterArr.push({ server : rawFilter[i] });
		else if (prop === "race")
			filterArr.push({ race : rawFilter[i] });
		else if (prop === "league")
			filterArr.push({ league : rawFilter[i] });
	}

	var jsonResult = ({$or : filterArr});
	return jsonResult;

	function RemoveAllElementInCaseItExists(filter)
	{
		var allIndex = filter.indexOf("all");
		if(allIndex > -1)
			filter.splice(allIndex, 1);

		return filter;
	}
}
