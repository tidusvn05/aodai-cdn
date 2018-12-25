jQuery(document).ready(function(){
	setTimeout(function(){ 
		var w_win = jQuery(window).width();
		var w_container = (jQuery(window).width()-1180)/2;
		var w_furn_bg = jQuery(window).width()-jQuery('.furn-bg').width();
		var w_furn_warp = w_furn_bg-w_container;
		jQuery('.furn-warp').css('width',w_furn_warp);

	}, 1000);

	jQuery('.content-list-warp .content-list-item:odd').css('float','right');

	$("#owl-demo").owlCarousel({
		autoPlay: 7000,
		// items : 1,
		// itemsDesktop : [1199,1],
		// itemsDesktopSmall : [979,1],
		// itemsTablet: [1024,1],
	 	// itemsTabletSmall: false,
	 	// itemsMobile : [479,1],
	 	singleItem:true,
	});
});

function startParallax(){
	var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
	var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
	var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
	var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
	var isWebOS = /webos/i.test(navigator.userAgent.toLowerCase());

	endScroll = 6200;
    
	if(!isAndroid && isiDevice==false && isBlackBerry==false && isWindowsPhone==false && isWebOS==false){
		var s = skrollr.init({
			constants:{
				end: endScroll
			},
			render: function(data){
				//console.log(data.curTop);
			}
		});
	}
}

function gotoDiv(){
	var r = jQuery("html, body");
	var top_work=jQuery('.work').offset().top;

	r.animate({
		scrollTop: top_work,
	},2000)
}

(function (){
    var els = [	'section', 'article', 'hgroup', 'header', 'footer', 'nav', 'aside', 
	'figure', 'mark', 'time', 'ruby', 'rt', 'rp' ];
    for (var i=0; i<els.length; i++){
        document.createElement(els[i]);
    }
})();

















