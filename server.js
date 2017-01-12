//including modules
var http = require('http');
var url = require('url');

//module to handling routes
var routing = require('./routing');

http.createServer(function(req, res){
    var url_object = url.parse(req.url);
    var route = 'public' + url_object.pathname;
    if (route=='public/')
		route='public/index.html';
    routing.router(route, req, res);
}).listen(3333);
console.log('servidor escuchando en puerto 3333');





