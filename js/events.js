

class MyEvent {
    constructor() {
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
    }
    keyUpHandler(e) {
        if (e.key == "d" || e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key == "a" || e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        } else if (e.key == "w" || e.key == "Up" || e.key == "ArrowUp") {
            this.upPressed = false;
        } else if (e.key == "s" || e.key == "Down" || e.key == "ArrowDown") {
            this.downPressed = false;
        }
    }
    keyDownHandler(e) {
        if (e.key == "d" || e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key == "a" || e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        } else if (e.key == "w" || e.key == "Up" || e.key == "ArrowUp") {
            this.upPressed = true;
        } else if (e.key == "s" || e.key == "Down" || e.key == "ArrowDown") {
            this.downPressed = true;
        }
    }
    start() {
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    }
    end() {
        document.removeEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.removeEventListener("keyup", this.keyUpHandler, false);
    }
}