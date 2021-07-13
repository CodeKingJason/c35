var ball;
var db;
var pos;

function setup(){
    createCanvas(500,500);

// have to write this
    db = firebase.database();


    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ref1 = db.ref('ball/position');
    
    // use .on to reflect the values to other players
    ref1.on("value", readPos , showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    // we are changing the values in the database
   db.ref('ball/position').set({
       x: pos.x+x,
       y: pos.y+y
   })
}

function readPos(data){
pos = data.val();
ball.x = pos.x;
ball.y = pos.y;
}

function showError(){
    console.log ("error");
}