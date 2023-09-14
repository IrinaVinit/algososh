import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ActiveElement } from "../../types/common-types";

type ActiveElementFib = {
  loading: boolean;
  disaibledInput: boolean;
  disaibledButton: boolean;
}

const initialStateActiveElement = {
  loading: false,
  disaibled: false,
  disaibledInput: false,
  disaibledButton: false
}

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState<ActiveElementFib>(initialStateActiveElement);

  const onClick = () => {
    // visualise(value);
  }
  

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(Number(e.target.value) > 19 || Number(e.target.value) < 0) {
      setIsLoading({loading: false, disaibledInput: false, disaibledButton: true})
    } else  {
      setIsLoading(initialStateActiveElement);
      setValue(e.target.value);
    }
   
   }



  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          extraClass={styles.input}
          type='number'
          min={1}
          max={19}
          value={value}
          isLimitText
          onChange={onChange}  
          disabled={isLoading.disaibledInput}
        />
        <Button 
        type="button"
        onClick={onClick}
        extraClass={styles.button} 
        text="Рассчитать" 
        disabled={isLoading.disaibledButton}
        // isLoader={isLoading.loading}
        // disabled={!value}
        />
      </div>
    </SolutionLayout>
  );
};
