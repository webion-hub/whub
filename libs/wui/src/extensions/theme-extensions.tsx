import "@mui/material/styles/createPalette";

interface TypeBorder {
  readonly default: string,
}

interface TypeLayout {
  readonly appbar: string,
  readonly footer: string,
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    readonly secondaryBackground?: Palette['background'];
    readonly layout?: TypeLayout;
    readonly border?: TypeBorder;
  }

  interface PaletteOptions {
    readonly secondaryBackground?: PaletteOptions['background'];
    readonly layout?: Partial<TypeLayout>;
    readonly border?: Partial<TypeBorder>;
  }
}
