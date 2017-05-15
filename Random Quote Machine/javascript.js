$(document).ready(function(){

 var current_quote ="";
 var current_author ="";
    $.getJSON("https://gist.githubusercontent.com/dmakk767/9375ff01aff76f1788aead1df9a66338/raw/491f8c2e91b7d3b8f1c8230e32d9c9bc1a1adfa6/Quotes.json%2520", function(a) {
               
                var x = Math.floor((Math.random()*102)+1);
                current_quote=a[x].quote;
                current_author=a[x].name;
                $("#quote").html(" "+a[x].quote+" ");
                $("#author").html("- "+a[x].name);
        });
    
    $("#new-quote").on("click",function(){
             $.getJSON("https://gist.githubusercontent.com/dmakk767/9375ff01aff76f1788aead1df9a66338/raw/491f8c2e91b7d3b8f1c8230e32d9c9bc1a1adfa6/Quotes.json%2520", function(a) {
                
                    var x = Math.floor((Math.random()*102)+1);
                    current_quote=a[x].quote;
                    current_author=a[x].name;
                    $("#quote").html(" "+a[x].quote+" ");
                    $("#author").html("- "+a[x].name);
                  
        });
        
    });
    
    $("#tweet").on("click",function(){
        var url="https://twitter.com/intent/tweet?text=";
        url+="\""+current_quote+"\" "+"- "+current_author;
        window.open(url,"_blank","toolbar=no,top=500,left=500,width=1400,height=800");
        
        
    });

});
