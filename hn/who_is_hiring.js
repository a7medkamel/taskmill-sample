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
  , math    = require('mathjs')
  ;

module.exports = function(req, res, next) {
  rp
    .get('https://hacker-news.firebaseio.com/v0/item/10152809.json')
    .then(function(data){
      return JSON.parse(data);
    })
    .then(function(data){
      var post_age = (Date.now() - new Date(obj.time * 1000)) / 1000;
      console.log(post_age);
      res.end();
      // Promise
      //   .resolve(obj.kids)
      //   .map(function(i){
      //     return rp
      //             .get('https://hacker-news.firebaseio.com/v0/item/' + i + '.json')
      //             .then(function(data){ return JSON.parse(data); })
      //             .then(function(comment){
      //               return _.pick(comment, 'by', 'id', 'text', 'time');
      //             })
      //             ;
      //   })
      //   .then(function(jobs){
      //     var cache_for = Math.floor(math.eval('60 + (x / (60 * 30)) ^ e + (x / 60)', { x : post_age }));
          
      //     res.set('x-tm-cache-max-age', cache_for);
      //     res.send(jobs);
      //   });
    })
    .catch(function(err){
      next(err);
    });
};