import { Handbag } from 'phosphor-react';
import { ButtonContainer } from './styles';
import type * as Stitches from '@stitches/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonAddToCartProps = ButtonHTMLAttributes<HTMLButtonElement> & Stitches.VariantProps<typeof ButtonContainer> & {
  productsQuantity?: number;
}

export function ButtonAddToCart(props: ButtonAddToCartProps) {
  return (
    <ButtonContainer {...props}>
      {props.productsQuantity ? (<span>{props.productsQuantity}</span>) : null}
      <Handbag weight="bold"/>
    </ButtonContainer>
  );
}