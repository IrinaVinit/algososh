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


export type CircleElement = {
  item: string;
  state: ElementStates;
};

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
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<ActiveElement>(initialState);
  const [stackState, setStackState] = useState<CircleElement[]>([]);

  const stack = useMemo(() => new Stack<CircleElement>(), []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };



  async function addElement (value: string) {
    setIsLoading({loadingAdd: true, loadingDel: false, loadingClear: false})
    const circleItem = {
      item: value,
      state: ElementStates.Changing,
    };
    stack.push(circleItem);
    const arr = stack.getContainer();
    setStackState(arr);
    setValue('');
    await timeout(SHORT_DELAY_IN_MS);
    changeColor(arr,stack.getSize() -1, ElementStates.Default);
    setIsLoading(initialState);
  };

  async function deleteElement () {
    setIsLoading({loadingAdd: false, loadingDel: true, loadingClear: false});
    const arr = stack.getContainer();
    changeColor(arr, stack.getSize() -1, ElementStates.Changing);
    await timeout(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackState(arr);
    setIsLoading(initialState);
  }

  function clearStack () {
    stack.clear();
    setStackState([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.controls}>
          <Input isLimitText maxLength={4} value={value} onChange={onChange} />
          <Button text="Добавить" isLoader={isLoading.loadingAdd} disabled={!value || isLoading.loadingDel || isLoading.loadingClear} onClick={() => addElement(value)} />
          <Button text="Удалить" isLoader={isLoading.loadingDel} disabled={!stackState.length || isLoading.loadingAdd || isLoading.loadingClear} onClick={deleteElement}/>
        </div>
        <Button text="Очистить"  isLoader={isLoading.loadingClear} disabled={!stackState.length || isLoading.loadingAdd===true || isLoading.loadingDel} onClick={clearStack}/>
      </div>
      <ul className={styles.stackList}>
        {stackState &&
          stackState.map((item, index) => (
            <Circle
              letter={item.item}
              key={index}
              index={index}
              head={index === stack.getSize()-1 ? 'top' : undefined}
              state={item.state}
            />
          ))}
      </ul>
    </SolutionLayout>
  );
};
