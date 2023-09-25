import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./Queue";
import { changeColor, timeout } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { CircleElement } from "../../types/common-types";
import { addValue, deleteValue, getInitualCircles } from "./utils";

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

  useEffect(() => {
    const arr = getInitualCircles(length);
    setQueueState(arr);
  }, []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  async function visualiseAddingValue(value: string) {
    setIsLoading({ loadingAdd: true, loadingClear: false, loadingDel: false });
    setIsQueue(true);
    addValue(queue, queueState, value, ElementStates.Changing);
    setValue("");
    setQueueState(queueState);
    await timeout(SHORT_DELAY_IN_MS);
    changeColor(queueState, queue.getIndexTail(), ElementStates.Default);
    setQueueState(queueState);
    setIsLoading(initialState);
  }

  async function visualiseDeleting() {
    setIsLoading({ loadingAdd: false, loadingClear: false, loadingDel: true });
    await deleteValue(queue, queueState, setQueueState);
    if (queue.isEmpty()) {
      clearQueue();
    }
    setQueueState(queueState);
    setIsLoading(initialState);
  }

  function clearQueue() {
    setIsLoading({ loadingAdd: false, loadingClear: true, loadingDel: false });
    setIsQueue(false);
    queue.clear();
    setValue("");
    setQueueState(() => getInitualCircles(length));
    setIsLoading(initialState);
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.controls}>
          <Input
            isLimitText
            maxLength={4}
            value={value}
            onChange={onChange}
            placeholder="Введите значение"
          />
          <Button
            text="Добавить"
            isLoader={isLoading.loadingAdd}
            disabled={!value || isLoading.loadingDel || isLoading.loadingClear}
            onClick={() => visualiseAddingValue(value)}
          />
          <Button
            text="Удалить"
            isLoader={isLoading.loadingDel}
            disabled={!isQueue || isLoading.loadingAdd || isLoading.loadingClear}
            onClick={visualiseDeleting}
          />
        </div>
        <Button
          text="Очистить"
          isLoader={isLoading.loadingClear}
          disabled={!isQueue || isLoading.loadingAdd || isLoading.loadingDel}
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
              head={isQueue && index === queue.getIndexHead() ? "head" : ""}
              tail={isQueue && index === queue.getIndexTail() ? "tail" : ""}
              state={item.state}
            />
          ))}
      </ul>
    </SolutionLayout>
  );
};
