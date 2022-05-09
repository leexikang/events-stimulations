import { PQ } from "./pq";

test("enqueues and dequeues for primitive type", () => {
  const pq = new PQ<number>();
  pq.enqueue(1);
  pq.enqueue(4);
  pq.enqueue(3);
  expect(pq.size()).toBe(3)
  expect(pq.dequeue()).toBe(4)
  expect(pq.size()).toBe(2)
  expect(pq.dequeue()).toBe(3)
  expect(pq.dequeue()).toBe(1)
  expect(pq.size()).toBe(0)
});


class Node {
  value: number

  constructor(value: number) {
    this.value = value;
  }

  compareTo(that: Node): number {
    if (this.value > that.value) return 1;
    if (this.value < that.value) return -1;
    return 0;
  }
}

test("enqueues and dequeues for Comparable type", () => {
  const pq = new PQ<Node>();
  pq.enqueue(new Node(1));
  pq.enqueue(new Node(4));
  pq.enqueue(new Node(3));
  pq.enqueue(new Node(5));
  pq.enqueue(new Node(6));
  expect(pq.dequeue()!.value).toBe(6)
  expect(pq.dequeue()!.value).toBe(5)
  expect(pq.dequeue()!.value).toBe(4)
  expect(pq.dequeue()!.value).toBe(3)
  expect(pq.dequeue()!.value).toBe(1)
  });

export {};
