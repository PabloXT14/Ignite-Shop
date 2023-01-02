import { Handbag } from 'phosphor-react';
import { ButtonContainer } from './styles';
import type * as Stitches from '@stitches/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonAddToCartProps = ButtonHTMLAttributes<HTMLButtonElement> & Stitches.VariantProps<typeof ButtonContainer> & {
  productsQuantity?: number;
}

export function ButtonAddToCart({productsQuantity, ...props }: ButtonAddToCartProps) {
  return (
    <ButtonContainer
      {...props}
      iconColor={productsQuantity ? 'gray300' : props.iconColor}
    >
      {productsQuantity ? (<span>{productsQuantity}</span>) : null}
      <Handbag weight="bold"/>
    </ButtonContainer>
  );
}