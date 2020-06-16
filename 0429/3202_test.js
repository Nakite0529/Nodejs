var http = require('http');
var url = require('url');
var port = 3001;

http.createServer(function(req,res){

    path = url.parse(req.url, true).pathname;
    url.parse(req.url, true).query;

    if(path === '/page'){

        page = query.pageNO;
        console.log(page);

    }else if(path === '/board'){
        page = query.pageNO;
        date = query.targetDt;
    }else if(path ==='/numberSum'){
        
    }

    console.log(path);

}).listen(port);