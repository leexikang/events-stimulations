import { Ball } from "./ball";
import {dt} from "./constant";
import { randomBall } from "./generator";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <canvas id="stimulation" width="300" height="300"></canvas>
`;

const canvas = document.getElementById("stimulation") as HTMLCanvasElement;
canvas.style.border = "1px solid black";
const totalBalls = 100;
const balls: Ball[] = new Array(totalBalls);

if (canvas != null && canvas.getContext) {
  var ctx = canvas.getContext("2d");
  if (ctx != null) {
    for (let i = 0; i < totalBalls; i++) {
      balls[i] = randomBall(ctx);
      balls[i].draw();
    }

    setInterval(() => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < totalBalls; i++) {
        balls[i].move();
        balls[i].draw();
      }
    }, dt);
  }
}
