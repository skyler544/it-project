$(document).ready(gameArea.load);
$(document).ready(main);

function main() {
    assetMap.init();
    var game_over = false;
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
        intervall = setInterval(repeat, GAME_FRAMERATE);
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
            clearInterval(intervall);
            if (player.isMoving) { player.move_end(); }
            ev.end();
            pokemon_fight(player, coll_res, loadWorld);
        } else if (!coll_res) { // don't move, when a collision occurs
            oldX = player.x;
            oldY = player.y;
            movePlayer();
        }
        w.check_destroyed();
        if (player.life == 0 && !player.destroying && !player.isAttacking) {
            console.log(player.life);
            clearInterval(intervall);
            ev.end();
            let lost_text1 = new component("text", "Game Over! You lost!");
            lost_text1.width = 10;
            lost_text1.height = TEXT_FONT_FAMILY;
            lost_text1.x = 2;
            lost_text1.y = 30;
            lost_text1.percentTOpixel();
            w.add(lost_text1);

            let lost_text2 = new component("text", "Press Enter to play again.");
            lost_text2.width = 5;
            lost_text2.height = TEXT_FONT_FAMILY;
            lost_text2.x = 20;
            lost_text2.y = 35;
            lost_text2.percentTOpixel();
            w.add(lost_text2);
            w.print();

            let again = (e) => {
                if (e.key == "Enter") {
                    document.removeEventListener("keyup", again);
                    location.reload();
                }
            }
            document.addEventListener("keyup", again);
        }
        w.print();
    }

    loadWorld();
}
