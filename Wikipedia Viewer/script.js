var search_term="";
 

$(document).ready(function(){
    
    $(".header").addClass("animated slideInDown");
    $(".search-tool").addClass("animated slideInLeft");
    $("#query").val("");
    $(".random-article").addClass("animated slideInUp");
    
    
   $(".search-tool").on("click",function(){
       
       
       $(".search-tool").css("display","none");
       $("#searchbar").css("display","block");
       $("#searchbar").addClass("animated bounceInLeft");
       
       
   }) ;
    
    
    
    $("#query").on("keyup",function(e){
        if(e.which === 13)
        {
                
            search_term = $("#query").val();
            if(search_term=="")
                return;
            
            //Now we have the search term and we can use the api to make an ajax get call
            
            var query ='https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch='+search_term+'&callback=?';
            $.getJSON(query,function(data){
               
                $('.results').html('');
                $('#query').val('');
                $("#searchbar").addClass("animate fadeInUp");
                $('#searchbar').css("margin-top","5%");
                
                
                
                
                
                var pages = data.query.search;
                pages.forEach(function(page) {
                var url_title = page.title.split(' ');
                url_title = url_title.join('_');
                $('.results').append("<div><h4><a target = '_blank' href = 'https://en.wikipedia.org/wiki/" + url_title + "'>" + page.title + "</a></h4> <p>" +    page.snippet + "</div><hr>");
                
            });
            
        });
        }
        
    });
    
});