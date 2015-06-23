'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.inject && sender.tab) {
    // Show the page action on the omnibar with the right icon type
    chrome.storage.sync.get({
      active: true
    }, function(response) {
      chrome.pageAction.setIcon({
        tabId: sender.tab.id,
        path: {
          '19': '/images/icon-'+ (response.active ? '19.png' : 'inactive-19.png'),
          '38': '/images/icon-'+ (response.active ? '38.png' : 'inactive-38.png')
        }
      });
      chrome.pageAction.show(sender.tab.id);
    });
    sendResponse({});
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get({
    active: true
  }, function(response) {
    chrome.storage.sync.set({
      active: !response.active
    });
  });
  chrome.tabs.reload(tab.id);
});
