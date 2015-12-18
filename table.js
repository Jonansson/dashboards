/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (in the ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */


// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard;

// All url parameters are available via the ARGS object
var ARGS;

// Intialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
};

// Set a title
dashboard.title = 'Scripted text dashboard';

// Set default time
// time can be overriden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-3d",
  to: "now"
};

var rows = 1;
var seriesName = 'argName';

if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}
////////////////////////////////////////////////////////////////////////////
//
// Start create own content 
//
////////////////////////////////////////////////////////////////////////////

$("<h2 align=\"center\">Ceragon utilization report</h2>").appendTo("body"); 



// http://www.w3schools.com/json/json_example.asp 

//$(" <style>table, th , td  {    align: center;border: 1px solid grey;    border-collapse: collapse;    padding: 5px;} table tr:nth-child(odd)	{    background-color: #4B3131;} table tr:nth-child(even) {    background-color: #5c5c54;}</style> ").appendTo("head"); 



$("<div id=\"id01\"></div>").appendTo("body"); 



var xmlhttp = new XMLHttpRequest();
// var url = "http://www.w3schools.com/website/customers_mysql.php";

var url = "http://10.205.0.2/ceragonjson.html";


xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    var arr = JSON.parse(response);

console.debug(arr);

    var i;
    var out = "<table>";

//    out += "<thead><tr><th>ip</th><th>SysName</th><th>PeakUtilization[%]</th><th>AverageUtilization[%]</th><th>PeakCapacity[Mbps]</th><th>AverageCapacity[Mbps]</th><th>Dashboard</th></tr></thead>";

    for(i = 0; i < 5; i++) { //arr.length
        out += "<tr><td>" + arr[i].col0 + "</td><td>" + arr[i].col1 + "</td><td>" + arr[i].col2 + "</td><td>" + arr[i].col3 + "</td><td>" + arr[i].col4 + "</td><td>" + arr[i].col5 + "</td><td>" + arr[i].col6 + "</td></tr>";
    }
    out += "</table>";
    document.getElementById("id01").innerHTML = out;
}


////////////////////////////////////////////////////////////////////////////
return dashboard;
