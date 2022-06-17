
document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("game");
  let context = canvas.getContext("2d");
  canvas.setAttribute('width', 600);
  canvas.setAttribute('height', 600);

  let spriteSheetPath = "asset/mystic_woods/characters/player.png";
  let spriteSheet = new Image();
  spriteSheet.src = spriteSheetPath;

  let spriteW, spriteH, sheetW, sheetH;
  let colCount = 6;
  let rowCount = 5;
  let animFrame = 0;
  let isMoving = 0;
  let moveAmount = 10;
  let offsetX = 0;
  let offsetY = 0;
  let rightPressed = false;
  let leftPressed = false;
  let upPressed = false;
  let downPressed = false;

  let setVars = function () {
    sheetW = spriteSheet.width;
    sheetH = spriteSheet.height;
    spriteW = sheetW / colCount;
    spriteH = sheetH / rowCount;
    console.log(sheetW);
    console.log(sheetH);
    console.log(spriteW);
    console.log(spriteH);
  }

  spriteSheet.onload = function () {
    setVars();
    console.log(sheetW);
    console.log(sheetH);
    console.log(spriteW);
    console.log(spriteH);
    let moveInterval = setInterval(animate, 60);
  }

  let animate = function () {
    if (upPressed || downPressed || rightPressed || leftPressed) {
      isMoving = 1;
    } else {
      isMoving = 0;
    }
    movePlayer();
    let pos = spritePosToImgPos(animFrame % colCount, isMoving);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(spriteSheet,
      pos.x, pos.y,
      spriteW, spriteH,
      offsetX, offsetY,
      spriteW * 2, spriteH * 2);
    animFrame++;
  }

  let movePlayer = function () {
    if (rightPressed) {
      offsetX += moveAmount;
    } else if (leftPressed) {
      offsetX -= moveAmount;
    } else if (upPressed) {
      offsetY -= moveAmount;
    } else if (downPressed) {
      offsetY += moveAmount;
    }
  }

  let spritePosToImgPos = function (col, row) {
    return {
      x: (spriteW * col),
      y: (spriteH * row)
    }
  }

  let keyDownHandler = function (e) {
    if (e.key == "d" || e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "a" || e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    } else if (e.key == "w" || e.key == "Up" || e.key == "ArrowUp") {
      upPressed = true;
    } else if (e.key == "s" || e.key == "Down" || e.key == "ArrowDown") {
      downPressed = true;
    }
  }

  let keyUpHandler = function (e) {
    if (e.key == "d" || e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "a" || e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    } else if (e.key == "w" || e.key == "Up" || e.key == "ArrowUp") {
      upPressed = false;
    } else if (e.key == "s" || e.key == "Down" || e.key == "ArrowDown") {
      downPressed = false;
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
});
