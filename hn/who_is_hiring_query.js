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

var _ = require('underscore');

module.exports = function(req, res, next) {
  var query = req.query['query'] || req.body;

  this.request('a7medkamel/tm-data/exec/master/hn/who_is_hiring.js', function(err, httpResponse, body){
    if (err) {
      next(err);
      return;
    }

    if (_.isEmpty(query)) {
      query = [];
    }

    if (_.isString(query)) {
      query = [query]
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