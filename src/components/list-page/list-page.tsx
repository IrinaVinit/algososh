import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./LinkedList";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { CircleElement } from "../../types/common-types";
import {
  addElementByIndex,
  addElementToHead,
  addElementToTail,
  getCircle,
  removeElementByIndex,
  removeElementFromHead,
  removeElementFromTail,
} from "./utils";

type ActiveElement = {
  isLoading: boolean;
  loadingAddHead: boolean;
  loadingAddTail: boolean;
  loadingRemoveHead: boolean;
  loadingRemoveTail: boolean;
  loadingAddIndex: boolean;
  loadingRemoveIndex: boolean;
};

const initialState = {
  isLoading: false,
  loadingAddHead: false,
  loadingAddTail: false,
  loadingRemoveHead: false,
  loadingRemoveTail: false,
  loadingAddIndex: false,
  loadingRemoveIndex: false,
};

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [isLoading, setIsLoading] = useState<ActiveElement>(initialState);
  const [listState, setListState] = useState<CircleElement[]>([]);

  const linkList = useMemo(() => new LinkedList<string>(), []);
  const initialArray = ["c", "o", "o", "l"];
  const newCircle = <Circle letter={value} state={ElementStates.Changing} isSmall />;

  const buttonDeleteDisaibled = !linkList.getSize() || isLoading.isLoading;
  const buttonByIndexDisaibled =
    !index || Number(index) < 0 || linkList.getSize() - 1 < Number(index);
  const buttonAddHeadTailDisaibled =
    !value || isLoading.isLoading || linkList.getSize() > 8;

  useEffect(() => {
    linkList.appendArray(initialArray);
    const initialList = initialArray.map((item, index) =>
      getCircle(linkList, item, index)
    );
    setListState(initialList);
  }, []);

  const onChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };
  const onChangeIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };

  async function visualiseAddingElementToHead() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: true,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    setValue("");
    setIndex("");
    await addElementToHead(linkList, value, 0, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseAddingElementToTail() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: true,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    setValue("");
    setIndex("");
    await addElementToTail(linkList, value, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseAddingElementByIndex(index: number) {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: true,
      loadingRemoveIndex: false,
    });
    setValue("");
    setIndex("");
    await addElementByIndex(linkList, value, index, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseRemovingElementFromHead() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: true,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    await removeElementFromHead(linkList, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseRemovingElementFromTail() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: true,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    await removeElementFromTail(linkList, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseRemovingElementByIndex(index: number) {
    if (index === 0) {
      visualiseRemovingElementFromHead();
      return;
    }
    if (index === listState.length - 1) {
      visualiseRemovingElementFromTail();
      return;
    }

    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: true,
    });
    setIndex("");
    await removeElementByIndex(index, linkList, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.controlsList}>
          <Input
            isLimitText
            maxLength={4}
            value={value}
            onChange={onChangeValue}
            placeholder="Введите значение"
          />
          <Button
            text="Добавить в head"
            isLoader={isLoading.loadingAddHead}
            disabled={buttonAddHeadTailDisaibled}
            onClick={visualiseAddingElementToHead}
          />
          <Button
            text="Добавить в tail"
            isLoader={isLoading.loadingAddTail}
            disabled={buttonAddHeadTailDisaibled}
            onClick={visualiseAddingElementToTail}
          />
          <Button
            text="Удалить из head"
            isLoader={isLoading.loadingRemoveHead}
            disabled={buttonDeleteDisaibled}
            onClick={visualiseRemovingElementFromHead}
          />
          <Button
            text="Удалить из tail"
            isLoader={isLoading.loadingRemoveTail}
            disabled={buttonDeleteDisaibled}
            onClick={visualiseRemovingElementFromTail}
          />
          <Input
            type="number"
            min={0}
            max={listState.length}
            value={index}
            onChange={onChangeIndex}
            placeholder="Введите индекс"
          />
          <Button
            extraClass={styles.addIndex}
            isLoader={isLoading.loadingAddIndex}
            text="Добавить по индексу"
            disabled={buttonByIndexDisaibled}
            onClick={() => visualiseAddingElementByIndex(Number(index))}
          />
          <Button
            extraClass={styles.removeIndex}
            text="Удалить по индексу"
            isLoader={isLoading.loadingRemoveIndex}
            disabled={buttonByIndexDisaibled}
            onClick={() => visualiseRemovingElementByIndex(Number(index))}
          />
        </div>
        <ul className={styles.lineList}>
          {listState &&
            listState.map((item, index) => (
              <li className={styles.circle} key={index}>
                <Circle
                  letter={item.item}
                  index={index}
                  head={item.head}
                  tail={item.tail}
                  state={item.state}
                />
                {index < listState.length - 1 && <ArrowIcon />}
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
