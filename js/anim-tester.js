
document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("animTest");
  let context = canvas.getContext("2d");

  let spriteSheetPath = "asset/mystic_woods/characters/player.png";
  let spriteSheet = new Image();
  spriteSheet.src = spriteSheetPath;
  spriteSheet.crossOrigin = false;

  let spriteW, spriteH, sheetW, sheetH;
  let colCount = 6;
  let attackCount = 4;
  let moveCount = colCount;
  let rowCount = 5;
  let animFrame = 0;
  let idle = 0;
  let walk = 1;
  let attack = 2;
  let die = 4;

  let setVars = function () {
    sheetW = spriteSheet.width;
    sheetH = spriteSheet.height;
    spriteW = sheetW / colCount;
    spriteH = sheetH / rowCount;
    // canvas.setAttribute('width', sheetW);
    // canvas.setAttribute('height', sheetH);
    canvas.setAttribute('width', spriteW * 2);
    canvas.setAttribute('height', spriteH * 2);
  }

  spriteSheet.onload = function () {
    setVars();
    // let interval = setInterval(animate, 250, idle);
    let interval = setInterval(animate, 100, moveCount, walk);
    // // let interval = setInterval(animate, 100, attackCount, attack);
    // let interval = setInterval(animate, 100, attackCount, die);
  }

  let animate = function (frameCount, sequence) {
    let pos = spritePosToImgPos(animFrame % frameCount, sequence);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(spriteSheet,
      pos.x, pos.y,
      spriteW, spriteH,
      0, 0,
      spriteW * 2, spriteH * 2);
    animFrame++;
  }

  let spritePosToImgPos = function (col, row) {
    return {
      x: (spriteW * col),
      y: (spriteH * row)
    }
  }

  let drawEntireSheet = function () {
    for (let i = 0; i < colCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        let pos = spritePosToImgPos(i, j);
        context.drawImage(spriteSheet,
          pos.x, pos.y,
          spriteW, spriteH,
          pos.x, pos.y,
          spriteW, spriteH);
      }
    }
  }
});
