// 실제 database 역할
var conn = require('./config_database.js')

exports.join = function(req, res) {

    var id = req.body.id;
    var pw = req.body.pw;
    var nick = req.body.nickname;

    var sql = "insert into member values(?, ?, ?)"


    conn.query(sql, [id, pw, nick], function(err, rows){
        if(!err) {
            console.log("입력성공!")
        } else {
            console.log("입력실패!"+err);
        }
    }); // DB에 쿼리를 전송

    conn.end();

    res.send("DB 연결 성공!");
}

exports.delete = function(req, res) {

    var id = req.query.id;
    console.log("삭제ID값 : " + id);

    var sql = "delete from member where id = ?";


    conn.query(sql, [id], function(err, rows){
        if(!err) {
            console.log("삭제성공!");
            //res.redirect("http://localhost:3000/AllSelect")
        } else {
            console.log("삭제실패!"+err);
        }
    }); // DB에 쿼리를 전송

    //conn.end();


}

exports.update = function(req, resp) {

    var id = req.body.id;
    var pw = req.body.pw;

    var sql = "update member set pw = ? where id = ?"


    conn.query(sql, [pw, id], function(err, rows){
        if(!err) {
            console.log("수정성공!")
        } else {
            console.log("수정실패!"+err);
        }
    }); // DB에 쿼리를 전송

    conn.end();

    res.send("DB 연결 성공!");
}

exports.oneSelect = function(req, res) {

    var id = req.body.id;

    var sql = "select * from member where id = ?";


    conn.query(sql, [id], function(err, rows){
        if(!err) {
            res.send(rows[0].id + rows[0].pw + rows[0].nickname);
        } else {
            res.send("검색실패!"+err);
        }
    }); // DB에 쿼리를 전송

    conn.end();
}

exports.allSelect = function(req, res) {

    var sql = "select * from member"


    conn.query(sql, function(err, rows){
        if(!err) {
            res.render('AllSelect',{
                rows: rows,
                user : req.session.user

            
            });


            // res.write('<html>')
            // res.write('<body>')
            // res.write('<table border=1>')

            // for (var i = 0; i <rows.length; i++) {
            //     res.write('<tr>')
            //     res.write('<td>')
            //     res.write(rows[i].id)
            //     res.write('</td>')
            //     res.write('<td>')
            //     res.write(rows[i].nickname)
            //     res.write('</td>')
            //     res.write('</tr>')
            // }
            // res.write('</table>')
            // res.write('</body>')
            // res.write('</html>')
            // res.end();
        
        } else {
            res.send("검색실패!"+err);
        }
    }); // DB에 쿼리를 전송

    conn.end();
}

exports.loginCheck = function(req, res) {

    var id = req.body.id;
    var pw = req.body.pw;

    var sql = "select * from member where id = ? and pw = ?"


    conn.query(sql, [id, pw], function(err, rows){
        if(!err) {
            console.log(rows)
            //res.redirect("http://127.0.0.1:5500/0429/LoginS.html");
            res.render('LoginS',{id : id})
        } else {
            res.redirect("http://127.0.0.1:5500/0429/LoginF.html");
        }
    }); // DB에 쿼리를 전송

    //conn.end();

    //res.send("DB 연결 성공!");
    
}