import { ElementStates } from "./element-states";

export enum Sorting {
  Selection = "selection",
  BubbleSort = "bubbleSort",
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
  clear: () => void;
  getContainer: () => T[];
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T;
  getQueue: () => (T | null)[];
  getIndexHead: () => number;
  getIndexTail: () => number;
  isEmpty: () => boolean;
  clear: () => void;
}

export interface ILinkedList<T> {
  appendArray: (elements: T[]) => void;
  appendToIndex: (element: T, index: number) => void;
  getSize: () => number;
}

export type CircleElement = {
  item: string;
  head?: string | React.ReactElement | null;
  tail?: string | React.ReactElement | null;
  state: ElementStates;
};
