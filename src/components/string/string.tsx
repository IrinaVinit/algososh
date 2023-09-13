import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

type ReverseElement= {
  item: string,
  state: ElementStates
}

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isReverseArr, setReverseArr] = useState<ReverseElement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = () => {
    visualise(value);
  }
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
   setValue(e.target.value);
  }
  

const swap = (arr: any, start: number, end: number) => {
  [arr[start], arr[end]] = [arr[end], arr[start]];
}

function timeout (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getArray (str: string) {
return str.split("").map((item) => ({item, state: ElementStates.Default }));
}

function changeColor (arr: ReverseElement[], start: number, end: number, state: ElementStates) {
 if(arr) {
  arr[start].state = state;
  arr[end].state = state;
  
 }
 return arr;
}

async function changeElements (arr:ReverseElement[], start: number, end: number) {
  while (start <= end) {
    await timeout(DELAY_IN_MS);
     changeColor(arr, start, end, ElementStates.Changing);
     setReverseArr([...arr]);
     await timeout(DELAY_IN_MS);
     swap(arr, start, end);
     changeColor(arr, start, end, ElementStates.Modified);
     setReverseArr([...arr]);
     start ++;
     end --;
}
}

async function visualise (str: string) {
    setIsLoading(true);
    const arr = getArray(str);
    let start = 0;
    let end = arr.length -1;
    setReverseArr(arr);
    setValue("");
    await changeElements(arr, start, end);
    setIsLoading(false);
}

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          extraClass={styles.input}
          isLimitText
          maxLength={11}
          value={value}
          onChange={onChange}
        />
        <Button 
        type="button"
        onClick={onClick}
        extraClass={styles.button} 
        text="Развернуть" 
        isLoader={isLoading}
        disabled={!value}
        // isLoader={value.length != 0 && isLoading === false ? false : true } 
        />
      </div>
      <div className={styles.circle_container}>
        {isReverseArr &&
          isReverseArr.map((item, index) => <Circle letter={item.item} key={index} extraClass={styles.circle} state={item.state}/>)}
      </div>
    </SolutionLayout>
  );
};
