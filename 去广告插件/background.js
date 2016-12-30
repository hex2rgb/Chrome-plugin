// chrome.browserAction.onClicked.addListener(function(tab) {
//     // No tabs or host permissions needed!
//     console.log('Turning ' + tab.url + ' red!');
//     chrome.tabs.executeScript({
//         code: 'document.body.style.backgroundColor="pink"'
//     });
// });
// function test1() {
//     console.log("这个方法是从bg.js过去的")
// }
// var vw = chrome.extension.getViews();
// console.log("view", vw);
// fn();


chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("backgroundjs执行");
    chrome.tabs.query(
      {active: true, currentWindow: true},
      function(tabs) {
          chrome.tabs.sendMessage(
              tabs[0].id,
              {"bgStatus": "rmAd"},
              function(response) {
                  console.log("接收到contentjs的响应");
              });
  });

});
