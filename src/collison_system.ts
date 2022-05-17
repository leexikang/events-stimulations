import {Ball} from "./ball";
import {PQ} from "./pq";
import {Event} from "./event";

export type CollisionSystemParams = {
  canvas: HTMLCanvasElement;
  balls: Ball[];
  limit: number;
}

export class CollisionSystem {
  private canvas: HTMLCanvasElement;
  private balls: Ball[];
  private limit: number;
  private pq: PQ<Event>;
  private hz: number;
  private t: number;
  private ctx: CanvasRenderingContext2D

  constructor({canvas, balls, limit}: CollisionSystemParams) {
    this.canvas = canvas;
    this.balls = balls;
    this.limit = limit;
    this.t = 0;
    this.hz = 0.5;
    this.pq = new PQ<Event>();
    const ctx = this.canvas.getContext("2d");
    if (ctx == null) throw new Error('Failed to get 2d context from the canvas.');
    this.ctx = ctx;

    this.pq.enqueue(new Event(0, null, null));
    for (let i = 0; i < this.balls.length; i++) {
      this.predict(this.balls[i], limit);
    }
  }

  async stimulate() {
    while (!this.pq.isEmpty()) {
      const event = this.pq.dequeue();
      if (!event!.isValid()) continue;
      const a = event!.a;
      const b = event!.b;

      for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].move(event!.time - this.t)
      }

      this.t = event!.time

      if (a == null && b == null) await this.redraw();
      if (a != null && b == null) a.bounceOffHorizontalWall();
      if (a == null && b != null) b.bounceOffVerticalWall();
      if (a != null && b != null) a.bounceOff(b);
      this.predict(a, this.limit)
      this.predict(b, this.limit)
    }
  }

  private async redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
    }

    await new Promise(resolve => setTimeout(resolve, 30));
    if (this.t < this.limit) {
      this.pq.enqueue(new Event(this.t + 1.0 / this.hz, null, null));
    }
  }

  private predict(ball: Ball | null, limit: number) {
    if (ball == null) return;
    for (let i = 0; i < this.balls.length; i++) {
      this.pq.enqueue(new Event(this.t + ball.timeToHit(this.balls[i]), ball, this.balls[i]));
    }

    const dtX = ball.timeToHitHorizontalTheWall();
    const dtY = ball.timeToHitVerticalWall()
    if (this.t + dtX <= limit) this.pq.enqueue(new Event(this.t + dtX, ball, null));
    if (this.t + dtY <= limit) this.pq.enqueue(new Event(this.t + dtY, null, ball));
  }
}
