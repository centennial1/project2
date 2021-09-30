var timeInterval = 5000;
var interval;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
h1 = document.createElement('h1')
h1.innerHTML = 'BugSmasher'
document.body.appendChild(h1);

//buttons
resetScoreBtn = document.createElement('input');
resetSpeedBtn = document.createElement('input');
resetScoreBtn.setAttribute('id', 'resetScore');
resetSpeedBtn.setAttribute('id', 'resetSpeed');
resetScoreBtn.setAttribute('type', 'button');
resetSpeedBtn.setAttribute('type', 'button');
resetScoreBtn.value = 'Reset Score';
resetSpeedBtn.value = 'Reset Speed';
br = document.createElement('br');
document.body.appendChild(br);
document.body.appendChild(resetScoreBtn);
document.body.appendChild(resetSpeedBtn);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
bgReady = true;
};
bgImage.src = "background.png";

// Monster image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
bugReady = true;
};
bugImage.src = "bug.png";


// Game objects
var bug = {};
var bugsCaught = 0;

// Reset the game when the player catches a bug
var reset = function () {
    // Throw the bug somewhere on the screen randomly
    bug.x = 32 + (Math.random() * (canvas.width - 64));
    bug.y = 32 + (Math.random() * (canvas.height - 64));
    xCord = 1000;
    yCord = 1000;
};

var resetLocation = function () {
    // Throw the bug somewhere on the screen randomly
    bug.x = 32 + (Math.random() * (canvas.width - 64));
    bug.y = 32 + (Math.random() * (canvas.height - 64));
};

interval = setInterval(reset, timeInterval);

//click cordinate
var xCord,yCord;
canvas.addEventListener('click', (event) =>{
    xCord = event.clientX,
    yCord = event.clientY;
})

// Update game
var update = function () {
//run click test
    if((xCord - bug.x < 35 && xCord - bug.x > 0)  && (yCord - bug.y < 35 && yCord - bug.y > 0)){
        bugsCaught++;
        reset();
        timeInterval = timeInterval - 300;
        clearInterval(interval);
        interval = setInterval(resetLocation, timeInterval);
    }
    
};

//reset speed and score
resetSpeedBtn.addEventListener('click', ()=>{
    timeInterval = 5000;
    clearInterval(interval);
    interval = setInterval(resetLocation, timeInterval);
})
resetScoreBtn.addEventListener('click', ()=>{
    bugsCaught = 0;
    timeInterval = 5000;
    clearInterval(interval);
    interval = setInterval(resetLocation, timeInterval);
})

// Render game image
var render = function () {
    if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
    }
    if (bugReady) {
    ctx.drawImage(bugImage, bug.x, bug.y, 30, 30);
    }
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bug caught: " + bugsCaught, 32, 32);
};

// The main game loop
var main = function () {
    update();
    render();
// Request to do this again ASAP
    requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
reset();
main();