/**
 * Functions for drawing to the canvas element
 */

var gameArea = {
    load : function () {
        // not especially needed, you execute it after the page is loaded -> e.g. $(document).ready(gameArea.load)
        gameArea.canvas = document.getElementById("game");
        gameArea.context = gameArea.canvas.getContext("2d");
        gameArea.resize();

        // just some intro, test or whatever you like ...
        let START = new component("text", "Click to Start");
        START.y = 45;
        START.width = 10; // width = font-size, height = font-family
        START.height = "Arial"; // width = font-size, height = font-family
        START.x = 20;
        START.color = "white";
        START.percentTOpixel(); // x, y, width and height will be changed to pixel (relative to the size of the game)
        START.update(); // we need to update the game after each action (also update reguarly later) -> setIntervall
    },
    resize : function () { // absolute size not important! -> only proportion
        gameArea.canvas.width = window.innerWidth * 3; // * 3 for better resolution
        gameArea.canvas.height = window.innerHeight * 3;  // * 3 for better resolution
    }
}

$(document).ready(gameArea.load);

class component {
    constructor(type, string) {
        // how big
        this.width = 0;
        this.height = 0;
        // movement speed - how much x or should be augmented in one go
        this.speedX = 0;
        this.speedY = 0;
        // position
        this.x = 0;
        this.y = 0;
        this.life = 0; // maybe somewhere else ?
        this.value = string; // the content / value (text, src of img, ...)
        this.color = string; // the content / value as color
        this.type = type; // text, image, rect, ...
        if(type == "image" || type == "background") {
            this.image = new Image(); // create a new image
            this.image.src = string;
        }
        
        // this.update() draws the thing on the game, that is why each type of thing must have its own "this.update" function
        if (type == "rect") { // let's draw a rectangle
            this.update = function() {
                let ctx = gameArea.context;
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        } else if (type == "circle") { // let's draw a circle
            this.update = function() {
                let ctx = gameArea.context;
                ctx.fillStyle = this.color; // set fillStyle
                ctx.beginPath(); // ok, here we start
                ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI); // make the arc
                ctx.stroke(); // draw the line - we can remove that if we don't want a line / border
                ctx.fill(); // apply fillStyle
            }
        } else if (type == "image") {
            this.update = function() {
                let ctx = gameArea.context;
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        } else if (type == "text") {
            this.update = function() {
                let ctx = gameArea.context;
                // width = font-size, height = font-family
                ctx.font = this.width + "px " + this.height;
                ctx.fillStyle = this.color;
                ctx.fillText(this.value, this.x, this.y);
            }
        }
    }
    newPos() {
        // change the position according to the speed
        this.x += this.speedX;
        this.y += this.speedY;
    }
    percentTOpixel() { // we want to write in percent to make it responsive, not in pixel
        this.width = (this.width/100) * gameArea.canvas.width /* width: percent to pixel */
        if (typeof this.height == "number") { // don't, if height is e.g. a font-family - string e.g. "Arial"
            this.height = (this.height/100) * gameArea.canvas.width /* height: percent to pixel */
        }
        this.x = (this.x/100) * gameArea.canvas.width /* height: percent to pixel */
        this.y = (this.y/100) * gameArea.canvas.height /* height: percent to pixel */
        this.speedY = (this.speedY/100) * gameArea.canvas.height /* height: vertical speed is the same on each display */
    }
}