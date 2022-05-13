import {Ball} from "./ball";
import {canvasHeight, canvasWidth, dt} from "./constant";

function randomBall(ctx: CanvasRenderingContext2D): Ball {
  const radius = 5;
  const vx = Math.random() * 3 + 1;
  const vy = Math.random() * 3 + 1;
  const x = randomAxis(canvasWidth, radius);
  const y = randomAxis(canvasHeight, radius);
  return new Ball(x, y, vx, vy, 5, ctx);
}

function randomAxis(maximum: number, radius: number): number {
  const max = maximum - radius;
  const min = radius;
  return Math.floor(Math.random() * (max - min) + min);
}

export {randomBall};
