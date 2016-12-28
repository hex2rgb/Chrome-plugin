/**
 * Created by icourt on 2016/12/27.
 */



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var status = request.status;
        switch (status) {
            //监听来自content.js的消息:前往收藏夹
            case "goToCollection":
                {
                    //调用请求函数
                    break;
                    //sendResponse({"farewell":"验证响应"});
                }

        }
    });





/**
 * [createXmlHttpRequest 处理IE兼容]
 * @return {Object} xhr对象
 */
function createXmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return new XMLHttpRequest();
    }
}




/**参照1.0方法重新封装
 * [SendRequestAndGetContent 发送请求并且拿到数据]
 * @param {Object} options []
 * @param {String} options.method 提交方式
 * @param {String} options.url    提交地址
 * @param {Object} options.header 请求头
 * @param {String} options.postparam post提交参数
 * @param {String} options.async  false同步,true异步
 * @param {String} options.cb     回调函数
 * @param {Object} options.timeoutHandle.timeout 响应超时
 * @param {Object} options.timeoutHandle.ontimeout 响应超时处理程序
 * @param {Object} options.mime 覆盖浏览器头部信息 . 来自服务器的响应没有 XML mime-type 头部(header)，则一些版本的 Mozilla浏览器不能正常运行。对于这种情况，httpRequest.overrideMimeType('text/xml'); 语句将覆盖发送给服务器的头部，强制 text/xml 作为 mime-type。  
 * 
 */
function SendRequestAndGetContent(options) {
    var result = "";
    //创建请求对象
    var xhr = createXmlHttpRequest();

    //监听事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            } else {
                //请求失败
                return "请求失败"

            }
        }
    };
    //设置请求头
    if (options.header) {
        for (var key in option.header) {
            xhr.setRequestHeader(key, option.header[key]);
        }
    }
    //设置timeout控制，但xhr lv2规定 只有当异步请求时timeout才管用
    if (options.async && options.timeoutHandle) {
        xhr.timeout = options.timeoutHandle.timeout;
        xhr.ontimeout = options.timeoutHandle.ontimeout;
    }
    if (options.mime) {
        xhr.overrideMimeType("'" + options.mime + "'");
    }
    //启动端口以备发送
    xhr.open(options.method, options.url, options.async ? true : false);

    //发送数据
    xhr.send(options.postparam || null);
    return result;
}


//1.0版本请求方法参照,=============================
function SendRequestAndGetContent(method, url, headers, postparam, mime, async, cb, tmHandler) { //发http请求的函数
    try {
        var rval = '';
        var sendRqst = function() {
            xmlHttpRequest = createXmlHttpRequest();
            xmlHttpRequest.onreadystatechange = getcontent; //名字要和下面的方法名字相同
            xmlHttpRequest.open(method, url, async ? true : false);
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
                    chrome.tabs.query({ active: true, currentWindow: true },
                        function(tabs) {
                            if (tabs.length) {
                                chrome.tabs.sendMessage(
                                    tabs[0].id, { 'status': 'showDlg', 'type': 'warn', 'con': '未定义回调函数！' }
                                );
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
    } catch (e) {
        //alert(e.message);
    }
    return rval;
}
//1.0版本请求方法参照,=============================