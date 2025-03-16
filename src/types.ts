export type Func = (...args: any) => any;

type BetterReturn<T> = T extends (...args: any) => infer R ? R extends [...any] ? R : [R] : never;
type ParamsMatchReturn<S extends Func, T extends Func> = 
     BetterReturn<S> extends Parameters<T> 
        ? true
        : never;

type ComposedFunction<First extends Func, Last extends Func> = (...args: Parameters<First>) => ReturnType<Last>;

export type Composed<T extends readonly Func[], SavedFirst extends Func | undefined = undefined> = T extends [infer First extends Func, ...infer U, infer Last extends Func] 
    ? U extends [infer Second extends Func, ...infer Tail]
        ? ParamsMatchReturn<First, Second> extends never 
            ? never 
            : Tail extends [Func, ...any]
                ? SavedFirst extends undefined 
                    ? Composed<[Second, ...Tail, Last], First> // if there's more than three left recurse but drop the first and save it
                    : Composed<[Second, ...Tail, Last], SavedFirst> // have already saved the first so just pass it through
                : ParamsMatchReturn<Second, Last> extends never // if there's only three left, the first two have been checked, just check the last two
                    ? never : SavedFirst extends Func ? ComposedFunction<SavedFirst, Last>  : ComposedFunction<First, Last> 
        : ParamsMatchReturn<First, Last> extends never // there's only two functions in the array initially
            ? never 
            : ComposedFunction<First, Last> 
    : never;

type Test = Composed<[() => string, (a: string) => string, (a: string) => string, (a: string) => boolean, (a: boolean) => boolean]>;
