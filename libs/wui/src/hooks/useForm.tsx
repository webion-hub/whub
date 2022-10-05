import { useContext } from "react"
import { FormGroupContext } from "../components/form/FormGroup"

export const useForm = () => {
  return useContext(FormGroupContext).form
}
