/**
 * Created by icourt on 2016/12/27.
 */

    //对应li设置点击事件
    $(function () {

        //开启收藏
        $("li").eq(0).click(function () {
            console.log("开启收藏夹");
            //发送给contentjs
            chrome.tabs.query(
                {active: true, currentWindow: true},
                function(tabs) {
                    console.log(tabs[0].id)
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        {status: "onCollection"},
                        function(response) {
                            console.log(response.farewell);
                        });
                });
            //点击后关闭窗口
            // window.close()
        })

        //前往收藏夹
        $("li").eq(1).click(function () {
            console.log("前往收藏夹");
            chrome.tabs.query(
                {active: true, currentWindow: true},
                function(tabs) {
                    console.log(tabs[0].id)
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        {status: "goToCollection"},
                        function(response) {
                            console.log(response.farewell);
                        });
                });
            // window.close()
        })

        //退出
        $("li").eq(2).click(function () {
            console.log("退出");
            // window.close()
        })
    })


