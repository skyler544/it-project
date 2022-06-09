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

    let wall10_asset = new asset(wall_map, "einzelteil oben rechts light");
    let wall10 = new component("asset", wall10_asset);
    wall10.x = 7 * SQUARE_SIDE_LEN;
    wall10.y = 4 * SQUARE_SIDE_LEN;
    wall10.width = SQUARE_SIDE_LEN;
    wall10.height = SQUARE_SIDE_LEN;
    wall10.percentTOpixel();
    w.add(wall10);

    let wall11_asset = new asset(wall_map, "einzelteil oben links light");
    let wall11 = new component("asset", wall11_asset);
    wall11.x = 8 * SQUARE_SIDE_LEN;
    wall11.y = 4 * SQUARE_SIDE_LEN;
    wall11.width = SQUARE_SIDE_LEN;
    wall11.height = SQUARE_SIDE_LEN;
    wall11.percentTOpixel();
    w.add(wall11);

    let wall12_asset = new asset(wall_map, "start oben beide dark");
    let wall12 = new component("asset", wall12_asset);
    wall12.x = 3 * SQUARE_SIDE_LEN;
    wall12.y = 5 * SQUARE_SIDE_LEN;
    wall12.width = SQUARE_SIDE_LEN;
    wall12.height = SQUARE_SIDE_LEN;
    wall12.percentTOpixel();
    w.add(wall12);

    let wall13_asset = new asset(wall_map, "start oben links dark");
    let wall13 = new component("asset", wall13_asset);
    wall13.x = 4 * SQUARE_SIDE_LEN;
    wall13.y = 5 * SQUARE_SIDE_LEN;
    wall13.width = SQUARE_SIDE_LEN;
    wall13.height = SQUARE_SIDE_LEN;
    wall13.percentTOpixel();
    w.add(wall13);

    let wall14_asset = new asset(wall_map, "start oben dark");
    let wall14 = new component("asset", wall14_asset);
    wall14.x = 5 * SQUARE_SIDE_LEN;
    wall14.y = 5 * SQUARE_SIDE_LEN;
    wall14.width = SQUARE_SIDE_LEN;
    wall14.height = SQUARE_SIDE_LEN;
    wall14.percentTOpixel();
    w.add(wall14);

    let wall15_asset = new asset(wall_map, "start oben rechts dark");
    let wall15 = new component("asset", wall15_asset);
    wall15.x = 6 * SQUARE_SIDE_LEN;
    wall15.y = 5 * SQUARE_SIDE_LEN;
    wall15.width = SQUARE_SIDE_LEN;
    wall15.height = SQUARE_SIDE_LEN;
    wall15.percentTOpixel();
    w.add(wall15);

    let wall16_asset = new asset(wall_map, "einzelteil unten rechts dark");
    let wall16 = new component("asset", wall16_asset);
    wall16.x = 7 * SQUARE_SIDE_LEN;
    wall16.y = 5 * SQUARE_SIDE_LEN;
    wall16.width = SQUARE_SIDE_LEN;
    wall16.height = SQUARE_SIDE_LEN;
    wall16.percentTOpixel();
    w.add(wall16);

    let wall17_asset = new asset(wall_map, "einzelteil unten links dark");
    let wall17 = new component("asset", wall17_asset);
    wall17.x = 8 * SQUARE_SIDE_LEN;
    wall17.y = 5 * SQUARE_SIDE_LEN;
    wall17.width = SQUARE_SIDE_LEN;
    wall17.height = SQUARE_SIDE_LEN;
    wall17.percentTOpixel();
    w.add(wall17);

    let wall18_asset = new asset(wall_map, "start unten beide dark");
    let wall18 = new component("asset", wall18_asset);
    wall18.x = 3 * SQUARE_SIDE_LEN;
    wall18.y = 6 * SQUARE_SIDE_LEN;
    wall18.width = SQUARE_SIDE_LEN;
    wall18.height = SQUARE_SIDE_LEN;
    wall18.percentTOpixel();
    w.add(wall18);

    let wall19_asset = new asset(wall_map, "start unten links dark");
    let wall19 = new component("asset", wall19_asset);
    wall19.x = 4 * SQUARE_SIDE_LEN;
    wall19.y = 6 * SQUARE_SIDE_LEN;
    wall19.width = SQUARE_SIDE_LEN;
    wall19.height = SQUARE_SIDE_LEN;
    wall19.percentTOpixel();
    w.add(wall19);

    let wall20_asset = new asset(wall_map, "start unten dark");
    let wall20 = new component("asset", wall20_asset);
    wall20.x = 5 * SQUARE_SIDE_LEN;
    wall20.y = 6 * SQUARE_SIDE_LEN;
    wall20.width = SQUARE_SIDE_LEN;
    wall20.height = SQUARE_SIDE_LEN;
    wall20.percentTOpixel();
    w.add(wall20);

    let wall21_asset = new asset(wall_map, "start unten rechts dark");
    let wall21 = new component("asset", wall21_asset);
    wall21.x = 6 * SQUARE_SIDE_LEN;
    wall21.y = 6 * SQUARE_SIDE_LEN;
    wall21.width = SQUARE_SIDE_LEN;
    wall21.height = SQUARE_SIDE_LEN;
    wall21.percentTOpixel();
    w.add(wall21);

    let wall22_asset = new asset(wall_map, "umbug unten links dark");
    let wall22 = new component("asset", wall22_asset);
    wall22.x = 7 * SQUARE_SIDE_LEN;
    wall22.y = 6 * SQUARE_SIDE_LEN;
    wall22.width = SQUARE_SIDE_LEN;
    wall22.height = SQUARE_SIDE_LEN;
    wall22.percentTOpixel();
    w.add(wall22);

    let wall23_asset = new asset(wall_map, "umbug unten rechts dark");
    let wall23 = new component("asset", wall23_asset);
    wall23.x = 8 * SQUARE_SIDE_LEN;
    wall23.y = 6 * SQUARE_SIDE_LEN;
    wall23.width = SQUARE_SIDE_LEN;
    wall23.height = SQUARE_SIDE_LEN;
    wall23.percentTOpixel();
    w.add(wall23);

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