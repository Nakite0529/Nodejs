var http = require('http');
var url = require('url');
var qs = require('querystring');
//text 형태의 문자를 querystring형태로 분석
//text=1 -> name : text , value : 1

// 1. 모듈 설정

http.createServer(function(request, response){
//2. 서버생성
    var path = url.parse(request.url, true).pathname;
    var query = url.parse(request.url, true).query;
    //3. URL분석(파일명/queryString)

    if(path === '/plus'){ // get 방식
        var num1 = parseInt(query.num1);
        var num2 = parseInt(query.num2);
        var cal = query.cal;

        if(query.cal === '+')
        {
            reseponse.end("PLUS : "+ (num1+num2));
        }
        else if(query.cal === '-')
        {
            reseponse.end("MIN : "+ (num1-num2));
        }
        else if(query.cal === '*')
        {
            reseponse.end("MUL : "+ (num1*num2));
        }
        else if(query.cal === '/')
        {
            reseponse.end("DIV : "+(num1/num2));
        } 
    } 
    // else if(path === '/grade'){//post방식

    //     var body = "";

    //     request.on('data', function(data){
    //         body += data;
    //     });
    //     // post 방식으로 값을 전송했을 때 data를 읽어들이는 방법
    //     //request변수 안에 값이 담겨있음 / requeset를 분석

    //     request.on('end', function() {
    //         var post = qs.parse(body);
    //         response.end(post.text);

    //     });
    //     // request변수에 해당하는 분석이 모두 끝났을 때
    //     //기능을 정의 
    // }
    
    else if(path === '/grade'){

        var body = '';

        request.on('data', function(data){
            
            body += data;

        });

        request.on('end', function(){
            var post = qs.parse(body);



            var name = query.name;
            var score = {}; // 오브젝트 생성 
            score.html = parseInt(post.html);
            score.css = parseInt(post.css);
            score.nodejs = parseInt(post.nodejs);
            score.android = parseInt(post.android);
            
            
            score.avg = (score.html + score.css + score.nodejs + score.android);
            var grade;

        

            if((score.avg/4) > 94){
                score.grade = 'A+';
            } else if((score.avg/4) > 89){
                score.grade = 'A';
            } else if ((score.avg/4) > 84){
                score.grade = 'B+';
            } else if((score.avg/4) > 79){
                score.grade = 'B';
            } else if((score.avg/4) > 74){
                score.grade = 'C';
            } else{
                score.grade = 'D';
            } 

            var text = `<html><head><meta charset="utf-8"></head><body>`;
                
                text += `name: ${post.name}
                <br>html: ${score.html}
                <br>css: ${score.css}
                <br>nodejs: ${score.nodejs}
                <br>android: ${score.android}
                <br>avg: ${score.avg}
                <br>grade: ${score.grade}`;

                text += '</body></html>'

                response.end(text);

         });

        
    }


}).listen(3001);