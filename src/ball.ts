import { canvasHeight, canvasWidth } from "./constant";

export class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    r: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    let nextx = this.x + this.vx;
    let nexty = this.y + this.vy;
    if (nextx > canvasWidth - this.r || nextx < this.r) this.vx = -this.vx;
    if (nexty > canvasHeight - this.r || nexty < this.r) this.vy = -this.vy;
    this.x += this.vx;
    this.y += this.vy;
  }
}
