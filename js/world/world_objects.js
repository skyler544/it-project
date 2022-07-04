/**
 * things that all world_objects have in common
 */
class world_object extends component {
    life = -1; // -1 for indestructible
    damage = 0; // amount of damage done when something crashes into it
    destroying = false;
    speed = 0;
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
    destroy(callback) { console.log("I was destroyed!"); callback(); } // when destroyed
}

class Floor extends world_object {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     * @param { assetMapPart } map
     */
    constructor(name, x, y, map) {
        super("asset", new asset(map, name));
        this.x = x * SQUARE_SIDE_LEN;
        this.y = y * SQUARE_SIDE_LEN;
        this.percentTOpixel();

        this.life = -1; // indestructible
        this.begehbar = true; // you can walk on it
        this.speed = 0;
    }
}

class Wall extends Floor {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
    constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.walls.walls;
        super(name, x, y, map);

        this.begehbar = false;
    }
}

class Grass_Floor extends Floor {
    /**
     *
     * @param { number } x
     * @param { number } y
     */
    constructor(x, y) {
        let map = assetMap.mystic_woods.tilesets.floors.grass;
        super("grass", x, y, map);
    }
}

class Wooden_Floor extends Floor {
    /**
     *
     * @param { number } x
     * @param { number } y
     */
    constructor(x, y) {
        let map = assetMap.mystic_woods.tilesets.floors.wooden;
        super("wooden", x, y, map);
    }
}

class Wooden_Door extends Floor {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
    constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.walls.wooden_door;
        super(name, x, y, map);

        if (name == "closed") { this.begehbar = false; }
        else if (name == "open") {
            this.begehbar = true;
            /**
             *
             * @param { world_object } other
             */
            this.collide = (other) => {
                // teleport to start - used it to jump to next level
                other.x = 0;
                other.y = 0;
            }
        }
    }
}

class Wooden_Door_B extends Floor {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
    constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.walls.wooden_door_b;
        super(name, x, y, map);

        if (name == "closed") { this.begehbar = false; }
        else if (name == "open") {
            this.begehbar = true;
            /**
             *
             * @param { world_object } other
             */
            this.collide = (other) => {
                // teleport to start - used it to jump to next level
                other.x = 0;
                other.y = 0;
                return "clear";
            }
        }
    }
}

class Plains_Terrain extends Floor {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
    constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.plains;
        super(name, x, y, map);
    }
}

class Decor_16x16 extends Floor {
     constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.decor_16x16;
        super(name, x, y, map);
    }
}

class Decor_8x8 extends Floor {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
     constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.decor_8x8;
        super(name, x, y, map);
    }
}

class Dust_particles extends Floor {
    /**
     *
     * @param { number } x
     * @param { number } y
     */
     constructor(x, y) {
        let map = assetMap.mystic_woods.particles.dust_particles_01;
        super("dust_particles_01", x, y, map);
    }
}

class Water_decorations extends Floor {
    /**
     *
     * @param { string } name
     * @param { number } x
     * @param { number } y
     */
     constructor(name, x, y) {
        let map = assetMap.mystic_woods.tilesets.water_decorations;
        super(name, x, y, map);
    }
}