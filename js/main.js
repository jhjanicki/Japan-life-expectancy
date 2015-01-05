var w = 925,
    h = 550,
    margin = 30,
    startAge = 60,
    endAge = 90,
    startYear = 1960,
    endYear = 2011,
    y = d3.scale.linear().domain([endAge, startAge]).range([0 + margin, h - margin]),
    x = d3.scale.linear().domain([1960, 2011]).range([0 + margin , w-margin]),
    years = d3.range(startYear, endYear);

var currData =
[{"x":"1960","y":"70.14"},
{"x":"1961","y":"70.83"},
{"x":"1962","y":"71.12"},
{"x":"1963","y":"72.26"},
{"x":"1964","y":"72.76"},
{"x":"1965","y":"72.85"},
{"x":"1966","y":"73.65"},
{"x":"1967","y":"73.94"},
{"x":"1968","y":"74.29"},
{"x":"1969","y":"74.62"},
{"x":"1970","y":"74.67"},
{"x":"1971","y":"75.49"},
{"x":"1972","y":"75.96"},
{"x":"1973","y":"75.96"},
{"x":"1974","y":"76.33"},
{"x":"1975","y":"76.85"},
{"x":"1976","y":"77.27"},
{"x":"1977","y":"77.86"},
{"x":"1978","y":"78.21"},
{"x":"1979","y":"78.75"},
{"x":"1980","y":"78.75"},
{"x":"1981","y":"79.17"},
{"x":"1982","y":"79.74"},
{"x":"1983","y":"79.84"},
{"x":"1984","y":"80.29"},
{"x":"1985","y":"80.57"},
{"x":"1986","y":"81.02"},
{"x":"1987","y":"81.48"},
{"x":"1988","y":"81.37"},
{"x":"1989","y":"81.84"},
{"x":"1990","y":"81.91"},
{"x":"1991","y":"82.22"},
{"x":"1992","y":"82.35"},
{"x":"1993","y":"82.5"},
{"x":"1994","y":"82.96"},
{"x":"1995","y":"82.84"},
{"x":"1996","y":"83.55"},
{"x":"1997","y":"83.82"},
{"x":"1998","y":"84.01"},
{"x":"1999","y":"83.9"},
{"x":"2000","y":"84.6"},
{"x":"2001","y":"84.9"},
{"x":"2002","y":"85.2"},
{"x":"2003","y":"85.33"},
{"x":"2004","y":"85.59"},
{"x":"2005","y":"85.49"},
{"x":"2006","y":"85.81"},
{"x":"2007","y":"85.99"},
{"x":"2008","y":"86.05"},
{"x":"2009","y":"86.44"},
{"x":"2010","y":"86.3"},
{"x":"2011","y":"85.9"}];


var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-50, 0])
	.html(function(d) {
	    return "Year: <strong>" + d.x +
                " </strong><br> Life Expectancy: <br>" +
		d.y + " <br>";
	});
	

    
    var vis = d3.select("#vis").append("svg:svg").attr("width", w).attr("height", h).style("background-color","white").append("svg:g");
   
   console.log("before");
   
   vis.call(tip);
   
    var line= d3.svg.line().x(function(d,i) {
    console.log(x(d.x));
    	console.log('Plotting X value for data point: ' + d.x+" " +d.y+ ' using index: ' + i + ' to be at: ' + x(d.x) + ' using our xScale.');
    	return x(d.x);
	}).y(function(d) {
	    return y(d.y);
	});
	
	console.log("after");

	vis.append("svg:path")/* .data(currData) */.attr("d", line(currData))/* .on("mouseover", onmouseover).on("mouseout", onmouseout) */;
	
	vis.selectAll(".dot")
	  .data(currData)
	  .enter().append("circle")
	  .attr('class', 'datapoint')
	  .attr('cx', function(d) { return x(d.x); })
	  .attr('cy', function(d) { return y(d.y); })
	  .attr('r', 4)
	  .attr('fill', 'white')
	  .attr('stroke', 'black')
	  .attr('stroke-width', '1')
	  .on('mouseover', tip.show)
	  .on('mouseout', tip.hide);
	
	vis.append("svg:line").attr("x1", x(1960)).attr("y1", y(startAge)).attr("x2", x(2011)).attr("y2", y(startAge)).attr("class", "axis");
	//(0,0),(xmax,0) draw x-axis
vis.append("svg:line").attr("x1", x(startYear)).attr("y1", y(startAge)).attr("x2", x(startYear)).attr("y2", y(endAge)).attr("class", "axis");
//(0,0),(0,yamx) draw y-axis


vis.selectAll(".xLabel").data(x.ticks(4)).enter().append("svg:text").attr("class", "xLabel").text(String).attr("x", function(d) {
    return x(d)
}).attr("y", h - 10).attr("text-anchor", "middle").style('font-family','Dosis');

vis.selectAll(".yLabel").data(y.ticks(4)).enter().append("svg:text").attr("class", "yLabel").text(String).attr("x", 0).attr("y", function(d) {
    return y(d)
}).attr("text-anchor", "right").attr("dy", 3).style('font-family','Dosis');;

vis.selectAll(".xTicks").data(x.ticks(4)).enter().append("svg:line").attr("class", "xTicks").attr("x1", function(d) {
    return x(d);
}).attr("y1", y(startAge)).attr("x2", function(d) {
    return x(d);
}).attr("y2", y(startAge) + 7);


vis.selectAll(".yTicks").data(y.ticks(4)).enter().append("svg:line").attr("class", "yTicks").attr("y1", function(d) {
    return y(d);
}).attr("x1", x(1959.5)).attr("y2", function(d) {
    return y(d);
}).attr("x2", x(1960));
//1959.5 to get the little tick to the left of the y-axis

function onmouseover(d, i) {
    var currClass = d3.select(this).attr("class");
    d3.select(this).attr("class", currClass + " current");
    }

function onmouseout(d, i) {
    var currClass = d3.select(this).attr("class");
    var prevClass = currClass.substring(0, currClass.length - 8);
    d3.select(this).attr("class", prevClass);
}




	