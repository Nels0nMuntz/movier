import React from "react";
import { debounce } from "utils";


export const useDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  delay: number,
): ((args: A) => Promise<R>) => {
  const [ debounceFn, cancel ] = debounce(fn, delay);

  React.useEffect(() => () => cancel(), []);

  return debounceFn;
}