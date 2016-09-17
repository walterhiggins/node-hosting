'use strict';
/*global require, module*/
var httpProxy = require('http-proxy'),
    connect = require('connect'),
    fs = require('fs'),
    vhosts = {},
    PORT = 3000,
    PORT_INC = 10,
    virtualPort = 3500,
    VHOSTS_DIR = './vhosts/';

function configureVHost(host){
  require(VHOSTS_DIR + host)(virtualPort);
  vhosts[host] = virtualPort;
  virtualPort = virtualPort + PORT_INC;
}
var proxy = httpProxy.createProxyServer();
var app = connect();
var hosts = fs.readdirSync(VHOSTS_DIR);
hosts.forEach( configureVHost );
app.use(function (req, res){
  var host = req.headers.host;
  host = host.replace(/^www\./,'').replace(/\:[0-9]+$/,'');
  proxy.web(req, res, { target: 'http://localhost:' + vhosts[host]});
});

app.listen(PORT);
