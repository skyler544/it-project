document.addEventListener("DOMContentLoaded", function () {
  let gameArea = {
    load: function () {
      gameArea.canvas = document.getElementById("game");
      gameArea.context = gameArea.canvas.getContext("2d");
      gameArea.resize();
    },
    resize: function () {
      gameArea.canvas.height = window.innerHeight * 3;
      gameArea.canvas.width = gameArea.canvas.height
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update: function () { }
  }

  class Component {
    constructor(scale = 1, width = 0, height = 0, x = 0, y = 0) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
    scaleComponent(scale) {
      this.scaleX = scale;
      if (scale < 0) {
        this.scaleY = -scale;
      } else {
        this.scaleY = scale;
      }
      this.width *= this.scaleX;
      this.height *= this.scaleY;
      gameArea.context.scale(this.scaleX, this.scaleY);
    }
  }

  class TextComponent extends Component {
    constructor(text, style, size, family, color, x, y) {
      super(1, 0, 0, x, y);
      this.text = text;
      this.style = style;
      this.size = size;
      this.family = family
      this.color = color;
    }
    update() {
      gameArea.context.font = this.style + " " + this.size + "px " + this.family;
      gameArea.context.fillStyle = this.color;
      gameArea.context.fillText(this.text, this.x, this.y);
    }
  }

  class ImageComponent extends Component {
    constructor(scale, x, y, path) {
      super(scale, 0, 0, x, y);
      this.ready = false;
      this.img = new Image();
      this.img.onload = this.load.bind(this);
      this.img.src = path;
    }
    load() {
      this.ready = true;
      this.width = this.img.width;
      this.height = this.img.height;
    }
    update() {
      if (this.ready) {
        let ctx = gameArea.context;
        ctx.save();
        ctx.drawImage(this.img,
          this.x, this.y,
          this.width, this.height,
          this.x, this.y,
          this.width * 3, this.height * 3
        );
        this.x /= this.scaleX;
        this.y /= this.scaleY;
        this.width /= this.scaleX;
        this.height /= this.scaleY;
        ctx.restore();
      }
    }
  }

  gameArea.load();
  let testImg = new ImageComponent(2, 0, 0, "asset/mystic_woods/objects/objects.png");
  setInterval(testImg.update.bind(testImg), 10);



  // let hey = new TextComponent("hey", "bold", 48, "sans-serif", "blue", 100, 50);
  // hey.scaleComponent(-2);
  // hey.update();

  // console.log(hey);
  // console.log(window.innerHeight);
});
