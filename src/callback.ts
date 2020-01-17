import { Heap } from "./heap";

/** A callback item. */
export interface Callback {
  runPastMs: number;
  func: () => void;
}

/** When comparing callbacks, use its property `runPastMs`. */
function comparer(a: Callback, b: Callback): number {
  if (a.runPastMs < b.runPastMs) return -1;
  if (a.runPastMs > b.runPastMs) return 1;
  return 0;
}

/** Manager and runner of callbacks. */
export class CallbackManager {
  private heap = new Heap<Callback>(comparer);
  private interval: ReturnType<typeof setInterval> | null = null;

  /** Number of ms before the Callback manager checks the heap. */
  private granularity = 100;

  private currentTimeMs(): number {
    return new Date().getTime();
  }

  /** Register a callback that would be ran after <timeout> ms. */
  queue(func: () => void, timeout: number) {
    this.heap.insert({
      func,
      runPastMs: this.currentTimeMs() + timeout
    });
  }

  /** Starts the callback manager event loop. */
  run() {
    if (this.interval) {
      return;
    }

    this.interval = setInterval(() => {
      const top = this.heap.top();
      if (top === null) {
        return;
      }
      if (top.runPastMs > this.currentTimeMs()) {
        return;
      }

      (async () => {
        top.func();
      })();

      this.heap.pop();
    }, this.granularity);
  }

  /** Stops the callback manager's event loop. */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
