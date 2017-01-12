var http = require('http');
var fs = require('fs'); 
var mime = require('mime');
var procesingData = require('./procesingData');

exports.router = function (route, req, res) {
    switch (route) {
        case 'public/postData': {
            var aux = procesingData.postData(req, res);
            fs.readFile('public/index.html',function(err,content){
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.write('Error interno');
                    res.end();					
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(content);
                    res.end();
                }
            });
            break;
        }
        default : {
            fs.exists(route,function(exists){
                if (exists) {
                    fs.readFile(route,function(err,content){
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.write('Error interno');
                            res.end();					
                        } else {
                            var type = mime.lookup(route);
                            res.writeHead(200, {'Content-Type': type});
                            res.write(content);
                            res.end();
                        }
                    });
                } else {
                    fs.readFile('public/404.html', function(err, content){
                        if(err){
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.write('Error interno');
                            res.end();
                        } else {
                            res.writeHead(404, {'Content-Type': 'text/html'});
                            res.write(content);
                            res.end();
                        }    
                    });
                }
            });	
        }
    }
}
