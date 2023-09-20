  export enum Sorting {
    Selection = "selection",
    BubbleSort = "bubbleSort",
  }
  
  export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    clear: () => void;
  }