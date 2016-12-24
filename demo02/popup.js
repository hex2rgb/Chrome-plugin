(function() {
    //点击事件的处理函数
    function _click(e) {
        chrome.tabs.executeScript(
            null, { code: "document.body.style.backgroundColor='" + this.className + "'" }
        );
        console.log(this.className);
    }
    document.addEventListener('DOMContentLoaded', function() {
        //这里面操作的div是popup中的页面
        //通过给当前页面中的div注册事件并且通过chrome.tabs对象操作当前打开页面中的dom
        // var lis = document.querySelectorAll('li');
        // for (var i = 0; i < lis.length; i++) {
        //     lis[i].addEventListener('click', _click);
        // }
        console.log("test $====",$);
        $("li").mouseenter(_click);
    });

}())
