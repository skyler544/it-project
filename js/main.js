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
    let player1_map = assetMap.mystic_woods.characters.player;
    let player1_asset = new asset(player1_map, 6);
    let player1 = new component("asset", player1_asset);
    player1.x = 0;
    player1.y = 0;
    player1.width = SQUARE_SIDE_LEN;
    player1.height = SQUARE_SIDE_LEN;
    player1.percentTOpixel();
    
    w.add(player1);

    w.print(); // print the world
}