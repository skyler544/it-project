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
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    percentTOpixel: function (p) {
        return percTOpix(p, this.canvas.width);
    }
}

/**
 * 
 * @param { number } percent 
 */
function percTOpix(percent, reference) {
    return (percent / 100) * reference;
}

function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // var zahl = Math.random() % (max-min+1);
    var zahl = Math.floor(Math.random() * (max - min + 1)) + min;
    return zahl;
}