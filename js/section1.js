$(document).ready(function() {
    setTimeout(function() {
        $('#section1_header').addClass('animated');
    },0); // 页面加载500毫秒后开始动画



    $("#section1_nav  a").on("click", function() {
        let position = $(this).parent().position();
        let width = $(this).parent().width();
        $("#section1_nav .section1_slide1").css({
            opacity: 1,
            left: +position.left,
            width: width
        });
    });
    $("#section1_nav a").on("mouseover", function() {
        let position = $(this).parent().position();
        let width = $(this).parent().width();
        $("#section1_nav .section1_slide2").css({
            opacity: 1,
            left: +position.left,
            width: width
        }).addClass("section1_squeeze");
    }); 
    $("#section1_nav a").on("mouseout", function() {
        $("#section1_nav .section1_slide2").css({
            opacity: 0
        }).removeClass("section1_squeeze");
    });
    let currentWidth = $("#section1_nav li:nth-of-type(3) a").parent("li").width();
    let current = $("li:nth-of-type(3) a").position();
    $("#section1_nav .section1_slide1").css({
        left: +current.left,
        width: currentWidth
    });
});