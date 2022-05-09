import {Ball} from "./ball";

/**
 * @jest-environment jsdom
 */

test("time to hit the other ball", () => {
  const mock = jest.fn();
  const ctx = mock("CanvasRenderingContext2D")
  const current = new Ball(
    100,
    100,
    -10,
    -10,
    5,
    5,
    ctx
  )

  const that = new Ball(
    0,
    100,
    10,
    10,
    5,
    5,
    ctx
  )

  console.log(current.timeToHit(that))
});

export{}
