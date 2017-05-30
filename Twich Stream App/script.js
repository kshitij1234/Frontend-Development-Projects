var base_url = "https://wind-bow.gomix.me/twitch-api/"

var dummy_image = "https://vignette4.wikia.nocookie.net/nsfrencoverse/images/f/fd/Default-placeholder.png/revision/latest/scale-to-width-down/480?cb=20160314140620"

var twitch_users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];


$(document).ready(function(){
   
    getinformation();
    
    $(".btn").click(function(){
       
        $(".btn").removeClass("active");
        $(this).addClass("active");
        
        var butt = $(this).attr("id");
        if(butt=="online")
        {
            $(".online").removeClass("hide");
            $(".offline").addClass("hide");
        }
        else if(butt=="offline")
            {
                $(".online").addClass("hide");
                $(".offline").removeClass("hide");
            }
        else{
            $(".online").removeClass("hide");
            $(".offline").removeClass("hide");
        }
        
    });
    
});


function getinformation(){
    
    twitch_users.forEach(function(user)
        {
            var url = base_url+"streams/"+user+"?callback=?";
            
            
            $.getJSON(url,function(data){
                
                var title,status;
                
                if(data.stream === null)
                    {
                        title = "offline";
                        status = "offline";
                    }
                else if(data.stream === undefined)
                    {
                        title = "Closed Account";
                        status = "offline";
                    }
                else
                    {
                        title=data.stream.game;
                        status = "online";
                    }
                var url2 = base_url+"channels/"+user+"?callback=?";
                $.getJSON(url2,function(data){
                   
                    var logo, name, content="";
                    
                    logo = data.logo != null ? data.logo :dummy_image;
                    name = data.display_name != null ? data.display_name : user;
                    
                    if(status==="online")
                        {
                            content=": "+data.status;
                        }
                    
                    
                    var html = '<div class="row ' + status + '"><div class="col-xs-2" id="icon"><img src="' + logo + '" class="logo img-responsive img-circle"></div><div class="col-xs-3" id="name"><a href="' + data.url + '" target="_blank">' + name + '</a></div><div class="col-xs-7" id="streaming">'+ title + '<span class="hidden-xs">' + content + '</span></div></div>';
                    
                    status === "online" ? $(".info").prepend(html) : $(".info").append(html);
                    
                });
                
                
            });   
            
        });
}

