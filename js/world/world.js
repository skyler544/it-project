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
                // even objects with property begehbar my have events (e.g doors)
                if (/* !obj.begehbar && */ obj !== player) { // only if you cannot walk over the obj
                    let bound = {
                        right: obj.x + obj.width,
                        left: obj.x - obj.width,
                        up: obj.y - obj.height,
                        down: obj.y + obj.height
                    }
                    if (player.x > bound.left && player.x < bound.right) {
                        if (player.y > bound.up && player.y < bound.down) {
                            if (obj.life > 0 && typeof obj.life == "number") {
                                // enter fight-mode
                                ret = obj;
                            } else {
                                // "normal"
                                player.collide(obj); // eventually destroy obj
                                obj.collide(player); // eventually do something to player
                            }
                            // if you cannot walk on the object -> go back to previous position + seal movement
                            if (!obj.begehbar && typeof ret != "object") {
                                player.x = oldX;
                                player.y = oldY;
                                ret = true
                            }
                        }
                    }
                }
            });
        return ret;
    }
    check_destroyed() {
        this.comps.forEach(
            /**
             * @param { world_object } obj
             * @param { number } index
             */
            (obj, index, object) => {
                // if life == 0 and the object is not already destroying itself
                if (obj.life == 0 && !obj.destroying) {
                    obj.destroying = true;
                    let doit = () => { this.comps.splice(index, 1); };
                    obj.destroy(doit);
                }
        });
    }
}
