import { IQueue } from "../../types/common-types";

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }
  getQueue = (): (T | null)[] => this.container;
  getIndexHead = (): number => this.head;
  getIndexTail = (): number => this.tail - 1;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else {
      this.container[this.tail] = item;
      this.tail++;
      this.length++;
    }
  };
  dequeue = () => {
    delete this.container[this.head];
    this.head++;
    this.length--;
  };

  peak = (): T => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
      return this.container[this.tail];
    }
  };

  isEmpty = (): boolean => this.length === 0;
  clear = (): void => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };
}
