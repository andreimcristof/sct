Template.allStrategies.helpers({  
		allStrategies: function(filter) {    
			return Strategies.find(filter, { sort: {name: -1 }, fields : { _id:0 } });
		},
		allRaces: function() {
			return Races.find();
		}
});

Template.allStrategies.rendered = function()
{
	var filter = GetLearnFilterFromUserSelection();
	var strategies = Template.allStrategies.allStrategies(filter).fetch();

	DrawDataTable(strategies);
}

Template.allStrategies.destroyed= function()
{
	var table = $('#tblAllStrategies').DataTable();
	if(table)
		table.destroy();
}

function RenderDatatableLearn()
{
	var filter = GetLearnFilterFromUserSelection();
	var strategies = Template.allStrategies.allStrategies(filter).fetch();

	DrawDataTable(strategies);
	
}

function DrawDataTable(strategies)
{
	var table = $('#tblAllStrategies').DataTable();
		
		var table = $('#tblAllStrategies').DataTable({
		bJQueryUI: true,
		"data": strategies,
        destroy:true,
        "createdRow": learnTableRowCreated,
        "fnDrawCallback":learnTableRenderCompleted,
       "aoColumns": [    
	        {
	            "mDataProp": "name"
	        },  
	        {
	            "mDataProp": "race"
	        },
	        {
	            "mDataProp": "wikilink"
	        }, 
	        {
	            "mDataProp": "videoLink"
	        }
        ]
    });
 
    table.draw();
}

function learnTableRenderCompleted()
{
	InitializeTooltipForLearnTableLiquipediaCells();
}

function learnTableRowCreated ( row, data, index )
{
	var nameCell = $(row.cells[0]);
	nameCell.addClass('learnTableNameCell');

	var liquipediaCell = $(row.cells[2]);
	var liquipediaLinkText = liquipediaCell.html();
	var liquipediaFormatttedLink = "<div class='learnTableLiquipediaCell' wikilink='" + liquipediaLinkText + "'><a href='" + liquipediaLinkText + "'>Build details</a></div>";
	liquipediaCell.html(liquipediaFormatttedLink);
}

function GetLearnFilterFromUserSelection()
{
	var raceFilter = BuildFilterLearn(Template.searchFiltersLearn.learnRaceFilter(), "race");
	return raceFilter;
}


Meteor.autosubscribe(function()
{
	SearchFiltersLearn.find().observe({
		added: function(item)
		{
			RenderDatatableLearn()
		},

		removed: function(item)
		{
			RenderDatatableLearn();
		},
	})
})

function BuildFilterLearn(templateResult, prop)
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


	//helper function 
	function RemoveAllElementInCaseItExists(filter)
	{
		var allIndex = filter.indexOf("all");
		if(allIndex > -1)
			filter.splice(allIndex, 1);

		return filter;
	}
}

function InitializeTooltipForLearnTableLiquipediaCells()
{
	$('div.learnTableLiquipediaCell').each(function(){
		$(this).qtip({
			content:
			{
				text: "Loading build details...",
				ajax: {					
					url: $(this).attr("wikilink"),
					type: 'GET',
					/*headers: { 
						'Access-Control-Allow-Origin': '*',
						'Content-Type':'text/plain'
					 },
					crossDomain: true,
					data: {},
					datatype: 'jsonp',*/
					success: function(data, status) {
             		   this.set('content.text', data);
            		},
            		error: function(data, status) {
             		   this.set('content.text', "Cannot load. Click link directly, to see this strategy");
            		}
				}		
			},
			style: {height: 140, width: 200, classes: 'qtip-pos-bc qtip qtip-blue qtip-rounded qtip-shadow'},
			show: { delay: 0 },
			hide: { fixed : true }
		});
	});

	
}