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
      this.scale = scale;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
  }

  class TextComponent extends Component {
    constructor(text, style, size, family, color, x, y) {
      super(1, 0, 0, x, y);
      this.text = text;
      this.color = color;
      gameArea.context.font = style + " " + size + "px " + family;
      gameArea.context.fillStyle = this.color;
      gameArea.context.fillText(this.text, this.x, this.y);
    }
  }

  gameArea.load();
  let hey = new TextComponent("hey", "bold", 48, "sans-serif", "blue", 50, 50);
  console.log(hey);
});
