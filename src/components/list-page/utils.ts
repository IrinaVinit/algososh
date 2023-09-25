import { ReactElement } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { CircleElement } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/utils";
import { LinkedList } from "./LinkedList";

export function getCircle(
  list: LinkedList<string>,
  value: string,
  index: number,
  head?: React.ReactElement<CircleElement>,
  tail?: React.ReactElement<CircleElement>
) {
  const tailText = index === list.getSize() - 1 ? "tail" : "";
  const headText = index === 0 ? "head" : "";

  const circleItem = {
    item: value,
    index: index,
    head: head ?? headText,
    tail: tail ?? tailText,
    state: ElementStates.Default,
  };
  return circleItem;
}

export async function addElementToHead(
  list: LinkedList<string>,
  value: string,
  index: number,
  newCircle: ReactElement<CircleElement>,
  arr: CircleElement[],
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  list.appendToIndex(value, index);

  if (!arr.length) {
    arr.unshift({
      item: value,
      head: "head",
      tail: "tail",
      state: ElementStates.Modified,
    });
    setState([...arr]);
    await timeout(DELAY_IN_MS);
    arr[0].state = ElementStates.Default;
  } else {
    arr[0].head = newCircle;
    setState(arr);
    await timeout(DELAY_IN_MS);

    const headItem = list.getHead();
    arr.unshift({
      item: headItem!.value,
      head: "head",
      state: ElementStates.Modified,
    });
    arr[1].head = "";
    setState([...arr]);
    await timeout(DELAY_IN_MS);

    arr[0].state = ElementStates.Default;
  }
  setState([...arr]);
}

export async function addElementToTail(
  list: LinkedList<string>,
  value: string,
  newCircle: ReactElement<CircleElement>,
  arr: CircleElement[],
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  if (!arr.length) {
    arr.unshift({
      item: value,
      head: "head",
      tail: "tail",
      state: ElementStates.Modified,
    });
    setState([...arr]);
    await timeout(DELAY_IN_MS);
    arr[0].state = ElementStates.Default;
  } else {
    const length = list.getSize() - 1;
    list.appendToIndex(value, length);

    arr[length].head = newCircle;
    setState([...arr]);

    await timeout(DELAY_IN_MS);

    arr.push({ item: value, head: "", tail: "tail", state: ElementStates.Modified });
    arr[length].head = "";
    arr[length].tail = "";
    setState([...arr]);
    await timeout(DELAY_IN_MS);
    arr[length + 1].state = ElementStates.Default;
  }
  setState([...arr]);
}

export async function addElementByIndex(
  list: LinkedList<string>,
  value: string,
  index: number,
  newCircle: ReactElement<CircleElement>,
  arr: CircleElement[],
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  list.appendToIndex(value, index);

  for (let i = 0; i <= index; i++) {
    if (i === 1) {
      arr[i - 1].head = "head";
    }

    if (i > 1) {
      arr[i - 1].head = "";
    }

    arr[i] = {
      ...arr[i],
      state: ElementStates.Changing,
      tail: "",
      head: newCircle,
    };

    if (i === index) {
      arr[i].state = ElementStates.Default;
    }
    setState([...arr]);
    await timeout(DELAY_IN_MS);
  }
  arr.map((item) => (item.state = ElementStates.Default));
  arr.splice(index, 0, { item: value, head: "", state: ElementStates.Modified });
  arr[index + 1].head = "";
  setState([...arr]);
  await timeout(DELAY_IN_MS);
  arr[index].state = ElementStates.Default;
  setState([...arr]);
}

export async function removeElementFromHead(
  list: LinkedList<string>,
  newCircle: ReactElement<CircleElement>,
  arr: CircleElement[],
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  list.deleteHead();
  arr[0].state = ElementStates.Changing;
  setState([...arr]);
  await timeout(DELAY_IN_MS);
  arr[0] = {
    item: "",
    head: "head",
    tail: newCircle,
    state: ElementStates.Changing,
  };
  setState([...arr]);
  await timeout(DELAY_IN_MS);
  arr.shift();
  if (arr.length) {
    arr[0].head = "head";
  }
  setState([...arr]);
}

export async function removeElementFromTail(
  list: LinkedList<string>,
  newCircle: ReactElement<CircleElement>,
  arr: CircleElement[],
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  const length = list.getSize() - 1;
  arr[length].state = ElementStates.Changing;
  setState([...arr]);
  await timeout(DELAY_IN_MS);
  arr[length] = {
    item: "",
    tail: newCircle,
    state: ElementStates.Changing,
  };
  setState([...arr]);
  await timeout(DELAY_IN_MS);
  list.deleteTail();
  arr.pop();
  if (arr.length) {
    arr[length - 1].tail = "tail";
  }

  setState([...arr]);
}

export async function removeElementByIndex(
  index: number,
  list: LinkedList<string>,
  newCircle: ReactElement<CircleElement>,
  arr: CircleElement[],
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  for (let i = 0; i <= index; i++) {
    arr[i].state = ElementStates.Changing;
    setState([...arr]);
    await timeout(DELAY_IN_MS);
  }
  arr[index] = {
    item: "",
    tail: newCircle,
    state: ElementStates.Changing,
  };
  setState([...arr]);
  await timeout(DELAY_IN_MS);
  arr.splice(index, 1);
  list.deleteByIndex(index);
  setState([...arr]);
  await timeout(DELAY_IN_MS);
  arr.map((item) => (item.state = ElementStates.Default));
  setState([...arr]);
}
