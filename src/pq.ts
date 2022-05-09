export class PQ<T> {
  private nodes: Array<T | null>;
  private nxt: number;

  constructor() {
    this.nodes = [];
    this.nxt = 0;
  }

  enqueue(node: T) {
    this.nodes[this.nxt] = node;
    this.swim(this.nxt);
    console.log(this.nodes);
    this.nxt++;
  }

  dequeue(): T | null {
    let tmp = this.nodes[0];
    this.nodes[0] = this.nodes[this.nxt - 1];
    this.nodes[this.nxt - 1] = null;
    this.sink(0);
    this.nxt--;
    return tmp;
  }

  private swim(index: number) {
    while (true) {
      if (index > 0 && this.less(index / 2, index)) {
        this.exchange(index / 2, index);
        index = index / 2;
        return;
      } else {
        break;
      }
    }
  }

  private sink(i: number) {
    while (true) {
      let k = i * 2;
      if (this.less(k, k + 1)) k = k + 1;
      if (k < this.nxt && this.less(i, k)) {
        this.exchange(i, k);
        i = k;
      } else {
        break;
      }
    }
  }

  private less(i: number, k: number): boolean {
    if (i < k) {
      return true;
    }
    return false;
  }

  private exchange(i: number, k: number) {
    const tmp = this.nodes[i];
    this.nodes[i] = this.nodes[k];
    this.nodes[k] = tmp;
  }
}
