/**
 * @brief Animate an asset-component repeatedly using an array of sprites / assets. Does not print it !!!
 * @param { component } sprite // the component
 * @param { asset[] } sprites // which assets - name
 * @param { number } framerate // how often - intervall
 */
 function animate_only(sprite, sprites, framerate) {
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

    return setInterval(animateTrue, framerate);
}

/**
 * @brief Animate an asset-component once using an array of sprites / assets. Does not print it !!!
 * @param { component } sprite // the component
 * @param { asset[] } sprites // which assets - name
 * @param { number } framerate // how often - intervall
 * @param { function } callback // optinonal: call the function after having executed the animation 
 */
function animate_once(sprite, sprites, framerate, callback) {
    let animFrame = 0;

    let getAsset = function () {
        return sprites[animFrame];
    }

    let animateTrue = function () {
        sprite_asset = getAsset();
        sprite.changeAsset(sprite_asset);
        animFrame++;
        if (animFrame < sprites.length) {
            setTimeout(animateTrue, framerate);
        } else {
            if (callback != undefined) {
                callback();
            }
        }
    }

    animateTrue();
}