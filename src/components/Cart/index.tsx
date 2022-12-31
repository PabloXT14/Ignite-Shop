import Link from 'next/link';
import { CartItem } from './CartItem';
import { X } from 'phosphor-react';

import * as Dialog from '@radix-ui/react-dialog';
import * as S from './styles';
import { useShoppingCart } from 'use-shopping-cart';

export default function Cart() {
  const { removeItem, cartDetails, cartCount, formattedTotalPrice,  } = useShoppingCart();

  function handleFinishBuy() {
      console.log(cartDetails);
  }

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
          {Object.keys(cartDetails).map(item => {
            const itemDetails = cartDetails[item];

            return (
              <CartItem
                key={itemDetails.id}
                imageLink={itemDetails.imageUrl}
                title={itemDetails.name}
                price={itemDetails.price}
                action={() => { removeItem(itemDetails.id) }}
              />
            )
          })}
        </section>

        <section className="summaryItems">
          <div>
            <span>Quantidade</span>
            <span>{cartCount} itens</span>
          </div>

          <div>
            <strong>Valor total</strong>
            <strong>{formattedTotalPrice}</strong>
          </div>

          <Link href="#" prefetch={false} onClick={handleFinishBuy}>
            Finalizar compra
          </Link>
        </section>
      </S.DialogContent>
    </Dialog.Portal>
  );
}