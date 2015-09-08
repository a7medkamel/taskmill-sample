/*
@deploy
@title HN Who is hiring?
@output
{
  "content-type" : "application/json"
}
@cache 3600
*/

var rp      = require('request-promise')
  , Promise = require('bluebird')
  , _       = require('underscore')
  ;

module.exports = function(req, res, next) {
  rp
    .get('https://hacker-news.firebaseio.com/v0/item/10152809.json')
    .then(function(data){
      var obj = JSON.parse(data);

      Promise
        .resolve(obj.kids)
        .map(function(i){
          return rp
                  .get('https://hacker-news.firebaseio.com/v0/item/' + i + '.json')
                  .then(function(data){ return JSON.parse(data); })
                  .then(function(comment){
                    return _.pick(comment, 'by', 'id', 'text', 'time');
                  })
                  ;
        })
        .then(function(jobs){
          res.send(jobs);
        });
    })
    .catch(function(err){
      next(err);
    });
};