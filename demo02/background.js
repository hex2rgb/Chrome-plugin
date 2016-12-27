
    // chrome.browserAction.onClicked.addListener(function(tab) {
    //     // No tabs or host permissions needed!
    //     console.log('Turning ' + tab.url + ' red!');
    //     chrome.tabs.executeScript({
    //         code: 'document.body.style.backgroundColor="pink"'
    //     });
    // });
    function test1() {
    	console.log("这个方法是从bg.js过去的")
    }
    var vw=chrome.extension.getViews();
    console.log("view",vw);

    chrome.runtime.onMessage.addListener(function(request) {
      //request就相当于一个事件,当触发的时候就执行下面代码
       
      if (request == 'icons') {
            console.log("成功响应")
        } 
    });
    fn();
