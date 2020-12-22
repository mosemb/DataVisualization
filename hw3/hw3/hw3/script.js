// Global var for FIFA world cup data
var allWorldCupData;
var projection;
var yearsarray;
var teamarray; 
var worldcup_attendance; 
var worldcup_matches;
var worldcup_goals;


/**
 * Render and update the bar chart based on the selection of the data type in the drop-down box
 *
 * @param selectedDimension a string specifying which dimension to render in the bar chart
 */
function createBarChart(data) {

    //var svgBounds = d3.select("#barChart")
    //var xpad = 100;
    //var ypad = 70;

    d3.select('svg').selectAll('*').remove();

    const svg = d3.select("#barChart")

    //d3.select('svg').selectAll('*').remove();

    //const svg = d3.select("#bar")

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    var maxValue = d3.max(data);

    //const width = 500
    //svg.attr('width');
    //const height = 400
   // svg.attr('height');
    //var maxValue = d3.max(data);

    const margin = { top: 45, bottom: 45, left: 45, right: 45 };
    //console.log(width)
    //console.log(maxValue)

//const svg = d3.select('#d3-container')

  svg.append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  //.attr("viewBox", [0, 0, width, height]);

 
const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

  //console.log(x.domain())
  //console.log(x.range())

 

   
const y = d3.scaleLinear()
  .domain([0, maxValue])
  .range([height - margin.bottom, margin.top])

//console.log(y.domain())
//console.log(y.range())

 

  
svg.append("g")
.attr("fill", 'darkblue')
.selectAll("rect")
.data(data)
.enter()
.append('rect')
.attr("x", (d, i) => x(i))
.attr("y", d => y(d))
.attr('title', (d) => d)
.attr("class", "rect")
.attr("height", d => y(0) - y(d))
.attr("width", x.bandwidth())
.on("mouseover", function(d) {
    d3.select(this).attr("r", 10).style("fill", "red");
  })
.on("mouseout", function(d) {
    d3.select(this).attr("r", 5.5).style("fill", "darkblue");
  })
.on("click", function(d,i) {

    d3.select('#edition').select('text').remove()
    //d3.select('#host').select('text').remove()
    //d3.select('#winner').select('text').remove()
    //d3.select('#silver').select('text').remove()
    //d3.select('#teams').selectAll('*').remove();
    //d3.select('#teams').selectAll(null).data(res.sort()).enter().append('p').append('li').remove()
    //console.log(d);
    //console.log(yearsarray[i])
    //console.log(i)
    var hosts = allWorldCupData.map( function(d){
        return d.host

    })

    console.log(hosts)
    console.log(yearsarray)

    var winners = allWorldCupData.map(function(d){
        return d.winner
    })

    var winner;
    var w; 
    for(w=0; w<winners.length; w++){
        if(i===w){
            

            winner = winners[w]
        }
    }

    console.log(i)

    var runnerUp = allWorldCupData.map(function(d){
        return d.runner_up
    })
    //console.log(runnerUp)

    var silver; 
    var s; 
    for(s=0; s<runnerUp.length; s++){
        if(i===s){
            silver = runnerUp[s]
        }
    }

    var teamnames = allWorldCupData.map(function(d){
        return d.TEAM_NAMES
    })
    
    var teams;
    var t; 
    for(t=0; t<teamnames.length; t++){

        if(i===t){
            teams = teamnames[t]
        }
    }

    //console.log(teamnames.length)
    //console.log(teams)
    //var res = teams.split(",");
    //console.log(res)
    

    var j;
    var host_j;

    for(j=0; j<hosts.length; j++){
        if(i===j){
            host_j = hosts[j]
            //console.log(hosts[j]) 
        }
    }

  
  
    //console.log(hosts)
    d3.select('#edition').append('text').text(yearsarray[i]+" "+host_j)
    //d3.select('#host').append('text').text(host_j)
    //d3.select('#winner').append('text').text(winner)
    //d3.select('#silver').append('text').text(silver)
    //d3.select('#teams').selectAll(null).data(res).enter().append('p').append('li').text(function(d){return d})


    //console.log(res)
    
    })
    .style("margin-top", "10px")
    .append("title")
    .text(function(d,i) {
        return yearsarray[i]+" World Cup Click to \nView Host, Winner & Teams";
         });




function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .attr("font-size", '11px')
  }
  

  //console.log(data)

  

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => yearsarray[i]))
      .attr("font-size", '12px')
      .selectAll("text") // Properties for the labels
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(450)")
      .style("text-anchor", "start")
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node(); 

  //console.log(yearsarray)
  //


    //console.log(selectedDimension)

    // ******* TODO: PART I *******

    // Create the x and y scales; make
    // sure to leave room for the axes

    // Create colorScale

    // Create the axes (hint: use #xAxis and #yAxis)

    // Create the bars (hint: use #bars)



    // ******* TODO: PART II *******

    // Implement how the bars respond to click events
    // Color the selected bar to indicate it has been selected.
    // Make sure only the selected bar has this new color.

    // Call the necessary update functions for when a user clicks on a bar.
    // Note: think about what you want to update when a different bar is selected.


}

/**
 *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
 *
 *  There are 4 attributes that can be selected:
 *  goals, matches, attendance and teams.
 */

 
function chooseData() {



    //console.log("You have clicked me ");
    
    // ******* TODO: PART I *******
    // Change the selected data when a user selects a different
    // menu item from the drop down.
 
    var dataFile = document.getElementById('dataset').value;  

    //console.log(dataFile)
    
    
    if(dataFile==='teams'){
        //console.log(team)
        createBarChart(teamarray)
        //test(teamarray)
       
    }else if (dataFile==='attendance') {
        //createBarChart(worldcup_attendance)
        //console.log(worldcup_matches)
        createBarChart(worldcup_attendance)

    } else if(dataFile==='matches') {
        //createBarChart(worldcup_matches)
        createBarChart(worldcup_matches)
        
    } else if(dataFile==='goals'){
        createBarChart(worldcup_goals)

        //createBarChart(worldcup_goals)

    }  

} 

/**
 * Update the info panel to show info about the currently selected world cup
 *
 * @param oneWorldCup the currently selected world cup
 */
function updateInfo(oneWorldCup) {

    // ******* TODO: PART III *******

    // Update the text elements in the infoBox to reflect:
    // World Cup Title, host, winner, runner_up, and all participating teams that year

    // Hint: For the list of teams, you can create an list element for each team.
    // Hint: Select the appropriate ids to update the text content.


}

/**
 * Renders and updates the map and the highlights on top of it
 *
 * @param the json data with the shape of all countries
 */
function drawMap(world) {

    //(note that projection is global!
    // updateMap() will need it to add the winner/runner_up markers.)

    projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    // ******* TODO: PART IV *******

    // Draw the background (country outlines; hint: use #map)
    // Make sure and add gridlines to the map

    // Hint: assign an id to each country path to make it easier to select afterwards
    // we suggest you use the variable in the data element's .id field to set the id

    // Make sure and give your paths the appropriate class (see the .css selectors at
    // the top of the provided html file)


}

/**
 * Clears the map
 */
function clearMap() {

    // ******* TODO: PART V*******
    //Clear the map of any colors/markers; You can do this with inline styling or by
    //defining a class style in styles.css

    //Hint: If you followed our suggestion of using classes to style
    //the colors and markers for hosts/teams/winners, you can use
    //d3 selection and .classed to set these classes on and off here.

}


/**
 * Update Map with info for a specific FIFA World Cup
 * @param the data for one specific world cup
 */
function updateMap(worldcupData) {

    //Clear any previous selections;
    clearMap();

    // ******* TODO: PART V *******

    // Add a marker for the winner and runner up to the map.

    //Hint: remember we have a conveniently labeled class called .winner
    // as well as a .silver. These have styling attributes for the two
    //markers.


    //Select the host country and change it's color accordingly.

    //Iterate through all participating teams and change their color as well.

    //We strongly suggest using classes to style the selected countries.



}

/* DATA LOADING */

// This is where execution begins; everything
// above this is just function definitions
// (nothing actually happens)
//Load in json data to make map

d3.json("data/world.json", function (error, world) {
    if (error) { 
        console.log(error);  //Log the error.
	throw error;
    }

    drawMap(world);
});




// Load CSV file



    
    d3.csv("data/fifa-world-cup.csv").then(
        function(csv){  
            csv.forEach(function (d) {
                // Convert numeric values to 'numbers'
                d.year = +d.YEAR;
                d.teams = +d.TEAMS;
                d.matches = +d.MATCHES;
                d.goals = +d.GOALS;
                d.avg_goals = +d.AVERAGE_GOALS;
                d.attendance = +d.AVERAGE_ATTENDANCE;
                //Lat and Lons of gold and silver medals teams
                d.win_pos = [+d.WIN_LON, +d.WIN_LAT];
                d.ru_pos = [+d.RUP_LON, +d.RUP_LAT];
        
                //Break up lists into javascript arrays
                d.teams_iso = d3.csvParse(d.TEAM_LIST).columns;
                d.teams_names = d3.csvParse(d.TEAM_NAMES).columns });
    
                    // Store csv data in a global variable
        allWorldCupData = csv;
        //console.log(allWorldCupData)

        var team = allWorldCupData.map(function(d){
            return d.teams
        });
        teamarray = team;
        //console.log(teamarray)

    
        var years = allWorldCupData.map(function(d){
            return d.YEAR
        }); 
        yearsarray = years;
        //console.log(yearsarray)

        var attendance = allWorldCupData.map(function(d){
                return d.attendance
            });
        worldcup_attendance = attendance;
        //console.log(worldcup_attendance)

        var matches = allWorldCupData.map(function(d){
            return d.matches
        });
        worldcup_matches = matches; 
        //console.log(worldcup_matches)
        
        
        var goal= allWorldCupData.map(function(d){
            return d.goals
        });
        worldcup_goals = goal;
        //console.log(worldcup_goals)   
        
            }
    
            //render(data)
           // console.log(allWorldCupData)
        
    ).catch((error)=>{
    
        console.log(error)
    } )


  

 /*

function test(data){

    d3.select('svg').selectAll('*').remove();

    const svg = d3.select("#bar-chart")

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    var maxValue = d3.max(data);

    const margin = { top: 45, bottom: 45, left: 45, right: 45 };
    console.log(width)
    console.log(data)

} */

function test(dataset){


//Width and height
d3.select('svg').selectAll('*').remove();

var w = 500;
var h = 400;

const margin = { top: 45, bottom: 45, left: 45, right: 45 };

//var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
               // 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

   //.attr('width', width - margin.left - margin.right)
  //.attr('height', height - margin.top - margin.bottom)
  //.attr("viewBox", [0, 0, width, height]);


var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([0, w])
                .paddingInner(0.05);

var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([0, h]);

 //d3.select('svg').selectAll('#bar-chart').remove();
//Create SVG element
var svg = d3.select("#barChart")
            .append("svg")
            .attr("width", w - margin.left - margin.right)
            .attr("height", h - margin.top - margin.bottom)
            //.attr("viewBox", [0, 0, width, height]);

//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
           return xScale(i);
   })
   .attr("y", function(d) {
           return h - yScale(d);
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) {
           return yScale(d);
   })
   .attr("fill", function(d) {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
   })
   .on("mouseover", function() {
           d3.select(this)
               .attr("fill", "orange");
   });

//Create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
           return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
           return xScale(i) + xScale.bandwidth() / 2;
   })
   .attr("y", function(d) {
           return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white"); }