import { styled } from "..";

export const AppContainer = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled("header", {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const ButtonAddOnCart = styled("button", {
  width: '3rem',
  height: '3rem',
  backgroundColor: '$gray800',
  border: '0',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$gray400',

  svg: {
    fontSize: '1.5rem',
  }
})