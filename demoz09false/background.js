/**
 * Created by icourt on 2016/12/27.
 */



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var status = request.status;
        switch (status) {
            //监听来自content.js的消息:前往收藏夹
            case "goToCollection": {

                break;
                //sendResponse({"farewell":"验证响应"});
            }

        }
    });



//处理IE兼容
function createXmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return new XMLHttpRequest();
    }
}

//发送请求的函数
function SendRequestAndGetContent(options) {
    var result="";
    //创建请求对象
    var xhr=createXmlHttpRequest();



    return result;
}

function SendRequestAndGetContent(method, url, headers, postparam, mime, async, cb, tmHandler) {	//发http请求的函数
    try {
        var rval = '';


        var sendRqst = function() {
            xmlHttpRequest = createXmlHttpRequest();
            xmlHttpRequest.onreadystatechange = getcontent; //名字要和下面的方法名字相同
            xmlHttpRequest.open(method, url, async ? true: false);
            /*if (headers && headers.length) {
             for (var i = 0; i < headers.length; i++) {
             xmlHttpRequest.setRequestHeader(headers[i][0], headers[i][1]);
             }
             }*/
            if (async && tmHandler) { //20160608增加timeout控制，但xhr lv2规定 只有当异步请求时timeout才管用
                xmlHttpRequest.timeout = tmHandler.timeout;
                xmlHttpRequest.ontimeout = tmHandler.ontimeout;
            }
            if (headers) {
                for (var i in headers) {
                    xmlHttpRequest.setRequestHeader(i, headers[i]);
                }
            }
            if (mime) {
                xmlHttpRequest.overrideMimeType("'" + mime + "'");
            }
            xmlHttpRequest.send(postparam || null);
        };

        var getcontent = function() {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                rval = xmlHttpRequest.responseText;
                if (cb && typeof(cb) === "function") {
                    rval = cb(xmlHttpRequest, rval);
                } else if (cb && typeof(cb) !== 'function') {
                    chrome.tabs.query({
                            active: true,
                            currentWindow: true
                        },
                        function(tabs) {
                            if (tabs.length) {
                                chrome.tabs.sendMessage(tabs[0].id, {
                                    'status': 'showDlg',
                                    'type': 'warn',
                                    'con': '未定义回调函数！'
                                });
                            }
                        });
                    xmlHttpRequest = null;
                    return '';
                }
                xmlHttpRequest = null;
            } else {
                return '';
            }
        };
        sendRqst();
    } catch(e) {
        //alert(e.message);
    }
    return rval;
}