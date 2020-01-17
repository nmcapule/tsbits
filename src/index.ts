import { CallbackManager } from "./callback";

/** I just wanted a main function for testing. :P */
function main() {
  const manager = new CallbackManager();

  manager.queue(() => {
    console.log("Hello world 1000");
  }, 1000);
  manager.queue(() => {
    console.log("Hello world 100");
  }, 100);
  manager.queue(() => {
    console.log("Hello world 200");
  }, 200);

  manager.run();
  console.log("ohno");

  // const heap = new Heap(maxHeapCompare);
  // for (let i = 0; i < 100; i++) {
  //   heap.insert(100 - i);
  // }
  // while (heap.size) {
  //   console.log(heap.pop());
  // }
}

main();
