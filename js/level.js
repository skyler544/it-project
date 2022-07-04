/**
 * 
 * @param { Function } next 
 * @returns 
 */
function level1() {
    const w = new world();
     // print 13 lines of blocks == full table
     for (let j = 0; j < 13; j++) {
        // print 20 blocks in on the line == full line
        for (let i = 0; i < 20; i++) {
            // create a new component
            let BLOCK;
            if (i < 3 || j < 2 || j > 10 || i > 16) {
                BLOCK = new Wooden_Floor(i, j);
            } else {
                BLOCK = new Grass_Floor(i, j);
            }

            w.add(BLOCK); // add the block to the world
        }
    }


    let wall1 = new Wall("ecke oben links light", 4, 3);
    w.add(wall1);

    let i = 0;
    for (i = 0; i < 4; i++) {
        let wall2 = new Wall("little brick oben light", 5+i, 3);
        w.add(wall2);
        let wall4 = new Wall("einzelteil oben links light", 5+i, 3);
        wall4.reverseY();
        w.add(wall4);
        let wall5 = new Wall("einzelteil oben rechts light", 5+i, 3);
        wall5.reverseY();
        w.add(wall5);
    }

    let wall3 = new Wall("ecke oben rechts light", 5+i, 3);
    w.add(wall3);

    let wall5 = new Wall("einzelteil oben links light", 5+i, 3);
    wall5.reverseY();
    w.add(wall5);

    /*let wall25 = new Wall("start oben light", 9, 4);
    wall25.reverseY();
    w.add(wall25); */

    let wall11 = new Wall("einzelteil oben rechts light", 4, 3);
    wall11.reverseY();
    w.add(wall11);

    for (i = 0; i < 3; i++) {
        let wall6 = new Wall("norm light", 4, 4+i);
        w.add(wall6);
    }

    let wall13 = new Wall("start oben links dark", 4, 6);
    w.add(wall13);

    let wall14 = new Wall("start oben dark", 5, 6);
    w.add(wall14);

    let wall15 = new Wall("start oben rechts dark", 6, 6);
    w.add(wall15);

    let door1 = new Wooden_Door("closed", 7, 6);
    w.add(door1);

    let wall23 = new Wall("start oben beide dark", 8, 6);
    w.add(wall23);

    let door2 = new Wooden_Door_B("open", 5, 4);
    w.add(door2);

    // some decorations
    for (i = 0; i < 15; i++) {
        let x = Random(3, 16);
        let y = Random(2, 10);

        let possible = true;
        let trueX = gameArea.percentTOpixel(x * SQUARE_SIDE_LEN);
        let trueY = gameArea.percentTOpixel(y * SQUARE_SIDE_LEN);
        let other = w.at(trueX, trueY);
        other.forEach(
            /**
             * 
             * @param { world_object } obj 
             */
            (obj) => {
                if (!obj.begehbar) { possible = false; console.log(obj); }
            });
        if (possible) {
            let decor1 = new Decor_16x16("grass 1", x, y);
            w.add(decor1);
        } else { i--; }
    }

    for (i = 0; i < 5; i++) {
        let x = Random(0, 19);
        let y = Random(0, 12);
        let slime = new Slime(x, y);
        w.add(slime);
    }

    return w;
}

function level2() {
    return new world();
}