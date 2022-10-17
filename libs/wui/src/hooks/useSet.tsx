import { useState } from "react"

export const useSet = <T,>(initialValue?: T[]) => {
  const [set, setSet] = useState<Set<T>>(() => {
    const set = new Set<T>()
    initialValue?.map(v => set.add(v))
    return set
  })

  const add = (item: T) => {
    setSet(prev => new Set(prev).add(item))
  }

  const remove = (item: T) => {
    setSet(prev => {
      const next = new Set(prev);
      next.delete(item);

      return next;
    });
  }

  const has = (item: T) => {
    return set?.has(item)
  }

  const values = () => {
    return set?.values()
  }

  const clear = () => {
    setSet(() => new Set())
  }

  return {
    add,
    remove,
    has,
    values,
    clear,
    set
  }
}
