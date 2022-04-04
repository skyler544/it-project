/**
 * Functions for drawing to the canvas element
 */

/**
 * Do we want to use images, or draw them ourselves?
 * For the moment I (Max) prepared for both...
 */
const draw = {
// draw yourself
    // just some info / getter functions
    miniRect_height() { return 5; },
    miniRect_width() { return 5; },
    targetId() { return "game" },

    // just some test
    testfeld : [ // 6 x 6
        "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", "lightblue", 
        "lightblue", "lightblue", "black",     "black",     "lightblue", "lightblue", 
        "lightgreen","green",     "black",     "black",     "green",     "lightgreen", 
        "green",     "green",     "black",     "black",     "green",     "green", 
        "red",       "red",       "red",       "red",       "red",       "red",
        "red",       "red",       "red",       "red",       "red",       "red"
    ],

    // draw.rect() : draw a single rectangle with one color
    rect(x, y, height, width, color) {
        // canvas object
        let ctx = document.getElementById(this.targetId()).getContext("2d");
        
        ctx.fillStyle = color; // set the color
        ctx.fillRect(x, y, width, height); // draw the rectangle
    },
    // draw.miniRect() : draw a mini rectangle with one colr
    miniRect(x, y, color) {
        this.rect(x, y, this.miniRect_height(), this.miniRect_width(), color);
    },
    // draw.case() : draw a case (feld - see feld.js), composed of multiple miniRects
    case(feld) {
        let x = 0; let y = 0;
        feld.forEach(color => {
            console.log(x, y, color);
            this.miniRect(x, y, color);
            x += this.miniRect_width();
            if (x >= this.miniRect_width() * 6) {
                x = 0; y += this.miniRect_height();
            }
        });
    },

// draw images
    // draw.image() : draw an image
    image(x, y, image) {
        // canvas object
        let ctx = document.getElementById(this.targetId()).getContext("2d");

        // !!! please change this !!!
        let img = new Image(this.miniRect_width(), this.miniRect_height());

        ctx.drawImage(img, x, y); // draw the image
    }
}

// just some testing
draw.case(draw.testfeld);

