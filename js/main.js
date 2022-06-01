$(document).ready(gameArea.load);
$(document).ready(main);

function main() {
    w = new world;

    // print 20 lines of blocks == full table
    for (j = 0; j < 13; j++) {
        // print 20 blocks in on the line == full line
        for (i = 0; i < 20; i++) {
            // create a new component
            let BLOCK_str;
            let BLOCK_map;
            if (i < 3 || j < 2 || j > 10 || i > 16) {
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
    let player1_asset = new asset(player1_map, 14);
    let player1 = new component("asset", player1_asset);
    player1.x = 0;
    player1.y = 0;
    player1.width = SQUARE_SIDE_LEN;
    player1.height = SQUARE_SIDE_LEN;
    player1.percentTOpixel();
    w.add(player1);

    let wall_map = assetMap.mystic_woods.tilesets.walls.walls;
    let wall0_asset = new asset(wall_map, "start oben light");
    let wall0 = new component("asset", wall0_asset);
    wall0.x = 3 * SQUARE_SIDE_LEN;
    wall0.y = 3 * SQUARE_SIDE_LEN;
    wall0.width = SQUARE_SIDE_LEN;
    wall0.height = SQUARE_SIDE_LEN;
    wall0.percentTOpixel();
    w.add(wall0);

    let wall1_asset = new asset(wall_map, "ecke oben links light");
    let wall1 = new component("asset", wall1_asset);
    wall1.x = 4 * SQUARE_SIDE_LEN;
    wall1.y = 3 * SQUARE_SIDE_LEN;
    wall1.width = SQUARE_SIDE_LEN;
    wall1.height = SQUARE_SIDE_LEN;
    wall1.percentTOpixel();
    w.add(wall1);

    let wall2_asset = new asset(wall_map, "little brick oben light");
    let wall2 = new component("asset", wall2_asset);
    wall2.x = 5 * SQUARE_SIDE_LEN;
    wall2.y = 3 * SQUARE_SIDE_LEN;
    wall2.width = SQUARE_SIDE_LEN;
    wall2.height = SQUARE_SIDE_LEN;
    wall2.percentTOpixel();
    w.add(wall2);

    let wall3_asset = new asset(wall_map, "ecke oben rechts light");
    let wall3 = new component("asset", wall3_asset);
    wall3.x = 6 * SQUARE_SIDE_LEN;
    wall3.y = 3 * SQUARE_SIDE_LEN;
    wall3.width = SQUARE_SIDE_LEN;
    wall3.height = SQUARE_SIDE_LEN;
    wall3.percentTOpixel();
    w.add(wall3);

    let wall4_asset = new asset(wall_map, "umbug oben links light");
    let wall4 = new component("asset", wall4_asset);
    wall4.x = 7 * SQUARE_SIDE_LEN;
    wall4.y = 3 * SQUARE_SIDE_LEN;
    wall4.width = SQUARE_SIDE_LEN;
    wall4.height = SQUARE_SIDE_LEN;
    wall4.percentTOpixel();
    w.add(wall4);

    let wall5_asset = new asset(wall_map, "umbug oben rechts light");
    let wall5 = new component("asset", wall5_asset);
    wall5.x = 8 * SQUARE_SIDE_LEN;
    wall5.y = 3 * SQUARE_SIDE_LEN;
    wall5.width = SQUARE_SIDE_LEN;
    wall5.height = SQUARE_SIDE_LEN;
    wall5.percentTOpixel();
    w.add(wall5);

    let wall6_asset = new asset(wall_map, "norm light");
    let wall6 = new component("asset", wall6_asset);
    wall6.x = 3 * SQUARE_SIDE_LEN;
    wall6.y = 4 * SQUARE_SIDE_LEN;
    wall6.width = SQUARE_SIDE_LEN;
    wall6.height = SQUARE_SIDE_LEN;
    wall6.percentTOpixel();
    w.add(wall6);

    let wall7_asset = new asset(wall_map, "ecke unten links light");
    let wall7 = new component("asset", wall7_asset);
    wall7.x = 4 * SQUARE_SIDE_LEN;
    wall7.y = 4 * SQUARE_SIDE_LEN;
    wall7.width = SQUARE_SIDE_LEN;
    wall7.height = SQUARE_SIDE_LEN;
    wall7.percentTOpixel();
    w.add(wall7);

    let wall8_asset = new asset(wall_map, "little brick unten light");
    let wall8 = new component("asset", wall8_asset);
    wall8.x = 5 * SQUARE_SIDE_LEN;
    wall8.y = 4 * SQUARE_SIDE_LEN;
    wall8.width = SQUARE_SIDE_LEN;
    wall8.height = SQUARE_SIDE_LEN;
    wall8.percentTOpixel();
    w.add(wall8);

    let wall9_asset = new asset(wall_map, "ecke unten rechts light");
    let wall9 = new component("asset", wall9_asset);
    wall9.x = 6 * SQUARE_SIDE_LEN;
    wall9.y = 4 * SQUARE_SIDE_LEN;
    wall9.width = SQUARE_SIDE_LEN;
    wall9.height = SQUARE_SIDE_LEN;
    wall9.percentTOpixel();
    w.add(wall9);

    w.print(); // print the world

    window.addEventListener("keyup", function(ev) {
        if (ev.code == "ArrowRight") {
            moveSquare(player1, "right");
            w.print();
        } else if (ev.code == "ArrowLeft") {
            moveSquare(player1, "left");
            w.print();
        } else if (ev.code == "ArrowDown") {
            moveSquare(player1, "down");
            w.print();
        } else if (ev.code == "ArrowUp") {
            moveSquare(player1, "up");
            w.print();
        }
    });
}