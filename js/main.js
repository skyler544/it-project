$(document).ready(gameArea.load);
$(document).ready(main);

function main() {
    w = new world;

    // print 20 lines of blocks == full table
    for (j = 0; j < 20; j++) {
        // print 20 blocks in on the line == full line
        for (i = 0; i < 20; i++) {
            // create a new component
            let BLOCK_str;
            let BLOCK_map;
            if (i < 3 || j < 3 || j > 16 || i > 16) {
                BLOCK_str = "wooden";
                BLOCK_map = assetMap.mystic_woods.tilesets.floors.wooden;
            } else {
                BLOCK_str = "grass";
                BLOCK_map = assetMap.mystic_woods.tilesets.floors.grass;
            }
            let BLOCK_asset = new asset(BLOCK_map, BLOCK_str);
            let BLOCK = new component("asset", BLOCK_asset);
            BLOCK.x = i * SQUARE_SIDE_LEN;
            BLOCK.y = j * SQUARE_SIDE_LEN;
            BLOCK.width = SQUARE_SIDE_LEN;
            BLOCK.height = SQUARE_SIDE_LEN;
            // BLOCK.color = "blue"; -- optional
            BLOCK.percentTOpixel();

            w.add(BLOCK); // add the block to the world
        }
    }
    let player1_map = assetMap.mystic_woods.characters.player;
    let player1_asset = new asset(player1_map, 6);
    let player1 = new component("asset", player1_asset);
    player1.x = 0;
    player1.y = 0;
    player1.width = SQUARE_SIDE_LEN;
    player1.height = SQUARE_SIDE_LEN;
    player1.percentTOpixel();

    // console.log(player1);
    
    w.add(player1);

    w.print(); // print the world

    window.setInterval(function() {
        moveSquare(player1, "right");
        w.print();
    }, 1000);
}