import { Handbag } from 'phosphor-react';
import { ButtonContainer } from './styles';
import React, { ComponentProps } from 'react';

type ButtonAddToCartProps = ComponentProps<typeof ButtonContainer> & {
  productsQuantity?: number;
}

/* React.forwardRef: utilize essa estratégia de renderização do componente para deixar de aparecer um erro no console, no entanto, este erro não afeta em nada a aplicação em <dev> ou <prod> */
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
