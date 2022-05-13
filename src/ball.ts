import {canvasHeight, canvasWidth} from "./constant";

export class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  count: number;
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
    this.count = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  move(dt: number) {
    //let nextx = this.x + this.vx * dt;
    //let nexty = this.y + this.vy * dt;
    //if (nextx > canvasWidth - this.r || nextx < this.r) this.vx = -this.vx;
    //if (nexty > canvasHeight - this.r || nexty < this.r) this.vy = -this.vy;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  timeToHitHorizontalTheWall(): number {
    if (this.vx > 0) return (canvasWidth - this.r - this.x) / this.vx;
    else if (this.vx < 0) return (this.x - this.r) / -this.vx;
    return Infinity;
  }

  timeToHitVerticalWall(): number {
    if (this.vy > 0) return (canvasHeight - this.r - this.y) / this.vy;
    else if (this.vy < 0) return (this.y - this.r) / -this.vy;
    return Infinity;
  }

  timeToHit(that: Ball): number {
    if (this == that) return Infinity;
    const dx = that.x - this.x;
    const dy = that.y - this.y;
    const dvx = that.vx - this.vx;
    const dvy = that.vy - this.vy;
    const dvdr = dx * dvx + dy * dvy;
    if (dvdr > 0) return Infinity;
    const dvdv = dvx * dvx + dvy * dvy;
    const drdr = dx * dx + dy * dy;
    const sigma = this.r + that.r;
    const d = dvdr * dvdr - dvdv * (drdr - sigma * sigma);
    if (d < 0) return Infinity;
    return -(dvdr + Math.sqrt(d)) / dvdv;
  }

  bounceOffHorizontalWall() {
    this.vx = -this.vx;
    this.count++;
  }

  bounceOffVerticalWall() {
    this.vy = -this.vy;
    this.count++;
  }

  bounceOff(that: Ball) {
    const mass = 5;
    const dx = that.x - this.x;
    const dy = that.y - this.y;
    const dvx = that.vx - this.vx;
    const dvy = that.vy - this.vy;
    const dvdr = dx * dvx + dy * dvy;
    const dist = this.r + that.r;
    const J = (2 * mass * mass * dvdr) / ((mass + mass) * dist);
    const Jx = (J * dx) / dist;
    const Jy = (J * dy) / dist;
    this.vx += Jx / mass;
    this.vy += Jy / mass;
    that.vx -= Jx / mass;
    that.vy -= Jy / mass;
    this.count++;
    that.count++;
  }
}
