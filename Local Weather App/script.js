var latitude;
var longitude;
var got_location = true;

//get from api
//define default values for all except timezone
var temperature_fah = "Unable to get info";
var temperature_cel = "Unable to get info"; // will need to calculate this
var timezone;
var summary = "Unable to get info";    
var icon = "clear-day";//need to figure out where to get this

var icon_location = "icons/";

var current="f";

$(document).ready(function(){
    //alert("the");
    getLocation();
    
    $("button").on("click",function(){
        if(current=="f")
        {
            $(".temp").html(temperature_cel+" C");
            current="c";
        }
        else{
            $(".temp").html(temperature_fah+" F");
            current="f";
        }
    });
    
});

// This function will do anything we want to do after we recieve the latitute and the longitude like the api call
function displayLocation()
{
    if(got_location)
    { 
        //alert("here");
        $.ajax({
            url: "https://api.darksky.net/forecast/9f3b27dcdcfc9830f5fd6f1ff7b9a215/"+latitude+","+longitude,
            dataType: "jsonp",
            success: function (data) {
                if(data.currently["temperature"]!=null)
                {    
                    temperature_fah = Math.round(data.currently["temperature"]);
                    temperature_cel = Math.round((5*(temperature_fah-32))/9)
                }
                timezone = data["timezone"];
                if(data.currently["summary"]!=null)
                summary = data.currently["summary"];
                if(data.currently["icon"]!=null)
                icon = data.currently["icon"];
                icon_location+=icon;
                icon_location+=".png";
                
                displayInformation();
            } 
        });

        
    }
    else           // handle error message here
    {
       // $("div").html("Error in getting location");
    }
    
}

function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getCoordinates);   
    }
    
}

function getCoordinates(position)
{
    latitude = position.coords.latitude;
    longitude = position.coords.longitude; 
    displayLocation();
}


//finally display all the recieved information
function displayInformation(){
    
    $(".zone").html(timezone);
    $(".temp").html(temperature_fah+" F");
    $(".status").html(summary);
    $(".icon").attr("src",icon_location);
    
}
