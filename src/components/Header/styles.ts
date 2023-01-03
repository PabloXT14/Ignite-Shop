import { styled } from "../../styles";
import * as Dialog from '@radix-ui/react-dialog';


export const HeaderContainer = styled("header", {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  button: {
    marginLeft: 'auto',// empurra para longe da esquerda
  }
})