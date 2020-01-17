import { Heap, maxHeapCompare } from "./heap";

/** I just wanted a main function for testing. :P */
function main() {
  const heap = new Heap(maxHeapCompare);
  for (let i = 0; i < 100; i++) {
    heap.insert(100 - i);
  }

  while (heap.size) {
    console.log(heap.pop());
  }
}

main();
