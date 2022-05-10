import { Ball } from "./ball";
import { dt } from "./constant";
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
    for (let i = 1; i < totalBalls; i++) {
      for (let j = 0; j < totalBalls; j++) {
        console.log(balls[i].timeToHit(balls[j]));
      }
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

//if (canvas != null && canvas.getContext) {
//var ctx = canvas.getContext("2d");
//if (ctx != null) {
//const current = new Ball(0, 300, 5, 5, 5, 5, ctx);
//const that = new Ball(300, 0, -5, -5, 5, 5, ctx);
//current.draw();
//that.draw();

//setInterval(() => {
//ctx!.clearRect(0, 0, canvas.width, canvas.height);
//current.move();
//current.draw();
//that.move();
//that.draw();
//}, dt);
//}
//}
