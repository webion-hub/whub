import { Interpolation, Theme } from '@mui/material';
import { darkTheme } from './getTheme';

const globalStyle: Interpolation<Theme> = {
  body: {
    overflow: 'overlay',
    overflowX: 'hidden',
    transitionProperty: 'background-color',
    transitionDuration: '.4s',
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
