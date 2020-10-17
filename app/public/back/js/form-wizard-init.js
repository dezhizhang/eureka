
//form wizard init

$(function(){

    var totalSteps = $(".steps li").length;

    $(".submit").on("click", function(){
        return false;
    });

    $(".steps li:nth-of-type(1)").addClass("active");
    $(".myContainer .form-container:nth-of-type(1)").addClass("active");

    $(".form-container").on("click", ".next", function() {
        $(".steps li").eq($(this).parents(".form-container").index() + 1).addClass("active");
        $(this).parents(".form-container").removeClass("active").next().addClass("active fadeIn");
    });

    $(".form-container").on("click", ".back", function() {
        $(".steps li").eq($(this).parents(".form-container").index() - totalSteps).removeClass("active");
        $(this).parents(".form-container").removeClass("active fadeIn").prev().addClass("active fadeIn");
    });


    /*=========================================================
     *     If you won't to make steps clickable, Please comment below code
     =================================================================*/
    $(".steps li").on("click", function() {
        var stepVal = $(this).find("span").text();
        $(this).prevAll().addClass("active");
        $(this).addClass("active");
        $(this).nextAll().removeClass("active");
        $(".myContainer .form-container").removeClass("active fadeIn");
        $(".myContainer .form-container:nth-of-type("+ stepVal +")").addClass("active fadeIn");
    });

});



