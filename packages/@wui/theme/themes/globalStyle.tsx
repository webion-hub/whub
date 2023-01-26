import { Interpolation, Theme } from '@mui/material';
import { darkTheme } from './darkTheme';

const globalStyle: Interpolation<Theme> = {
  body: {
    overflow: 'overlay',
    overflowX: 'hidden',
  },
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: darkTheme.palette.primary.dark,
    borderRadius: '2px',
  },
};

export default globalStyle;
