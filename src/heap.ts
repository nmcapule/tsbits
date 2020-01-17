export function minHeapCompare<T>(a: T, b: T): number {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

export function maxHeapCompare<T>(a: T, b: T): number {
  return -minHeapCompare(a, b);
}

/** Implements a generic min-heap! */
export class Heap<T> {
  storage: Array<T>;
  comparer: (a: T, b: T) => number;

  constructor(comparer?: (a: T, b: T) => number) {
    this.comparer = comparer || minHeapCompare;
    this.storage = [];
  }

  /** Returns the size of the heap. */
  get size() {
    return this.storage.length;
  }

  /** Inserts a new value to the heap. */
  insert(value: T) {
    this.storage.push(value);
    this.resolve(this.storage.length - 1);
  }

  /** Returns the next value that can be popped. */
  top(): T | null {
    if (this.storage.length === 0) {
      return null;
    }
    return this.storage[0];
  }

  /** Removes and returns the smallest value from the heap. */
  pop(): T | null {
    // Early exit if heap is empty!
    if (this.storage.length === 0) {
      return null;
    }

    // Store the smallest value in the heap for return later.
    const value = this.storage[0];

    // Move the last value in the heap up to the top.
    this.storage[0] = this.storage[this.storage.length - 1];
    this.storage = this.storage.slice(0, -1);

    // From root to top, arrange the heap! This operation is O(log N).
    let index = 0;
    while (index < this.storage.length) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      // Survey which child index we should swap the current index with.
      let minIdx = index;
      if (
        left < this.storage.length &&
        this.comparer(this.storage[minIdx], this.storage[left]) >= 0
      ) {
        minIdx = left;
      }
      if (
        right < this.storage.length &&
        this.comparer(this.storage[minIdx], this.storage[right]) >= 0
      ) {
        minIdx = right;
      }

      // If we haven't found a swap, we break since heap is sorted at this point.
      if (minIdx === index) {
        break;
      }

      // Else, we do a swap and iterate!
      this.swap(index, minIdx);
      index = minIdx;
    }

    return value;
  }

  /** Resolve heap placing from children to root. This operation is O(log N). */
  private resolve(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.comparer(this.storage[index], this.storage[parent]) < 0) {
        this.swap(index, parent);
      }
      index = parent;
    }
  }

  /** Swaps values from two indices in the heap. */
  private swap(i: number, j: number) {
    const temp = this.storage[i];
    this.storage[i] = this.storage[j];
    this.storage[j] = temp;
  }
}
