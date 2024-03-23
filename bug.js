

const Default_speed = 3000;
var score = 0;
var mySound;


// create a canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;
document.body.appendChild(canvas);

//add event listener

canvas.addEventListener('click', (e) =>{
    const mousePos = { // mouse position amended as per display mode
        x: e.clientX - canvas.offsetLeft, // adaptive to display mode fixed or none
        y: e.clientY - canvas.offsetTop
    };
    if (mousePos.x <= bug.x + 64 && mousePos.x >= bug.x
        && mousePos.y <= bug.y + 64 && mousePos.y >= bug.y) {
            score += 1;
            scoreElement.innerText = score.toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping:false});// toLocaleString() method returns a string with a language-sensitive representation of this number.
                bug.speed *= 0.9; // speed of bug reduced by 10% everytime it is clicked
            mySound.play();
            reload();
        }
    
});
canvas.addEventListener('mouseover', function () { //better to use mouseover and mouseout??
	document.body.style.cursor = 'pointer';
});
canvas.addEventListener('mouseout', function () {
	document.body.style.cursor = 'default';
});

//add function to reload and reset bug speed

var resetScore = document.getElementById('btnResetScore');
var resetSpeed = document.getElementById('btnResetSpeed');
var scoreElement = document.getElementById('myScore');


resetScore.addEventListener('click', () => {
    score = 0;
    scoreElement.innerText = score.toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping:false});
    reload();
});

resetSpeed.addEventListener('click', () => {
    bug.speed = Default_speed;
    reload();
});




//mySound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    } 
}

// Background image
var bgImage = new Image();
bgImage.onload = function(){
    ctx.drawImage(bgImage, 0, 0);
}
bgImage.src = "./images/oakland.jpg";


// bug image
var bugImage = new Image(); // create a new image object
bugImage.onload = function () {
    ctx.drawImage(bugImage, bug.x, bug.y); // draw the image on the canvas
}
bugImage.src = "./resources/bug.png"; // set the source of the image object

// Bug object
var bug = {
	speed: Default_speed, // in miliseconds
	x: 0,
	y: 0
};

// Move the bug to a new place randomly
var move = function () {	
	bug.x = Math.random() * (canvas.width - 64);
    bug.y = Math.random() * (canvas.height - 64);    
};

//reload function ????????????
var reload = function () {
	then = Date.now() - 100000;
}

// Draw canvas
var render = function () {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(bgImage, 0, 0);	
	ctx.drawImage(bugImage, bug.x, bug.y);	
    
};

mySound = new sound("./resources/puch.wav");

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var main = function () {
    var now = Date.now();
    var delta = now - then;
    if (delta > bug.speed) {
        move();
        then = now;
    }
    render();
    requestAnimationFrame(main);
}

var then = Date.now();
move();

main();