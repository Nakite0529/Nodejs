exports.template = function(page, query1,query2){
    return `<html>
    <head>
    <meta charset='utf-8'></head>
    <body><font size='7' color='red'> ${page} Page!</font>
    <br>사용자가 보내주는 QuertString1 : ${query1} 
    <br>사용자가 보내주는 QuertString2 : ${query2} 
    </body><html>`;
 }

 // 응답하는 HTML 코드를 만들어주는 함수(return)

exports.table = function(td){
    var res = "";
    for(var i=1; i<=td; i++){
        res += "<td>" + i + "</td>";
    }
    return res;
}