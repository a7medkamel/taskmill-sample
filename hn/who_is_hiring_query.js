/*
@deploy
@title Search HN Who is hiring?
@input
{
  "content-type" : "application/json"
}
@output
{
  "content-type" : "application/json"
}
*/

var _     = require('underscore')
  , sift  = require('sift')
  ;

module.exports = function(req, res, next) {
  this.request('a7medkamel/tm-data/exec/master/hn/who_is_hiring.js', function(err, httpResponse, body){
    if (err) {
      next(err);
      return;
    }

    var query = req.body;
    if (!query) {
      var qs = req.query['query'];
      
      if (_.isEmpty(qs)) {
        query = {};
      } else if (_.isString(qs)) {
        query = { text : new RegExp(qs) };
      } else if (_.isArray(qs)) {
        query = { text : new RegExp(qs.join('|')) };
      }
    }
    
    

    

    var jobs = JSON.parse(body);

    var found = _.filter(jobs, function(job){
      if (!job.text) {
        return;
      }

      var text = job.text.toLowerCase();
      return !!_.find(query, function(term){ return text.indexOf(term) != -1; });
    });

    res.send(found);
  })
};