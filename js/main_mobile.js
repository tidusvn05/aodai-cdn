$(document).ready(function(){
    jQuery('.navbar-toggle').click(function(){
        var tmp=jQuery('.nav-res');
        if(tmp.is(':hidden') === true){
             tmp.slideDown();
              $('.navbar-toggle').addClass('nav-show');
              $('.wrapper-content').show();
         }else{
            tmp.slideUp();
            $('.navbar-toggle').removeClass('nav-show');
            $('.wrapper-content').hide();
         }
    });

	$('.wrapper-content').click(function(){
		jQuery('.navbar-toggle').trigger('click');
	})

    jQuery(window).scroll(function(){
        var scroll= $(window).scrollTop();
        if(scroll<100){
            $('#scrollTopDevice').fadeOut();
        }else{
            $('#scrollTopDevice').fadeIn();
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 41) {
            $('.menu-hide').addClass('menu-hide-fr');
        } else {
             $('.menu-hide').removeClass('menu-hide-fr');
        }
    });
});

function scrollAnimate(){
    $("html, body").animate({
        scrollTop: 0
    }, 500);
}

function Tab(val,adj){
    $('.headTab div').removeClass('active');
    $(adj).addClass('active');
    $('.tab-pane').hide();
    $('#'+val).show();
}

(function (){
    var els = [ 'section', 'article', 'hgroup', 'header', 'footer', 'nav', 'aside', 
    'figure', 'mark', 'time', 'ruby', 'rt', 'rp' ];
    for (var i=0; i<els.length; i++){
        document.createElement(els[i]);
    }
})();



