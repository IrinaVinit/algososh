import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { timeout } from "../../utils/utils";

function fibIterative(n: number): number[] {
    let arr: number[] = [1, 1];
    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  }

export async function visualise(n: number, setState: React.Dispatch<any>) {
   
    const arr = fibIterative(n);
    let res: string[] = [];
    for (let i = 0; i <= arr.length - 1; i++) {
      await timeout(SHORT_DELAY_IN_MS);
      res.push(arr[i].toString());
      setState([...res]);
    }
  }