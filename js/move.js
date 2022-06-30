
// move by x , y in percent %
function move(comp, x_move, y_move) {
    x_true_move = (x_move / 100) * gameArea.canvas.width;
    y_true_move = (y_move / 100) * gameArea.canvas.width;
    comp.x += x_true_move;
    comp.y += y_true_move;
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
    let blick_richtung_rechts = true;
    let ev = new MyEvent;
    ev.start();

    let movePlayer = function () {
        if (ev.rightPressed) {
            move(sprite, speed, 0);
        } if (ev.leftPressed) {
            move(sprite, -speed, 0);
        } if (ev.upPressed) {
            move(sprite, 0, -speed);
        } if (ev.downPressed) {
            move(sprite, 0, speed);
        }
    }

    let getAsset = function () {
        // which number the asset has
        let num = ((animFrame % sprite_map.num_col) + 1) + sprite_map.num_col * isMoving
        return new asset(sprite_map, num);
    }

    let animate = function () {
        if (ev.upPressed || ev.downPressed || ev.rightPressed || ev.leftPressed) {
            isMoving = 1;
        } else {
            isMoving = 0;
        }
        movePlayer();
        sprite_asset = getAsset();
        sprite.changeAsset(sprite_asset);
        if (blick_richtung_rechts && ev.leftPressed) { sprite.reverseX(); blick_richtung_rechts = false; }
        else if (!blick_richtung_rechts && ev.rightPressed) { sprite.reverseX(); blick_richtung_rechts = true; }
        welt.print();
        animFrame++;
    }

    setInterval(animate, 60);
}

/**
 * @brief Animate an asset-component using an array of sprites / assets. Does not print it !!!
 * @param { world } welt // the world
 * @param { component } sprite // the component
 * @param { asset[] } sprites // which assets - name
 */
function animate_only(sprite, sprites) {
    let animFrame = 1;

    let getAsset = function () {
        // which index in the array
        let num = animFrame % sprites.length;
        return sprites[num];
    }

    let animateTrue = function () {
        sprite_asset = getAsset();
        sprite.changeAsset(sprite_asset);
        animFrame++;
    }

    return setInterval(animateTrue, 60);
}