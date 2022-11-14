import { darkTheme } from './getTheme';

const globalStyle = {
  body: {
    overflow: 'overlay',
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
