## 不得不理清的几个概念
### 架构

#### 后台网页
- 浏览器按钮与页面按钮都有后台页面
- 后台页面分为:事件页面与后台网页

##### 浏览器按钮
- 显示在浏览器中.
 
##### 页面按钮
- 显示在地址栏中,只有访问相应的页面的时候才显示


#### 用户界面网页

### 页面通信


### content_script
- content_script视为当前页面文档的一部分
- 可以操作当前页面DOM
```
 "content_scripts": [{
     "matches": ["https://www.baidu.com/"],
     "css": ["mystyles.css"],
     "js": ["test.js","../node_modules/jquery/dist/jquery.min.js"]
 }]

```

### browser_action 
- 通过下面的代码也可以操作指定页面的DOM
```
chrome.tabs.executeScript(
    null, { code: "document.body.style.backgroundColor='" + this.className + "'" }
);
```

```
//manifest.json
"browser_action": {
    "default_icon": "icon.png",
    "default_title": "click",
    "default_popup": "popup.html"

}
//popup.html里面可以引用jQuery,

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
        console.log("test==",$);
        $("li").click(_click);
    });

}())

```

### background.js

`运行在后台的页面`


- 这个是一直运行在后台的注册方式

```
{

	"background": {
	"scripts": [myBackgroundPage.js],
	"persistent": true
}

```

- 这个是页面事件的注册方式,通过时间的方式去触发bg.js运行

```
{

	"background": {
	"scripts": [myEventPage.js],
	"persistent": false

}
```

### all_frames
- 控制JS文件是否在匹配的Web页面中的所有框架中运行。默认false表示只在顶层框架中运行

## 小结 
### background页面
- 有两种方式,一种是一直运行在后台(一直运行子啊内存中)
- 另一种是通过事件触发


### content_script
- 其运行在页面的上下文环境中,可以操作当前页面中的DOM

### popup.html
- 是扩展的页面点击点击就会出来的那种
- 可以引入jQuery并且使用



