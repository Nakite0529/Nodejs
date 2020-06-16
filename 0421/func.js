call1();
function call1(){
    console.log("call1 호출!");
} // 함수 선언

var call2 = function(){
    console.log("call2 호출!");
} // 함수 표현
call2(); ///000

var call3= function(){
    return "Hello";
}

var res = call3();

console.log(res);