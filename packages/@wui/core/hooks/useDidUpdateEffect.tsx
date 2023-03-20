import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useDidUpdateEffect(effect: EffectCallback, deps?: DependencyList | undefined) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) { 
      return effect();
    }

    didMountRef.current = true;
  }, deps);
}