const DEF_WIDTH = 640;   // default canvas dimension, unit in px
const DEF_HEIGHT = 480;
const DEF_BORDER_COLOR = '#333';
const DEF_BG_COLOR = '#eee';

export default class {
    constructor(options) {
        options = options || {};
        this.width = options.width || DEF_WIDTH;
        this.height = options.height || DEF_HEIGHT;
        this.borderColor = options.borderCOlor || DEF_BORDER_COLOR;
        this.bgColor = options.bgColor || DEF_BG_COLOR;
        this.initCanvas();
    }

    // Make canvas instance
    initCanvas() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    // Draw canvas background
    drawBackground() {
        if (!this.canvas || !this.ctx) {
            this.initCanvas();
        }

        // draw background and border
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fill();

        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    // Draw the snake at the given position(x, y)
    drawSnake(snake, x, y) {
        this.ctx.beginPath();

        

        this.ctx.stroke();
        this.ctx.closePath();
    }
}