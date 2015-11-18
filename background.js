// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "jquery.min.js"});
  chrome.tabs.executeScript(null, {file: "getimages.js"});
  chrome.tabs.insertCSS(null, {file: "getimages.css"});

});