var express = require('express'); //express모듈
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express(); //express app생성
var port = 3000;

/*미들웨어: 어떤 라우터에게 요청을 하든 무조건 동작하는 기능*/
// app.use(function(req, res, next){
//     console.log("1st middleware!");
    
// });

// app.use(function(req, res, next){
//     console.log("2nd middleware!");
    
// });

/*post방식: 패킷(바디)값이 서버로 넘어올 때 패킷(바디)값을 해석, 인코딩: application/x-www-form-unencoded)*/
//미들웨어
app.use(bodyParser.urlencoded({extended:false}));

//signup.html 라우터
app.post('/signup', function(req, res){

    var id = req.body.id;
    var pw = req.body.pw;
    var nickname = req.body.nick;

    /*mysql에 인증하기 위한 계정 보내기*/
    //createConnection메소드가 mysql의 soft DB에 접근하여 아래 user정보를 인증 후 DB연결 리턴
    var conn = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : '1234',
        port : '3306',
        database : 'soft'
    });
    /*mysql 연결*/
    conn.connect();
    
    /*query 보내기*/
    //conn.query는 sql이 성공하면 rows, 실패하면 err
    var sql = "insert into member values (?, ?, ?)";
    conn.query(sql, [id, pw, nickname], function(err, rows){
        if(!err){
            console.log("insert query successed");
            res.send(`<h1>signup successed</h1> 
                        <h3>welcome ${id}!</h3> 
                        ID: ${id}<br/>
                        PW: ${pw}<br/>
                        Nickname: ${nickname}<br/>`);
        }else{
            console.log("insert query failed");
            console.log(err);
            
        } 
        
    });
    //time-out: 다수 사용자가 해당 DB에 동시 접속하기 때문에 한 사람의 작업이 끝나면 DB연결을 끊어야 한다. 
    conn.end();

});

//Login.html 로그인 라우팅
app.post('/loginCheck', function(req, res){

    var id = req.body.id;
    var pw = req.body.pw;
    
    var conn = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : '1234',
        port : '3306',
        database : 'soft'
    });
    conn.connect();

    var sql = "select * from member where id=? and pw=?";
    conn.query(sql, [id, pw], function(err, rows) {
        if(rows[0]){
            if(rows[0].pw === pw){
                res.redirect("http://127.0.0.1:5500/0519/LoginS.html")
            }
            else{
                res.redirect("http://127.0.0.1:5500/0519/LoginF.html")
            }
        }else{

            res.redirect("http://127.0.0.1:5500/0519/LoginF.html")
        } 
    });
    conn.end();

});


app.post('/selectSingle', function (req, res) {
   var id = req.body.id;
   
   var conn = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : '1234',
        port : '3306',
        database : 'soft'
    });
    conn.connect();

    var sql = "select * from member where id=?";
    conn.query(sql, [id], function(err, rows) {
        if(!err){
            console.log("selected: ", rows[0].id);
            console.log(rows);
            res.send(`ID: ${rows[0].id}<br/> exists`);
        }else{
            console.log("select failed");
            console.log(err);
        } 
    });
});
app.post('/selectAll', function (req, res) {
    var id = req.body.id;
    
    var conn = mysql.createConnection({
         host: 'localhost',
         user : 'root',
         password : '1234',
         port : '3306',
         database : 'soft'
     });
     conn.connect();
 
     var sql = "select * from member";
     var body = "";
     conn.query(sql, function(err, rows) {
         if(!err){
             console.log("select success", rows);
             for(var i=0; i<rows.length; i++){
                 body += "${rows[i].id} <br/>";
             }
             res.send(`<h1>All Members</h1>
                        ${rows[0]}<br/>
                        ${rows[1]}<br/>
                        ${rows[2]}<br/>`);
         }else{
             console.log("select failed");
             console.log(err);
         } 
     });
 });

//signup.html 라우터
app.post('/signup', function(req, res){

    var id = req.body.id;
    var pw = req.body.pw;
    var nickname = req.body.nick;

    /*mysql에 인증하기 위한 계정 보내기*/
    //createConnection메소드가 mysql의 soft DB에 접근하여 아래 user정보를 인증 후 DB연결 리턴
    var conn = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : '1234',
        port : '3306',
        database : 'soft'
    });
    /*mysql 연결*/
    conn.connect();
    
    /*query 보내기*/
    //conn.query는 sql이 성공하면 rows, 실패하면 err
    var sql = "insert into member values (?, ?, ?)";
    conn.query(sql, [id, pw, nickname], function(err, rows){
        if(!err){
            console.log("insert query successed");
            res.send(`<h1>signup successed</h1> 
                        <h3>welcome ${id}!</h3> 
                        ID: ${id}<br/>
                        PW: ${pw}<br/>
                        Nickname: ${nickname}<br/>`);
        }else{
            console.log("insert query failed");
            console.log(err);
            
        } 
        
    });
    //time-out: 다수 사용자가 해당 DB에 동시 접속하기 때문에 한 사람의 작업이 끝나면 DB연결을 끊어야 한다. 
    conn.end();

});

app.post('/delete', function(req, res){
    var id = req.body.id;

    var conn = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : '1234',
        port : '3306',
        database : 'soft'
    })

    var sql = "delete from member where id= ?";
    conn.query(sql, [id], function(err, rows){
        if(!err){
            console.log("delete successed");
            res.send(`<h1>Delete successed</h1>
                        ${id} deleted`);
        }else{
            console.log("delete failed");
            console.log(err);
        }
    });
    conn.end();
});

app.post('/update', function(req, res){
    var id = req.body.id;
    var pw = req.body.pw;

    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password : '1234',
        database: 'soft'    
    });

    var sql = "update member set pw = ? where id = ?";
    conn.query(sql, [pw, id], function(err, rows){
        if(!err){
            console.log("update successed");
            res.send(`ID: ${id} PW changed`);
        }else{
            console.log("update failed");
            console.log(err);
        }
    });
    conn.end();
});




//express app 실행
app.listen(port, function(){

    console.log(`${port}포트로 서버 실행`);
    
});