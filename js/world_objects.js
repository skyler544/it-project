/**
 * things that all world_objects have in common
 */
class world_object extends component {
    life; // -1 for indestructible
    damage; // amount of damage done when something crashes into it
    speed;
    // can also be named "crash"
    // walkable would be a better translation
    begehbar; // can you move over it? / Or do you crash into it
    height = SQUARE_SIDE_LEN;
    width = SQUARE_SIDE_LEN;
    /**
     *
     * @param { world_object } other
     */
    collide(other) { }
}

class Wall extends world_object {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
    constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.walls.walls;
        super("asset", new asset(map, name));
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.life = -1; // indestructible
        this.begehbar = false;
        this.speed = 0;
    }
    // collide does not need to do anything
}

class Grass_Floor extends world_object {
    /**
     *
     * @param { number } x
     * @param { number } y
     */
    constructor(x, y) {
        let map = assetMap.mystic_woods.tilesets.floors.grass;
        super("asset", new asset(map, "grass"));
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.life = -1; // indestructible
        this.begehbar = true; // you can walk on it
        this.speed = 0;
    }
}

class Wooden_Floor extends world_object {
    /**
     *
     * @param { number } x
     * @param { number } y
     */
    constructor(x, y) {
        let map = assetMap.mystic_woods.tilesets.floors.wooden;
        super("asset", new asset(map, "wooden"));
        this.height = SQUARE_SIDE_LEN;
        this.width = SQUARE_SIDE_LEN;
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.life = -1; // indestructible
        this.begehbar = true; // you can walk on it
        this.speed = 0;
    }
}

class Wooden_Door extends world_object {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
    constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.walls.wooden_door;
        super("asset", new asset(map, name));
        this.height = SQUARE_SIDE_LEN;
        this.width = SQUARE_SIDE_LEN;
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.life = -1; // indestructible
        if (name == "closed") { this.begehbar = false; }
        else if (name == "open") { this.begehbar = true; }
        this.speed = 0;
    }
}

class Wooden_Door_B extends world_object {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
    constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.walls.wooden_door_b;
        super("asset", new asset(map, name));
        this.height = SQUARE_SIDE_LEN;
        this.width = SQUARE_SIDE_LEN;
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.life = -1; // indestructible
        if (name == "closed") { this.begehbar = false; }
        else if (name == "open") { this.begehbar = true; }
        this.speed = 0;
    }
}
