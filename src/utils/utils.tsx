import { maxLength, maxValue, minLength, minValue } from "../constants/constants";
import { DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function getNewArray() {
  const arr = getRandomArr(minLength, maxLength).map((item) => ({
    item,
    state: ElementStates.Default,
  }));
  return arr;
}

export const swap = (arr: any, start: number, end: number) => {
  [arr[start], arr[end]] = [arr[end], arr[start]];
};

export function getRandomCount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArr(min: number, max: number): number[] {
  let array = [];
  let count = getRandomCount(min, max);

  for (let i = 0; i < count; i++) {
    let arrItem = getRandomCount(minValue, maxValue);
    array.push(arrItem);
  }
  return array;
}

export function changeColor(arr: any[], index: number, state: ElementStates) {
  if (arr) {
    arr[index].state = state;
  }
  return arr;
}

export function changeTwoColor(
  arr: any[],
  start: number,
  end: number,
  state1: ElementStates,
  state2: ElementStates
) {
  if (arr) {
    arr[start].state = state1;
    arr[end].state = state2;
  }
  return arr;
}

export async function changeElements(
  arr: any[],
  start: number,
  end: number,
  reverseArrFn: React.SetStateAction<any>
) {
  while (start <= end) {
    await timeout(DELAY_IN_MS);
    changeTwoColor(arr, start, end, ElementStates.Changing, ElementStates.Changing);
    reverseArrFn([...arr]);
    await timeout(DELAY_IN_MS);
    swap(arr, start, end);
    changeTwoColor(arr, start, end, ElementStates.Modified, ElementStates.Modified);
    reverseArrFn([...arr]);
    start++;
    end--;
  }
}
