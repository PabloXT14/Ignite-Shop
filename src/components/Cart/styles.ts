import { styled } from "../../styles";
import * as Dialog from '@radix-ui/react-dialog';


export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)'
})

export const DialogContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 999,
  height: '100vh',
  width: '20rem',
  padding: '1rem',
  backgroundColor: '$white',
  transition: 'all 0.4s ease',
})