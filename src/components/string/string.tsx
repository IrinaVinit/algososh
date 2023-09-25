import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { visualise } from "./utils";

type ActiveElement = {
  loading: boolean;
  disabled: boolean;
};

export type ReverseElement = {
  item: string;
  state: ElementStates;
};

const initialStateActiveElement = {
  loading: false,
  disabled: false,
};

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isReverseArr, setReverseArr] = useState<ReverseElement[]>([]);
  const [isLoading, setIsLoading] = useState<ActiveElement>(initialStateActiveElement);

  const onClick = () => {
    visualiseAlg(value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  async function visualiseAlg(str: string) {
    setIsLoading({ loading: true, disabled: true });
    await visualise(str, setReverseArr, setValue);
    setIsLoading(initialStateActiveElement);
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
          disabled={isLoading.disabled}
        />
        <Button
          type="button"
          onClick={onClick}
          extraClass={styles.button}
          text="Развернуть"
          isLoader={isLoading.loading}
          disabled={!value}
        />
      </div>
      <div className={styles.circle_container}>
        {isReverseArr &&
          isReverseArr.map((item, index) => (
            <Circle
              letter={item.item}
              key={index}
              extraClass={styles.circle}
              state={item.state}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
