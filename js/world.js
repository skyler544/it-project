class world {
    comps = [];
    constructor() {

    }
    // add a component
    add(comp) { this.comps.push(comp); }
    print() {
        gameArea.clear();
        for (const comp in this.comps) { this.comps[comp].update(); }
    }
}