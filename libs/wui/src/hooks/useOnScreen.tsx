import React, { useEffect } from 'react';

interface Options {
  readonly oneTime?: boolean;
  readonly observeOptions?: IntersectionObserverInit;
}

export function useOnScreen(ref: React.RefObject<any>, options?: Options) {
  const [isIntersecting, setIntersecting] = React.useState(false);
  const isIntersectingRef = React.useRef(isIntersecting);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (options?.oneTime && isIntersectingRef.current)
         return;

      isIntersectingRef.current = entry.isIntersecting;
      setIntersecting(entry.isIntersecting);
    }, options?.observeOptions);

    observer.observe(ref.current);

    return () =>  observer.disconnect();
  }, [options, ref]);

  return isIntersecting;
}
