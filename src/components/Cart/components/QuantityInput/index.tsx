import { Minus, Plus } from 'phosphor-react';
import * as S from './styles';

interface QuantityInputProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantityInput({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityInputProps) {
  return (
    <S.QuantityInputContainer>
      <S.IconWrapper disabled={quantity <= 1} onClick={onDecrease}>
        <Minus size={14} weight="fill" />
      </S.IconWrapper>
      <input type="number" readOnly value={quantity} />
      <S.IconWrapper onClick={onIncrease}>
        <Plus size={14} weight="fill" />
      </S.IconWrapper>
    </S.QuantityInputContainer>
  )
}
