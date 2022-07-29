import React, { useEffect, useRef } from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";

export interface CardsGroupProps {
  readonly children: ChildrenProp
}

export function CardsGroup(props: CardsGroupProps) {
  const refs = useRef<HTMLElement[]>([])

  const children = React.Children.map(
    props.children,
    (child) => React.cloneElement(child, { ref: (el: any) => refs.current.push(el) })
  );

  useEffect(() => {
    const heights = refs.current
      .map(el => el.querySelector('.WuiBaseCard-title')?.clientHeight ?? -1)

    const maxHeight = `${Math.max(...heights)}px`

    refs.current = refs.current
      .map(el => {
        el.querySelector('.WuiBaseCard-title')?.setAttribute('height', maxHeight)
        return el
      })
  }, [refs]) 
  
  if(refs.current.length === 0)
    return <>{children}</>

  return <>{refs.current.map(el => el)}</>
}