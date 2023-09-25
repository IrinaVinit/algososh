import { ElementStates } from "../../types/element-states";
import { changeElements } from "../../utils/utils";
import { ReverseElement } from "./string";

function getArray(str: string) {
  return str.split("").map((item) => ({ item, state: ElementStates.Default }));
}

export async function visualise(
  str: string,
  arrStateCb: React.Dispatch<React.SetStateAction<ReverseElement[]>>,
  valueCb: React.Dispatch<React.SetStateAction<string>>
) {
  const arr = getArray(str);
  let start = 0;
  let end = arr.length - 1;
  arrStateCb([...arr]);
  valueCb("");
  await changeElements(arr, start, end, arrStateCb);
  arrStateCb([...arr]);
}

