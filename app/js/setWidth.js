/**
 * Created by wht719582321 on 2016/10/11.
 */

var html = document.getElementsByTagName("html")[0];
var header = document.getElementById("header");
var footer = document.getElementById("footer");
console.log(footer);
var windowWidth = html.clientWidth;
var windowHeight = html.clientHeight;
if (windowWidth / windowHeight >= 0.625) {
    var width = windowHeight * 0.625;
    html.style.width = width + "px";
    if(header!=null){
        header.style.width = width + "px";
    }
    if(footer!=null){
        footer.style.width = width + "px";
    }
}
html.style.fontSize=width/6.4+'px';