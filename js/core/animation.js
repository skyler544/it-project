/**
 * @brief Animate an asset-component repeatedly using an array of sprites / assets. Does not print it !!!
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

/**
 * @brief Animate an asset-component once using an array of sprites / assets. Does not print it !!!
 * @param { component } sprite // the component
 * @param { asset[] } sprites // which assets - name
 * @param { function } callback // optinonal: call the function after having executed the animation 
 */
function animate_once(sprite, sprites, callback) {
    let animFrame = 0;

    let getAsset = function () {
        return sprites[animFrame];
    }

    let animateTrue = function () {
        sprite_asset = getAsset();
        sprite.changeAsset(sprite_asset);
        animFrame++;
        if (animFrame < sprites.length) {
            setTimeout(animateTrue, 60);
        } else {
            if (callback != undefined) {
                callback();
            }
        }
    }

    animateTrue();
}