#### 功能简介
- 这个示例会在你打开百度页面的时候,将百度的首页修改为粉色
- 将中间input背景色修改为红色
#### 文档结构
- manifest.json (重要)配置文件,这个文件是整体的配置文件,是必不可少的,后面会详细的解释每一条的含义
- icon.png 是用来显示右上角的小图标图片大熊啊是19X19,
- mystyles.css 当百度页面加载后会从总读取样式,即将背景色修改为 pink
- test.js 用来操作百度页面中的 dom ,
-  
#### manifest.jsonp 配置文件
```
{  

    "manifest_version": 2,//文件版本,固定值
    "name": "测试插件",//插件名称
    "version": "1.0",//插件版本,不能有中文
    "description": "插件没描述",//插件描述
    "browser_action": { //在浏览器中显示,区别于在地址栏右侧的图标
        "default_icon": "icon.png"//显示的图标
    },
    "permissions": [//权限配置,不知道有什么用, 删掉了之后,这个插件功能完好,后续会如何配置
        "http://*/",
        "bookmarks",
        "tabs",
        "history"
    ],
    "content_scripts": [{
        "matches": ["https://www.baidu.com/"],//匹配到该网址之后会执行后面的 css, 和 js
        "css": ["mystyles.css"],
        "js": ["test.js"]
    }]
}
```