import { IStack } from "../../types/common-types";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.getSize() !== 0) {
      this.container.pop();
    }
  };

  // peak = (): T | null => {
  //   return this.container[this.getSize() - 1] || null;
  // };

  getSize = () => this.container.length;

  clear = (): void => {
    this.container.length = 0;
  };

  getContainer = (): T[] => {
    return this.container;
  };
}
