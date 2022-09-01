import { Autocomplete, AutocompleteRenderInputParams, List, Paper } from "@mui/material"
import _ from "lodash"
import { HTMLAttributes, ReactNode, SyntheticEvent, useState } from "react"
import { MaybeShow } from "../conditional_components/MaybeShow"

export interface ItemSelect<T> {
  readonly options: T[],
  readonly maxHeight?: number | string,
  readonly value?: T[],
  readonly loading?: boolean,
  readonly onChange?: (option : T[]) => void,
  readonly isAlreadyIn: (option: T, items: T[]) => boolean,
  readonly onOpen?: (event: SyntheticEvent<Element, Event>) => void,
  readonly groupBy: (option: T) => string,
  readonly getOptionLabel: (option: T) => string,
  readonly renderOption: (props: HTMLAttributes<HTMLLIElement>, option: T, alreadyIn: boolean, onAdd: (option: T) => void) => ReactNode,
  readonly renderInput: (param: AutocompleteRenderInputParams) => ReactNode,
  readonly children: (option: T, i: number, onRemove: (option: T) => void, isLast: boolean ) => ReactNode,
}

export function ItemSelect<T>(props: ItemSelect<T>) {
  const [items, setItems] = useState<T[]>(props.value ?? [])

  const onAdd = (option: T | null) => {
    if(!option || isAlreadyIn(option))
      return

    items.push(option)
    setItems([...items])
    props.onChange?.([...items])
  }

  const onRemove = (option: T) => {
    const newItems = items.filter(i => !_.isEqual(i, option))
    setItems(newItems)
    props.onChange?.(newItems)
  }

  const isAlreadyIn = (option: T) => {
    return !!props.isAlreadyIn?.(option, items)
  }

  return (
    <>
      <Autocomplete
        loading={props.loading}
        options={props.options}
        onChange={(_, value) => onAdd(value)}
        onOpen={props.onOpen}
        groupBy={props.groupBy}
        getOptionLabel={props.getOptionLabel}
        renderInput={props.renderInput}
        renderOption={(p, o) => props.renderOption(p, o, isAlreadyIn(o), (o: T) => onAdd(o))}
      />
      <MaybeShow show={items.length !== 0}>
        <List
          component={Paper}
          sx={{
            maxHeight: props.maxHeight,
            overflow: 'auto'
          }}
        >
          {
            items.map((o, i) => props.children(
              o,
              i,
              onRemove,
              items.length - 1 === i
            ))
          }
        </List>
      </MaybeShow>
    </>
  )
}
