export class PQ<T> {
  private nodes: Array<T>;
  private nxt: number;

  constructor() {
    this.nodes = [];
    this.nxt = 0;
  }

  enqueue(node: T) {
    this.nodes[this.nxt] = node;
    this.swim(this.nxt);
    this.nxt++;
  }

  dequeue() {}

  private swim(index: number) {
    if (index > 0 && this.less(index / 2, index)) {
      this.exchange(index / 2, index);
    }
  }

  private sink() {}

  private less(i: number, k: number): boolean {
    return true;
  }

  private exchange(i: number, k: number) {
    const tmp = this.nodes[i];
    this.nodes[i] = this.nodes[k];
    this.nodes[k] = tmp;
  }
}
