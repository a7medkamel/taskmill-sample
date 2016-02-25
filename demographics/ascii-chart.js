/*
@title ASCII chart for USA population
@input
{
  "content-type" : "text/plain"
}
@output
{
  "content-type" : "text/plain"
}
*/

var chart   = require('ascii-chart')
  , request = require('request')
  , parse   = require('csv-parse')
  , _       = require('underscore')
  ;

module.exports = function(req, res, next) {
  var region = (!_.isEmpty(req.body)? req.body : 'World').toLowerCase();
  
  var arr = [];
  request('https://raw.githubusercontent.com/datasets/population/master/data/population.csv')
    .pipe(parse())
    .on('data', function(row){
      if (row[0].toLowerCase() === region || row[1].toLowerCase() === region) {
        arr.push(Number(row[3]));
      }
    })
    .on('end', function(){
      res.send(chart(arr));
    });
};