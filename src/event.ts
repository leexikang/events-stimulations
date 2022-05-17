import {Ball} from "./ball";

export class Event {
  time: number;
  a: Ball | null;
  b: Ball | null;
  countA: number;
  countB: number;


  constructor(t: number, a: Ball | null, b: Ball | null) {
    this.time = t;
    this.a = a;
    this.b = b;
    if (this.a != null) this.countA = a!.count;
    else this.countA = -1;

    if (this.b != null) this.countB = b!.count;
    else this.countB = -1;
  }

  compareTo(that: Event): number {
    return that.time - this.time;
  }

  isValid(): boolean {
    if (this.a != null && this.a.count != this.countA) return false;
    if (this.b != null && this.b.count != this.countB) return false;
    return true;
  }
}
