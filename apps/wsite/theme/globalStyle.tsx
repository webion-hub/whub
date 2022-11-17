import { darkTheme } from './getTheme';

const globalStyle = {
  body: {
    overflow: 'overlay',
    //overflowX: 'hidden',
    // '@media not all and (min-resolution:.001dpcm)': {
    //   overflow: '-webkit-paged-y',
    // },
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
