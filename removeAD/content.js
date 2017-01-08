(function() {
    //监听DOMContentLoaded
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        //request就相当于一个事件,当触发的时候就执行下面代码
        var bgStatus = request.bgStatus;
        switch (bgStatus) {
            case "rmAd":
                {
                    console.log("content监听到bg的请求")
                    //响应bg的请求
                    //操作页面逻辑=========================================================================================
                    //删除页面iframe
                    rmIframe();
                    var result = found();
                    rmGIF(result);
                    sendResponse();
                    break;
                }
        }
    });
}());
//移除iFrame
function rmIframe(argument) {
    console.log("打印iframe", document.querySelector("iframe"));
    if (document.querySelector("iframe")) {
        $("iframe").remove();
        console.log("iframe移除完成")
    }
}

//查找字段
/**
 * [found description]
 * @param  {[type]} text [description]
 * @return {[type]}      [返回需要删除的数组]
 */
function found(text) {
    var arr = [];
    $("*").each(function(index, val) {
        var src = $(val).attr("src");
        var target=$(val).attr("target");
        var style = $(val).attr("style");
        //匹配到有target属性,删除父节点
        /*if (target) {
            if()
            arr.push(val);
            $(val).parent().remove();
        }*/
        //匹配到src的时候判断是否有gif字段,当match的时候就删除;
        if (src && src.match(/.\gif/) && src.match(/.\gif/)[0]) arr.push(val);
        //匹配到含有close的src就模拟点击
        setTimeout(function() {
                if (src && src.match(/close/) && src.match(/.\gif/)[0]) {
                    arr.push(val);
                    close(val);
                }
            }, 100)
            //当匹配到style的时候match bottom删除,z-index的时候判断层级大于9999删除
        if (style) {
            //去掉空格
            style = style.replace(/\s/g, "");
            //匹配z-index
            var styleZindex = style.match(/z-index:(\d*)/g);
            if (styleZindex && (styleZindex[0].substr(8) > 999)) {
                // console.log(styleZindex[0].substr(8))
                arr.push(val);
            }
            if (style.match(/bottom/)) {
                arr.push(val);
            }
        }
    })
    console.log(arr)
    return arr;
}
//递归查找父元素删除
// 如果父元素是body直接删除上一级,然后return
//否则继续递归
//遍历删除gif广告
function rmGIF(res) {
    if (res.length > 15) return;
    if (!res) return;
    $(res).each(function(index, val) {
        $(val).remove();
    })
}

//注册自动点击事件
function close(obj) {

    obj.click();
}

