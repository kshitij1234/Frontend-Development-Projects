var session_time = 25;
var break_time = 5;


$(document).ready(function(){
    
    $(".timer").click(function(){
            
        sessiontimer();
 
    });
    
    
    
});
function sessiontimer()
{
    $(".title").html("Session");
    var time = session_time*60-1;
    var min = session_time;
    var sec = 0;
    
    var t=setInterval(function(){
            
        var sec_display;
        if(sec==0){
            sec=59;
            min--;
        }
        else
            sec--;
        if(sec<10)
            sec_display="0"+sec;
        else
            sec_display=sec;
        $(".time").html(min+":"+sec_display);
        time--;
        if(time<0){
            clearInterval(t);
            //make sound
            $("#play").play();
            
            breaktimer();
        }
        },1000);
    
}

function sessionclicked(i){
    
    session_time+=i;
    if(session_time<1)
        session_time=1;
    
    $("#session").html(session_time);
    $(".time").html(session_time);
    
}

function breakclicked(i){
    
    break_time+=i;
    if(break_time<1)
        break_time=1;
    
    $("#break").html(break_time);
    
    
}