/*
@deploy
@title request url
*/

module.exports = function(req, res, next) {
  res.send(req.url);
};