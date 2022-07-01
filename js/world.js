class world {
    comps = [];
    constructor() {

    }
    /**
     * add a component
     * @param { world_object } comp 
     */
    add(comp) { this.comps.push(comp); }
    print() {
        gameArea.clear();
        for (const comp in this.comps) { this.comps[comp].update(); }
    }
    /**
     * check for collisions with other world_objects
     * @param { world_object } player 
     * @param { number } oldX 
     * @param { number } oldY 
     */
    check_collision(player, oldX, oldY) {
        let ret = false;
        this.comps.forEach(
            /**
             * 
             * @param { world_object } obj 
             */
            obj => {
            if (!obj.begehbar && obj !== player) { // only if you cannot walk over the obj
                let bound = {
                    right: obj.x + obj.width,
                    left: obj.x - obj.width,
                    up: obj.y - obj.height,
                    down: obj.y + obj.height
                }
                if(player.x > bound.left && player.x < bound.right) {
                    if (player.y > bound.up && player.y < bound.down) {
                        player.collide(obj); // eventually destroy obj
                        obj.collide(player); // eventually do something to player
                        player.x = oldX;
                        player.y = oldY;
                        ret = true;
                    }
                }
            }
        });
        return ret;
    }
}