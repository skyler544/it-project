class Character extends world_object {
    isMoving = false;
    begehbar = false;
    isAttacking = false;
    animrate = 60;

    // which assets are needed for the animation
    assets = {
        default: [], // default animation
        moving: [], // when moving
        destroy: [], // when destroyed
    }
    getAssets(situation) {
        let arr = [];
        this.assets[situation].forEach(item => {
            arr.push(new asset(this.map, item));
        });
        return arr;
    }

    // movement && animation
    init() {
        let arr = this.getAssets("default");
        this.anim = animate_only(this, arr, this.animrate);
    }
    move_start() {
        if (!this.isMoving) {
            clearInterval(this.anim);
            let arr = this.getAssets("moving");
            this.anim = animate_only(this, arr, this.animrate);
            this.isMoving = true;
        }
    }
    move_end() {
        if (this.isMoving) {
            clearInterval(this.anim);
            this.init();
            this.isMoving = false;
        }
    }
    move(x, y) {
        if (!this.blick_richtung_rechts && x > 0) { this.reverseX(); this.blick_richtung_rechts = true; }
        else if (this.blick_richtung_rechts && x < 0) { this.reverseX(); this.blick_richtung_rechts = false; }
        move(this, x, y);
    }
    destroy(callback) {
        clearInterval(this.anim);
        let arr = this.getAssets("destroy");
        this.anim = animate_once(this, arr, this.animrate, callback);
    }
}

class Player extends Character {
    constructor(x, y) {
        let map = assetMap.mystic_woods.characters.player;
        super("asset", new asset(map, 1));
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.map = map;
        this.assets.default = [1, 2, 3, 4, 5, 6];
        this.assets.moving = [7, 8, 9, 10, 11, 12];
        this.assets.slash = [14, 15];
        this.assets.destroy = [17, 18, 19];

        this.life = 5;
        this.damage = 1;
        this.speed = 1; // 1%
        this.blick_richtung_rechts = true;
        this.init();

        // attacks / actions for the pokemon-style fight
        this.actions = {
            slash : (enemy) => { this.slash(); this.collide(enemy); return ""; },
            sleep : (enemy) => {
                this.isAttacking = true;
                this.destroy(() => {
                    this.anim = this.init();
                    this.isAttacking = false;
                    this.life += 1;
                });
                return "+1 life";
            },
            nothing : (enemy) => { return "This is a placeholder. Nothing happend."; },
            nothing : (enemy) => { return "This is a placeholder. Nothing happend."; },
        }
    }
    slash() {
        clearInterval(this.anim);
        let arr = this.getAssets("slash");
        this.isAttacking = true;
        let resetAtt = () => {
            this.isAttacking = false;
            this.anim = this.init();
        }
        this.anim = animate_once(this, arr, this.animrate, resetAtt);
    }
    /**
     * 
     * @param { world_object } other 
     */
    collide(other) {
        if (this.isAttacking && other.life != -1) {
            other.life -= this.damage;
            if (other.life <= 0) { other.life = 0; }
        } else {
            this.life -= other.damage;
            if (this.life <= 0) { this.life = 0; }
        }
    }
}

class Slime extends Character {
    constructor(x, y) {
        let map = assetMap.mystic_woods.characters.slime;
        super("asset", new asset(map, 1));
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.map = map;
        this.assets.default = [1, 2, 3, 4];
        this.assets.jump = [5, 6, 7, 8, 9, 10];
        this.assets.bigjump = [11, 12, 13, 14, 15, 16, 17];
        this.assets.littlejump = [18, 19, 20];
        this.assets.destroy = [21, 22, 23, 24, 25];

        this.life = 1;
        this.damage = 1;
        this.speed = 1; // 1%
        this.animrate = 100;
        this.blick_richtung_rechts = true;
        this.init();

        // attacks / actions for the pokemon-style fight
        this.actions = {
            splash : () => { return "Nothing happend."; },
            littlejumg : () => { return ""; },
            jump : () => { return ""; },
            bigjump : () => { return ""; },
        }
    }
}