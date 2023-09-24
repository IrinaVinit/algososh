import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { CircleElement } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { changeColor, timeout } from "../../utils/utils";
import { Stack } from "./Stack";

export function addToStack(value: string, stack: Stack<CircleElement>): void {
  const circleItem = {
    item: value,
    state: ElementStates.Changing,
  };
  stack.push(circleItem);
}

export function getArrFromStack(stack: Stack<CircleElement>) {
  const arr = stack.getContainer();
  return arr;
}

export async function deleteElement(
  stack: Stack<CircleElement>,
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  const arr = stack.getContainer();
  changeColor(arr, stack.getSize() - 1, ElementStates.Changing);
  await timeout(SHORT_DELAY_IN_MS);
  stack.pop();
  setState(arr);
}

export function clearStack(
  stack: Stack<CircleElement>,
  setState: React.Dispatch<React.SetStateAction<CircleElement[]>>
) {
  stack.clear();
  setState([]);
}
