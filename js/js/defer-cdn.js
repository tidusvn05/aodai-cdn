var DEFER = function() {};
/*DEFER.prototype.lightSlider = function(){
    (function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/css/lightslider.min.css";
        document.querySelector("head").appendChild(link);
    })();
}*/
/*DEFER.prototype.fontAwesome = function(){
    (function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
        document.querySelector("head").appendChild(link);
    })();
}*/
/*DEFER.prototype.jquerycssUI = function(){
    (function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css";
        document.querySelector("head").appendChild(link);
    })();
}*/
/*DEFER.prototype.fontRoboto = function(){
    (function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700";
        document.querySelector("head").appendChild(link);
    })();
}*/
/*DEFER.prototype.mCustomScrollbar = function(){
    (function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css";
        document.querySelector("head").appendChild(link);
    })();
}*/
/*DEFER.prototype.select2CSS = function(){
    (function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css";
        document.querySelector("head").appendChild(link);
    })();
}*/
/*DEFER.prototype.modernIzr = function(){
    (function() {
        var src = document.createElement('script');
        src.type = "text/javascript";
        src.src = "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js";
        document.querySelector("head").appendChild(src);
    })();
}*/

DEFER.prototype.library_optimizerCSS = function(){
    (function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "static/css/library_optimizer.css";
        document.querySelector("head").appendChild(link);
    })();
}

DEFER.prototype.library_optimizerJS = function(){
    (function() {
        var src = document.createElement('script');
        src.type = "text/javascript";
        src.src = "static/js/library_optimizer.js";
        document.querySelector("head").appendChild(src);
    })();
}

DEFER.prototype.init = function() {
    // this.lightSlider();
    // this.fontAwesome();
    // this.jquerycssUI();
    // this.fontRoboto();
    // this.select2CSS();
    // this.mCustomScrollbar();
    // this.modernIzr();
    this.library_optimizerJS();
    this.library_optimizerCSS();
}
var defer = new DEFER();
defer.init();