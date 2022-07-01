class Character extends world_object {
    speed;
    isMoving = false;
    begehbar = false;

    // which assets are needed for the animation
    assets = {
        default: [], // default animation
        moving: [] // when moving
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
        this.anim = animate_only(this, arr);
    }
    move_start() {
        if (!this.isMoving) {
            clearInterval(this.anim);
            let arr = this.getAssets("moving");
            this.anim = animate_only(this, arr);
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
}

class Player extends Character {
    constructor(x, y) {
        let map = assetMap.mystic_woods.characters.player;
        super("asset", new asset(map, 1));
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.map = map;
        this.assets.default = [1, 2, 3, 4, 5, 6],
        this.assets.moving = [7, 8, 9, 10, 11, 12],
        this.assets.slash = [14, 15],

        this.speed = 1; // 1%
        this.blick_richtung_rechts = true;
        this.init();
    }
    slash() {
        let arr = this.getAssets("slash");
        this.anim = animate_once(this, arr);
    }
}
