Template.allStrategies.helpers({  
		allStrategies: function(filter) {    
			//return Strategies.find(filter, { sort: {name: -1 }, fields : { _id:0 } });
			return Strategies.find(filter, { sort: {name: -1 } });
		},
		allRaces: function() {
			return Races.find();
		},
		allBestAgainst: function() {
			return Bestagainst.find();
		}
});

Template.allStrategies.rendered = function()
{
	RenderDatatableLearn();
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
	            "mDataProp": "name", "width": "30%"
	        },  
	        {
	            "mDataProp": "race", "width": "8%"
	        },
	        {
	            "mDataProp": "bestagainst", "width": "11%"
	        },
	        {
	            //"mDataProp": "wikilink", "width": "15%"
	            "mDataProp": "_id", "width": "15%"
	        }, 
	        {
	            "mDataProp": "videoLink", "width": "15%"
	        }
        ]
    });
 
    table.draw();
}

function learnTableRenderCompleted()
{
	InitializeTooltipForLearnTableVideoCells();
	$('#tblAllStrategies_filter.dataTables_filter input').attr('placeholder', 'Type strategy name');
}

function learnTableRowCreated ( row, data, index )
{
	var nameCell = $(row.cells[0]);
	nameCell.addClass('learnTableNameCell');


	var detailsCell = $(row.cells[3]);
	var strategyId = detailsCell.html();
	var detailsLink = "<div class='learnTableLiquipediaCell' wikilink='" + strategyId + "'><a href='" + Router.routes['strategy'].path({_id: strategyId}) + "'>Details</a></div>";
	detailsCell.html(detailsLink);


	var videoCell = $(row.cells[4]);
	var videoLink = videoCell.html();
	var videoFormatttedLink = "<div class='learnTableVideoCell' videolink='" + videoLink + "'><a target='_blank' href='" + videoLink + "'>Watch video</a></div>";
	videoCell.html(videoFormatttedLink);
}

function GetLearnFilterFromUserSelection()
{
	var raceFilter = BuildFilterLearn(Template.searchFiltersLearn.learnRaceFilter(), "race");
	var bestagainstFilter = BuildFilterLearn(Template.searchFiltersLearn.learnBestAgainstFilter(), "bestagainst");

	var combinedFilter = [raceFilter, bestagainstFilter];
	var jsonResult = ({$and : combinedFilter});
	return jsonResult;
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
		if(prop === "bestagainst")
			filterArr.push({ bestagainst : rawFilter[i] });
		else if (prop === "race")
			filterArr.push({ race : rawFilter[i] });
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

function InitializeTooltipForLearnTableVideoCells()
{
	$('div.learnTableVideoCell').each(function(){
		$(this).qtip({
			content:
			{
				text: "<iframe width='460' height='250' src='" + FormatVideoLink($(this).attr("videolink")) + "' frameborder='0' allowfullscreen='true' allowscriptaccess='true'></iframe>"	
			},
			style: {height: 260, width: {min:600}, classes: 'qtip-blue qtip-rounded qtipLearnVideo'},
			show: { delay: 0 },
			hide: { fixed : true },
			position : {
			    my : 'right center',
			    at : 'left center',
				adjust : {
					x:60
				}
			}
		});
	});

	function FormatVideoLink(link)
	{
		var videoId = youtube_parser(link);
		var iframeFormattedYtbLink = "http://www.youtube.com/embed/" + videoId  +  "?autoplay=1";
		return iframeFormattedYtbLink;
	}

	function youtube_parser(url){
	    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match && match[2].length == 11) {
		  return match[2];
		} else {
			return url;
		}
	}
}