var board = {
    "c1":"",
    "c2":"",
    "c3":"",
    "c4":"",
    "c5":"",
    "c6":"",
    "c7":"",
    "c8":"",
    "c9":"",
}

var player = "X";
var computer = "O";
var game_over = false;
var filled = 0; // number of cells filled

$(document).ready(function(){
   
    changeDisplay();
    
    $(".cell").click(function(){
                
        var block = $(this).find("span").attr("id");
        if(board[block]!="")
            return;
        
        board[block]=player;
        changeDisplay();
        filled++;
        //check if player has won the game
        //change the status of game_over
        checkIfWon();
        
        if(game_over)
            {
                // player wins
                // Do not reset the game
                
                
                return;
            }
        
        //checks if the board is full
        checkBoardFull();
        
        if(game_over)
            {
                // its a draw, reset the game
                
                return;
            }
        
        //otherwise computer makes a move
        makeComputerMove();
        filled++;
        //same things of checkgameover and checkboardfull there
        
    })
    
});

function changeDisplay(){
    
    for(var i=1;i<=9;i++)
    {
        var x = "#c"+i;
        $(x).html(board[x.substring(1)]);
    }
}


function checkBoardFull()
{
    if(filled>=9)
        {
            game_over=true;
        }
}

function checkIfWon()
{
    if(moves<5)
        {
            return;
        }
}