var express = require('express'); //express모듈

var app = express(); //express app생성
var port = 3000;

app.use(function(req, res, next){
    console.log("1st middleware!");
    
});

app.use(function(req, res, next){
    console.log("2nd middleware!");
    
});

//GET 방식 요청에 대한 처리
app.get('/', function(req, res){

    //사용자에게 문자열 데이터 전송
    res.send('index 페이지');
});

//routing
app.get('/page', function(req, res){
    res.send(`page 페이지 >> <br/> date: ${req.query.targetDate}<br/>board: ${req.query.pageNum} page!`);
});

//semanticURL == cleanURL
app.get('/admin/:id/:date', function(req, res){
    res.send(`admin page >>> <br/> 
                id: ${req.params.id} <br/>
                date: ${req.params.date}`);
});

//과제: 합계구하기
app.get('/sum/:base/:end', function(req, res){
    var base = parseInt(req.params.base);
    var end = parseInt(req.params.end);
    var result = 0;

    for(var i=base; i<=end ; i++){
        result += i;
    }
    res.send(`${base}~${end} sum <br/>
                result: ${result}`);
});

//redirect: 회원가입, 로그인 기능 구현 가능
app.get('/redirection', function(req, res){
    console.log(req.query.site);
    
    var site = req.query.site;

    if(site === 'google'){
        res.redirect("http://www.google.com");
    }
    else if(site === 'naver'){
        res.redirect("http://www.naver.com");
    }
    else if(site === 'daum'){
        res.redirect("http://www.daum.net");
    }
});



//Login.html 로그인 라우팅
app.post('/loginCheck', function(req, res){


});




//express app 실행
app.listen(port, function(){

    console.log(`${port}포트로 서버 실행`);
    
});