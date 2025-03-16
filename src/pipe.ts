import { Composed, Func } from "./types";

const tuple = <T extends [Func, ...Func[]]>(v:T) => v

export function pipe<T extends Func[]>(functionList: T): Composed<T> {
  function recursiveCall({args, index}:{args: any, index: number}) {
    const functionToRun = functionList[index];
    const result = functionToRun(...args);
    if (functionList.length === index) {
      return result;
    }
    recursiveCall({args: result, index: index + 1})
  }

  return recursiveCall({args: null, index: 0})
}

function prePipe<T extends Func[]>(functionList: T) {
  if(!functionList[0]) return;

  const it = tuple(functionList);
  return pipe(tuple(functionList));
}

const funcs = [
  (arg: number) => 1,
  (arg: number) => false
];

const thing = prePipe(funcs);

const it = thing(1)