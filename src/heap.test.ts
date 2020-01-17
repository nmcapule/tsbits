import { Heap, maxHeapCompare } from "./heap";

test("can insert and pop", () => {
  const heap = new Heap();
  expect(heap.size).toBe(0);

  heap.insert(0);
  expect(heap.size).toBe(1);
  expect(heap.pop()).toBe(0);
  expect(heap.size).toBe(0);
  expect(heap.pop()).toBe(null);
  expect(heap.size).toBe(0);
});

test("behaves like a heap", () => {
  const heap = new Heap();

  heap.insert(5);
  heap.insert(7);
  heap.insert(3);

  expect(heap.pop()).toBe(3);

  heap.insert(8);

  expect(heap.pop()).toBe(5);

  expect(heap.size).toBe(2);

  expect(heap.pop()).toBe(7);
  expect(heap.pop()).toBe(8);
});

test("can sort all its input by pop order", () => {
  const input = [3, 1, 2, 65, 3, 2, 5, 8, -1, 0];
  const expected = [-1, 0, 1, 2, 2, 3, 3, 5, 8, 65];

  const heap = new Heap();
  for (const x of input) {
    heap.insert(x);
  }

  for (const x of expected) {
    expect(heap.pop()).toBe(x);
  }
  expect(heap.size).toBe(0);
});

test("can specify comparer to adjust pop order", () => {
  const input = [3, 1, 2, 65, 3, 2, 5, 8, -1, 0];
  const expected = [65, 8, 5, 3, 3, 2, 2, 1, 0, -1];

  const heap = new Heap(maxHeapCompare);
  for (const x of input) {
    heap.insert(x);
  }

  for (const x of expected) {
    expect(heap.pop()).toBe(x);
  }
  expect(heap.size).toBe(0);
});

test("can handle strings", () => {
  const input = ["oh", "hello", "world", "!"];
  const expected = ["!", "hello", "oh", "world"];

  const heap = new Heap();
  for (const x of input) {
    heap.insert(x);
  }

  for (const x of expected) {
    expect(heap.pop()).toBe(x);
  }
  expect(heap.size).toBe(0);
});
