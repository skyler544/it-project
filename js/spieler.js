/**
 * handle the player case + player movement
 */
class spieler {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveLeft() {
        this.x--;
    }
    moveRight() {
        this.x++;
    }
    moveUp() {
        this.y++;
    }
    moveDown() {
        this.y--;
    }
}