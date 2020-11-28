/*globals alert, document, d3, console*/

// These keep JSHint quiet if you're usin 
// Moses Mbabaali, 4846019

function render(data){
    var a = []
    var b = []
    data.forEach((d)=>{
        a.push(d.a)
        b.push(d.b)
        
    })
    var w = 150;
    var h = 135;
    var barPadding = 1;

    // Bar Chart 
    console.log(data.a)
    
    var bars = d3.select(".bar")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    bars.selectAll("rect")
       .data(b)
       .enter()
       .append("rect")
       .attr("x", function(d, i) {
               return i * (w / b.length);
       })
       .attr("y", function(d) {
               return h - (d * 4);
       })
       .attr("width", w / b.length - barPadding)
       .attr("height", function(d) {
               return d * 4;
       }).attr("fill", "teal")
       .on("mouseover", function(d) {
        d3.select(this).attr("r", 10).style("fill", "red");
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("r", 5.5).style("fill", "teal");
      })
      .style("margin-top", "10px")
      .append("title")
      .text(function(d) {
          return "This bar represents "+ d;
           });



           //Line
        var lineA = d3.select(".line").append('svg')
        var maxValue = d3.max(b)

        
        //Scale 
        var yScale = d3.scaleLinear()
        .domain([0,maxValue])
        .range([h,0])

        lineA.append("g")
        .attr("transform", "translate(20,0)")
        .call(d3.axisLeft(yScale)) 
        
        
        var xScale = d3.scaleLinear()
        .domain([0,d3.max(a)])
        .range([0,w])

        lineA.append("g")
        .attr("transform", "translate(20," + 135+ ")")
        .call(d3.axisBottom(xScale))

        valueline = d3.line()
        .x(function(d){return xScale(d.a)})
        .y(function(d){return yScale(d.b)})

        
         lineA.append("path")
        .datum(data)
        .attr("d", valueline)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)

        

         //Area Chart
         var Area = d3.select(".area").append('svg')
         var maxValue = d3.max(b)
 
         
         //Scale 
         var yScale = d3.scaleLinear()
         .domain([0,maxValue])
         .range([h,0])
 
         Area.append("g")
         .attr("transform", "translate(20,14)")
         .call(d3.axisLeft(yScale)) 
         
         
         var xScale = d3.scaleLinear()
         .domain([0,d3.max(a)])
         .range([0,w])
 
         Area.append("g")
         .attr("transform", "translate(20," + 149+ ")")
         .call(d3.axisBottom(xScale))
 
         valueline = d3.area()
         .x(function(d){return xScale(d.a)})
         .y0(innerWidth)
         .y1(function(d){return yScale(d.b)})
 
         
         Area.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", valueline)
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("fill", "teal")
        

        // Scatter plot
        var Scatter = d3.select(".scatter").append('svg')
        var maxValue = d3.max(b)

        //Scale 
        var yScale = d3.scaleLinear()
        .domain([0,maxValue])
        .range([h,0])

        Scatter.append("g")
        .attr("transform", "translate(20,0)")
        .call(d3.axisLeft(yScale)) 
        
        
        var xScale = d3.scaleLinear()
        .domain([0,d3.max(a)])
        .range([0,w])

        Scatter.append("g")
        .attr("transform", "translate(20," + 135+ ")")
        .call(d3.axisBottom(xScale))


        // Add dots
       Scatter.append('g')
       .selectAll("dot")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", function (d) { return xScale(d.a); } )
       .attr("cy", function (d) { return yScale(d.b); } )
       .attr("r", 6)
       .attr("class", "myCircle")
       .style("fill", "#69b3a2") 
       .on("click", function(d) {
        console.log(d);
        })

}

var dataseti
function OnchangeReal(){

    var dataFile = document.getElementById('dataset').value;
    var check = document.getElementById('random').checked
    if(check){
    
        //randomSubset()
        //render(a)
        randomSubset()
    }else{
       d3.csv('/data/' + dataFile + '.csv').then(
           (data)=>{  

               //console.log(data)
               data.forEach((d)=>{
                   d.a = parseInt(d.a)
                   d.b = parseFloat(d.b)
               })

               render(data)
               console.log(data)

           }
       ).catch((error)=>{
           alert('Data was not loaded '+error)
       })

      
    }
}

/*
function update(error, data) {
    if (error !== null) {
        alert("Couldn't load the dataset!");
    } else {
        // D3 loads all CSV data as strings;
        // while Javascript is pretty smart
        // about interpreting strings as
        // numbers when you do things like
        // multiplication, it will still
        // treat them as strings where it makes
        // sense (e.g. adding strings will
        // concatenate them, not add the values
        // together, or comparing strings
        // will do string comparison, not
        // numeric comparison).

        // We need to explicitly convert values
        // to numbers so that comparisons work
        // when we call d3.max()
        data.forEach(function (d) {
            d.a = parseInt(d.a);
            d.b = parseFloat(d.b);
        });
    }

    // Set up the scales
    var aScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.a;
        })])
        .range([0, 150]);
    var bScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.b;
        })])
        .range([0, 150]);
    var iScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 110]);

    }
*/
 /* 
var datasets; 
function changeData() {
    // // Load the file indicated by the select menu
    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        //randomSubset();
              
    }
    else{
        d3.csv('/data/' + dataFile + '.csv', (error, data)=>{

            if(error){
                console.log(error)
            }else{
                console.log(data)
            }
        
            datasets = data
        
        });
    }
}
*/


var subsetdata;
function randomSubset() {
    // Load the file indicated by the select menu,
    // and then slice out a random chunk before
    // passing the data to update()
    var dataFile = document.getElementById('dataset').value;
    var subset = [];

    if (document.getElementById('random').checked) {
        d3.csv('data/' + dataFile + '.csv').then(

            function (data) {
                
                data.forEach(function (d) {
                    d.a = parseInt(d.a)
                    d.b = parseFloat(d.b)

                    if (Math.random() > 0.5) {
                        subset.push(d);
                    }
            });

        });

        
    }

    subsetdata = subset
  
    render(subset)

    return console.log(subset)
}



