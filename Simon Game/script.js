var count=0;          
var strict_mode=false;// playing in strict mode?
var power=false;      // is the power button on?
var playing=false;    // is the pattern playing?
var moves_by_player=0;
var colors=["#green-circle","#yellow-circle","#red-circle","#blue-circle"];
var sounds=["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3","https://s3.amazonaws.com/freecodecamp/simonSound2.mp3","https://s3.amazonaws.com/freecodecamp/simonSound3.mp3","https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];
var current_game=[];

$(document).ready(function(){
   
    $("#power").click(function(){

        power=!power;
        if(power){
            $("#power").addClass("active");
            newRound(false);
        }
        else{
            $("#power").removeClass("active");
            reset();
            $("#display").val(count);
            
        }

    });  
    
    $("#strict").click(function(){

        strict_mode=!strict_mode;
        if(strict_mode)
            $("#strict").addClass("active");
        else
            $("#strict").removeClass("active");

    });  
    
    
});


function newRound(repeat){

    playing=true;
    setTimeout(function(){$("#display").val(count)},1000);
    
    if(!repeat){
        count++;
        current_game.push(Math.floor((Math.random() * 4)));
    }
    var i=0;
    setInterval(function(){
        $(colors[current_game[i]]).addClass("light");
        var audio = new Audio(sounds[current_game[i]]);
        audio.play();
        removeLight(current_game[i],500);
        i++;
        if(i==current_game.length)
        {
            clearInterval();
            playing=false;
        }
    },1000);
    
}


function removeLight(i,time)
{
    setTimeout(function(){$(colors[i]).removeClass("light");},time);
}

function playerMoved(i)
    {
        if(playing||!power)
            return;
        
        moves_by_player++;
        $(colors[i]).addClass("light");
        var audio = new Audio(sounds[i]);
        audio.play();
        removeLight(i,500);
        
        if(i!=current_game[moves_by_player-1])
            {
                $("#display").val("!!!");
                playing=true;
                moves_by_player=0;
                if(strict_mode){
                    reset();
                    setTimeout(newRound(false),1000);
                }
                else{
                    newRound(true);
                }
                return;
            }
            
        if(moves_by_player==count)
            {
                playing=true;
                moves_by_player=0;
                newRound(false);
            }
        
    }
    
function reset()
{
    moves_by_player=0;
    current_game=[];
    count=0;
    playing=false;
}