import theme from "./darkTheme"

const globalStyle = {
  'body': {
    overflow: 'overlay',
  },
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.dark,
    borderRadius: '2px',
  },
}

export default globalStyle
