var expression="";
var result=0;

$(document).ready(function(){
    
    $("#screen").val("0");
    
    $("#ac").click(function(){
       
        result=0;
        expression="";
        $("#screen").val(result);
        
    });
    
    $("#ce").click(function(){
       if(expression.length<=1)
       {
           expression="";
           result=0;
           $("#screen").val(result);
           return;
       }
        expression=expression.substring(0,expression.length-1);
        $("#screen").val(expression);
    });
    
    $("#equals").click(function(){
    
        try{
            result = eval(expression);
            expression=""+result;
            $("#screen").val(expression);
        }
        catch(e){
            
            $("#screen").val("ERROR");
            expression="";
            result="";
        }
       
                       
    });
    
    
});

function addValue(num){

    expression+=num;
    $("#screen").val(expression);
}
