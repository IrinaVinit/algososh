import { maxLength, maxValue, minLength, minValue } from "../constants/constants";

export function timeout (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

export function getRandomCount(min: number, max:number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArr(min: number, max:number): number[] {
    let array = [];
    let count = getRandomCount(min, max)

    for(let i=0; i<count; i++) {
        let arrItem = getRandomCount(minValue, maxValue)
        array.push(arrItem);

    }
    return array;
}

