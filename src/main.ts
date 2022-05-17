import {Ball} from "./ball";
import {CollisionSystem} from "./collison_system";
import {randomBall} from "./generator";
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
    }

    const collison_system = new CollisionSystem({
      canvas: canvas,
      balls: balls,
      limit: 10000,
    })

    collison_system.stimulate();
  }
}





