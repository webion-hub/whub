import React from "react"
import { useNavigate } from "react-router-dom"

export const useNavigator = () => {
  const navigate = useNavigate()

  const clickNavigate = (url: string) => (e: React.MouseEvent<any, any>) => {
    e.preventDefault()
    navigate(url)
  }

  return {
    navigate,
    clickNavigate
  }
}
