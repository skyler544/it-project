
document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("animTest");
  let context = canvas.getContext("2d");

  let spriteSheetPath = "asset/mystic_woods/characters/player.png";
  let spriteSheet = new Image();
  spriteSheet.src = spriteSheetPath;

  spriteSheet.onload = function () {
    let sw = spriteSheet.width / 6;
    let sh = spriteSheet.height / 5;

    let j = 3;
    let i = 2;

    for (let i = 0; i < sw; i++) {
      for (let j = 0; j < sh; j++) {
        context.drawImage(spriteSheet, 0 + (sw * j), 0 + (sh * i), sw, sh,
          0, 0, 128, 128)
      }
    }
  }

});
