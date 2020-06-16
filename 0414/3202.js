//3개다 외부모듈
var http = require('http');
//로컬 IP: 127.0.0.1 / Localhost
//nodejs에서 사용하는 가장 기본적인 모듈 / 웹 서버를 생성하는 것과 관련된 모든 기능을 담당
var fs = require('fs');
//(개발자의 컴퓨터에 있는 file)파일처리와 관련된 모듈(filesystem)
var url = require('url');
//url정보를 가져와서 분석 or 문자열로 바꿔주는 모듈

//내가만든 내부모듈
var temp = require("./Temp.js");
// 1. 모듈생성 


http.createServer(function(request, response) { //callback(함수안에 함수가 있음)
    //2. 서버생성 
    var path = url.parse(request.url, true).pathname; 
    var query = url.parse(request.url, true).query; //현재사용자가 보내고있는값을 알수있음

    console.log(request.url); //파일명과 쿼리스트링값을 하나로(/html?id=Hello)
    console.log(path); //url에서 분석한 파일명(/html)
    console.log(query.id); //url에서 분석한 쿼리스트링(query일때={id: 'Hello} / query.id일때=Hello)

    if(path === '/html'){  
        //3. URL 분석
        //request.url은 /html?id=Hello의 html과 id사이의 ?로 구분이 되지 않는다.(하나의 문자열로 출력) => 파일명과 쿼리스트링(?부터)을 분리해야함(url을 사용해야함)
        // fs.readFile('./html', 'utf-8', function(err, text) {

        //파일을 불러오는 readFile이 아닌, Template으로 만들어 호출하는 것
           var res = temp.template("HTML",query.id); //temp모듈 안에 있는 (Temp.js의)template함수를 호출하겠다 
           response.end(res);
            // trmplaye 함수에서 template하는 응답코드를 사용자에게 출력
        // })
    }else if(path === '/nodejs'){

        var res = temp.template("Nodejs",query.id);

        response.end(res);

    }else if(path === '/table'){

        // var res = "";
        // for(var i=1; i<=query.id; i++){
        //     res += "<td>" + i + "</td>";
        // }
        var res = temp.table(query.id);
        
        response.end("<table border='1'><tr>" + res + "</tr></table>");
    }else if(path === '/query'){
        
        var res = temp.template("Query",query.id,query.id2);

        response.end(res);
    }
    else{
       response.end("Not Found");
    }



}).listen(3000);