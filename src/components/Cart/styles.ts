import { styled, keyframes } from "../../styles";
import * as Dialog from '@radix-ui/react-dialog';


const contentShow = keyframes({
  '0%': {
    right: '-100%',
  },
  '100%': {
    right: 0,
  },
});

// const contentHide = keyframes({
//   '0%': {
//     right: 0,
//   },
//   '100%': {
//     right: '-100%',
//   },
// });

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'transparent',
});

export const DialogContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: 999,
  height: '100vh',
  maxWidth: '30rem',
  width: '100%',
  padding: '0 3rem 3rem',
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  animation: `${contentShow} 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,

  '& > button.closeButton': {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    border: 0,
    backgroundColor: 'transparent',
    display: 'block',
    lineHeight: 0,

    svg: {
      width: '1.5rem',
      height: '1.5rem',
      color: '$gray400'
    }
  },

  h2: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '160%',
    color: '$gray100',
    marginTop: '4.5rem',
    marginBottom: '2rem',
  },

  '& > .contentItems': {
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxHeight: '60vh',
    overflowY: 'auto',
  },

  '& > .summaryItems': {
    marginTop: 'auto',

    '& > div': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },

    span: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '160%',
      color: '$gray100',
    },

    strong: {
      fontSize: '$md',
      fontWeight: 700,
      lineHeight: '160%',
      color: '$gray100',
    },

    button: {
      marginTop: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',

      backgroundColor: '$green500',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '1.25rem',
      minHeight: '4.25rem',
      fontWeight: 'bold',
      fontSize: '$md',
      transition: 'background-color 0.4s',

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },
    }
  },
});