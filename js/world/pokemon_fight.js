
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
 */
function pokemon_fight(player, enemy) {
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

    let doit = function (e) {
        if (!player.isAttacking) {
            if (e.key == "1") {
                player.slash();
                text_to_display = "You used \"" + action_names[0] + "\".";
            } else if (e.key == "2") {
                player.isAttacking = true;
                player.destroy(() => {
                    player.anim = player.init();
                    player.isAttacking = false;
                });
                text_to_display = "You used \"" + action_names[1] + "\".";
            }
        }
        text.value = text_to_display + "\nPress Enter to continue.";
        document.removeEventListener("keyup", doit, false);
        let func = (e) => {
            if (e.key == "Enter") {
                document.removeEventListener("keyup", func, false);
                text.value = options;
                document.addEventListener("keyup", doit, false);
            }
        }
        document.addEventListener("keyup", func, false);
    }

    let repeat = function () {
        fw.print();
    }

    let intervall = setInterval(repeat, 60);
    document.addEventListener("keyup", doit, false);
}