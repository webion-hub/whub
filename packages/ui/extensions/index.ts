import * as _ from '@mui/material/styles/createPalette';

interface TypeBorder {
  readonly default: string;
}

interface TypeLayout {
  readonly appbar: string;
  readonly footer: string;
}

interface TypeLayoutMaxWidth {
  readonly appbar: number;
  readonly footer: number;
  readonly section: number;
}

declare module '@mui/material/styles/createPalette' {
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

declare module '@mui/material/styles' {
  interface Theme {
    readonly layoutMaxWidth?: TypeLayoutMaxWidth;
  }

  interface ThemeOptions {
    readonly layoutMaxWidth?: Partial<TypeLayoutMaxWidth>;
  }
}


export const a = {}