import { globalCss } from ".";


export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  '::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '3px',
    backgroundColor: '$gray500',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },

  'button': {
    cursor: 'pointer',
  },

  a: {
    textDecoration: 'none',
  }
})