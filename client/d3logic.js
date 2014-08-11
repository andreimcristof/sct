
RenderPlaypalD3 = function(dataAllPlaypals) {

	function server(d) { return d.server; }
	function race(d) { return d.race; }
	function league(d) { return d.league; }
	function bnetid(d) { return d.bnetid; }
	function profileurl(d) { return d.profileurl; }

	var color = d3.scale.category10();
	function colorByRace(d) { return color(race(d)); }

	var width = 960,
	    height = 500;

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
	      	.enter().append('g')
	        .attr('class', 'nodePlaypal')
	        .attr('server', server)
	        .attr('bnetid', bnetid)
	        .attr('league', league)
	        .attr('race', race)
	        .attr('profileurl', profileurl)
	        .call( force.drag )
	        .on("mouseover", playpalNodeHoverCallback)

	    node.append('circle')
	        .attr('r', 30)
	        .attr('fill', colorByRace)
	        .attr('fill-opacity', 0.5);

	    node.append('circle')
	        .attr('r', 4)
	        .attr('stroke', 'black');

	    force
	        .nodes( data )
	       	// .links( data.links )
	        .start();

	function playpalNodeHoverCallback(data,index)
	{ 
		
		//console.log(d3.select(this)[0]);
	}		
}