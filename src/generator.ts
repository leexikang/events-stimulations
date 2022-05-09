import { Ball } from "./ball";
import { canvasHeight, canvasWidth, dt } from "./constant";

function randomBall(ctx: CanvasRenderingContext2D): Ball {
  const radius = 5;
  const vx = Math.floor(Math.random() * 5) + 1;
  const vy = Math.floor(Math.random() * 5) + 1;
  const x = Math.floor(Math.random() * (canvasWidth - 2 * radius));
  const y = Math.floor(Math.random() * (canvasHeight - 2 * radius));
  return new Ball(x, y, vx, vy, 5, dt, ctx);
}

export { randomBall };
