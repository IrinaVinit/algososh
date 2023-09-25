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
        } else {
          node.next = this.head;
          this.head = node;
        }
      } else if (index === this.size - 1) {
        if (!this.tail) {
          this.tail = node;
          this.head = node;
        } else {
          const currentTail = this.tail;
          currentTail.next = node;
          this.tail = node;
        }
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
  deleteHead() {
    if (!this.head) {
      return;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.size--;
  }

  deleteTail() {
    if (!this.tail) {
      return;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let curr = this.tail;
      let prev = curr;
      prev.next = null;
      this.size--;
    }
  }

  deleteByIndex(index: number) {
    if (index >= this.size) {
      return;
    }
    if (index === 0) {
      this.deleteHead();
      return;
    }
    if (index === this.size - 1) {
      this.deleteTail();
      return;
    }
    let curr = this.head;
    for (let i = 1; i < index; i++) {
      curr = curr!.next;
    }
    curr!.next = curr!.next!.next;
    this.size--;
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
