// Global var for FIFA world cup data
var allWorldCupData;
var projection;
var svgMap;
var countriesdata;
var arr = []
var countryIds;
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



/**
 *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
 *
 *  There are 4 attributes that can be selected:
 *  goals, matches, attendance and teams.
 */

 
function chooseData() {

    
    // ******* TODO: PART I *******
    // Change the selected data when a user selects a different
    // menu item from the drop down.
 
    var dataFile = document.getElementById('dataset').value;  
    
    
    if(dataFile==='teams'){
        
        createBarChart(teamarray)
        
       
    }else if (dataFile==='attendance') {
        
        createBarChart(worldcup_attendance)

    } else if(dataFile==='matches') {

        createBarChart(worldcup_matches)
        
    } else if(dataFile==='goals'){
        createBarChart(worldcup_goals) 

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


/* DATA LOADING */

// This is where execution begins; everything
// above this is just function definitions
// (nothing actually happens)
//Load in json data to make map

d3.json("data/world.json").then(
    function(data){

        //console.log("World data")
        //console.log(data.objects.countries)
        //map(data.objects)

       // drawMap(world);
    }
).catch(
    function(error){

        console.log(error)
    }
)

// This is necessary for the map visualisation. 
d3.csv('data/countries_iso.csv').then(
    function(country){

      var count =   country.map(function(d){

            return d.Country
        })

        // Placing country and Alpha code in an object. 
        var countryName = {}
        country.forEach(function(d){
            return countryName[d.Alpha3code.replace(/\s/g, '')]= d.Country.replace(/\s/g, '')
        })
        countryIds = countryName
       
    }
).catch(function(error){
    console.log(error)
})



d3.json("data/world.json").then(
    function(json) {
        //Bind data and create one path per GeoJSON feature 

        const countries = topojson.feature(json, json.objects.countries);
        countriesdata = countries

       mapdraw(countries.features)

    }  

).catch(function(error){
    console.log(error)
}) 

// The main fifa data as provided. 
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
                d.host_pos = [+d.Host_Lon, +d.Host_Lat]

        
                //Break up lists into javascript arrays
                d.teams_iso = d3.csvParse(d.TEAM_LIST).columns;
                d.teams_names = d3.csvParse(d.TEAM_NAMES).columns });
    
                    // Store csv data in a global variable
        allWorldCupData = csv;
        //console.log(allWorldCupData[0])

        var team = allWorldCupData.map(function(d){
            return d.teams
        });
        teamarray = team.reverse();
        //console.log(teamarray)
        

    
        var years = allWorldCupData.map(function(d){
            return d.YEAR
        }); 
        yearsarray = years.reverse();
        //console.log(yearsarray)

        var attendance = allWorldCupData.map(function(d){
                return d.attendance
            });
        worldcup_attendance = attendance.reverse();
        //console.log(worldcup_attendance)

        var matches = allWorldCupData.map(function(d){
            return d.matches
        });
        worldcup_matches = matches.reverse(); 
        //console.log(worldcup_matches)
        
        
        var goal= allWorldCupData.map(function(d){
            return d.goals
        });
        worldcup_goals = goal.reverse();

        chooseData() // This is the entry, if calls the barchart depending on condition
        
            }    
    
    ).catch((error)=>{
       console.log(error)
    }); 


function createBarChart(data) {

    
     
    // Clear up the canvas 
    d3.select('svg').selectAll('*').remove();
    var svg = d3.select("#barChart") 

    // The dimensions of the bar chart.
    var width = +svg.attr('width');
    var height = +svg.attr('height');
    var margin = { top: 45, bottom: 45, left: 45, right: 45 };
    var maxValue = d3.max(data);


    
    
    // Append svg to the svg object created above.
     svg.append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
  

     // Create the scale for the x axis. 
     var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

 
     // Create the scale for the y axis. 
     var y = d3.scaleLinear()
    .domain([0, maxValue])
    .range([height - margin.bottom, margin.top])


    // Group the svg elements and append the rectangles. 
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
   .on("click", function(event, d) {

     // Most of the dynamism is based on this part. i gets the index.
     // We will track the index for the Edition, Host, Winner, Runner Up and Teams. 
     // The way the index is accessed in d3.js V6 is different from other versions. 
     // Below is the process of getting the index in d3.js V6. 
     
     var e = d3.selectAll('rect').nodes();
     var i = e.indexOf(this);
       
    // On click fill the rectangles red all others remain blue. 
    d3.select(this).style("fill", "red")
    d3.selectAll('rect').style('fill', 'darkblue')
  
      
    // Clear up all the sections where we are going 
    // to append the map, text and bar graph. 
    d3.select("#edition").html("")
    d3.select('#edition').select('text').remove()
    d3.select('#host').select('text').remove()
    d3.select('#winner').select('text').remove()
    d3.select('#silver').select('text').remove()
    d3.select('#teams').selectAll("*").remove()
    svgMap.selectAll("*").remove()

    
    // Win positions array that is the Latitudes and Longitudes.  
    var winpositions = allWorldCupData.map(function(d){
        return d.win_pos
    })
     
    // They are then pushed on another array. 
    var arr = []
    arr.push(winpositions.reverse()[i])


    // Get all the Editions 
    var editions = allWorldCupData.map(function(d){
        return d.EDITION
       
    })

    //Iterate through all the Editions. 
    var ed;
    var edition; 
    for(ed=0; ed<editions.length; ed++){
        if(i===ed){
            edition = editions.reverse()[ed]
        }
    }
    
    // Attach the Editions on the canvas. 
    d3.select('#edition').append('text').text(edition).style("font-family","dusha")

    //Get the hosts. 
    var hosts = allWorldCupData.map( function(d){
        return d.host

    })

   // Iterate through the hosts. 
   var ho; 
   var host; 
    for(ho=0; ho<hosts.length; ho++){
        if(i===ho){
            host = hosts.reverse()[ho]
        }
    } 
    // Attache the Host to the canvas. 
    d3.select("#host").append("text").text(host)
    

    //Winners data. 
    var winners = allWorldCupData.map(function(d){
        return d.winner
    })

    var winner;
    var w; 
    for(w=0; w<winners.length; w++){
        if(i===w){
            

            winner = winners.reverse()[w]
        }
    }
    // Attach the winner to the canvas. 
    d3.select("#winner").append("text").text(winner)

    //Runner Up 
    var runnerUp = allWorldCupData.map(function(d){
        return d.runner_up
    })
    
    // Iterate through the runners up. 
    var silver; 
    var s; 
    for(s=0; s<runnerUp.length; s++){
        if(i===s){
            silver = runnerUp.reverse()[s]
        }
    }
    
    // Attach the runners up text on the canvas 
    d3.select('#silver').append('text').text(silver)


    //Team names 
    var teamnames = allWorldCupData.map(function(d){
        return d.TEAM_NAMES
    })
 
    // Iterate through the teams. 
    var teams;
    var t; 
    for(t=0; t<teamnames.length; t++){

        if(i===t){
            teams = teamnames.reverse()[t]
        }
    }
    // Split team names 
    var res = teams.split(",");

     // Attach the teams to the canvas. 
     d3.select('#teams').selectAll(null).data(res).enter().append('p').append('li')
     .text(function(d){return d})


   
    // Get the longitudes and latitudes for the runners up. 
    var runnerups = allWorldCupData.map(function(d){
        return d.ru_pos
    }) 

    // Winners positions. 
    var winpos;
    for(wp=0; wp<winpositions.length; wp++){
        if(i===wp){
           winpos = winpositions.reverse()[wp]
       } 
    }

   
    // Get the host Alphacode
    var hostkey = []
    Object.keys(countryIds).forEach( 
        function(key){
            
            if(countryIds[key]===host)
            {
                hostkey.push(key) 
            }
        }
    )
 
    // The geopath for the map. 
    var path = d3.geoPath().projection(projection);

   
    // The participant Alphacodes. 
    var participants  = []
    for(var z = 0; z<Object.keys(countryIds).length; z++){
        for(var x=0; x<res.length; x++)
        {
            if(countryIds[Object.keys(countryIds)[z]]===res[x]){
                participants.push(Object.keys(countryIds)[z])
            }
        }
    }
    
    // Attach the Partipants onto the map with a cadetblue color
    svgMap.append('g')
    .selectAll('path')
    .data(countriesdata.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', function(d){
        //return d 
        for(var pt=0; pt<participants.length; pt++){
            if(participants[pt]===d.id){
                return 'cadetblue'
            }else{
                 'blue'
            }
        }
    })
    .append('title')
    .text(function(d){
        return countryIds[d.id]
    })

    // Attach the granticule onto the map. 
    svgMap.append("path").attr("id", "graticule").attr("class", "grat")
    .attr("d", path(d3.geoGraticule10()));

    // Hosts Latitudes 
    var host_cords = allWorldCupData.map(function(d){
        return d.host_pos

    })
    
   // An array to attach the host latitudes for quick attachment. 
   var hos_c = []
   hos_c.push(host_cords.reverse()[i])
   
   
   // Attach the host onto the map. 
   svgMap.selectAll(null)
   .data(hos_c)
   .enter()
   .append("circle")
   .attr('class', 'host')
   .attr("cx", function(d) {
                  return projection(d)[0];
          })
  .attr("cy", function(d) {
                  return projection(d)[1];
          })
   .attr("r", 7)

  
    
   // Attach the winner onto the map. 
   svgMap.selectAll(null)
    .data(arr)
    .enter()
    .append("circle")
    .attr('class', 'gold')
    .attr("cx", function(d) {
                   return projection(d)[0];
           })
   .attr("cy", function(d) {
                   return projection(d)[1];
           })
    .attr("r", 7)

    
    // World cup runners up. 
    var rsu = []
    rsu.push(runnerups.reverse()[i])

   svgMap.selectAll(null)
    .data(rsu)
    .enter()
    .append("circle")
    .attr('class', 'silver')
    .attr("cx", function(d) {
                   return projection(d)[0];
           })
   .attr("cy", function(d) {
                   return projection(d)[1];
           })
    .attr("r", 7)

    d3.select(this).attr("r", 10).style("fill", "red"); 

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
    // ******* TODO: PART II *******

    // Implement how the bars respond to click events
    // Color the selected bar to indicate it has been selected.
    // Make sure only the selected bar has this new color.

    // Call the necessary update functions for when a user clicks on a bar.
    // Note: think about what you want to update when a different bar is selected.
}


// Map 
function mapdraw(data){

    // Map cavas dimentions. 
    svgMap = d3.select("#map")
    var width = +svgMap.attr('width')
    var height = +svgMap.attr('height')
    var margins = {top:45, bottom:45, right:45, left:45}
    var g = svgMap.append("g");
    //const colorScale = d3.scaleOrdinal(d3.schemeCategory10); 


    projection = d3.geoNaturalEarth1().translate([width/2, height/2]).scale(98)//
    
    var path = d3.geoPath().projection(projection);

    // Append the dimensions 
    svgMap.append('svg')
    .attr('width',width-margins.left-margins.right)
    .attr('height', height-margins.bottom-margins.top)

   // Append graticule 
   svgMap.append("path")
    .attr("id", "graticule")
    .attr("class", "grat")
    .attr("d", path(d3.geoGraticule10()))

    // Append path 
    g.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', 'darkblue')
    .append('title')
    .text(function(d){
        return countryIds[d.id]
    })

} 

/**
 * Renders and updates the map and the highlights on top of it
 *
 * @param the json data with the shape of all countries
 */
function drawMap(world) {

    //(note that projection is global!
    // updateMap() will need it to add the winner/runner_up markers.)

   // projection = d3.geoConicConformal().scale(150).translate([400, 350]);

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








