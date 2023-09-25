import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { getNewArray } from "../../utils/utils";
import { Column } from "../ui/column/column";
import { Sorting } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { sortInAscending, sortInDescending } from "./utils";

export type CircleElement = {
  item: number;
  state: ElementStates;
};

type ActiveElementSort = {
  loadingDesc: boolean;
  loadingAsc: boolean;
  disabledRadio: boolean;
  disabledButton: boolean;
};

const initialState = {
  loadingDesc: false,
  loadingAsc: false,
  disabledRadio: false,
  disabledButton: false,
};

const visualStateDesc = {
  loadingDesc: true,
  loadingAsc: false,
  disabledRadio: true,
  disabledButton: true,
};
const visualStateAsc = {
  loadingDesc: false,
  loadingAsc: true,
  disabledRadio: true,
  disabledButton: true,
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<CircleElement[]>([]);
  const [sortingType, setSortingType] = useState<Sorting>(Sorting.Selection);
  const [isLoading, setIsLoading] = useState<ActiveElementSort>(initialState);

  const getNewArr = () => {
    setArray(getNewArray());
  };

  async function visualiseSortInAscending() {
    setIsLoading(visualStateAsc);
    await sortInAscending(sortingType, array, setArray);
    setIsLoading(initialState);
  }

  async function visualiseSortInDescending() {
    setIsLoading(visualStateDesc);
    await sortInDescending(sortingType, array, setArray);
    setIsLoading(initialState);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.grid} ${styles.container}`}>
        <div className={`${styles.flex} ${styles.radioInputs}`}>
          <RadioInput
            value="selection"
            label="Выбор"
            checked={sortingType === Sorting.Selection}
            onChange={() => setSortingType(Sorting.Selection)}
            disabled={isLoading.disabledRadio}
          />
          <RadioInput
            value="bubbleSort"
            label="Пузырек"
            checked={sortingType === Sorting.BubbleSort}
            onChange={() => setSortingType(Sorting.BubbleSort)}
            disabled={isLoading.disabledRadio}
          />
        </div>
        <div className={`${styles.flex} ${styles.buttons}`}>
          <Button
            extraClass={styles.button}
            sorting={Direction.Ascending}
            text="По возрастанию"
            onClick={visualiseSortInAscending}
            disabled={!array.length || isLoading.disabledButton}
            isLoader={isLoading.loadingAsc}
          />
          <Button
            extraClass={styles.button}
            sorting={Direction.Descending}
            text="По убыванию"
            onClick={visualiseSortInDescending}
            disabled={!array.length || isLoading.disabledButton}
            isLoader={isLoading.loadingDesc}
          />
        </div>
        <div className={styles.newAr}>
          <Button
            text="Новый массив"
            extraClass={styles.button}
            onClick={getNewArr}
            type="button"
            disabled={isLoading.disabledButton}
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
