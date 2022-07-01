class Character extends world_object {
    speed;
    isMoving = false;
}

class Player extends Character {
    constructor(x, y) {
        let map = assetMap.mystic_woods.characters.player;
        super("asset", new asset(map, 1));
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.speed = 1;
        this.blick_richtung_rechts = true;
        this.init();
    }
    init() {
        let map = assetMap.mystic_woods.characters.player;
        let arr = [
            new asset(map, 1),
            new asset(map, 2),
            new asset(map, 3),
            new asset(map, 4),
            new asset(map, 5),
            new asset(map, 6)
        ]
        this.anim = animate_only(this, arr);
    }
    move_start() {
        if (!this.isMoving) {
            clearInterval(this.anim);
            let map = assetMap.mystic_woods.characters.player;
            let arr = [
                new asset(map, 7),
                new asset(map, 8),
                new asset(map, 9),
                new asset(map, 10),
                new asset(map, 11),
                new asset(map, 12)
            ]
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