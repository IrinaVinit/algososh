// import React from "react";
// import { ReverseElement } from "./string";
// import { ElementStates } from "../../types/element-states";
// import { DELAY_IN_MS } from "../../constants/delays";



export const swap = (arr: any, start: number, end: number) => {
  [arr[start], arr[end]] = [arr[end], arr[start]];
}

// export function timeout (ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

// export function getArray (str: string) {
// return str.split("").map((item) => ({item, state: ElementStates.Default }));
// }

// export function changeColor (arr: ReverseElement[], start: number, end: number, state: ElementStates) {
//  if(arr) {
//   arr[start].state = state;
//   arr[end].state = state;
  
//  }
//  return arr;
// }

// export async function changeElements (arr: ReverseElement[], start: number, end: number, cb: React.Dispatch<React.SetStateAction<ReverseElement[]>>) {
//   while (start <= end) {
//     await timeout(DELAY_IN_MS);
//      changeColor(arr, start, end, ElementStates.Changing);
//      cb([...arr]);
//      await timeout(DELAY_IN_MS);
//      swap(arr, start, end);
//      changeColor(arr, start, end, ElementStates.Modified);
//      cb([...arr]);
//      start ++;
//      end --;
// }
// }

// export async function visualise (loadingCb: React.Dispatch<React.SetStateAction<boolean>>, str: string,  arrStateCb: React.Dispatch<React.SetStateAction<ReverseElement[]>>, valueCb: React.Dispatch<React.SetStateAction<string>>, changeElementsFn: Function) {
//     loadingCb(true);
//     const arr = getArray(str);
//     let start = 0;
//     let end = arr.length -1;
//     arrStateCb(arr);
//     valueCb("");
//     await changeElementsFn(arr, start, end);
//     loadingCb(false);
// }
    
