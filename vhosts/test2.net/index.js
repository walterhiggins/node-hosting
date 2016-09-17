var express = require('express');
var app = express();
app.get('/', function(req, res, next){
  res.send('Root of test2.net');
});
app.get('/boo', function(req, res, next){
  res.send('test2.net says boo!');
});
app.use(function(req,res,next){
  res.send('no matching content on test2.net');
});
module.exports = function(port){
  app.listen(port);
};
