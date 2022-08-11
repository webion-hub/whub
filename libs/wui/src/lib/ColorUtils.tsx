import { darken, lighten, Theme } from "@mui/system";

export class ColorUtils {
  static fade(theme: Theme, color: string, alpha: number) {
    return theme.palette.mode === 'dark'
      ? lighten(color, alpha)
      : darken(color, alpha)
  }
}
