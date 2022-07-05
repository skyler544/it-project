

class MyEvent {
    constructor() {
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.enterPressed = false;

        this.onePressed = false;
        this.twoPressed = false;
        this.threePressed = false;
        this.fourPressed = false;
        this.fivePressed = false;

        this.keydown_func = this.keyDownHandler.bind(this);
        this.keyup_func = this.keyUpHandler.bind(this);
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
        } else if (e.key == "Enter") {
            this.enterPressed = false;
        }
        // numbers
        else if (e.key == "1") {
            this.onePressed = false;
        } else if (e.key == "2") {
            this.twoPressed = false;
        } else if (e.key == "3") {
            this.threePressed = false;
        } else if (e.key == "4") {
            this.fourPressed = false;
        } else if (e.key == "5") {
            this.fivePressed = false;
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
        } else if (e.key == "Enter") {
            this.enterPressed = true;
        }
        // numbers
        else if (e.key == "1") {
            this.onePressed = true;
        } else if (e.key == "2") {
            this.twoPressed = true;
        } else if (e.key == "3") {
            this.threePressed = true;
        } else if (e.key == "4") {
            this.fourPressed = true;
        } else if (e.key == "5") {
            this.fivePressed = true;
        }
    }
    start() {
        // document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        // document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        document.addEventListener("keydown", this.keydown_func, false);
        document.addEventListener("keyup", this.keyup_func, false);
    }
    end() {
        // document.removeEventListener("keydown", this.keyDownHandler.bind(this), false);
        // document.removeEventListener("keyup", this.keyUpHandler.bind(this), false);
        document.removeEventListener("keydown", this.keydown_func, false);
        document.removeEventListener("keyup", this.keyup_func, false);
        Object.keys(this).forEach((el) => {
            if (el != "keydown_func" && el != "keyup_func") {
                this[el] = false;
            }
        });
    }
}