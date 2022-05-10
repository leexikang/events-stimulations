import { Ball } from "./ball";

/**
 * @jest-environment jsdom
 */

test("time to hit the other ball", () => {
  const mock = jest.fn();
  const ctx = mock("CanvasRenderingContext2D");
  const current = new Ball(300, 0, 10, 10, 5, 5, ctx);

  const that = new Ball(0, 300, 10, 10, 5, 5, ctx);
});

test("time to hit the wall", () => {
  const mock = jest.fn();
  const ctx = mock("CanvasRenderingContext2D");
  const current = new Ball(250, 0, 10, 10, 5, 5, ctx);
  console.log(current.timeToHitHorizontalTheWall());
});

export {};
