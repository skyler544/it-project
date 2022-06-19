/**
 * Functions for drawing to the canvas element
 */

var gameArea = {
    // context,
    // canvas : { width, height },
    load: function () {
        // not especially needed, you execute it after the page is loaded -> e.g. $(document).ready(gameArea.load)
        gameArea.canvas = document.getElementById("game");
        gameArea.context = gameArea.canvas.getContext("2d");
        gameArea.resize();
    },
    // please also check if in vertical mode - or force vertical mode ...
    resize: function () { // absolute size not important! -> only proportion
        // resizing only dependent from height - don't make it also dependent from the width, beacause then the proportion will be lost!!!
        gameArea.canvas.height = window.innerHeight * 3;  // * 3 for better resolution
        gameArea.canvas.width = gameArea.canvas.height * 1.535 // 1.535 times as wide as the height - can / should be changed
        // -> Proportion for now : 
        // 1 : 1,535
        // 1000 : 1535
        // 200 : 307
        // 2 : 3,07 (2 heiht - 3,07 width)
        // I made it so, that the squares fit nearly perfectly (I didn't want semi-squares)
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update: function () {
        // maybe usefull for automatic movements, etc.
    }
}

class component {
    constructor(type, string) {
        this.scaleX = 1;
        this.scaleY = 1;
        // how big
        this.width = 0;
        this.height = 0;
        // position
        this.x = 0;
        this.y = 0;
        // position in the image / source / asset
        this.src_x = 0;
        this.src_y = 0;
        // width, height in the image / source / asset
        this.src_width = 0;
        this.src_height = 0;

        this.value = string; // the content / value (text, src of img, ...)
        this.color = string; // the content / value as color
        this.type = type; // text, image, rect, ...
        if (type == "asset") {
            this.image = string.img; // string is an asset() object
            this.src_x = string.css.startX;
            this.src_y = string.css.startY;
            this.src_width = string.css.width;
            this.src_height = string.css.height;
        } else if (type == "image" || type == "background") {
            this.image = new Image(); // create a new image
            this.image.src = string;
        }

        // this.update() draws the thing on the game, that is why each type of thing must have its own "this.update" function
        if (type == "rect") { // let's draw a rectangle
            this.update = function () {
                let ctx = gameArea.context;
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        } else if (type == "circle") { // let's draw a circle
            this.update = function () {
                let ctx = gameArea.context;
                ctx.fillStyle = this.color; // set fillStyle
                ctx.beginPath(); // ok, here we start
                ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI); // make the arc
                ctx.stroke(); // draw the line - we can remove that if we don't want a line / border
                ctx.fill(); // apply fillStyle
            }
        } else if (type == "image" || type == "asset") {
            this.update = function () {
                let ctx = gameArea.context;
                // set height / width
                this.x *= this.scaleX;
                this.y *= this.scaleY;
                this.width *= this.scaleX;
                this.height *= this.scaleY;
                ctx.save();
                ctx.scale(this.scaleX, this.scaleY);
                /** ctx.drawImage(
                 *      image,
                 *      source x,
                 *      source y,
                 *      source width,
                 *      source height,
                 *      destination x,
                 *      destination y,
                 *      destination width,
                 *      destination height
                 * )
                 * */
                ctx.drawImage(
                    this.image,
                    // source
                    this.src_x,
                    this.src_y,
                    this.src_width,
                    this.src_height,
                    // destination
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
                // restore height / width
                this.x /= this.scaleX;
                this.y /= this.scaleY;
                this.width /= this.scaleX;
                this.height /= this.scaleY;
                ctx.restore();
            }
        }/*  else if (type == "asset") {
            this.update = function() {
                let ctx = gameArea.context;
                /**  ctx.drawImage(
                 *      image,
                 *      source x,
                 *      source y,
                 *      source width,
                 *      source height,
                 *      destination x,
                 *      destination y,
                 *      destination width,
                 *      destination height
                 * )
                 * * /
                ctx.drawImage(
                    this.image,
                    string.css.startX,
                    string.css.startY,
                    string.css.width,
                    string.css.height,
                    this.x, this.y,
                    this.width,
                    this.height
                );
            }
        }*/ else if (type == "text") {
            this.update = function () {
                let ctx = gameArea.context;
                // width = font-size, height = font-family
                ctx.font = this.width + "px " + this.height;
                ctx.fillStyle = this.color;
                ctx.fillText(this.value, this.x, this.y);
            }
        }
    }
    // used for automatic movement - in gameArea.update()
    newPos() {
        // change the position according to the speed
        this.x += this.speedX;
        this.y += this.speedY;
    }
    percentTOpixel() { // we want to write in percent to make it responsive, not in pixel
        // for now the percent are relative to the width
        // you can change it to the height by replacing "gameArea.canvas.width"
        // by "gameArea.canvas.height" in line 1 (== 103) and 3 (== 105)
        this.width = (this.width / 100) * gameArea.canvas.width /* width: percent to pixel */
        if (typeof this.height == "number") { // don't, if height is e.g. a font-family - string e.g. "Arial"
            this.height = (this.height / 100) * gameArea.canvas.width // height: percent to pixel
        }
        this.x = (this.x / 100) * gameArea.canvas.width /* height: percent to pixel - location on the x axis */
        this.y = (this.y / 100) * gameArea.canvas.width /* height: percent to pixel - location on the y axis */
        // this.speedY = (this.speedY/100) * gameArea.canvas.height /* height: vertical speed is the same on each display */
        this.speed = (this.speed / 100) * gameArea.canvas.height /* height: vertical speed is the same on each display */
    }
    reverseX() {
        this.scaleX *= -1;
        // this.x *= -1;
    }
    reverseY() {
        this.scaleY *= -1;
        // this.y *= -1;
    }
    changeAsset(ass) {
        this.image = ass.img; // ass is an asset() object
        this.src_x = ass.css.startX;
        this.src_y = ass.css.startY;
        this.src_width = ass.css.width;
        this.src_height = ass.css.height;
    }
}
