
    //点击事件的处理函数
    var v=new Date();
    function _click(e) {
        chrome.tabs.executeScript(
            null, { code: "document.body.style.backgroundColor='" + this.className + "'" }
        );
        //console.log(this.className);
    }
    document.addEventListener('DOMContentLoaded', function() {
        //这个里面的页面加载时间是popup页面中的加载时间;
        //与浏览器中显示的页面没有关系
        //这个入口函数只针对于扩展程序中的的弹出页面
        //这里面操作的div是popup中的页面
        //通过给当前页面中的div注册事件并且通过chrome.tabs对象操作当前打开页面中的dom
        // var lis = document.querySelectorAll('li');
        // for (var i = 0; i < lis.length; i++) {
        //     lis[i].addEventListener('click', _click);
        //}
        //console.log("test $====",$);
        $("li").mouseenter(_click);
        console.log(new Date()-v);
    });
    function testPopup() {
        console.log("this is popup.js")
    }

    var bg=chrome.extension.getBackgroundPage();
    console.log("popup.js",bg);

