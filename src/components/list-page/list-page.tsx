import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./LinkedList";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { timeout } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export type CircleElement = {
  item: string;
  head?: string | React.ReactElement | null;
  tail?: string | React.ReactElement | null;
  state: ElementStates;
};
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
 
  const buttonDeleteDisaibled = !linkList.getSize() || isLoading.isLoading;
  const buttonByIndexDisaibled =
    !index || Number(index) < 0 || linkList.getSize()-1 < Number(index);
  const buttonAddHeadTailDisaibled =
    !value || isLoading.isLoading || linkList.getSize() > 8;


  function getCircle(value: string, index: number, head?: React.ReactElement<CircleElement>, tail?: React.ReactElement<CircleElement>) {
   
    const tailText = index === linkList.getSize() - 1 ? "tail" : "";
    const headText = index === 0 ? "head" : "";

    const circleItem = {
      item: value,
      index: index,
      head: head ?? headText,
      tail: tail ?? tailText,
      state: ElementStates.Default,
    };
    return circleItem;
  }

  useEffect(() => {
    linkList.appendArray(initialArray);
    const initialList = initialArray.map((item, index) => getCircle(item, index));
    setListState(initialList);
  }, []);

  const onChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };
  const onChangeIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };

  async function addElementToHead(value: string) {
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
    linkList.appendToIndex(value, 0);

    const newCircle = <Circle letter={value} state={ElementStates.Changing} isSmall />;
    if(!listState.length) {
      listState.unshift({
        item: value,
        head: "head",
        tail: 'tail',
        state: ElementStates.Modified,
      });
      setListState([...listState]);
      await timeout(DELAY_IN_MS);
      listState[0].state = ElementStates.Default;
      setListState([...listState]);
      setIsLoading(initialState);
    } else {
      listState[0].head = newCircle;
      setListState(listState);
  
      await timeout(DELAY_IN_MS);
      const headItem = linkList.getHead();
      listState.unshift({
        item: headItem!.value,
        head: "head",
        state: ElementStates.Modified,
      });
      listState[1].head = "";
      setListState([...listState]);
      await timeout(DELAY_IN_MS);
      listState[0].state = ElementStates.Default;
      setListState([...listState]);
      setIsLoading(initialState);
    }
  }

  async function addElementToTail(value: string) {
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

    if(!listState.length) {
      listState.unshift({
        item: value,
        head: "head",
        tail: 'tail',
        state: ElementStates.Modified,
      });
      setListState([...listState]);
      await timeout(DELAY_IN_MS);
      listState[0].state = ElementStates.Default;
      setListState([...listState]);
      setIsLoading(initialState);
    } else {


    const length = linkList.getSize() - 1;
    linkList.appendToIndex(value, length);
    const newCircle = <Circle letter={value} state={ElementStates.Changing} isSmall />;

    listState[length].head = newCircle;
    setListState([...listState]);

    await timeout(DELAY_IN_MS);
   
    listState.push({ item: value, head: "", tail: 'tail', state: ElementStates.Modified });
    listState[length].head = "";
    listState[length].tail = "";
    setListState([...listState]);
    await timeout(DELAY_IN_MS);
    listState[length + 1].state = ElementStates.Default;
    setListState([...listState]);
    setIsLoading(initialState);
  }
  }
  async function addElementByIndex(value: string, index: number) {
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
    linkList.appendToIndex(value, index);
    const newCircle = <Circle letter={value} state={ElementStates.Changing} isSmall />;

    for (let i = 0; i <= index; i++) {
      if (i === 1) {
        listState[i - 1].head = "head";
      }

      if (i > 1) {
        listState[i - 1].head = "";
      }

      listState[i] = {
        ...listState[i],
        state: ElementStates.Changing,
        tail: '',
        head: newCircle,
      };

      if (i === index) {
        listState[i].state = ElementStates.Default
      }
      
      setListState([...listState]);
      await timeout(DELAY_IN_MS);
    }
    await timeout(DELAY_IN_MS);
    listState.map((item) => (
      item.state = ElementStates.Default)
      );
    listState.splice(index, 0, { item: value, head: "", state: ElementStates.Modified });
    listState[index + 1].head = "";
    setListState([...listState]);
    await timeout(DELAY_IN_MS);
    listState[index].state = ElementStates.Default;
    setListState([...listState]);
    setIsLoading(initialState);
  }

  async function removeElementFromHead() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: true,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    linkList.deleteHead();
    listState[0].state =  ElementStates.Changing;
    setListState([...listState]);
    await timeout(DELAY_IN_MS);
    const newCircle = <Circle letter={listState[0].item} state={ElementStates.Changing} isSmall />;

    listState[0] = {
      item: '',
      head: 'head',
      tail: newCircle,
      state: ElementStates.Changing
    };
    
    setListState([...listState]);
    await timeout(DELAY_IN_MS);
    listState.shift();
    if(listState.length) {
      listState[0].head = 'head' } 

    setListState([...listState]);
   
    setIsLoading(initialState);
  }


  async function removeElementFromTail() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: true,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
   
    const length = linkList.getSize() - 1;
    listState[length].state =  ElementStates.Changing;
    setListState([...listState]);
    await timeout(DELAY_IN_MS);
    const newCircle = <Circle letter={listState[length].item} state={ElementStates.Changing} isSmall />;

    
    listState[length] = {
      item: '',
      tail: newCircle,
      state: ElementStates.Changing
    };
    setListState([...listState]);
    await timeout(DELAY_IN_MS);
    linkList.deleteTail();
    listState.pop();
    if(listState.length) {
      listState[length-1].tail = 'tail' } 

    setListState([...listState]);
    setIsLoading(initialState);
  }

  async function removeElementByIndex(index: number) {
    
    if(index===0) {
      removeElementFromHead();
      return
    }
    if(index === listState.length-1) {
      removeElementFromTail();
      return
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
   
    const newCircle = <Circle letter={listState[index].item} state={ElementStates.Changing} isSmall />;

    for (let i = 0; i <= index; i++) {
      listState[i].state = ElementStates.Changing 
      setListState([...listState]);
      await timeout(DELAY_IN_MS);
    }

    listState[index] = {
      item: '',
      tail: newCircle,
      state: ElementStates.Changing
    };
    setListState([...listState]);
    await timeout(DELAY_IN_MS);
    
    listState.splice(index, 1);
    linkList.deleteByIndex(index);

    setListState([...listState]);
    await timeout(DELAY_IN_MS);

    listState.map((item) => (
      item.state = ElementStates.Default)
      );

    setListState([...listState]);
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
            onClick={() => addElementToHead(value)}
          />
          <Button
            text="Добавить в tail"
            isLoader={isLoading.loadingAddTail}
            disabled={buttonAddHeadTailDisaibled}
            onClick={() => addElementToTail(value)}
          />
          <Button
            text="Удалить из head"
            isLoader={isLoading.loadingRemoveHead}
            disabled={buttonDeleteDisaibled}
            onClick={removeElementFromHead}
          />
          <Button
            text="Удалить из tail"
            isLoader={isLoading.loadingRemoveTail}
            disabled={buttonDeleteDisaibled}
            onClick={removeElementFromTail}
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
            onClick={() => addElementByIndex(value, Number(index))}
          />
          <Button
            extraClass={styles.removeIndex}
            text="Удалить по индексу"
            isLoader={isLoading.loadingRemoveIndex}
            disabled={buttonByIndexDisaibled}
            onClick={()=>removeElementByIndex(Number(index))}
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
