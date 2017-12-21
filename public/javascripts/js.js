/*
* @Author: Tian
* @Date:   2017-12-08 19:38:41
* @Last Modified by:   Tian
* @Last Modified time: 2017-12-11 09:45:19
*/

//	根据当前屏幕的宽度动态font-size, 也就是rem的参照物
function setFontSize(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth/3.2/2+'px';
}
setFontSize();
window.onresize = function(){
    setFontSize();
}


function goUrl(){
    $('[data-url]').on('click',function(){
        var self = $(this);
        if(self.attr('data-url') != ''){
            window.location.href = self.data('url');
        }
    });
}