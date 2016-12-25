
    chrome.browserAction.onClicked.addListener(function(tab) {
        // No tabs or host permissions needed!
        console.log('Turning ' + tab.url + ' red!');
        chrome.tabs.executeScript({
            code: 'document.body.style.backgroundColor="pink"'
        });
    });
    function test1() {
    	console.log("这个方法是从bg.js过去的")
    }
    var vw=chrome.extension.getViews();
    console.log("view",vw);

