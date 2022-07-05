// regarding the game (-board)
const SQUARE_SIDE_LEN = 5; // in percent by percentTOpixel()
const GAME_PROPORTION = 1.535; // width = height * GAME_PROPORTION
const GAME_FRAMERATE = 60; // the framerate for printing
const GAME_COLUMS = 20; // how many SQUARE_SIDE_LEN fit in the width == 100 / SQUARE_SIDE_LEN
const GAME_ROWS = 13; // how many SQUARE_SIDE_LEN fit in the height

// player
const PLAYER_LIFE = 5;

// regarding strenth an numbers of enemy slimes
const SLIME_LIFE = 1;
const SLIME_LEVEL1_COUNT = 5;
const SLIME_LEVEL2_COUNT = 5;

// individual speed of animation
const ANIMRATE_DEFAULT = 60; // default
const ANIMRATE_PLAXER = ANIMRATE_DEFAULT; // player -> default
const ANIMRATE_SLIME = 100; // slime should be slower

// text
const TEXT_FONT_FAMILY = "Arial";