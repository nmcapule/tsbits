class MinHeap<T> {
  storage: Array<T>;

  constructor() {
    this.storage = [];
  }

  get size() {
    return this.storage.length;
  }

  insert(value: T) {
    this.storage.push(value);
    this.resolve(this.storage.length - 1);
  }

  pop(): T | null {
    if (this.storage.length === 0) {
      return null;
    }

    const value = this.storage[0];

    this.storage[0] = this.storage[this.storage.length - 1];
    this.storage = this.storage.slice(0, -1);

    let index = 0;
    while (index < this.storage.length) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;

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

      if (minIdx === index) {
        break;
      }

      this.swap(index, minIdx);

      index = minIdx;
    }

    return value;
  }

  private resolve(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.storage[index] < this.storage[parent]) {
        this.swap(index, parent);
      }
      index = parent;
    }
  }

  private swap(i: number, j: number) {
    const temp = this.storage[i];
    this.storage[i] = this.storage[j];
    this.storage[j] = temp;
  }
}

const heap = new MinHeap();
for (let i = 0; i < 100; i++) {
  heap.insert(100 - i);
}

while (heap.size) {
  console.log(heap.pop());
}
