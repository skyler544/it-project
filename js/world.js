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
     */
    check_collision(player) {
        let ret = false;
        this.comps.forEach(
            /**
             * 
             * @param { world_object } obj 
             */
            obj => {
            if (!obj.begehbar && obj !== player) { // only if you cannot walk over the obj
                if(player.x >= obj.x && player.x <= obj.x + obj.width) {
                    if (player.y >= obj.y && player.y <= obj.y + obj.height) {
                        player.collide(obj);
                        obj.collide(player);
                        ret = true;
                    }
                }
            }
        });
        return ret;
    }
}