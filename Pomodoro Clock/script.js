var session_time = 25;
var break_time = 5;
var is_play = false;
var time=0,min,sec,t;
var current = "session";

$(document).ready(function(){
    
    $(".timer").click(function(){
          
        is_play=!is_play;
        if(!is_play)
            {
                clearInterval(t);
                /*$(".title").html("Session");
                $(".time").html(session_time);*/
                return;
            }
        if(current=="session")
        sessiontimer();
        else
        breaktimer();
 
    });
    
});
function sessiontimer()
{
    current="session";
    $(".title").html("Session");
    
    if(time<=0)
    {
        $(".time").html(session_time);
        time = session_time*60-1;
        min = session_time;
        sec = 0;
    }
    t=setInterval(function(){
            
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
            playsound();
            
            breaktimer();
        }
        },1000);
    
}

function breaktimer(){
    
    current="break";
    $(".title").html("Break");
    
    if(time<=0)
    {
        $(".time").html(break_time);
        time = break_time*60-1;
        min = break_time;
        sec = 0;
    }
    t=setInterval(function(){
            
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
            playsound();
            
            sessiontimer();
        }
        },1000);
}


function sessionclicked(i){
    if(is_play)
        return;
    session_time+=i;
    if(session_time<1)
        session_time=1;
    
    time=0;
    current="session";
    $("#session").html(session_time);
    $(".time").html(session_time);
    
}

function breakclicked(i){
    if(is_play)
        return;
    break_time+=i;
    if(break_time<1)
        break_time=1;
    
    time=0;
    $("#break").html(break_time);
    
    
}

function playsound(){
    // one context per document
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 440; // Hz
    osc.connect(context.destination); // connect it to the destination
    osc.start(); // start the oscillator
    osc.stop(context.currentTime + 2); // stop 2 seconds after the current time
}