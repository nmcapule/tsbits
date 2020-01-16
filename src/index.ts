/** Implements a generic min-heap! */
class MinHeap<T> {
  storage: Array<T>;

  constructor() {
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
        this.storage[minIdx] >= this.storage[left]
      ) {
        minIdx = left;
      }
      if (
        right < this.storage.length &&
        this.storage[minIdx] >= this.storage[right]
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
      if (this.storage[index] < this.storage[parent]) {
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

/** I just wanted a main function for testing. :P */
function main() {
  const heap = new MinHeap();
  for (let i = 0; i < 100; i++) {
    heap.insert(100 - i);
  }

  while (heap.size) {
    console.log(heap.pop());
  }
}

main();
