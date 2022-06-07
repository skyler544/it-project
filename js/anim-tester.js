
document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("animTest");
  let context = canvas.getContext("2d");

  let spriteSheetPath = "asset/mystic_woods/characters/player.png";
  let spriteSheet = new Image();
  spriteSheet.src = spriteSheetPath;

  let spriteW, spriteH, sheetW, sheetH;
  let colCount = 6;
  let rowCount = 5;

  let setVars = function () {
    sheetW = spriteSheet.width;
    sheetH = spriteSheet.height;
    spriteW = sheetW / colCount;
    spriteH = sheetH / rowCount;
    canvas.setAttribute('width', spriteSheet.width);
    canvas.setAttribute('height', spriteSheet.height);
  }


  spriteSheet.onload = function () {
    setVars();
    draw();
  }

  let spritePosToImgPos = function (col, row) {
    return {
      x: (spriteW * col),
      y: (spriteH * row)
    }
  }

  let draw = function () {
    for (let i = 0; i < colCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        let pos = spritePosToImgPos(i, j);
        context.drawImage(spriteSheet,
          pos.x, pos.y,
          spriteW, spriteH,
          pos.x, pos.y,
          spriteW, spriteH)
      }
    }
  }
});
