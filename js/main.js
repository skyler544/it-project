$(document).ready(gameArea.load);
$(document).ready(main);

function main() {
    assetMap.init();
    w = new world;

    // print 13 lines of blocks == full table
    for (j = 0; j < 13; j++) {
        // print 20 blocks in on the line == full line
        for (i = 0; i < 20; i++) {
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

    let wall0 = new Wall("start oben light", 3, 3);
    w.add(wall0);

    let wall1 = new Wall("ecke oben links light", 4, 3);
    w.add(wall1);

    let wall2 = new Wall("little brick oben light", 5, 3);
    w.add(wall2);

    let wall3 = new Wall("ecke oben rechts light", 6, 3);
    w.add(wall3);

    let wall4 = new Wall("umbug oben links light", 7, 3);
    w.add(wall4);

    let wall5 = new Wall("umbug oben rechts light", 8, 3);
    w.add(wall5);

    let wall6 = new Wall("norm light", 3, 4);
    w.add(wall6);

    let wall7 = new Wall("ecke unten links light", 4, 4);
    w.add(wall7);

    let wall8 = new Wall("little brick unten light", 5, 4);
    w.add(wall8);

    let wall9 = new Wall("ecke unten rechts light", 6, 4);
    w.add(wall9);

    let wall10 = new Wall("einzelteil oben rechts light", 7, 4);
    w.add(wall10);

    let wall11 = new Wall("einzelteil oben links light", 8, 4);
    w.add(wall11);

    let wall12 = new Wall("start oben beide dark", 3, 5);
    w.add(wall12);

    let wall13 = new Wall("start oben links dark", 4, 5);
    w.add(wall13);

    let wall14 = new Wall("start oben dark", 5, 5);
    w.add(wall14);

    let wall15 = new Wall("start oben rechts dark", 6, 5);
    w.add(wall15);

    let wall16 = new Wall("einzelteil unten rechts dark", 7, 5);
    w.add(wall16);

    let wall17 = new Wall("einzelteil unten links dark", 8, 5);
    w.add(wall17);

    let wall18 = new Wall("start unten beide dark", 3, 6);
    w.add(wall18);

    let wall19 = new Wall("start unten links dark", 4, 6);
    w.add(wall19);

    let wall20 = new Wall("start unten dark", 5, 6);
    w.add(wall20);

    let wall21 = new Wall("start unten rechts dark", 6, 6);
    w.add(wall21);

    let wall22 = new Wall("umbug unten links dark", 7, 6);
    w.add(wall22);

    let wall23 = new Wall("umbug unten rechts dark", 8, 6);
    w.add(wall23);

    let door1 = new Wooden_Door("closed", 9, 6);
    w.add(door1);
    let door2 = new Wooden_Door("open", 10, 6);
    w.add(door2);

    let door3 = new Wooden_Door_B("closed", 9, 5);
    w.add(door3);
    let door4 = new Wooden_Door_B("open", 10, 5);
    w.add(door4);

    let player = new Player(0, 0);
    w.add(player);

    const ev = new MyEvent();
    const speed = 1;
    ev.start();

    let movePlayer = function () {
        // if player any arrow key is pressed -> player is moving (start movement animation)
        if (ev.downPressed || ev.upPressed || ev.leftPressed || ev.rightPressed) {
            player.move_start(); // does nothing if player.isMoving is already true
        } else {
            // if no arrow key is pressed -> player stopped -> return to default animation
            player.move_end(); // does nothing if player isn't moving
        }
        if (ev.rightPressed) {
            player.move(speed, 0);
        } if (ev.leftPressed) {
            player.move(-speed, 0);
        } if (ev.upPressed) {
            player.move(0, -speed);
        } if (ev.downPressed) {
            player.move(0, speed);
        }
    }

    let repeat = function() {
        movePlayer();
        w.print();
    }

    let intervall = setInterval(repeat, 60);
}