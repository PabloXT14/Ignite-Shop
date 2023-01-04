import Link from 'next/link';
import { CartItem } from './components/CartItem';
import { X } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';
import { useState } from 'react';
import axios from 'axios';
import { SpinnerLoading } from '../SpinnerLoading';

import * as Dialog from '@radix-ui/react-dialog';
import * as S from './styles';

export default function Cart() {
  const { 
    removeItem,
    cartDetails,
    cartCount,
    formattedTotalPrice,
  } = useShoppingCart();
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const productsConverted = Object.keys(cartDetails).map(item => {
        const itemDetails = cartDetails[item];
    
        return { 
          price: itemDetails.defaultPriceId,
          quantity: itemDetails.quantity,
         }
      });

      //COMO O API ROUTE DO NEXT RODA NO MESMO ENDEREÇO DA NOSSA APLICAÇÃO PODEMOS UTILIZAR DIRETO O AXIOS SEM UM BASEURL, POIS JÁ É SETADO POR PADRÃO A URL DE EXECUÇÃO DA NOSSA APLICAÇÃO
      const response = await axios.post('/api/checkout', {
        products: productsConverted,
      })

      const { checkoutUrl } = response.data;

      //REDIRECIONANDO PARA PÁGINA EXTERNA
      if (typeof window !== undefined) {
        window.location.href = checkoutUrl;
      }
    } catch(error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
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
          { Object.keys(cartDetails).length > 0 ? (
            Object.keys(cartDetails).map(item => {
              const itemDetails = cartDetails[item];
  
              return (
                <CartItem
                  key={itemDetails.id}
                  product={itemDetails}
                />
              )
            })
          ) : (
            <p>Seu carrinho está sem produtos, vamos comprar algo!!</p>
          )}
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
            disabled={isCreatingCheckoutSession || cartCount < 1}
          >
            { isCreatingCheckoutSession 
              ? (<SpinnerLoading size="sm" />) 
              : 'Finalizar compra'
            }
          </button>
        </section>
      </S.DialogContent>
    </Dialog.Portal>
  );
}