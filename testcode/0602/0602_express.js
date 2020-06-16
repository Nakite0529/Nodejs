var express = require('express'); //express모듈
var bodyParser = require('body-parser');
/*템플릿 엔진 중에서 ejs모듈 사용*/
var ejs = require('ejs');

var app = express(); //express app생성

var port = 3000;


/*post방식: 패킷(바디)값이 서버로 넘어올 때 패킷(바디)값을 해석, 인코딩: application/x-www-form-unencoded)*/
//미들웨어
app.use(bodyParser.urlencoded({extended:false}));

/*view엔진에서 중 ejs 사용을 지정 */
app.set('view engine', 'ejs')

//express app 실행
app.listen(port, function(){

    console.log(`${port}port server...`);
    
});

app.get('/', function (req, res) {
    
    //??
    res.render('index', {
        num : 5
    });
});

//mysql모듈 가져오기, config_db.js에서 최종적으로 exports한 모듈을 반환
var conn = require('./config_db.js');

//sql실행
var func = require('./func_db.js');


//회원가입 라우터 - signup.html
app.post('/signup', function(req, res){

    func.insert(req, res);

});

//로그인 라우터 - login.html
app.post('/loginCheck', function(req, res){

    func.loginCheck(req, res);

});


app.post('/selectSingle', function (req, res) {
   
    func.select(req, res);

});
app.post('/selectAll', function (req, res) {
    
    func.selectAll(req, res);

});

app.post('/delete', function(req, res){
    
    func.delete(req, res);

});

app.post('/update', function(req, res){
    
    func.update(req, res);

});

app.post('/td', function (req, res) {
    res.render('index', {
        num : req.body.num
    })    
})
