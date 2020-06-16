//mysql 모듈 가져오기
var mysql = require('mysql');

//mysql 계정 인증
var conn = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '1234',
    port : '3306',
    database : 'soft'
});

//conn 연결정보 express.js로 넘겨주기
//변수를 가져오고 싶을 때
module.exports = conn;