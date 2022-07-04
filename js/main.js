$(document).ready(gameArea.load);
$(document).ready(main);

function main() {
    assetMap.init();
    var level_cleared = false;
    var level_num = 1;
    w = eval("level" + level_num + "()");

    let next_level = () => {
        level_cleared = false;
        level_num++;
        w = eval("level" + level_num + "()");
        w.add(player);
    }

    let player = new Player(0, 0);
    w.add(player);

    const ev = new MyEvent();
    const speed = 1;

    let movePlayer = function () {

        // boolean variables for boundary checking
        let leftBorder = player.x + speed < 0;
        let rightBorder = player.x + speed > gameArea.canvas.width - player.width;
        let bottomBorder = player.y + speed > gameArea.canvas.height - player.height;
        let topBorder = player.y + speed < 0;

        // if player any arrow key is pressed -> player is moving (start movement animation)
        if (ev.downPressed || ev.upPressed || ev.leftPressed || ev.rightPressed) {
            player.move_start(); // does nothing if player.isMoving is already true
        } else {
            // if no arrow key is pressed -> player stopped -> return to default animation
            player.move_end(); // does nothing if player isn't moving
        }

        // if the button is pressed and the move would not
        // take the player out of bounds, then move the player.
        if (ev.rightPressed && !rightBorder) {
            player.move(speed, 0);
        } if (ev.leftPressed && !leftBorder) {
            player.move(-speed, 0);
        } if (ev.upPressed && !topBorder) {
            player.move(0, -speed);
        } if (ev.downPressed && !bottomBorder) {
            player.move(0, speed);
        }
    }

    var intervall;
    let loadWorld = function () {
        ev.start();
        intervall = setInterval(repeat, 60);
    }

    let oldX = player.x;
    let oldY = player.y;
    let repeat = function () {
        if (ev.enterPressed) {
            player.slash();
        }
        let coll_res = w.check_collision(player, oldX, oldY);
        if (coll_res == "clear") {
            next_level();
        } else if (typeof coll_res == "object") {
            console.log(typeof coll_res);
            clearInterval(intervall);
            ev.end();
            if (player.isMoving) { player.move_end(); }
            pokemon_fight(player, coll_res, loadWorld);
        } else if (!coll_res) { // don't move, when a collision occurs
            oldX = player.x;
            oldY = player.y;
            movePlayer();
        }
        w.check_destroyed();
        w.print();
    }

    loadWorld();
}
