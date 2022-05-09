import { canvasHeight, canvasWidth } from "./constant";

export class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dt: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    r: number,
    dt: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.dt = dt;
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

  timeToHit(that: Ball): number {
    if (this == that) return Infinity;
    const dx  = that.x - this.x;
    const dy = that.y - this.y;
    const dvx = that.vx - this.vx;
    const dvy = that.vy - this.vy;
    const dvdr = dx * dvx + dy * dvy;
    if(dvdr > 0) return Infinity;
    const dvdv = dvx * dvx + dvy * dvy;
    const drdr = dx*dx + dy*dy
    const sigma = this.r + that.r;
    const d = (dvdr*dvdr) - dvdv * (drdr - sigma * sigma);
    if(d < 0 ) return Infinity;
    return -(dvdr + Math.sqrt(d)) / dvdv;
  }
}
