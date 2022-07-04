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

    w.add(new Wall("ecke oben links light", 4, 3));

    let i = 0;
    for (i = 0; i < 4; i++) {
        w.add(new Wall("little brick oben light", 5 + i, 3));
        let wall4 = new Wall("einzelteil oben links light", 5 + i, 3);
        wall4.reverseY();
        w.add(wall4);
        let wall5 = new Wall("einzelteil oben rechts light", 5 + i, 3);
        wall5.reverseY();
        w.add(wall5);
    }

    w.add(new Wall("ecke oben rechts light", 5 + i, 3));

    let wall5 = new Wall("einzelteil oben links light", 5 + i, 3);
    wall5.reverseY();
    w.add(wall5);

    /*let wall25 = new Wall("start oben light", 9, 4);
    wall25.reverseY();
    w.add(wall25); */

    let wall11 = new Wall("einzelteil oben rechts light", 4, 3);
    wall11.reverseY();
    w.add(wall11);

    for (i = 0; i < 3; i++) {
        w.add(new Wall("norm light", 4, 4 + i));
    }

    w.add(new Wall("start oben links dark", 4, 6));
    w.add(new Wall("start oben dark", 5, 6));
    w.add(new Wall("start oben rechts dark", 6, 6));
    w.add(new Wooden_Door("closed", 7, 6));
    w.add(new Wall("start oben beide dark", 8, 6));
    w.add(new Wooden_Door_B("open", 5, 4));

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
                if (!obj.begehbar) { possible = false; }
            });
        if (possible) {
            w.add(new Decor_16x16("grass 1", x, y));
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
    const w = new world();

    let cols = 20;
    let rows = 13;

    // this function should generalize drawing a rectangular terrain form
    // Usage: The function relies on uniform naming in the Plains_Terrain
    // object; this can/should be extended for other objects. Ideally, this
    // function can even be generalized again so that it works with any
    // world_object where it makes sense to draw it as a rectangle, and where
    // there are nine components: top right, top left, bottom right, bottom left,
    // top, bottom, right, left, and fill.
    let rectangle = function (type, fill, walkable, x, y, length, height) {
        let objectList = [];

        let tr = " top right";
        let tl = " top left";
        let br = " bottom right";
        let bl = " bottom left";
        let t = " top";
        let b = " bottom";
        let r = " right";
        let l = " left";


        for (let i = 0; i <= length; i++) {
            for (let j = 0; j <= height; j++) {

                // Draw the four corners
                if (j == 0 && i == 0) {
                    objectList.push(new Plains_Terrain(type + tl, x, y));
                } else if (i == length && j == 0) {
                    objectList.push(new Plains_Terrain(type + tr, x + length, y));
                } else if (j == height && i == 0) {
                    objectList.push(new Plains_Terrain(type + bl, x, y + height));
                } else if (j == height && i == length) {
                    objectList.push(new Plains_Terrain(type + br, x + length, y + height));
                }

                // Draw the borders and the interior
                else if (j == 0) {
                    objectList.push(new Plains_Terrain(type + t, x + i, y + j));
                } else if (j == height) {
                    objectList.push(new Plains_Terrain(type + b, x + i, y + j));
                } else if (i == 0) {
                    objectList.push(new Plains_Terrain(type + l, x + i, y + j));
                } else if (i == length) {
                    objectList.push(new Plains_Terrain(type + r, x + i, y + j));
                } else {
                    if (fill == "grass") {
                        // special case, since this sprite is not in the
                        // Plains_Terrain object
                        objectList.push(new Grass_Floor(x + i, y + j))
                    } else {
                        objectList.push(new Plains_Terrain(fill, x + i, y + j));
                    }
                }

            }
        }

        for (cell of objectList) {
            cell.begehbar = walkable;
            w.add(cell);
        }
    }


    // reference objects
    let reference = function () {
        w.add(new Plains_Terrain("grass vertical top", 1, 1));
        w.add(new Plains_Terrain("grass top left", 2, 1));
        w.add(new Plains_Terrain("grass top", 3, 1));
        w.add(new Plains_Terrain("grass top right", 4, 1));
        w.add(new Plains_Terrain("dirt grass spot right bottom", 5, 1));
        w.add(new Plains_Terrain("dirt grass spot left bottom", 6, 1));

        w.add(new Plains_Terrain("grass vertical middle", 1, 2));
        w.add(new Plains_Terrain("grass left", 2, 2));
        w.add(new Plains_Terrain("dirt", 3, 2));
        w.add(new Plains_Terrain("grass right", 4, 2));
        w.add(new Plains_Terrain("dirt grass spot right top", 5, 2));
        w.add(new Plains_Terrain("dirt grass spot left top", 6, 2));

        w.add(new Plains_Terrain("grass vertical bottom", 1, 3));
        w.add(new Plains_Terrain("grass bottom left", 2, 3));
        w.add(new Plains_Terrain("grass bottom", 3, 3));
        w.add(new Plains_Terrain("grass bottom right", 4, 3));
        w.add(new Plains_Terrain("dirt grass double spot left", 5, 3));
        w.add(new Plains_Terrain("dirt grass double spot right", 6, 3));

        w.add(new Plains_Terrain("grass spot", 1, 4));
        w.add(new Plains_Terrain("grass horizontal left", 2, 4));
        w.add(new Plains_Terrain("grass horizonal middle", 3, 4));
        w.add(new Plains_Terrain("grass horizontal right", 4, 4));

        w.add(new Plains_Terrain("hill vertical top", 1, 5));
        w.add(new Plains_Terrain("hill top left", 2, 5));
        w.add(new Plains_Terrain("hill top", 3, 5));
        w.add(new Plains_Terrain("hill top right", 4, 5));
        w.add(new Plains_Terrain("grass rock right bottom", 5, 5));
        w.add(new Plains_Terrain("grass rock left bottom", 6, 5));

        w.add(new Plains_Terrain("hill vertical middle", 1, 6));
        w.add(new Plains_Terrain("hill left", 2, 6));
        w.add(new Plains_Terrain("hill", 3, 6));
        w.add(new Plains_Terrain("hill right", 4, 6));
        w.add(new Plains_Terrain("grass rock right top", 5, 6));
        w.add(new Plains_Terrain("grass rock left top", 6, 6));

        w.add(new Plains_Terrain("hill vertical bottom", 1, 7));
        w.add(new Plains_Terrain("hill bottom left", 2, 7));
        w.add(new Plains_Terrain("hill bottom", 3, 7));
        w.add(new Plains_Terrain("hill bottom right", 4, 7));
        w.add(new Plains_Terrain("grass rock double spot left", 5, 7));
        w.add(new Plains_Terrain("grass rock double spot right", 6, 7));

        w.add(new Plains_Terrain("hill spot", 1, 8));
        w.add(new Plains_Terrain("hill horizontal left", 2, 8));
        w.add(new Plains_Terrain("hill horizontal middle", 3, 8));
        w.add(new Plains_Terrain("hill horizontal right", 4, 8));
    }
    
    // draw the background
    rectangle("grass", "dirt", true, 0, 0, cols - 1, rows - 1);

    // draw decorations
    for (i = 0; i < 15; i++) {
        let x = Random(1, 19);
        let y = Random(1, 12);
        let variant = Random(1, 4)

        w.add(new Decor_16x16("dirt " + variant, x, y))

    }

    // draw some hills as obstacles
    rectangle("hill", "hill", false, 2, 5, 4, 4);
    rectangle("hill", "hill", false, 8, 2, 1, 9);
    rectangle("hill", "hill", false, 12, 1, 5, 2);
    rectangle("hill", "hill", false, 16, 7, 1, 3);


    // add slimes to fight
    for (i = 0; i < 5; i++) {
        let x = Random(0, 19);
        let y = Random(0, 12);
        let slime = new Slime(x, y);

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
                if (!obj.begehbar) { possible = false; }
            });
        if (possible) {
            w.add(slime);
        } else { i--; }
    }


    return w;
}
