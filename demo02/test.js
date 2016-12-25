(function() {
    //这个里面不能写入口函数,不知道为什么,
    //写了入口函数的话里面的代码不会执行,
    //并且入口函数外面下面的得吗也不能执行
    // setTimeout(function() {
    //     document.getElementById('kw').style.backgroundColor = "rgba(0,255,0,.8)";
    //     $("div").animate({
    //     	width: 	100,
    //     	height: 100},
    //     	1000, function() {
    //     		console.log("动画执行完毕")
    //     });
    // }, 10000000000000000000)
    // console.log("这是content打出来的页面")
    // console.log($)
    $("<div id='new' style='color:red;width:50px;height:200px'>新添加的div</div>").appendTo('body')
    // $("#new").click(function () {
    // 	alert(1)
    // })
})()
