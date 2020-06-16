var conn = require('./config_db.js');

//(함수)기능을 모듈에서 가져오고 싶을 때
exports.insert = function(req, res){

    var id = req.body.id;
    var pw = req.body.pw;
    var nickname = req.body.nick;

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
}

exports.loginCheck = function(req, res){

    var id = req.body.id;
    var pw = req.body.pw;

    var sql = "select * from member where id=? and pw=?";
    conn.query(sql, [id, pw], function(err, rows) {
        if(rows[0]){
            res.redirect("http://127.0.0.1:5500/0519/LoginS.html");
        }else{
            console.log(rows[0]);
            res.redirect("http://127.0.0.1:5500/0519/LoginF.html");
        } 
    });
}

exports.delete = function(req, res){
    var id = req.body.id;

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
}

exports.update = function(req, res){
    var id = req.body.id;
    var pw = req.body.pw;


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
}

exports.select = function(req, res){
    var id = req.body.id;

    var sql = "select * from member where id=?";
    conn.query(sql, [id], function(err, rows) {
        if(rows[0]){
            console.log("selected: ", rows[0].id);
            console.log(rows);
            res.send(`ID: ${rows[0].id}<br/> exists`);
        }else{
            console.log("select failed");
            console.log(err);
        } 
    });
}

exports.selectAll = function(req, res){
     var sql = "select * from member";
     
     conn.query(sql, function(err, rows) {
         if(!err){
            // for(var i=0; i<rows.length; i++){
            //     res.write(rows[i].nickname);
            // }
             res.write('<html>');
             res.write('<body>');
             res.write('<table border=1>');

             console.log("selectAll success", rows);
             
             for(var i=0; i<rows.length; i++){
                res.write('<tr>');
                res.write('<td>');
                res.write(rows[i].id);
                res.write('</td>');
                res.write('<td>');
                res.write(rows[i].nickname);
                res.write('</td>');
                res.write('</tr>');
             }
             res.write('</table>');
             res.write('</body>');
             res.write('</html>');
            //  //위의 누적 결과를 end로 설정해줘야 함. 
             res.end();
         }else{
             console.log("select failed");
         } 
     });
}