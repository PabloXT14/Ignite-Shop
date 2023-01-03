import * as S from "./styles";
import Image, { StaticImageData } from 'next/image';
import { formatteMoney } from "../../../../utils/formatter";

interface CartItemProps {
  imageLink: StaticImageData | string;
  title: string;
  price: number;
  action: () => void;
}

export function CartItem(props: CartItemProps) {
  const priceWithTwoDecimal = props.price / 100

  return (
    <S.CartItemContainer>
      <S.ImageContainer>
        <Image src={props.imageLink} width={102} height={93} alt="" />
      </S.ImageContainer>
      <S.InfoContainer>
        <span>{props.title}</span>
        <strong>{formatteMoney(priceWithTwoDecimal)}</strong>
        <button onClick={props.action}>
          Remover
        </button>
      </S.InfoContainer>
    </S.CartItemContainer>
  )
}