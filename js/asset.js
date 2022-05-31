const assetMap = {
    mystic_woods: {
        characters: {
            player : {
                src: "asset/mystic_woods/characters/player.png",
                num_rows: 5, // number of rows in the image
                num_col: 6, // number of colums in the image
                totalWidth: 288, // width of the whole png
                totalHeight: 240, // height of the whole png
                width: /* 288 / 6, */ 48-20, // width of a single asset
                height: /* 240 / 5, */ 48-17, // height of a single asset
                1 : { startX: 0+12, endX: 47, startY: 17, endY: 0 },
                2 : { startX: 48+12, endX: 95, startY: 17, endY: 0 },
                3 : { startX: 96+12, endX: 143, startY: 17, endY: 0 },
                4 : { startX: 144+12, endX: 191, startY: 17, endY: 0 },
                5 : { startX: 192+12, endX: 239, startY: 17, endY: 0 },
                6 : { startX: 240+12, endX: 287, startY: 17, endY: 0 },
            }
        },
        tilesets : {
            floors : {
                wooden : {
                    src: "asset/mystic_woods/tilesets/floors/wooden.png",
                    num_rows: 1, // number of rows in the image
                    num_col: 1, // number of colums in the image
                    totalWidth: 16, // width of the whole png
                    totalHeight: 16, // height of the whole png
                    width: /* 288 / 6, */ 16, // width of a single asset
                    height: /* 240 / 5, */ 16, // height of a single asset
                    "wooden" : { startX: 0, startY: 0 }
                },
                grass : {
                    src: "asset/mystic_woods/tilesets/floors/grass.png",
                    num_rows: 1, // number of rows in the image
                    num_col: 1, // number of colums in the image
                    totalWidth: 16, // width of the whole png
                    totalHeight: 16, // height of the whole png
                    width: /* 288 / 6, */ 16, // width of a single asset
                    height: /* 240 / 5, */ 16, // height of a single asset
                    "grass" : { startX: 0, startY: 0 }
                }
            }
        }
    }
}

class asset {
    constructor(map, css) {
        this.img = new Image();
        this.img.src = map.src;
        // this.img.style.background = "url(" + src + ") " + css.start + " " + css.end;
        // this.img.style.backgroundPosition = css.start + " " + css.end;

        // this.img.setAttribute("style", "background: url(" + src + ") " + 0 + " " + 0 + " ; width: 48px; height: 48px")
        this.css = map[css];
        this.css.height = map.height;
        this.css.width = map.width;
        // console.log(this);
    }
}