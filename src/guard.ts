import { Func } from "./types";

export function isTuplisable<T extends Func[]>(args: T): args is [Func, ...Func[]]  {
 return args.length !== 0;
}