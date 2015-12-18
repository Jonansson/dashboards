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
//dashboard.title = 'Scripted dash';

if(!_.isUndefined(ARGS.title)) {
  dashboard.title = ARGS.title;
}

// Get the IP address
var ip = "localhost";

if(!_.isUndefined(ARGS.ip)) {
  ip = ARGS.ip;
}

var capacityexpr = "/1";

if(!_.isUndefined(ARGS.capacityexpr)) {
  capacityexpr = ARGS.capacityexpr;
}


// Get Interface Index
var if_idx = 1;

if(!_.isUndefined(ARGS.if_idx)) {
  if_idx = parseInt(ARGS.if_idx, 10);
}

// Set default time
// time can be overriden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-7d",
  to: "now"
};

dashboard.editable = 'false';
var rows = 1;
var seriesName = 'argName';

if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

for (var i = 0; i < rows; i++) {

  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
	
    panels: [
      {
        title: 'Ethernet Radio Capacity',
        type: 'graph',
	 editable: false,
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: [
            {
              "fields": [
                {
                  "func": "max",
                  "name": "peak_capacity",
		  "mathExpr": capacityexpr


                },
                {
                  "func": "max",
                  "name": "average_capacity",
		  "mathExpr": capacityexpr
                }
              ],
              "groupBy": [
                {
                  "interval": "auto",
                  "type": "time"
                }
              ],
              "measurement": "ethernet",
              "refId": "A",
              "tags": [
                {
                  "key": "ip",
                  "operator": "=",
                  "value": ip
                },

//                  "AND",
//                {
//                  "key": "if_idx",
//                  "operator": "=",
//                  "value": if_idx
//                }

              ],
              "alias": "$col"
            }
          ],
        seriesOverrides: [
          {
            alias: '/random/',
            yaxis: 2,
            fill: 0,
            linewidth: 5
          }
        ],
        tooltip: {
          shared: true
        },
  "legend": {
    "show": true,
    "values": true,
    "min": true,
    "max": true,
    "current": false,
    "total": false,
    "avg": true,
    "alignAsTable": true,
    "rightSide": false
  },
 "leftYAxisLabel": "Mbps"
      },

///////


///////
      {
        title: 'Ethernet Radio Utilization',
        type: 'graph',
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: [
            {
              "fields": [
                {
                  "func": "max",
                  "name": "peak_utilization"
                },
                {
                  "func": "mean",
                  "name": "average_utilization"
                }
              ],
              "groupBy": [
                {
                  "interval": "auto",
                  "type": "time"
                }
              ],
              "measurement": "ethernet",
              "refId": "A",
              "tags": [
                {
                  "key": "ip",
                  "operator": "=",
                  "value": ip
                }
              ],
              "alias": "$col"
            }
          ],
        seriesOverrides: [
          {
            alias: '/random/',
            yaxis: 2,
            fill: 0,
            linewidth: 5
          }
        ],
        tooltip: {
          shared: true
        },

  "grid": {
    "leftLogBase": 1,
    "leftMax": 100,
    "rightMax": null,
    "leftMin": 0,
    "rightMin": null,
    "rightLogBase": 1,
    "threshold1": 50,
    "threshold2": 80,
    "threshold1Color": "rgba(255, 255, 224, 0.27)",
    "threshold2Color": "rgba(234, 112, 112, 0.22)"
  },

  "legend": {
    "show": true,
    "values": true,
    "min": true,
    "max": true,
    "current": false,
    "total": false,
    "avg": true,
    "alignAsTable": true,
    "rightSide": false
  },


      }
    ]
  });
}


return dashboard;
