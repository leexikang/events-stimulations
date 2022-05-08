import { PQ } from "./pq";

test("enqueues node to pq", () => {
  const pq = new PQ<number>();
  pq.enqueue(1);
});

export {};
