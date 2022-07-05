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

        this.value = string; // the content / value (text, src of img, ...)
        this.color = string; // the content / value as color
        this.type = type; // text, image, rect, ...
        if (type == "asset") {
            this.image = string.img; // string is an asset() object
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
                    this.value.css.startX,
                    this.value.css.startY,
                    this.value.css.width,
                    this.value.css.height,
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
        } else if (type == "text") {
            this.update = function () {
                let ctx = gameArea.context;
                // width = font-size, height = font-family
                let textArr = this.value.split("\n");
                textArr.forEach((text, index) => {
                    ctx.font = this.width + "px " + this.height;
                    ctx.fillStyle = this.color;
                    let trueY = this.y + index * this.width;
                    ctx.fillText(text, this.x, trueY);
                });
            }
        }
    }
    percentTOpixel() { // we want to write in percent to make it responsive, not in pixel
        // for now the percent are relative to the width
        // you can change it to the height by replacing "gameArea.canvas.width"
        // by "gameArea.canvas.height" in line 1 (== 169), 3 (== 171), 5 (== 173) and 6 (174)
        // this.width = (this.width / 100) * gameArea.canvas.width /* width: percent to pixel */
        // if (typeof this.height == "number") { // don't, if height is e.g. a font-family - string e.g. "Arial"
        //     this.height = (this.height / 100) * gameArea.canvas.width // height: percent to pixel
        // }
        // this.x = (this.x / 100) * gameArea.canvas.width /* height: percent to pixel - location on the x axis */
        // this.y = (this.y / 100) * gameArea.canvas.width /* height: percent to pixel - location on the y axis */
        this.width = gameArea.percentTOpixel(this.width); /* width: percent to pixel */
        if (typeof this.height == "number") { // don't, if height is e.g. a font-family - string e.g. "Arial"
            this.height = gameArea.percentTOpixel(this.height); // height: percent to pixel
        }
        this.x = gameArea.percentTOpixel(this.x); /* height: percent to pixel - location on the x axis */
        this.y = gameArea.percentTOpixel(this.y); /* height: percent to pixel - location on the y axis */
    }
    reverseX() {
        this.scaleX *= -1;
    }
    reverseY() {
        this.scaleY *= -1;
    }
    changeAsset(ass) {
        this.image = ass.img; // ass is an asset() object
        this.value = ass;
    }
}
