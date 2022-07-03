
class tempEllipse extends component {
    constructor(X, Y, width, height, color) {
        super("circle", color);
        this.height = height;
        this.width = width;
        this.x = X;
        this.y = Y;
        this.percentTOpixel();

        this.update = () => {
            let ctx = gameArea.context;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

/**
 * 
 * @param { Character } player 
 * @param { Character } enemy 
 * @param { Function } callback
 */
function pokemon_fight(player, enemy, callback) {
    const fw = new world(); // fight world
    for (i = 0; i < 20; i ++) { // 20 fields horizontally
        for (j = 0; j < 8; j ++) { // 10 fields vertically - dont use all the space
            let p = new Grass_Floor(i, j);
            fw.add(p);
        }
    }
    for (i = 0; i < 20; i ++) { // 20 fields horizontally
        for (j = 8; j < 13; j ++) { // 10 fields vertically - dont use all the space
            let p = new component("rect", "black");
            p.height = SQUARE_SIDE_LEN;
            p.width = SQUARE_SIDE_LEN;
            p.x = i * SQUARE_SIDE_LEN;
            p.y = j * SQUARE_SIDE_LEN;
            p.percentTOpixel();
            fw.add(p);
        }
    }
    // save old width / height - or other stuff
    let old = {
        player : {
            width : player.width,
            height : player.height,
            x: player.x,
            y: player.y,
        },
        enemy : {
            width : enemy.width,
            height : enemy.height,
            x: enemy.x,
            y: enemy.y,
        },
    }
    player.width = gameArea.percentTOpixel(20);
    player.height = gameArea.percentTOpixel(20);
    player.x = gameArea.percentTOpixel(3 * SQUARE_SIDE_LEN);
    player.y = gameArea.percentTOpixel(3 * SQUARE_SIDE_LEN);

    enemy.width = gameArea.percentTOpixel(20);
    enemy.height = gameArea.percentTOpixel(20);
    enemy.x = gameArea.percentTOpixel(14 * SQUARE_SIDE_LEN);
    enemy.y = gameArea.percentTOpixel(0 * SQUARE_SIDE_LEN);

    let circle1 = new tempEllipse(5*SQUARE_SIDE_LEN, 6*SQUARE_SIDE_LEN, 10, 5, "blue");
    fw.add(circle1);
    let circle2 = new tempEllipse(16*SQUARE_SIDE_LEN, 3*SQUARE_SIDE_LEN, 10, 5, "blue");
    fw.add(circle2);

    fw.add(player);
    fw.add(enemy);


    let counterP = new component("text", player.life.toString());
    let counterE = new component("text", enemy.life.toString());
    counterP.x = 1 * SQUARE_SIDE_LEN; counterE.x = 18 * SQUARE_SIDE_LEN;
    counterP.y = counterE.y = 1 * SQUARE_SIDE_LEN;
    counterP.width = counterE.width = 3;
    counterP.height = counterE.height = "Arial";
    counterP.color = counterE.color = "black";
    counterP.percentTOpixel();
    counterE.percentTOpixel();

    fw.add(counterP);
    fw.add(counterE);

    let action_names = Object.keys(player.actions);
    let options = "What do you want to do:\n";
    action_names.forEach((name, index) => {
        options += index+1 + ")" + name + "\n";
    });
    
    let text_to_display = options;
    let text = new component("text", text_to_display);
    text.height = "Arial";
    text.width = 3;
    text.color = "white";
    text.x = 1 * SQUARE_SIDE_LEN;
    text.y = 9 * SQUARE_SIDE_LEN;
    text.percentTOpixel();

    fw.add(text);

    var cleared = false; // when true -> exit combat

    let doit = function (e) {
        if (!player.isAttacking) {
            let ac = -1;
            if (e.key == "1") { ac = 0; }
            else if (e.key == "2") { ac = 1; }
            else if (e.key == "3") { ac = 2; }
            if (ac != -1) {
                // player
                action_names = Object.keys(player.actions);
                let func = player.actions[action_names[ac]];
                let msg = func(enemy);
                text_to_display = "You used \"" + action_names[ac] + "\". " + msg;

                counterP.value = player.life.toString();
                counterE.value = enemy.life.toString();

                if (player.life <= 0) { text_to_display = "You lost!"; }
                else if (enemy.life <= 0) { text_to_display = "You won!"; enemy.destroy(); }

                text.value = text_to_display + "\nPress Enter to continue.";
                document.removeEventListener("keyup", doit, false);

                if (player.life <= 0 || enemy.life <= 0) { cleared = true; return; }

                // enemy
                ac = Random(0, 3);
                action_names = Object.keys(enemy.actions);
                console.log(action_names, ac);
                func = enemy.actions[action_names[ac]];
                msg = func(enemy);
                text_to_display += "\nEnemy used \"" + action_names[ac] + "\". " + msg;

                counterP.value = player.life.toString();
                counterE.value = enemy.life.toString();

                if (player.life <= 0) { text_to_display = "You lost!"; }
                else if (enemy.life <= 0) { text_to_display = "You won!"; enemy.destroy(); }

                text.value = text_to_display + "\nPress Enter to continue.";
                document.removeEventListener("keyup", doit, false);

                if (player.life <= 0 || enemy.life <= 0) { cleared = true; return; }

                // next action / turn / round
                let next = (e) => {
                    if (e.key == "Enter") {
                        document.removeEventListener("keyup", next, false);
                        text.value = options;
                        document.addEventListener("keyup", doit, false);
                    }
                }
                document.addEventListener("keyup", next, false);
            }
        }
    }

    let repeat = function () {
        if (cleared) {
            clearInterval(intervall);
            player.x = old.player.x;
            player.y = old.player.y;
            player.width = old.player.width;
            player.height = old.player.height;

            enemy.x = old.enemy.x;
            enemy.y = old.enemy.y;
            enemy.width = old.enemy.width;
            enemy.height = old.enemy.height;

            callback();
        } else {
            fw.print();
        }
    }

    let intervall = setInterval(repeat, 60);
    document.addEventListener("keyup", doit, false);
}