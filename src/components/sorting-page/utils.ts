import { CircleElement } from "./sorting-page";
import { changeColor, changeTwoColor, swap, timeout } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { Sorting } from "../../types/common-types";


export async function sortSelection(arr: CircleElement[], direction: Direction, setState: React.Dispatch<React.SetStateAction<CircleElement[]>>) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let minInd = i;
      changeColor(arr, minInd, ElementStates.Changing);
      for (let j = i + 1; j < length; j++) {
        changeColor(arr, j, ElementStates.Changing);
        setState([...arr]);
        await timeout(DELAY_IN_MS);
        if (
          direction === Direction.Ascending
            ? arr[j].item < arr[minInd].item
            : arr[j].item > arr[minInd].item
        ) {
          minInd = j;
          if (minInd !== i) {
            changeColor(arr, minInd, ElementStates.Default);
          }
        }
        if (j !== minInd) {
          changeColor(arr, j, ElementStates.Default);
        }
        setState([...arr]);
      }
      swap(arr, i, minInd);
      changeTwoColor(arr, minInd, i, ElementStates.Default, ElementStates.Modified);
      setState([...arr]);
    }
  }

  async function bubbleSorting(arr: CircleElement[], direction: Direction, setState: React.Dispatch<React.SetStateAction<CircleElement[]>>) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        changeTwoColor(arr, j, j + 1, ElementStates.Changing, ElementStates.Changing);
        setState([...arr]);
        await timeout(DELAY_IN_MS);
        if (
          direction === Direction.Ascending
            ? arr[j + 1].item < arr[j].item
            : arr[j + 1].item > arr[j].item
        ) {
          swap(arr, j, j + 1);
        }
        changeTwoColor(arr, j, j + 1, ElementStates.Default, ElementStates.Default);
        setState([...arr]);
      }
      changeColor(arr, length - i - 1, ElementStates.Modified);
      setState([...arr]);
    }
  }

  export async function sortInAscending(sortingType: Sorting, arr: CircleElement[], setState: React.Dispatch<React.SetStateAction<CircleElement[]>>) {
    if (sortingType === Sorting.Selection) {
      await sortSelection(arr, Direction.Ascending, setState);
    } else {
      await bubbleSorting(arr, Direction.Ascending, setState);
    }
  }

  export async function sortInDescending(sortingType: Sorting, arr: CircleElement[], setState: React.Dispatch<React.SetStateAction<CircleElement[]>>) {
    if (sortingType === Sorting.Selection) {
      await sortSelection(arr, Direction.Descending, setState);
    } else {
      await bubbleSorting(arr, Direction.Descending, setState);
    }
  }