import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { visualise } from "./utils";

type ActiveElementFib = {
  loading: boolean;
  disabledInput: boolean;
  disabledButton: boolean;
};

const initialStateActiveElement = {
  loading: false,
  disabledInput: false,
  disabledButton: false,
};


export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState<ActiveElementFib>(initialStateActiveElement);
  const [arrFib, setArrFib] = useState<string[]>([]);

  const onClick = () => {
    visualiseAlg();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 19 || Number(e.target.value) < 0) {
      setIsLoading({ loading: false, disabledInput: false, disabledButton: true });
    } else {
      setIsLoading(initialStateActiveElement);
      setValue(e.target.value);
    }
  };

  async function visualiseAlg() {
    setIsLoading({ loading: true, disabledButton: true, disabledInput: true });
    setValue('');
    await visualise(Number(value), setArrFib);
    setIsLoading(initialStateActiveElement);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          extraClass={styles.input}
          type="number"
          min={1}
          max={19}
          value={value}
          isLimitText
          onChange={onChange}
          disabled={isLoading.disabledInput}
        />
        <Button
          type="button"
          onClick={onClick}
          extraClass={styles.button}
          text="Рассчитать"
          disabled={!value || isLoading.disabledButton}
          isLoader={isLoading.loading}
        />
      </div>
      <div className={styles.circles}>
        {arrFib &&
          arrFib.map((item, index) => (
            <Circle letter={item} key={index} extraClass={styles.circle} index={index} />
          ))}
      </div>
    </SolutionLayout>
  );
};
