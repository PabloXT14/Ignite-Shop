import * as Dialog from '@radix-ui/react-dialog';
import * as S from './styles';

export default function Cart() {
  return (
    <Dialog.Portal>
      <S.DialogOverlay />
      <S.DialogContent>
        <Dialog.Title>Sacola de compras</Dialog.Title>
        <div>
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
            <p>Item 4</p>
            <p>Item 5</p>
        </div>
      </S.DialogContent>
    </Dialog.Portal>
  );
}