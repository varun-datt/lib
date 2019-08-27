// First-In-First-Out (FIFO) data structure

export class Queue {
  queue = [];

  get length() {
    return this.queue.length;
  }

  enqueue(item) {
    return this.queue.unshift(item);
  }

  dequeue() {
    return this.queue.pop();
  }

  peek() {
    return this.queue[this.queue.length - 1];
  }

  isEmpty () {
    return this.queue.length === 0;
  }
}