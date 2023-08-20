var runsound = new Audio("resourses/run.mp3");
var jumpSound = new Audio("resourses/jump.mp3");
var deadSound = new Audio("resourses/dead.mp3");
runsound.loop = true;

function keyCheck(event) {
  var keyCode = event.which;

  if (keyCode == 13) {
    if (backgroundAnimationId == 0) {
      text();

      backgroundAnimationId = setInterval(moveBackground, 50);
      createBoxe();
      moveBoxesAnimationId = setInterval(moveBoxes, 50);
    }
    if (boyRunAnimationId == 0) {
      boyRunAnimationId = setInterval(boyRun, 100);
      runsound.play();
    }
  }

  if (keyCode == 32) {
    //alert("space");
    if (boyJumpAnimationId == 0) {
      text();

      clearInterval(boyRunAnimationId);
      boyRunAnimationId = 0;
      boyImageNumber = 1;
      runsound.pause();

      boyJumpAnimationId = setInterval(boyJump, 100);
      jumpSound.currentTime = 0;
      jumpSound.play();
    }
  }
}

var backgroundAnimationId = 0;
var backgroundX = 0;
function moveBackground() {
  var background = document.getElementById("background");
  backgroundX = backgroundX - 10;
  background.style.backgroundPositionX = backgroundX + "px";
}

var boyRunAnimationId = 0;
var boyImageNumber = 1;
var score = 0;
function boyRun() {
  //score = score + 1;
  document.getElementById("score").innerHTML = score;
  var boy = document.getElementById("boy");
  boyImageNumber = boyImageNumber + 1;

  if (boyImageNumber == 9) {
    boyImageNumber = 1;
  }
  boy.src = "resourses/Run (" + boyImageNumber + ").png";
}

var boyJumpAnimationId = 0;
var boyJumpImageNumber = 1;
var boyMarginTop = 340;
function boyJump() {
  score = score + 2;
  document.getElementById("score").innerHTML = score;
  var boy = document.getElementById("boy");
  boyJumpImageNumber = boyJumpImageNumber + 1;

  if (boyJumpImageNumber <= 7) {
    boyMarginTop = boyMarginTop - 20;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (boyJumpImageNumber > 7) {
    boyMarginTop = boyMarginTop + 20;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (boyJumpImageNumber == 13) {
    clearInterval(boyJumpAnimationId);
    boyJumpAnimationId = 0;
    boyJumpImageNumber = 1;

    boyRunAnimationId = setInterval(boyRun, 100);
    runsound.play();

    if (backgroundAnimationId == 0) {
      backgroundAnimationId = setInterval(moveBackground, 50);
      createBoxe();

      moveBoxesAnimationId = setInterval(moveBoxes, 50);
    }
  }
  boy.src = "resourses/Jump (" + boyJumpImageNumber + ").png";
}

var boxmarginLeft = 1000;
var moveBoxesAnimationId = 0;

function createBoxe() {
  for (var i = 0; i < 10; i++) {
    var d = document.createElement("div");
    d.className = "box";
    d.id = "box" + i;
    d.style.marginLeft = boxmarginLeft + "px";
    boxmarginLeft = boxmarginLeft + 500;
    document.getElementById("background").appendChild(d);
  }
}
function moveBoxes() {
  for (var i = 0; i < 10; i++) {
    var d = document.getElementById("box" + i);
    var dcss = getComputedStyle(d);
    var currentMarginLeft = dcss.marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 10;
    d.style.marginLeft = newMarginLeft + "px";

    if ((newMarginLeft >= 50) & (newMarginLeft <= 80)) {
      if (boyMarginTop > 320) {
        clearInterval(boyRunAnimationId);
        boyRunAnimationId = -1;
        runsound.pause();

        clearInterval(boyJumpAnimationId);
        boyJumpAnimationId = -1;
        jumpSound.pause();

        clearInterval(backgroundAnimationId);
        backgroundAnimationId = -1;

        clearInterval(moveBoxesAnimationId);
        moveBoxesAnimationId = -1;

        boyDeadAnimationId = setInterval(boyDead, 100);
        deadSound.play();
      }
    }
  }
}

var boyDeadAnimationId = 0;
var boyDeadImageNumber = 1;

function boyDead() {
  var boy = document.getElementById("boy");
  boyDeadImageNumber = boyDeadImageNumber + 1;

  if (boyDeadImageNumber == 11) {
    clearInterval(boyDeadAnimationId);
    boyDeadImageNumber = 10;
    boy.style.marginTop = "340px";
    document.getElementById("d3").style.visibility = "visible";
    document.getElementById("final").innerHTML = score;
  }
  boy.src = "resourses/Dead (" + boyDeadImageNumber + ").png";
}
function text() {
  var elimant = document.getElementById("d2");
  elimant.style.display = "none";
}
