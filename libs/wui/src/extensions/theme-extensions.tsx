import "@mui/material/styles/createPalette";

interface TypeLayout {
  readonly appbar: string,
  readonly footer: string,
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    readonly secondaryBackground?: Palette['background'];
    readonly layout?: TypeLayout;
  }

  interface PaletteOptions {
    readonly secondaryBackground?: PaletteOptions['background'];
    readonly layout?: Partial<TypeLayout>;
  }
}
