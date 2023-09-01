import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";


export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка" >
     <div className={styles.container}>
      <Input extraClass={styles.input} isLimitText maxLength={11}/>
      <Button extraClass={styles.button} text='Развернуть'/>
      </div>
    </SolutionLayout>
  );
};
