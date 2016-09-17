var express = require('express');
var app = express();
app.get('/', function(req, res, next){
  res.send('Root of test1.net');
});
app.get('/boo', function(req, res, next){
  res.send('test1.net says boo!');
});
module.exports = function(port){
  app.listen(port);
};
