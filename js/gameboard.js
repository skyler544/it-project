/**
 * handle the gameboard (using the individual fields (feld.js))
 */
class gameboard {
    constructor(width, height) {
        this.spieler = null; // der spieler
        this.board = [ [] ]; // 2d array
        // 2d array befuellen
        for (z = 0; z < height; z++) {
            for (i = 0; i < width; i++) {
                board[z][i] = new feld;
            }
        }
    }
}