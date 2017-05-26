var search_term="";

$(document).ready(function(){
    
    $(".header").addClass("animated slideInDown");
    $(".search-tool").addClass("animated slideInLeft");
    $("#query").val("");
    
    
   $(".search-tool").on("click",function(){
       
       
       $(".search-tool").css("display","none");
       $("#searchbar").css("display","block");
       $("#searchbar").addClass("animated bounceInLeft");
       
       
   }) ;
    
    
    
    $("#query").on("keyup",function(e){
        if(e.keyCode == 13)
        {
                
            search_term = $("#query").val();
            if(search_term=="")
                return;
            
            //Now we have the search term and we can use the api
            
            
            
            
        }
        
    });
    
});