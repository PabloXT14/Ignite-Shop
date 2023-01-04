import { styled } from "../../../../styles";

export const QuantityInputContainer = styled("div", {
  flex: 1,
  backgroundColor: '$gray700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.25rem',
  borderRadius: 6,
  padding: '0.5rem',

  input: {
    textAlign: 'center',
    width: '100%',
    background: 'none',
    border: 'none',
    color: '$gray100',

    '&:focus': {
      outline: 'none',
    }
  },

  /* REMOVENDO ESPAÇO DE SETAS DO INPUT DE NUMBER */ 
  'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  'input[type="number"]': {
    '-moz-appearance': 'textfield',
  }
});

export const IconWrapper = styled("button", {
  width: '0.875rem',
  height: '0.875rem',
  border: 'none',
  background: 'none',
  color: '$green500',
  transition: '0.4s',

  '&:disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    color: '$green300',
  }
});
