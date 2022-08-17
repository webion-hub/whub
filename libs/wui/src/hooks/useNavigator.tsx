import React from "react"
import { useNavigate } from "react-router-dom"

export const useNavigator = () => {
  const nav = useNavigate()

  const navigate = (url: string) => (e: React.MouseEvent<any, any>) => {
    e.preventDefault()
    nav(url)
  }

  return navigate
}
