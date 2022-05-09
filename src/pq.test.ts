import { PQ } from "./pq";

test("enqueues node to pq", () => {
  const pq = new PQ<number>();
  pq.enqueue(1);
  pq.enqueue(4);
  pq.enqueue(3);
});

export {};
