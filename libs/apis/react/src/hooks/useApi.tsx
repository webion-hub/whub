import { ContactUsApi } from "@whub/apis-contactus"
import { SimpleAuthApi } from "@whub/simple-auth"
import { WShopApi } from "@whub/wshop-api"
import { useContext } from "react"
import { ApiContext } from "../contexts/ApiContext"

export const useApi = () => {
  return useContext(ApiContext)
}

export const useContactUsApi = () =>
  useApi().contactUs ?? {} as ContactUsApi

export const useShopApi = () =>
  useApi().shop ?? {} as WShopApi

export const useAuthApi = () =>
  useApi().auth ?? {} as SimpleAuthApi
