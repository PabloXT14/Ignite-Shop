import { styled } from "../../styles";

export const ButtonContainer = styled("button", {
  border: '0',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

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
      gray: { color: '$gray400' },
      white: { color: '$white' },
    },
  },

  defaultVariants: {
    size: "md",
    bgColor: "gray",
    iconColor: "gray",
  },
});