
RenderPlaypalD3 = function(dataAllPlaypals) {

	function server(d) { return d.server; }
	function race(d) { return d.race; }
	function league(d) { return d.league; }
	function bnetid(d) { return d.bnetid; }
	function profileurl(d) { return d.profileurl; }

	//protoss 9c893d
	//terran 344bbb
	//zerg ba66be

	var RaceColors = 
	{
		Terran: "#344bbb",
		Zerg: "#ba66be",
		Protoss: "#e7cb4e"
	}

	function colorByRace(d) { 

		var color = "#fff";

		switch(d.race)
		{
			case "Terran":
				color = RaceColors.Terran;
			break;

			case "Protoss":
				color= RaceColors.Protoss;
			break;

			case "Zerg":
				color= RaceColors.Zerg;
			break;
		}
		return color;
	}

	var width = 860,
	    height = 300;

	var svg = d3.select('#resultsVisualizer')
	    .append('svg')
	    .attr('width', width)
	    .attr('height', height);

	var node, link;

	var voronoi = d3.geom.voronoi()
	    .x(function(d) { return d.x; })
	    .y(function(d) { return d.y; })
	    .clipExtent([[-10, -10], [width+10, height+10]]);

	function recenterVoronoi(nodes) {
	    var shapes = [];
	    voronoi(nodes).forEach(function(d) {
	        if (!d.length ) return;
	        var n = [];
	        d.forEach(function(c){
	            n.push([ c[0] - d.point.x, c[1] - d.point.y ]);
	        });
	        n.point = d.point;
	        shapes.push(n);
	    });
	    return shapes;
	}

	var force = d3.layout.force()
	    .charge(-2000)
	    .friction(0.3)
	    .linkDistance(50)
	    .size([width, height]);

	force.on('tick', function() {
	    node.attr('transform', function(d) { return 'translate('+d.x+','+d.y+')'; })
	        .attr('clip-path', function(d) { return 'url(#clip-'+d.index+')'; });

	    var clip = svg.selectAll('.clip')
	        .data( recenterVoronoi(node.data()), function(d) { return d.point.index; } );

	    clip.enter().append('clipPath')
	        .attr('id', function(d) { return 'clip-'+d.point.index; })
	        .attr('class', 'clip');
	    clip.exit().remove()

	    clip.selectAll('path').remove();
	    clip.append('path')
	        .attr('d', function(d) { return 'M'+d.join(',')+'Z'; });
	});

	data  = JSON.parse(dataAllPlaypals);

	    data.forEach(function(d, i) {
	        d.id = i;
	    });

	    node = svg.selectAll('.nodePlaypal')
	        .data( data )
	      	.enter()
	      		.append('g')
	        		.attr('class', 'nodePlaypal')
			       /* .attr('server', server)
	    		    .attr('bnetid', bnetid)
	        		.attr('league', league)
	        		.attr('race', race)
	        		.attr('profileurl', profileurl)*/
				
	        .call( force.drag )
	        .on("mouseover", playpalNodeHoverCallback)

	    node.append('circle')
		        .attr('r', 30)
	        	.attr('fill', colorByRace)
		        .attr('fill-opacity', 1)			
	     
	     node.append("image")
    		.attr("xlink:href", function(d){ return imageByRace(d);})			
	       	.attr("x", -15)
      		.attr("y", -15)
      		.attr("width", 30)
      		.attr("height", 30) 
        
         //node.append("span")
         //	.text(function(d) { return d.bnetid;})

         node.append("text")
      		.attr("x", -25)
      		.attr('class', 'nodePlaypalText')
      		.attr("y", 40)
      .text(function(d) { return d.bnetid });

	    force
	        .nodes( data )
	        .start();


	function imageByRace(d)
	{
		var imageSrc = "";
		
		switch(d.race)
		{
			case "Terran":
			imageSrc = "images/Ticon_small.png";
			break;
			case "Protoss":
			imageSrc = "images/Picon_small.png";
			break;
			case "Zerg":
			imageSrc = "images/Zicon_small.png";
			break;
		}
		return imageSrc;
	}

	function playpalNodeHoverCallback(data,index)
	{ 
		
		//console.log(d3.select(this)[0]);
	}		
}