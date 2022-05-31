const assetMap = {
    mystic_woods: {
        characters: {
            player : {
                src: "asset/mystic_woods/characters/player.png",
                width: 48,
                height: 48,
                1 : { startX: 0, endX: 47, startY: 0, endY: 0 },
                2 : { startX: 48, endX: 95, startY: 0, endY: 0 },
                3 : { startX: 96, endX: 143, startY: 0, endY: 0 },
                4 : { startX: 144, endX: 191, startY: 0, endY: 0 },
                5 : { startX: 192, endX: 239, startY: 0, endY: 0 },
                6 : { startX: 240, endX: 287, startY: 0, endY: 0 },
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
        console.log(this.img.style);
    }
}