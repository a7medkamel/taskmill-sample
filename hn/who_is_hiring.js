/*
@title HN Who is hiring?
@output
{
  "content-type" : "application/json"
}
*/

var rp      = require('request-promise')
  , Promise = require('bluebird')
  , _       = require('underscore')
  , math    = require('mathjs')
  ;

module.exports = function(req, res, next) {
  rp
    .get('https://hacker-news.firebaseio.com/v0/item/11012044.json')
    .then(function(data){
      return JSON.parse(data);
    })
    .then(function(post){
      var post_age = (Date.now() - new Date(post.time * 1000)) / 1000;
     
      Promise
        .resolve(post.kids)
        .map(function(i){
          return rp
                  .get('https://hacker-news.firebaseio.com/v0/item/' + i + '.json')
                  .then(function(data){ return JSON.parse(data); })
                  .then(function(comment){
                    return _.pick(comment, 'by', 'id', 'text', 'time');
                  })
                  ;
        }, { concurrency : 30 })
        .then(function(jobs){
          var cache_for = Math.floor(math.eval('60 + (x / 60) + (x / (60 * 60 * 24)) ^ e', { x : post_age }));
          res.set('cache-control', 'public, max-age=' + cache_for);
          res.send(jobs);
        });
    })
    .catch(function(err){
      next(err);
    });
};
