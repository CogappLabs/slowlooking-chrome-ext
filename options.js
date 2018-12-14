// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function showCurrent() {
  chrome.storage.sync.get('display_mode', function(data) {
    // console.log('display: ' + data.display_mode);
    let radiobtn = document.getElementById(data.display_mode);
    radiobtn.checked = true;
  });

}

function detectOptions() {
  for (let item of document.options.display_options) {
    // console.log('in ' + item)
    item.addEventListener('click', function() {
      // console.log('display mode is ' + item.value);
      chrome.storage.sync.set({display_mode: item.value}, function() {
        console.log('display mode set to ' + item.value);
      })
    });
  }
}
showCurrent();
detectOptions();
