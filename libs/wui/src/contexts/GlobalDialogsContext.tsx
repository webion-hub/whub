import { createContext, ReactNode, useContext, useState } from "react"
import { DialogBase } from "../abstractions/dialogs/DialogBase"

interface IGlobalDialogsContext {
  readonly openDialog: (dialogKey: string) => void,
  readonly closeDialog: (dialogKey: string) => void,
}

export const GlobalDialogsContext = createContext<IGlobalDialogsContext>({
  openDialog: () => { return },
  closeDialog: () => { return },
})

interface DialogWithKey {
  readonly component: <T extends DialogBase>(props: T) => JSX.Element,
  readonly key: string
}

interface GlobalDialogsContext {
  readonly dialogs: DialogWithKey[],
  readonly children: ReactNode
}

export const GlobalDialogs = (props: GlobalDialogsContext) => {
  const [dialogKeys, setDialogKeys] = useState<string[]>([])

  const open = (key: string) => {
    dialogKeys.push(key)

    setDialogKeys([...dialogKeys])
  }

  const close = (key: string) => {
    const newKeys = dialogKeys
      .filter(dk => dk !== key)

    setDialogKeys([...newKeys])
  }

  const isOpen = (key: string) => {
    return !!dialogKeys.find(dk => dk === key)
  }

  return (
    <GlobalDialogsContext.Provider
      value={{
        openDialog: open,
        closeDialog: close
      }}
    >
      {props.children}
      {
        props.dialogs
          .map((d, i) => {
            return (
              <d.component
                key={i}
                open={isOpen(d.key)}
                onClose={() => close(d.key)}
              />
            )
          })
      }
    </GlobalDialogsContext.Provider>
  )
}

export const useGlobalDialogs = () => useContext(GlobalDialogsContext)
