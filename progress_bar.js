$(document).ready(function() {
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        $('#progress-bar').css('width', scrollPercent + '%');
    });
});