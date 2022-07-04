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

    var intervall;
    let loadWorld = function() {
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
