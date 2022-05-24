$(document).ready(gameArea.load);
$(document).ready(main);

function main() {
    w = new world;

    // print 20 blocks in on the first line == full first line
    for (i = 0; i < 20; i++) {
        // create a new component
        let BLOCK = new component("rect", "blue");
        BLOCK.x = i * SQUARE_SIDE_LEN;
        BLOCK.y = 0;
        BLOCK.width = SQUARE_SIDE_LEN;
        BLOCK.height = SQUARE_SIDE_LEN;
        // BLOCK.color = "blue"; -- optional
        BLOCK.percentTOpixel();

        w.add(BLOCK); // add the block to the world
    }

    w.print(); // print the world
}