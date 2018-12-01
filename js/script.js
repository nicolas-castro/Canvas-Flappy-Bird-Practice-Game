const myCanvas = document.querySelector(".my-floppy");
const ctx = myCanvas.getContext("2d");

// the game constructor function
const Game = function(){
    this.floppy = {};
    this.obstacles = [];
}

// floppy bird constructor function:
const Floppy = function(){
    this.x = 0;
    this.y = 220;
    this.width = 100;
    this.height = 100;
    this.isCrashed = false;
    this.image = "images/floppy.png";
}

Floppy.prototype.draw = function(){
    //console.log(this);
    const floppyImg = new Image();
    floppyImg.src = this.image;
    
    //floppyImg.onload = () => {
      ctx.drawImage(floppyImg, this.x, this.y, this.width, this.height);
    
  }

  Floppy.prototype.fly = function(someKeyCode){
      switch(someKeyCode){

        case 37: //Left
            this.x -= 10;
            break;
        case 39: //Right
            this.x += 10;
            break;
        case 38: //up
            this.y -= 10;
            break;
        case 40: // Down
            this.y += 10;
            break;
        case 32: //Space bar goes up
            this.y -= 10;
            break;
      }
  }

  function Obstacles(theX, theY, theWidth, theHeight){
        this.x = theX;
        this.y = theY;
        this.width = theWidth;
        this.height = theHeight;
        this.isTouched = false;  
  }

  Obstacles.prototype.drawObstacle = function(){
        
        if(currentGame.floppy.isCrashed === false){
            this.x -= 2;
            if(this.x < -this.width){
                this.x = 1000;
        }
    }
        if(this.isTouched){
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = "green"
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);

  }


// function Game (){
// }
let currentGame;
let currentFloppy;

function startGame(){
    currentGame = new Game();
    // console.log(" = = = = ",currentGame);
    currentFloppy = new Floppy();
    currentGame.floppy = currentFloppy;

    currentGame.obstacles = [
        new Obstacles(650, 0, 30, 250),
        new Obstacles(800, 350, 30, 200),
        new Obstacles(970, 0, 30, 250),
        new Obstacles(650, 0, 30, 250),
        new Obstacles(1120, 300, 30, 250),
    ]
    drawingLoop();
}


document.onkeydown = function(event){
    currentGame.floppy.fly(event.keyCode);
}

function drawEverything (){
    currentGame.floppy.draw();
    currentGame.obstacles.forEach((oneObstacle) => {
        oneObstacle.drawObstacle();
        if(checkCollision(currentGame.floppy, oneObstacle)){
            currentGame.floppy.isCrashed = true;
            oneObstacle.isTouched = true;
            gameOver();
        }
    }) 
}

function drawingLoop (){
    ctx.clearRect(0, 0, 1000, 600);
    drawEverything();
    requestAnimationFrame(function(){
        drawingLoop();
    })
    
}

function checkCollision(obj1, obj2){
    return obj1.y + obj1.height -10 >= obj2.y
    &&     obj1.y <= obj2.y + obj2.height
    &&     obj1.x + obj1.width -10 >= obj2.x
    &&     obj1.x <= obj2.x + obj2.width
}

function gameOver (){
    ctx.font = "bold 70px Arial";
    ctx.fillStyle = "magenta";
    ctx.fillText("Game Over", 420, 220);
}

startGame();
