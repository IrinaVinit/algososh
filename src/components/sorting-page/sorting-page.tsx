import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { changeColor, changeTwoColor, getRandomArr, swap, timeout } from "../../utils/utils";
import { maxLength, minLength } from "../../constants/constants";
import { Column } from "../ui/column/column";
import { Sorting } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export type ReverseElement = {
  item: number;
  state: ElementStates;
};

type ActiveElementSort = {
  loadingDesc: boolean;
  loadingAsc: boolean;
  disaibledRadio: boolean;
  disaibledButton: boolean;
};

const initialState = {
  loadingDesc: false,
  loadingAsc: false,
  disaibledRadio: false,
  disaibledButton: false,
};

const visualStateDesc = {
  loadingDesc: true,
  loadingAsc: false,
  disaibledRadio: true,
  disaibledButton: true,
};
const visualStateAsc = {
  loadingDesc: false,
  loadingAsc: true,
  disaibledRadio: true,
  disaibledButton: true,
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<ReverseElement[]>([]);
  const [sotringType, setSortingType] = useState<Sorting>(Sorting.Selection);
  const [isLoading, setIsLoading] = useState<ActiveElementSort>(initialState);

  function getNewArray() {
    const arr = getRandomArr(minLength, maxLength).map((item) => ({
      item,
      state: ElementStates.Default,
    }));
    setArray(arr);
  }

  async function sortSelection(arr: ReverseElement[], direction: Direction) {
    const { length } = arr;
    for (let i = 0; i < length; i ++) {
      let minInd = i;
      changeColor(arr, minInd, ElementStates.Changing);
      for (let j = i + 1; j < length; j ++) {
        changeColor(arr, j, ElementStates.Changing);
        setArray([...arr]);
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
        setArray([...arr]);
      }
      swap(arr, i, minInd);
      changeTwoColor(arr, minInd, i, ElementStates.Default, ElementStates.Modified);
      setArray([...arr]);
    }
  }

  async function bubbleSorting(arr: ReverseElement[], direction: Direction) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        changeTwoColor(arr, j, j+1, ElementStates.Changing, ElementStates.Changing);
        setArray([...arr]);
        await timeout(DELAY_IN_MS);
        if (
          direction === Direction.Ascending
            ? array[j + 1].item < array[j].item
            : array[j + 1].item > array[j].item
        ) {
          swap(arr, j, j + 1);
          
        }
        changeTwoColor(arr, j, j+1, ElementStates.Default, ElementStates.Default);
          setArray([...arr]);
      }
      changeColor(arr, length - i - 1, ElementStates.Modified);
      setArray([...arr]);
    }
  }

  async function sortInAscending(arr: ReverseElement[]) {
    if (sotringType === Sorting.Selection) {
      await sortSelection(arr, Direction.Ascending);
    } else {
      await bubbleSorting(arr, Direction.Ascending);
    }
  }

  async function sortInDescending(arr: ReverseElement[]) {
    if (sotringType === Sorting.Selection) {
      await sortSelection(arr, Direction.Descending);
    } else {
      await bubbleSorting(arr, Direction.Descending);
    }
  }

  async function visualiseSortInAscending() {
    setIsLoading(visualStateAsc);
    await sortInAscending(array);
    setIsLoading(initialState);
  }

  async function visualiseSortInDescending() {
    setIsLoading(visualStateDesc);
    await sortInDescending(array);
    setIsLoading(initialState);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.grid} ${styles.container}`}>
        <div className={`${styles.flex} ${styles.radioInputs}`}>
          <RadioInput
            value="selection"
            label="Выбор"
            checked={sotringType === Sorting.Selection}
            onChange={() => setSortingType(Sorting.Selection)}
            disabled={isLoading.disaibledRadio}
          />
          <RadioInput
            value="bubbleSort"
            label="Пузырек"
            checked={sotringType === Sorting.BubbleSort}
            onChange={() => setSortingType(Sorting.BubbleSort)}
            disabled={isLoading.disaibledRadio}
          />
        </div>
        <div className={`${styles.flex} ${styles.buttons}`}>
          <Button
            extraClass={styles.button}
            sorting={Direction.Ascending}
            text="По возрастанию"
            onClick={visualiseSortInAscending}
            disabled={!array.length || isLoading.disaibledButton}
            isLoader={isLoading.loadingAsc}
          />
          <Button
            extraClass={styles.button}
            sorting={Direction.Descending}
            text="По убыванию"
            onClick={visualiseSortInDescending}
            disabled={!array.length || isLoading.disaibledButton}
            isLoader={isLoading.loadingDesc}
          />
        </div>
        <div className={styles.newAr}>
          <Button
            text="Новый массив"
            extraClass={styles.button}
            onClick={getNewArray}
            type="button"
            disabled={isLoading.disaibledButton}
          />
        </div>
      </div>

      <div className={styles.columns}>
        {array.map((item, index) => (
          <Column index={item.item} key={index} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
