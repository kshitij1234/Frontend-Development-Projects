var originalboard = [0,1,2,3,4,5,6,7,8];

var human = "X";
var computer = "O";
var game_over = false;
var filled = 0; // number of cells filled

$(document).ready(function(){
   
    changeDisplay();
    
    $(".cell").click(function(){
                
        var block = parseInt(($(this).find("span").attr("id"))[1])-1;
        if(originalboard[block]==human||originalboard[block]==computer)
            return;
        
        originalboard[block]=human;
        changeDisplay();
        filled++;
        //check if player has won the game
        //change the status of game_over
        game_over=checkIfWon(originalboard,human);
        
        if(game_over)
            {   
                alert("You won");
                originalboard = [0,1,2,3,4,5,6,7,8];
                changeDisplay();
                filled=0;
                return;
            }
        
        //checks if the board is full
        checkBoardFull();
        
        if(game_over)
            {
                // its a draw, reset the game
                alert("Its a draw");
                originalboard = [0,1,2,3,4,5,6,7,8];
                changeDisplay();
                filled=0;
                return;
            }
        
        //otherwise computer makes a move
        originalboard[minimax(originalboard,computer).index]=computer;
        changeDisplay();
        filled++;
        //same things of checkgameover and checkboardfull there
        game_over=checkIfWon(originalboard,computer);
        if(game_over)
            {
                // computer won
                
                alert("You Lose");
                originalboard = [0,1,2,3,4,5,6,7,8];
                changeDisplay();
                filled=0;
                return;
            }
        checkBoardFull();
        
        if(game_over)
            {
                // its a draw, reset the game
                alert("Its a draw");
                originalboard = [0,1,2,3,4,5,6,7,8];
                changeDisplay();
                filled=0;
                return;
            }
    })
    
});

function changeDisplay(){
    
    for(var i=0;i<9;i++)
    {
        var x = "#c"+(i+1);
        if(originalboard[i]!=i)
            $(x).html(originalboard[i]);
        else
            $(x).html("");
    }
}


function checkBoardFull()
{
    if(filled>=9)
        {
            game_over=true;
        }
}

function checkIfWon(board, player)
{
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    }
    else
        {
            return false;
        }
}


function minimax(newBoard, player){
    
    
    
    var availablespots = getEmptyIndexes(newBoard);
    
    if(checkIfWon(newBoard,human))
        return {score:-10};
    else if(checkIfWon(newBoard,computer))
        return {score:10};
    else if(availablespots.length===0)
        return {score:0};
    
    var moves = [];
    
    for(var i=0;i<availablespots.length;i++){
        
        var move = {};
  	    move.index = newBoard[availablespots[i]];
        
        newBoard[availablespots[i]] = player;
        
        if(player==computer){
            var result = minimax(newBoard,human);
            move.score = result.score;
        }
        else{
            var result = minimax(newBoard, computer);
            move.score = result.score;
        }
        
        newBoard[availablespots[i]] = move.index;
        
        moves.push(move);
        
    }
    
    var bestMove;
      if(player === computer){
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
          if(moves[i].score > bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }else{
          var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
          if(moves[i].score < bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
    return moves[bestMove];
    
}


function getEmptyIndexes(board){
  return  board.filter(s => s!="X"&&s!="O");
}