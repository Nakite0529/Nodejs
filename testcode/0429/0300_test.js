var http = require('http');
var url = require('url');

var port = 3000;

http.createServer(function(request, response){

        var path = url.parse(request.url, true).pathname;
        console.log('server start');

        console.log(path);
        
        
}).listen(port);
