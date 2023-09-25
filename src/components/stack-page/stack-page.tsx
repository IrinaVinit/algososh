import React, { ChangeEvent, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./Stack";
import { changeColor, timeout } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { CircleElement } from "../../types/common-types";
import { addToStack, clearStack, deleteElement, getArrFromStack } from "./utils";

type ActiveElement = {
  loadingAdd: boolean;
  loadingDel: boolean;
  loadingClear: boolean;
};

const initialState = {
  loadingAdd: false,
  loadingDel: false,
  loadingClear: false,
};

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState<ActiveElement>(initialState);
  const [stackState, setStackState] = useState<CircleElement[]>([]);

  const myStack = useMemo(() => new Stack<CircleElement>(), []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  async function visualiseAdding(value: string) {
    setIsLoading({ loadingAdd: true, loadingDel: false, loadingClear: false });
    addToStack(value, myStack);
    const arr = getArrFromStack(myStack);
    setStackState(arr);
    setValue("");
    await timeout(SHORT_DELAY_IN_MS);
    changeColor(arr, myStack.getSize() - 1, ElementStates.Default);
    setIsLoading(initialState);
  }

  async function visualiseDeleting () {
    setIsLoading({loadingAdd: false, loadingDel: true, loadingClear: false});
    await deleteElement(myStack, setStackState);
    setIsLoading(initialState);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.controls}>
          <Input isLimitText maxLength={4} value={value} onChange={onChange} />
          <Button
            text="Добавить"
            isLoader={isLoading.loadingAdd}
            disabled={!value || isLoading.loadingDel || isLoading.loadingClear}
            onClick={() => visualiseAdding(value)}
          />
          <Button
            text="Удалить"
            isLoader={isLoading.loadingDel}
            disabled={
              !stackState.length || isLoading.loadingAdd || isLoading.loadingClear
            }
            onClick={visualiseDeleting}
          />
        </div>
        <Button
          text="Очистить"
          isLoader={isLoading.loadingClear}
          disabled={
            !stackState.length || isLoading.loadingAdd || isLoading.loadingDel
          }
          onClick={() => clearStack(myStack, setStackState)}
        />
      </div>
      <ul className={styles.stackList}>
        {stackState &&
          stackState.map((item, index) => (
            <Circle
              letter={item.item}
              key={index}
              index={index}
              head={index === myStack.getSize() - 1 ? "top" : undefined}
              state={item.state}
            />
          ))}
      </ul>
    </SolutionLayout>
  );
};
