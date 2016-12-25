# 坑儿
- 关于background.js有了popup页面的话那么在往browser上线注册事件是不行的
- 右键图标"审查弹出内容",如果没有popup页面的话那么这个选项就是灰色的,同理选项页面如果没有的话那么也是灰色的,都需要在manifest中注册
- "permissions": [
        "<all_urls>",//这个选项会有在扩展中"允许访问文件网址"
    ]
- "背景页"是background.js中的调试窗口
- 右键图标是popup.js的调试窗口
- content_script在页面f12中调试

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
#### background.js与popup.js
```
//background.js

function test(){
    alert("test");
}
---
//popup.js
// 先获取background页面
var bg = chrome.extension.getBackgroundPage();
//再在返回的对象上调用background.js 里面的函数
bg.aa();

```


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

# 乱七八糟的API
- window.close();控制窗口打开关闭

# 关于页面交互逻辑

### background.js



# 配置文档

```
{
  // 必选
  "manifest_version": 2,
  "name": "我的扩展程序",
  "version": "版本字符串",

  // 推荐
  "default_locale": "en",
  "description": "纯文本描述",
  "icons": {...}, // 您一定要提供一个 128×128 大小的图标，用与安装过程中以及 Chrome 网上应用店。扩展程序同时应该提供一个 48×48 大小的图标，用于扩展程序管理页面（chrome://extensions）。您也可以再指定一个 16×16 大小的图标，用于扩展程序页面的收藏夹图标，16×16 的图标也将显示在实验性的扩展程序信息栏中。

  // 选择某一个（或者无）
  "browser_action": {...},//浏览器标识
  "page_action": {...},//浏览器页面标识

  // 可选
  "author": ...,
  "automation": ...,
  "background": {
    // 推荐
    "persistent": false //是否使用事件触发背景页面程序
  },
  "background_page": ..., //background.html页面
  "chrome_settings_overrides": {...},//修改chrome的浏览器设置比如说主页
  "chrome_ui_overrides": {
    "bookmarks_ui": {  //书签快捷键
      "remove_bookmark_shortcut": true,
      "remove_button": true
    }
  },
  "chrome_url_overrides": { //替代页面,将
		"chrome_url_overrides" : {
	    "pageToOverride": "myPage.html"
	  },
  },
  "commands": ...,
  "content_pack": ...,
  "content_scripts": [{//运行在网页的上下文环境中,可以通过标准的DOM文档模型操作页面中的DOM
		{
	      "matches": ["http://www.google.com/*"],
	      "css": ["mystyles.css"],
	      "js": ["jquery.js", "myscript.js"]//这里面的js引入顺序必须在最前面,与页面引用js使用方式一样
	    }
  }],
  "content_security_policy": "策略字符串",//设置安全策略,内嵌的代码块不能执行
  "converted_from_user_script": ...,
  "current_locale": ...,
  "devtools_page": ...,
  "externally_connectable": {//链接我不应用程序
  	 "externally_connectable": {
  	   // 扩展程序与应用的标识符。如果没有指定该字段，
  	   // 任何扩展程序或应用都无法连接。
  	   "ids": [
  	     "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  	     "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  	     ...
  	     // 或者如果要匹配所有扩展程序和应用，只需要指定 "*"。
  	     "*"
  	   ],
  	   // 网页的匹配表达式，不影响内容脚本。
  	   // 如果没有指定该字段，任何网页都无法连接。
  	   //表达式不能包含通配符域名，也不能包含（有效）顶级域名的子域名。
  	   例如 *://google.com/* 和 http://*.chromium.org/* 是有效的，
  	   但 <all_urls>、http://*/*、*://*.com/* 甚至是 http://*.appspot.com/* 就不行。
  	   "matches": [
  	     "https://*.google.com/*",
  	     "*://*.chromium.org/*",
  	     ...
  	   ],
  	   // 表示扩展程序需要使用连接到它的网页的
  	   // TLS 通道标识符，网页也必须将 runtime.connect 的
  	   // connectInfo 或 runtime.sendMessage 的 options
  	   // 中的 includeTlsChannelId 设置为 true。
  	   "accepts_tls_channel_id": false
  	 }
  },
  "file_browser_handlers": [...],//只适用于chrome OS上传图片等
  "homepage_url": "http://path/to/homepage",//该扩展程序的主页 URL
  "import": ...,
  "incognito": "spanning 或 split",//隐身行为
  "input_components": ...,
  "key": "公钥",
  "minimum_chrome_version": "版本字符串",//扩展程序、应用或主题背景需要的 Chrome 浏览器版本，如果有任何要求的话。该字符串的格式与 version 字段相同
  "nacl_modules": [...],
  "oauth2": ...,
  "offline_enabled": true,//离线状态下是否可用
  "omnibox": {

  /**
   * "omnibox": { "keyword" : "aaron" },
   *   "icons": {
   *       "16": "16-full-color.png"
   * },
   */
  
    "keyword": "aString"
  },
  "optional_permissions": ...,
  "options_page": "aFile.html",//选项页面html
  "page_actions": ...,
  "permissions": [...],//需要使用的API
  "platforms": ...,
  "plugins": [...],
  "requirements": {...},
  "sandbox": [...],//沙箱
  "script_badge": ...,
  "short_name": "短名称",
  "signature": ...,
  "spellcheck": ...,
  "storage": {
    "managed_schema": "schema.json"//属性指定扩展程序中包含策略架构的文件
  },
  "system_indicator": ...,
  "tts_engine": ...,
  "update_url": "http://path/to/updateInfo.xml",
  "web_accessible_resources": [...] //给网页提供资源
}

```









