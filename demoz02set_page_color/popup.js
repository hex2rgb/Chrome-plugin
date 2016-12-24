// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
	//这个是对当前打开的窗口进行操作,
	//事件处理函数在下面的
    chrome.tabs.executeScript(
        null, { code: "document.body.style.backgroundColor='" + e.target.id + "'" }
    );
    // window.close();
    console.log(this.id)
}

document.addEventListener('DOMContentLoaded', function() {
	//这里面操作的div是popup中的页面
	//通过给当前页面中的div注册事件并且通过chrome.tabs对象操作当前打开页面中的dom
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
