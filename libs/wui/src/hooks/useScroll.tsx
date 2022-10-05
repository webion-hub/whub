import React, { useEffect } from "react";
import { debounceTime, fromEvent } from "rxjs";

export const useScroll = (position: number) => {
  const [isArrived, setIsArrived] = React.useState<boolean>(false);

  useEffect(() => {
    const updateScrollForListener = (status: number) => {
      setIsArrived(status >= position);
    };

    const sub$ = fromEvent(window, 'scroll')
      .pipe(debounceTime(1))
      .subscribe(() => updateScrollForListener(window.scrollY))

    return () => sub$.unsubscribe()
  }, [position]);


  return {
    isArrived,
  };
};
