import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { reverseStr } from "./utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";


type ReverseElement= {
  item: string,
  state: ElementStates
}

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isReverseArr, setReverseArr] = useState<ReverseElement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

const swap = (arr: any, start: number, end: number) => {
  [arr[start], arr[end]] = [arr[end], arr[start]];
}

  const visualise = (str: string) => {
    setIsLoading(true);
    const arr = str.split("").map((item) => ({item, state: ElementStates.Default }));
    console.log(arr);
    setReverseArr(arr);
    setValue("");
    let start = 0;
    let end = arr.length -1;
    

    // setTimeout(() => {
    //  arr[start].state = ElementStates.Changing;
    //   setReverseArr(arr);
    // }, 3000);
    
    //swap(isReverseArr, start, end);

    
   
}



const onClick = () => {
  visualise(value);
}

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
 setValue(e.target.value);
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
          isReverseArr.map((item, index) => <Circle letter={item.item} key={index} extraClass={styles.circle} />)}
      </div>
    </SolutionLayout>
  );
};
