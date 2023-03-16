import { useContext } from "react";
import { ThemeContext } from "../Theme/Theme";

export const useThemeChanger = () => useContext(ThemeContext);