import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./Queue";
import { timeout } from "../../utils/utils";
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

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<ActiveElement>(initialState);
  const [queueState, setQueueState] = useState<CircleElement[]>([]);
  const [isQueue, setIsQueue] = useState<boolean>(false);

  const queue = useMemo(() => new Queue<string>(7), []);
  const length = queue.getQueue().length;

  function getInitualCircles() {
    const circleItem = {
      item: "",
      state: ElementStates.Default,
    };
    return Array(length).fill(circleItem);
  }

  useEffect(() => {
    const arr = getInitualCircles();
    setQueueState(arr);
  }, []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  async function addValue(value: string) {
    setIsLoading({ loadingAdd: true, loadingClear: false, loadingDel: false });
    setIsQueue(true);
    queue.enqueue(value);
    const tail = queue.getIndexTail();
    queueState[tail] = {
      item: value,
      state: ElementStates.Changing,
    };
    setValue("");
    setQueueState(queueState);
    await timeout(SHORT_DELAY_IN_MS);
    queueState[tail] = {
      item: value,
      state: ElementStates.Default,
    };
    setQueueState(queueState);
    setIsLoading(initialState);
  }

  async function deleteValue() {
    setIsLoading({ loadingAdd: false, loadingClear: false, loadingDel: true });
    const head = queue.getIndexHead();
    queueState[head] = {
      item: "",
      state: ElementStates.Changing,
    };

    setQueueState(queueState);
    await timeout(SHORT_DELAY_IN_MS);
    queueState[head] = {
      item: "",
      state: ElementStates.Default,
    };
    queue.dequeue();
    if (queue.isEmpty()) {
      setIsQueue(false);
      queue.clear();
      setIsLoading(initialState);
    }
    setQueueState(queueState);
    setIsLoading(initialState);
  }

  function clearQueue() {
    setIsLoading({ loadingAdd: false, loadingClear: true, loadingDel: false });
    setIsQueue(false);
    queue.clear();
    setValue("");
    setQueueState(getInitualCircles());
    setIsLoading(initialState);
  }
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.controls}>
          <Input isLimitText maxLength={4} value={value} onChange={onChange} placeholder="Введите значение"/>
          <Button
            text="Добавить"
            isLoader={isLoading.loadingAdd}
            disabled={!value || isLoading.loadingDel || isLoading.loadingClear}
            onClick={() => addValue(value)}
          />
          <Button
            text="Удалить"
            isLoader={isLoading.loadingDel}
            disabled={!isQueue || isLoading.loadingAdd || isLoading.loadingClear}
            onClick={deleteValue}
          />
        </div>
        <Button
          text="Очистить"
          isLoader={isLoading.loadingClear}
          disabled={!isQueue || isLoading.loadingAdd === true || isLoading.loadingDel}
          onClick={clearQueue}
        />
      </div>
      <ul className={styles.stackList}>
        {queueState &&
          queueState.map((item, index) => (
            <Circle
              letter={item.item}
              key={index}
              index={index}
              head={isQueue && index === queue.getIndexHead() ? "head" : undefined}
              tail={isQueue && index === queue.getIndexTail() ? "tail" : undefined}
              state={item.state}
            />
          ))}
      </ul>
    </SolutionLayout>
  );
};
