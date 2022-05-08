import { Ball } from "./ball";
import { canvasHeight, canvasWidth } from "./constant";

function randomBall(ctx: CanvasRenderingContext2D): Ball {
  const radius = 5;
  const vx = Math.floor(Math.random() * 10) + 1;
  const vy = Math.floor(Math.random() * 10) + 1;
  const x = Math.floor(Math.random() * (canvasWidth - 2 * radius));
  const y = Math.floor(Math.random() * (canvasHeight - 2 * radius));
  console.log(y);
  return new Ball(x, y, vx, vy, 5, ctx);
}

export { randomBall };
