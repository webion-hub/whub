import { ContactUsApi } from '@whub/apis-contactus'
import { createContext, useContext } from "react"
import { ApiContext, ApiContextProps } from '../abstractions/ApiContextProps'

export type IContactUsContext = ApiContext<ContactUsApi, unknown>
export type IContactUsContextProps = ApiContextProps<ContactUsApi, unknown>

export const ContactUsContext = createContext<IContactUsContext>({
  api: {} as ContactUsApi,
})

export const ContactUsWrapper = (props: IContactUsContextProps) => {
  const { children, ...other } = props

  return (
    <ContactUsContext.Provider
      value={other}
    >
      {children}
    </ContactUsContext.Provider>
  )
}

export const useContactUs = () => useContext(ContactUsContext)
