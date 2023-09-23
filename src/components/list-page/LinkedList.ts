import { ILinkedList } from "../../types/common-types";

export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next ? next : null;
  }

  getNext() {
    return this.next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  private tail: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  appendArray(elements: T[]) {
    elements.forEach((element) => this.appendToIndex(element, 0));
  }

  appendToIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } 
        node.next = this.head;
        this.head = node;
        console.log(this.head);
      } else if (index === this.size - 1) {
        this.tail = node;
        console.log(this.tail);
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (curr && currIndex <= index) {
          curr = curr.next;
          currIndex++;
      }
          node.next = curr?.next || null;
          curr!.next = node;
        }
        this.size++;
    }
  }


getHead() {
  return this.head;
}
  getTail() {
    return this.tail;
  }
  getSize() {
    return this.size;
  }
}
