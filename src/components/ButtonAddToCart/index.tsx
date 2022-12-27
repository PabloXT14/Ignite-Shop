import { Handbag } from 'phosphor-react';
import { ButtonContainer } from './styles';
import type * as Stitches from '@stitches/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonAddToCartProps = ButtonHTMLAttributes<HTMLButtonElement> & Stitches.VariantProps<typeof ButtonContainer>

export function ButtonAddToCart(props: ButtonAddToCartProps) {
  return (
    <ButtonContainer {...props}>
      <Handbag weight="bold"/>
    </ButtonContainer>
  );
}