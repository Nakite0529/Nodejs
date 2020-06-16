var mysql = require('mysql'); // mysql 모듈 로드 


var conn = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password : 'nayeon0529', 
    port : '3306',
    database : 'software'

});


module.exports = conn;

