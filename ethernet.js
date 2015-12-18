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

'use strict';

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
dashboard.title = 'Scripted dash';

// Set default time
// time can be overriden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-30d",
  to: "now"
};

var rows = 3;
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
  "id": 1,
  "title": "IP20G LIE01-LIE06",
  "originalTitle": "IP20G LIE01-LIE06",
  "tags": [],
  "style": "light",
  "timezone": "browser",
  "editable": false,
  "hideControls": false,
  "sharedCrosshair": false,
  "rows": [
    {
      "collapse": false,
      "editable": true,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "datasource": null,
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null,
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "id": 1,
          "legend": {
            "alignAsTable": false,
            "avg": true,
            "current": true,
            "hideEmpty": false,
            "max": true,
            "min": true,
            "rightSide": true,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 2,
          "links": [],
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": false,
          "steppedLine": true,
          "targets": [
            {
              "fields": [
                {
                  "func": "max",
                  "name": "peak_capacity"
                },
                {
                  "func": "mean",
                  "name": "average_capacity"
                }
              ],
              "groupBy": [
                {
                  "interval": "auto",
                  "type": "time"
                }
              ],
              "measurement": "ethernet",
              "query": "SELECT max(\"peak_capacity\") AS \"peak_capacity\", mean(\"average_capacity\") AS \"average_capacity\" FROM \"ethernet\" WHERE \"ip\" = '172.26.1.14' AND $timeFilter GROUP BY time($interval)",
              "refId": "A",
              "tags": [
                {
                  "key": "ip",
                  "operator": "=",
                  "value": "172.26.1.14"
                }
              ],
              "alias": "$col"
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "Capacity",
          "tooltip": {
            "shared": true,
            "value_type": "cumulative"
          },
          "transparent": true,
          "type": "graph",
          "x-axis": true,
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ]
        },
        {
          "aliasColors": {},
          "bars": false,
          "datasource": null,
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": null,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null,
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "id": 2,
          "legend": {
            "alignAsTable": false,
            "avg": true,
            "current": false,
            "hideEmpty": false,
            "max": true,
            "min": false,
            "rightSide": true,
            "show": true,
            "total": false,
            "values": true
          },
          "lines": true,
          "linewidth": 2,
          "links": [],
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": false,
          "steppedLine": true,
          "targets": [
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
              "query": "SELECT max(\"peak_utilization\") AS \"peak_utilization\", mean(\"average_utilization\") AS \"average_utilization\" FROM \"ethernet\" WHERE \"ip\" = '172.26.1.14' AND $timeFilter GROUP BY time($interval)",
              "refId": "A",
              "tags": [
                {
                  "key": "ip",
                  "operator": "=",
                  "value": "172.26.1.14"
                }
              ],
              "alias": "$col"
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "Utilization",
          "tooltip": {
            "shared": true,
            "value_type": "cumulative"
          },
          "transparent": true,
          "type": "graph",
          "x-axis": true,
          "y-axis": true,
          "y_formats": [
            "short",
            "short"
          ]
        }
      ],
      "title": "Row"
    },
    {
      "collapse": false,
      "editable": true,
      "height": "250px",
      "panels": [],
      "title": "New row"
    }
  ],
  "time": {
    "from": "now-30d",
    "to": "now"
  },
  "timepicker": {
    "now": true,
    "refresh_intervals": [
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d"
    ],
    "time_options": [
      "5m",
      "15m",
      "1h",
      "6h",
      "12h",
      "24h",
      "2d",
      "7d",
      "30d"
    ]
  },
  "templating": {
    "list": []
  },
  "annotations": {
    "list": []
  },
  "refresh": "15m",
  "schemaVersion": 7,
  "version": 4,
  "links": []
}
    ]
  });
}


return dashboard;
