import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { getRandomArr } from "../../utils/utils";
import { maxLength, minLength } from "../../constants/constants";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);

  function getNewArray() {
    const arr = getRandomArr(minLength, maxLength);
    setArray(arr);
  }

  return (
    <SolutionLayout title="Сортировка массива" >
      <div className={`${styles.grid} ${styles.container}`}>
        <div className={`${styles.flex} ${styles.radioInputs}`}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырек" />
        </div>
        <div className={`${styles.flex} ${styles.buttons}`}>
          <Button
            extraClass={styles.button}
            sorting={Direction.Ascending}
            text="По возрастанию"
          />
          <Button
            extraClass={styles.button}
            sorting={Direction.Descending}
            text="По убыванию"
          />
        </div>
        <div className={styles.newAr}>
          <Button text="Новый массив" extraClass={styles.button} onClick={getNewArray} type='button'/>
        </div>
      </div>
      
      <div className={styles.columns}>
      {array.map((item, index) => (
        <Column index={item} key={index} extraClass={styles.column}/>
      ))}
      </div>
    </SolutionLayout>
  );
};

// const partition = (arr: number[], start = 0, end = arr.length - 1): number => {
//   debugger;
//   const pivotValue = arr[end];
//   console.log(arr[end]);

//    let pivotIndex = start;
//    console.log(pivotIndex);
//    console.log(start);
//  for (let i = start; i < end; i++) {
//          if (arr[i] < pivotValue) {
//            swap(arr, i,  pivotIndex);
//             pivotIndex++;
//      }
//    }

//    swap(arr, pivotIndex, end);
//  console.log(arr);
//   return pivotIndex;
//  }

//  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
//    const temp = arr[firstIndex];
//    arr[firstIndex] = arr[secondIndex];
//    arr[secondIndex] = temp;
//  }

//  const array = [7, -2, 4, 1, 6, 5, 0, -4, 2];
//  console.log(partition(array, 0, array.length - 1));

// export const selectionSort = (arr: number[]) => {

//   debugger;
//   const { length } = arr;
//   for (let i = 0; i < length; i++) {
//     let maxInd = i;
//     for (let j=i+1; j < length; j++) {
//       if(arr[j]>arr[maxInd]) {
//         maxInd = j;

//       }

//     }
//     swap(arr, i, maxInd);

//   }
//   return arr;
// };

//0, maxind=0,
//1, 4>3, max = 1 (4)
//2, 7>4, MAX = 2(7)
//3, 2<7,
//4, 1<7
//5, 9>7, max=5(9)

//swap(ch 0q b 5q - 3 b 9)
// console.log(selectionSort([3,4,7,2,1,9,0]));
