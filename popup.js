/**
 * Get the current Page title.
 *
 * @param {function(string)} callback - called when the title of the current tab
 *   is found.
 */
function getCurrentTabTitle(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	
	chrome.tabs.query(queryInfo, function(tabs) {
	    // chrome.tabs.query invokes the callback with a list of tabs that match the
	    // query. When the popup is opened, there is certainly a window and at least
	    // one tab, so we can safely assume that |tabs| is a non-empty array.
	    // A window can only have one active tab at a time, so the array consists of
	    // exactly one tab.
	    var tab = tabs[0];
	
	    // A tab is a plain object that provides information about the tab.
	    // See https://developer.chrome.com/extensions/tabs#type-Tab
	    var title = tab.title;
	    var website = tab.url;
	
	    // tab.url is only available if the "activeTab" permission is declared.
	    // If you want to see the URL of other tabs (e.g. after removing active:true
	    // from |queryInfo|), then the "tabs" permission is required to see their
	    // "url" properties.
	    callback({title:title,website:website});
	});	
}

/*
document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabTitle( function(pageData){
		
		document.body.innerHTML = '<iframe src="http://localhost:3000/trips/stops/create/from/browser/extension/'+encodeURI(pageData.title)+'/'+encodeURIComponent(pageData.website)+'" width="560" height="560">';
		//document.body.innerHTML = '<iframe src="https://tripidee.com/trips/stops/create/from/chrome/button/'+encodeURI(pageData.title)+'/'+encodeURIComponent(pageData.website)+'" width="560" height="560">';
	});
});
*/


(function (ls) {
  /* globals $, jss, chrome */
  /* jshint multistr: true */
  'use strict';

  function initializePopup() {

    // Get images on the page
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, { file: '/send_images.js', allFrames: true });
      });
    });
  }
  var allImages = [];
  var visibleImages = [];
  var linkedImages = {};

  // Add images to `allImages` and trigger filtration
  // `send_images.js` is injected into all frames of the active tab, so this listener may be called multiple times
  chrome.extension.onMessage.addListener(function (result) {
    for (var i = 0; i < result.images.length; i++) {
		if( i < 20 ){
			if (allImages.indexOf(result.images[i]) === -1) {
				allImages.push(result.images[i]);
			}
		}
    }
    getCurrentTabTitle( function(pageData){
    	////console.log( ' IMAGES ???? ', allImages );
		pageData.images = JSON.stringify(allImages);
		var encodedImagesParam = encodeURIComponent( pageData.images );
		////console.log( 'Encoded imagese',encodedImagesParam );
		console.log( '<iframe src="http://localhost:3000/trips/stops/create/from/browser/extension/'+encodeURI(pageData.title)+'/'+encodeURIComponent(pageData.website)+'/'+encodedImagesParam+'" width="560" height="560">' );
		document.body.innerHTML = '<iframe src="http://localhost:3000/trips/stops/create/from/browser/extension/'+encodeURI(pageData.title)+'/'+encodeURIComponent(pageData.website)+'/'+encodedImagesParam+'" width="560" height="560">';
		//document.body.innerHTML    = '<iframe src="https://tripidee.com/trips/stops/create/from/browser/extension/'+encodeURI(pageData.title)+'/'+encodeURIComponent(pageData.website)+'/'+encodedImagesParam+'" width="560" height="560">';
	});
    /*
for( var x = 0; x < allImages.length; x++ ){
	    var img = allImages[x];
	    $('#images_table').append('<img src="'+img+'" width="100">');
    }
*/
  });

  
  $(function () {
    initializePopup();
  });
}(localStorage));
