import { Composed } from "./types";


export function pipe<T extends (...args: infer Params) => any extends Composed<Params>>(functionList: T) {
  const functionToRun = functionList[0];
  if (functionToRun) {
    const result = functionToRun();
  }

  function recursiveCall({args, func, nextFunc}:{args: any, func: Function, nextFunc?: Function }) {
    const result = func(...args);
    if (nextFunc) {
      recursiveCall()
    }
  }


}

