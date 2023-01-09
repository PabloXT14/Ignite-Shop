import { CartItem } from './components/CartItem';
import { X } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';
import { useState } from 'react';
import axios from 'axios';
import { SpinnerLoading } from '../SpinnerLoading';
import { IProduct } from '../../@types/ProductType';

import * as Dialog from '@radix-ui/react-dialog';
import * as S from './styles';
import { ButtonAddToCart } from '../ButtonAddToCart';

export default function Cart() {
  const {
    cartDetails,
    cartCount,
    formattedTotalPrice,
  } = useShoppingCart();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const products: IProduct[] = Object.keys(cartDetails).map(item => cartDetails[item]);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      //COMO O API ROUTE DO NEXT RODA NO MESMO ENDEREÇO DA NOSSA APLICAÇÃO PODEMOS UTILIZAR DIRETO O AXIOS SEM UM BASEURL, POIS JÁ É SETADO POR PADRÃO A URL DE EXECUÇÃO DA NOSSA APLICAÇÃO
      const response = await axios.post('/api/checkout', {
        products: products,
      })

      const { checkoutUrl } = response.data;

      //REDIRECIONANDO PARA PÁGINA EXTERNA
      if (typeof window !== undefined) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonAddToCart productsQuantity={cartCount} />
      </Dialog.Trigger>

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
            {products.length <= 0 && <p>Seu carrinho está sem produtos, vamos comprar algo novo!!</p>}

            {products.map(product => {
              return (
                <CartItem
                  key={product.id}
                  product={product}
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

            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartCount <= 0}
            >
              {isCreatingCheckoutSession
                ? (<SpinnerLoading size="sm" />)
                : 'Finalizar compra'
              }
            </button>
          </section>
        </S.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}