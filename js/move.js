
// move by x , y in percent %
function move(comp, x_move, y_move) {
    x_true_move = (x_move/100) * gameArea.canvas.width;
    y_true_move = (y_move/100) * gameArea.canvas.width;
    comp.x += x_true_move;
    comp.y = y_true_move;
    gameArea.clear();
    comp.update();
}

function moveSquare(comp, direction) {
    // either this
    if (direction == "left") { move(comp, -SQUARE_SIDE_LEN, 0); }
    else if (direction == "right") { move(comp, SQUARE_SIDE_LEN, 0); }
    else if (direction == "up") { move(comp, 0, -SQUARE_SIDE_LEN); }
    else if (direction == "down") { move(comp, 0, SQUARE_SIDE_LEN); }
}