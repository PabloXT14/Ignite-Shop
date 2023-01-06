import Image from 'next/image';
import { QuantityInput } from "../QuantityInput";
import { useShoppingCart } from 'use-shopping-cart';
import { IProduct } from '../../../../@types/ProductType';

import * as S from "./styles";

interface CartItemProps {
  product: IProduct;// tipagem dos produtos do carrinho
}

export function CartItem({ product }: CartItemProps) {
  const { 
    removeItem,
    incrementItem,
    decrementItem 
  } = useShoppingCart();

  function handleIncrease() {
    let count = 1
    incrementItem(product.id, { count });
  }

  function handleDecrease() {
    let count = 1
    decrementItem(product.id, { count })
  }

  function handleRemove() {
    removeItem(product.id);
  }

  return (
    <S.CartItemContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} width={102} height={93} alt="" />
      </S.ImageContainer>
      <S.InfoContainer>
        <span>{product.name}</span>
        <strong>{product.formattedValue}</strong>
        <div className="actionsContainer">
          <QuantityInput
            quantity={product.quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />
          <button onClick={handleRemove} className="removeButton">
            Remover
          </button>
        </div>
      </S.InfoContainer>
    </S.CartItemContainer>
  )
}