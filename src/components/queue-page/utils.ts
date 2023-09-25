import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { CircleElement } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/utils";
import { Queue } from "./Queue";

export function getInitualCircles(length: number) {
  const circleItem = {
    item: "",
    state: ElementStates.Default,
  };
  return Array(length).fill(circleItem);
}

export function addValue(
  queue: Queue<string>,
  arr: CircleElement[],
  value: string,
  newState: ElementStates
) {
  queue.enqueue(value);
  const tail = queue.getIndexTail();
  arr[tail] = {
    item: value,
    state: newState,
  };
}

export async function deleteValue(
  queue: Queue<string>,
  arr: CircleElement[],
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  const head = queue.getIndexHead();
  arr[head] = {
    item: "",
    state: ElementStates.Changing,
  };
  setState(arr);
  await timeout(SHORT_DELAY_IN_MS);
  arr[head].state = ElementStates.Default;
  queue.dequeue();
  setState(arr);
}
