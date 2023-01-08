import { Handbag } from 'phosphor-react';
import { ButtonContainer } from './styles';
import React, { ComponentProps } from 'react';

type ButtonAddToCartProps = ComponentProps<typeof ButtonContainer> & {
  productsQuantity?: number;
}

export function ButtonAddToCart({productsQuantity = 0, ...props }: ButtonAddToCartProps) {
  return (
    <ButtonContainer
      {...props}
      iconColor={productsQuantity ? 'gray300' : props.iconColor}
    >
      {productsQuantity  > 0 && <span>{productsQuantity}</span>}
      <Handbag weight="bold"/>
    </ButtonContainer>
  );
}
