// Global var for FIFA world cup data
var allWorldCupData;
var projection;
var yearsarray;
var teamarray; 
var worldcup_attendance; 
var worldcup_matches;
var worldcup_goals;
var usmapdata; 


/**
 * Render and update the bar chart based on the selection of the data type in the drop-down box
 *
 * @param selectedDimension a string specifying which dimension to render in the bar chart
 */



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
        console.log(allWorldCupData[0])

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


function createBarChart(data) {

    d3.select('svg').selectAll('*').remove();

    const svg = d3.select("#barChart") 

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    var maxValue = d3.max(data);


    const margin = { top: 45, bottom: 45, left: 45, right: 45 };
    

  svg.append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  //.attr("viewBox", [0, 0, width, height]);

 
const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

  console.log(x.domain())
  console.log(x.range())

const y = d3.scaleLinear()
  .domain([0, maxValue])
  .range([height - margin.bottom, margin.top])

//console.log(y.domain())
//console.log(y.range())

svg.append("g")
.selectAll("rect")
.data(data)
.enter()
.append('rect')
.attr("x", ( d,i) => x(i))
.attr("y", d => y(d))
.attr('title', (d) => d)
.attr("class", "rect")
.attr("height", d => y(0) - y(d))
.attr("width", x.bandwidth())
.attr("fill", 'darkblue')

.on("mouseover", function(d,i) {
    d3.select(this).attr("r", 10).style("fill", "red");
    //console.log(i)
  })
.on("mouseout", function(d) {
    d3.select(this).attr("r", 5.5).style("fill", "darkblue");
    
  })
.on("click", function(event, d) {
    var e = d3.selectAll('rect').nodes();
    var i = e.indexOf(this);
    //console.log(yearsarray[i]);
     
    d3.select("#edition").html("")
    d3.select('#edition').select('text').remove()
    d3.select('#host').select('text').remove()
    d3.select('#winner').select('text').remove()
    d3.select('#silver').select('text').remove()
    d3.select('#teams').selectAll("*").remove()

    var editions = allWorldCupData.map(function(d){
        return d.EDITION
       
    })

    //Editions 
    var ed;
    var edition; 
    for(ed=0; ed<editions.length; ed++){
        if(i===ed){
            edition = editions[ed]
        }
    }
    
    d3.select('#edition')
    .append('text')
    .text(edition)

    //Hosts
    var hosts = allWorldCupData.map( function(d){
        return d.host

    })

   var ho; 
   var host; 
    for(ho=0; ho<hosts.length; ho++){
        if(i===ho){
            host = hosts[ho]
        }

    }

    //console.log(host)
    //console.log(hosts)

    d3.select("#host")
    .append("text")
    .text(host)

    //Winner
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
    d3.select("#winner")
    .append("text")
    .text(winner)

    //Runner Up 
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

    d3.select('#silver')
    .append('text')
    .text(silver)


    //Team Names 
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
    var res = teams.split(",");
    //console.log(res)

     d3.select('#teams')
    .selectAll(null)
    .data(res)
    .enter()
    .append('p')
    .append('li')
    .text(function(d){return d})

    

  }).style("margin-top", "10px")
    .append("title")
    .text(function(d,i) {
        return yearsarray[i]+" World Cup Click to \nView Host, Winner & Teams";
         }) 
      

function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .attr("font-size", '11px')
  }
  

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
  
svg.append("g").call(xAxis)
svg.append("g").call(yAxis)
svg.node(); 

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


// Create paths



//Load in GeoJSON data
d3.csv('us-cities.csv').then(
    function(data){

      
        //Set input domain for color scale

                d3.json("us-states.json").then(
                    function(json) {
                        //Bind data and create one path per GeoJSON feature 
                        usmapdata = json
                    //Merge the ag. data and GeoJSON
					//Loop through once for each ag. data value
					for (var i = 0; i < data.length; i++) {
				
						//Grab state name
						var dataState = data[i].state;
						
						//Grab data value, and convert from string to float
						var dataValue = parseFloat(data[i].value);
				
						//Find the corresponding state inside the GeoJSON
						for (var j = 0; j < json.features.length; j++) {
						
							var jsonState = json.features[j].properties.name;
				
							if (dataState == jsonState) {
						
								//Copy the data value into the JSON
								json.features[j].properties.value = dataValue;
								
								//Stop looking through the JSON
								break;
								
							}
						}		
					}


                
                        map(json.features)
                    }  
                
                ).catch(function(error){
                    console.log(error)
                })

                            

    }
).catch(
    function(error){
        console.log(error)
    }
)



function map(data){
    var svg = d3.select("#map")
    var width = +svg.attr('width')
    var height = +svg.attr('height')
    var margins = {top:45, bottom:45, right:45, left:45}
    //Define quantize scale to sort data values into buckets of color
    var color = d3.scaleQuantize().range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
    
    color.domain([
        d3.min(data, function(d) { return d.value; }), 
        d3.max(data, function(d) { return d.value; })
    ]); 

    var projection = d3.geoAlbersUsa().translate([width/1.5, height/1.5]).scale(500);
    var path = d3.geoPath().projection(projection);

    //Define quantize scale to sort data values into buckets of color
	//var color = d3.scaleQuantize()
            

    //Append the dimensions 
    svg.append('svg')
    .attr('width',width-margins.left-margins.right)
    .attr('height', height-margins.bottom-margins.top)
    .attr("viewBox", [0, 0, width, height]);

     svg.selectAll("path")
     .data(data)
     .enter()
     .append("path")
     .attr("d",path)
     .style("fill", function(d) {
        //Get data value
        var value = d.properties.value;
        
        if (value) {
            //If value exists…
            return color(value);
        } else {
            //If value is undefined…
            return "#bbb";
        }
});

    //console.log("Am the map")  

}