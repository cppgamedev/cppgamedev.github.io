src = 'images/giphy.gif';
setInterval(function(){
    $("#gif").attr("src", "");
    $("#gif").attr("src", src);
}, 4700);

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#gif').css('display', 'block');
    $('video').css('display', 'none');
}