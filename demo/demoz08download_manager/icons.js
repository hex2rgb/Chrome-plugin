// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

window.onload = function() {
  var download = document.getElementById('download');
  download.onclick = function() {
  	//当这个页面中的那妞被点击的时候就发送一个按键,那边接收到做一些列事情
    chrome.runtime.sendMessage('icons');
    download.disabled = true;
    return false;
  };
};
