import * as S from "./styles";
import Image, { StaticImageData } from 'next/image';

interface CartItemProps {
  imageLink: StaticImageData;
  title: string;
  price: number;
  action: () => void;
}

export function CartItem(props: CartItemProps) {
  return (
    <S.CartItemContainer>
      <S.ImageContainer>
        <Image src={props.imageLink} width={102} height={93} alt="" />
      </S.ImageContainer>
      <S.InfoContainer>
        <span>{props.title}</span>
        <strong>R$ {props.price},90</strong>
        <button onClick={props.action}>
          Remover
        </button>
      </S.InfoContainer>
    </S.CartItemContainer>
  )
}