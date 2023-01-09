import { styled } from "../../styles";

export const ButtonContainer = styled("button", {
  border: '0',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  span: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    width: '1.5rem',
    height: '1.5rem',
    right: '-7px',
    top: '-7px',

    backgroundColor: '$green500',
    color: '$white',
    border: '3px solid $gray900',
    borderRadius: '50%',
  },

  variants: {
    size: {
      md: {
        width: '3rem',
        height: '3rem',
        svg: {
          fontSize: '1.5rem',
        },
      },
      lg: {
        width: '3.5rem',
        height: '3.5rem',
        svg: {
          fontSize: '2rem',
        },
      },
    },
    bgColor: {
      gray: { backgroundColor: '$gray800' },
      green: { backgroundColor: '$green500' },
    },
    iconColor: {
      gray400: { color: '$gray400' },
      gray300: { color: '$gray300' }, 
      white: { color: '$white' },
    },
  },

  defaultVariants: {
    size: "md",
    bgColor: "gray",
    iconColor: "gray400",
  },
});