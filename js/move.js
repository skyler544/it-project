
// move by x , y in percent %
function move(comp, x_move, y_move) {
    x_true_move = (x_move/100) * gameArea.canvas.width;
    y_true_move = (y_move/100) * gameArea.canvas.width;
    comp.x += x_true_move * comp.scaleX;
    comp.y += y_true_move * comp.scaleY;
    // gameArea.clear();
    // comp.update();
}

function moveSquare(comp, direction) {
    // either this
    if (direction == "left") { move(comp, -SQUARE_SIDE_LEN, 0); }
    else if (direction == "right") { move(comp, SQUARE_SIDE_LEN, 0); }
    else if (direction == "up") { move(comp, 0, -SQUARE_SIDE_LEN); }
    else if (direction == "down") { move(comp, 0, SQUARE_SIDE_LEN); }
}

/**
 * 
 * @param {world} welt 
 * @param {number} speed in percent (percentTOpixel)
 */
function animatePlayer(welt, speed) {
    let sprite_map = assetMap.mystic_woods.characters.player;
    let sprite_asset = new asset(sprite_map, 1);
    let sprite = new component("asset", sprite_asset);
    sprite.x = 0;
    sprite.y = 0;
    sprite.width = SQUARE_SIDE_LEN;
    sprite.height = SQUARE_SIDE_LEN;
    sprite.percentTOpixel();
    welt.add(sprite);

    let animFrame = 1;
    let isMoving = 0;
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    let blick_richtung_rechts = true;

    let movePlayer = function () {
        if (rightPressed) {
            move(sprite, speed, 0);
        } else if (leftPressed) {
            move(sprite, -speed, 0);
        } else if (upPressed) {
            move(sprite, 0, -speed);
        } else if (downPressed) {
            move(sprite, 0, speed);
        }
    }

    let getAsset = function () {
        // which number the asset has
        let num = ((animFrame % sprite_map.num_col) + 1) + sprite_map.num_col * isMoving
        return new asset(sprite_map, num);
    }

    let animate = function () {
        if (upPressed || downPressed || rightPressed || leftPressed) {
            isMoving = 1;
        } else {
            isMoving = 0;
        }
        movePlayer();
        sprite_asset = getAsset();
        sprite.changeAsset(sprite_asset);
        if (blick_richtung_rechts && leftPressed) { sprite.reverseX(); blick_richtung_rechts = false; }
        else if (!blick_richtung_rechts && rightPressed) { sprite.reverseX(); blick_richtung_rechts = true; }
        welt.print();
        animFrame++;
    }

    setInterval(animate, 60);
  
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
}
  