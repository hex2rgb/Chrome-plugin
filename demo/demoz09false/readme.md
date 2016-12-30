### 功能划分
- 登录功能
- 收藏功能


### 功能模块详解

- background.js定义数据操作逻辑，包括启动时的初始化和运行时的读写逻辑
- storage.js定义数据存储逻辑，通过chrome.storage.sync API实现持久化数据的真正读写
- options.js定义options.html页面的内容
- popup.js定义popup.html页面的内容
- utils.js定义通用的JS函数
- jquery-min.js第三方jQuery类库


目录结构

Alpha-----
         |--css //通用样式
         |
         |--icon //图标
         |
         |--images //用到的一些图片资源
         |
         |--popup //弹出层页面结构,以及逻辑,样式
         |
         |--script //三方类库,插件         |
         |
         |--background.js //数据操作逻辑
         |
         |--content.js //页面操作逻辑
         |
         |--mansfest.json









