//window.onload=function(){
    //document.write("HelloJavaScript");
//};
$(function(){
    $("input").on("click",function(){
        //alert("Hi");
        $("h1").text($("li:first").text());
    });
});

$(function(){
    $("input").on("click",function(){
        //alert("Hi");
        $("h1").text($("li:last").text());
    });
});

$(function(){
    $("input").on("click",function(){
        //alert("Hi");
        var numberOfListItem=$("li").length;
        var randomChildNumber=Math.floor(Math.random()*numberOfListItem);
        var randomText = $("li").eq(randomChildNumber).find("span").text();
        var randomImage = $("li").eq(randomChildNumber).find("img").clone();
        $("h1").html(randomImage).append(randomText);
    });
});
