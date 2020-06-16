var express = require('express'); //express 모듈 로드
var bodyParser = require('body-parser');
var sessionP = require('express-session');

var app = express(); //express app생성
var port = 3000;

var func = require('./func_database.js');

var ejs = require('ejs');


// app.use( function(req,res,next){
//     console.log("첫번째 미들웨어 사용!");
//     next();
// });

// app.use( function(req,res,next){
//     console.log("두번째 미들웨어 사용!");
//     next();
// });
// 어떤 라우터든 실행을 하면 무조건 동작하는 기능 : 미들웨어*

app.use(bodyParser.urlencoded({extended:false}));
app.use(sessionP({
    secret : "nayeon0529",  //session의 암호키값
    resave: false,   //session을 만들 때마다 다른 ID 부여할 건지
    saveUninitialized : true    // session을 사용할 때만 ID 부여할 건지
}));
app.set("view engine","ejs");
//post방식 -> 패킷(바디) 값에 서버로 넘어옴
//패킷(바디)부분을 해석(인코딩 : application/x-www-form-urlencoded) 

app.get('/', function(req,res){
    //웹 페이지에 문자열 데이터 전송

    req.session.user = {
        "name" : "jason",
        "age" : "20"
    };
    console.log("session 저장 완료!")
 
    res.render('review',{
         num : 5,
        //num1 : req.query.num1 // 물어볼 거 
        
        
    });
});
//GET방식 요청에 대한 처리
app.get('/', function(req,res){
    //웹 페이지에 문자열 데이터 전송
    res.send('index 페이지 ...');
});

app.get('/page', function(req,res){
    //QueryString방식
    res.send(`page 페이지 ...${req.query.pageNO}`);
});

app.get('/admin/:id/:Dt', function(req,res){
    //Semantic URL 방식
    res.send(`${req.params.id}<br>${req.params.Dt}`);
});

app.get('/board', function(req,res){
    //웹 페이지에 문자열 데이터 전송
    res.send(`Date: ${req.query.targetDt} <br>board ${req.query.pageNO} Page!`);
});

app.get('/siteMove', function(req,res){
    //redirect 방식 / QueryString 방식

    site=req.query.site

    if(site === 'naver')
    res.redirect("http://www.naver.com");
    else if(site === 'google')
    res.redirect("http://www.google.com");
    else if(site === 'daum')
    res.redirect("http://www.daum.net");
    
});

app.get('/numberSum', function(req,res){
    //QueryString 방식
    start = parseInt(req.query.start);
    end = parseInt(req.query.end);
    sum = 0;
    for(var i=start; i<=end;i++)
        sum+=i;
    

    res.send(`<h1>${req.query.start} ~ ${req.query.end}까지의 합</h1>결과 ${parseInt(sum)}`);
});

app.post('/loginCheck', function(req,res){
    func.loginCheck(req,res);

        
   
});

app.post('/Join', function(req,res){
    func.join(req,res);


});

app.get('/Delete', function(req,res){
    func.delete(req,res);


})


app.post('/Update', function(req,res){
   func.update(req,res);


});


app.get('/AllSelect', function(req,res){
    console.log("현재 session에 있는 user의 이름 : " +req.session.user.name);
   func.allSelect(req,res);

})

app.get('/mail', function(req,res){
    res.render('mail');
 
 });

//express app 실행
app.listen(port,function(){
    console.log(`${port}포트로 서버 실행!`);
});