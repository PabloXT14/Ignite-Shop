import * as Dialog from '@radix-ui/react-dialog';
import * as S from './styles';
import { X } from 'phosphor-react';
import Link from 'next/link';
import productImage from '../../assets/shirts/1.png';
import { CartItem } from './CartItem';

export default function Cart() {
  return (
    <Dialog.Portal>
      <S.DialogOverlay />
      <S.DialogContent>
        <Dialog.Close asChild>
          <button className="closeButton" aria-label="Close">
            <X />
          </button>
        </Dialog.Close>

        <Dialog.Title>Sacola de compras</Dialog.Title>

        <section className="contentItems">
          <CartItem
            imageLink={productImage}
            title="Camiseta Beyond the Limits"
            price={79}
            action={() => { console.log("Removeu produto") }}
          />

          <CartItem
            imageLink={productImage}
            title="Camiseta Explorer"
            price={62}
            action={() => { console.log("Removeu produto") }}
          />

          <CartItem
            imageLink={productImage}
            title="Camiseta Ignite Lab | ReactJS"
            price={89}
            action={() => { console.log("Removeu produto") }}
          />
        </section>

        <section className="summaryItems">
          <div>
            <span>Quantidade</span>
            <span>3 itens</span>
          </div>

          <div>
            <strong>Valor total</strong>
            <strong>R$ 270,00</strong>
          </div>

          <Link href="#" prefetch={false}>
            Finalizar compra
          </Link>
        </section>
      </S.DialogContent>
    </Dialog.Portal>
  );
}