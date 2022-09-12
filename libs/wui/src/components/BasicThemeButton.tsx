import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useThemeChanger } from "../contexts/ThemeContext";

export function BasicThemeButton() {
  const { currentTheme, setTheme } = useThemeChanger()

  const toggleTheme = () => {
    setTheme(
      currentTheme === 'dark'
        ? 'light'
        : 'dark'
    )
  }

  return (
    <IconButton
      onClick={toggleTheme}
    >
      {
        currentTheme === 'dark'
          ? <LightModeRounded/>
          : <DarkModeRounded/>
      }
    </IconButton>
  )
}
