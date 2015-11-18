$('body').append('<div class="image-chooser-overlay"><div class="tripidee-instructions">Saving <b>'+document.title+'</b> to Tripidee. Choose an image for this stop:</div></div>');
var imgCounter = 0;
$('img').each(function(i){
	if( imgCounter < 12 ){
		var w = $(this).get(0).naturalWidth;
		var h = $(this).get(0).naturalHeight;
		if( w >= 100 && h >= 100 ){
			imgCounter++;
			var url = 'https://www.tripidee.com/trips/stops/create/from/browser/extension/'+window.btoa(document.title)+'/'+window.btoa(window.location)+'/'+window.btoa($(this).prop('src'));
			//var url = 'http://localhost:3000/trips/stops/create/from/browser/extension/'+window.btoa(document.title)+'/'+window.btoa(window.location)+'/'+window.btoa($(this).prop('src'));
			$('.image-chooser-overlay').append('<div><a href="javascript:window.open(\''+url+'\',\'tripideeWindow\',\'height=560,width=560\',false)"><img src="'+$(this).prop('src')+'" /></a></div>');
		}
	}	  
});