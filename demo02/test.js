(function($) {
    //这个里面不能写入口函数,不知道为什么,
    //写了入口函数的话里面的代码不会执行,
    //并且入口函数外面下面的得吗也不能执行
    setTimeout(function() {
        document.getElementById('kw').style.backgroundColor = "rgba(0,255,0,.8)";
    }, 1500)
    console.log(12)
    console.log($)
    console.log(1)
})(jquery)
