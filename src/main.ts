import {Ball} from "./ball";
import {dt} from "./constant";
import {Event} from "./event";
import {randomBall} from "./generator";
import {PQ} from "./pq";
//import { randomBall } from "./generator";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <canvas id="stimulation" width="300" height="300"></canvas>
`;

const canvas = document.getElementById("stimulation") as HTMLCanvasElement;
canvas.style.border = "1px solid black";
const totalBalls = 10;
const balls: Ball[] = new Array(totalBalls);

if (canvas != null && canvas.getContext) {
  var ctx = canvas.getContext("2d");
  if (ctx != null) {
    for (let i = 0; i < totalBalls; i++) {
      balls[i] = randomBall(ctx);
      balls[i].draw();
    }
  }

  //setInterval(() => {
  //ctx!.clearRect(0, 0, canvas.width, canvas.height);
  //for (let i = 0; i < totalBalls; i++) {
  //balls[i].move();
  //balls[i].draw();
  //}
  //}, dt);
  //}
  //}

  const pq = new PQ<Event>();
  let t = 0.0;
  const limit = 10000;
  const hz = 0.5

  async function redraw() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < totalBalls; i++) {
      balls[i].draw();
    }

    await new Promise(resolve => setTimeout(resolve, 20)); // 3 sec
    if (t < limit) {
      pq.enqueue(new Event(t + 1.0 / hz, null, null));
    }
  }

  function predict(ball: Ball | null, limit: number) {
    if (ball == null) return;
    for (let i = 0; i < balls.length; i++) {
      pq.enqueue(new Event(t + ball.timeToHit(balls[i]), ball, balls[i]));
    }

    const dtX = ball.timeToHitHorizontalTheWall();
    const dtY = ball.timeToHitVerticalWall()
    if (t + dtX <= limit) pq.enqueue(new Event(t + dtX, ball, null));
    if (t + dtY <= limit) pq.enqueue(new Event(t + dtY, null, ball));
  }

  async function stimulate(limit: number) {
    while (!pq.isEmpty()) {
      const event = pq.dequeue();
      if (!event!.isValid()) continue;
      const a = event!.a;
      const b = event!.b;

      for (let i = 0; i < totalBalls; i++) {
        balls[i].move(event!.time - t)
      }

      t = event!.time

      if (a == null && b == null) await redraw();
      if (a != null && b == null) a.bounceOffHorizontalWall();
      if (a == null && b != null) b.bounceOffVerticalWall();
      if (a != null && b != null) a.bounceOff(b);
      predict(a, limit)
      predict(b, limit)
    }
  }

  pq.enqueue(new Event(0, null, null));
  for (let i = 0; i < totalBalls; i++) {
    predict(balls[i], limit);
  }

  stimulate(limit);
}





