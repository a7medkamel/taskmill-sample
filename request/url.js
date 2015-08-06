/*
@deploy
@title request url
*/

module.exports = function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.send(req.url);
};