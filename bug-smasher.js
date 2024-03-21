
/*Sources:
    - W3Schools Online Web Tutorials: w3schools.com
    - Stack Overflow - Where Developers Learn, Share, & Build Careers: stackoverflow.com
*/

// Global variables
const DEFAULT_SPEED = 3000;
var score = 0;
var mySound;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 950;
canvas.height = 440;
canvas.addEventListener('click', (e) => {
    const mousePos = {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
	};	
    if (mousePos.x <= bug.x + 60 && mousePos.x >= bug.x
        && mousePos.y <= bug.y + 60 && mousePos.y >= bug.y) {			
			score += 1; 
			scoreElement.innerText = score.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});         
			if (bug.speed > 150)
				bug.speed -= 150; 
			mySound.play();	
			reload();
        }    
});

canvas.addEventListener('mouseenter', function () {
	document.body.style.cursor = 'pointer';
});

canvas.addEventListener('mouseleave', function () {
	document.body.style.cursor = 'default';
});

document.body.appendChild(canvas);

// Menu elements
var resetScore = document.getElementById("btResetScore");
var resetSpeed = document.getElementById("btResetSpeed");
var scoreElement = document.getElementById("myScore");

resetScore.addEventListener('click', (e) => {
	score = 0;
	scoreElement.innerText = score.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
	reload();
});

resetSpeed.addEventListener('click', (e) => {
	bug.speed = DEFAULT_SPEED;
	reload();
});

// Updates the time to reload
var reload = function () {
	then = Date.now() - 100000;
}

// Sound effect
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

// Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "resources/mosc.jpg";


// Bug object
var bug = {
	speed: DEFAULT_SPEED, // in miliseconds
	x: 0,
	y: 0
};

// Move the bug to a new place randomly
var move = function () {	
	bug.x = Math.random() * (canvas.width - 80);
    bug.y = Math.random() * (canvas.height - 80);    
};

// Draw canvas
var render = function () {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);	
	ctx.drawImage(bugImage, bug.x, bug.y);	
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	if (delta >= bug.speed) {		
		move();		
		then = now;
	}	
	render();
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Let's play this game!
mySound = new sound("resources/smash.mp3");
var then = Date.now();
move();
main();