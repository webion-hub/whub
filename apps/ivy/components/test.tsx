"use client"

import Dropdown from '@wui/components/Dropdown'

export default function Test() {
  return (
    <Dropdown
      elements={[1,2,3]}
      getOptionLabel={l => l.toString()}
      getValue={l => l.toString()}
    />
  )
}