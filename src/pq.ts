type Primitive = string | number | boolean

interface Comparable<T> {
  compareTo(that: T): number;
}

export class PQ<T extends Comparable<T> | Primitive> {
  private nodes: Array<T | null>;
  private nxt: number;

  constructor() {
    this.nodes = [];
    this.nxt = 0;
  }

  size(): number {
    return this.nxt
  }

  isEmpty(): boolean {
    return this.nxt == 0;
  }

  enqueue(node: T) {
    this.nodes[this.nxt] = node;
    this.swim(this.nxt);
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
    let i = index;

    while (true) {
      let parent = Math.floor(i / 2);
      if (i > 0 && this.less(parent, i)) {
        this.exchange(parent, i);
        i = parent;
        continue;
      }
      break;
    }
  }

  private sink(index: number) {
    let i = index;
    while (true) {
      let k = i * 2;
      if (k + 1 > 0 && this.less(k, k + 1)) k = k + 1;
      if (k < this.nxt && this.less(i, k)) {
        this.exchange(i, k);
        i = k;
        continue
      }
      break;
    }
  }

  private less(i: number, k: number): boolean {
    if (this.nodes[k] == null) return false;
    if (this.nodes[i] == null) return true;

    if ((<Comparable<T>>this.nodes[i]!).compareTo) {
      const compare = (<Comparable<T>>this.nodes[i]!).compareTo(this.nodes[k]!);
      return compare < 0;
    }

    if (this.nodes[i]! < this.nodes[k]!) {
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
