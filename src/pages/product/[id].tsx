import { useRouter } from 'next/router'

import * as S from '../../styles/pages/product'

export default function Product() {
  const { query } = useRouter()

  return (
    <S.ProductContainer>
      <S.ImageContainer>

      </S.ImageContainer>

      <S.ProductDetails>
        <h1>Camiseta</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt voluptate iste officiis voluptates inventore blanditiis in doloribus maxime quo explicabo suscipit et nostrum earum veniam eum laborum consequatur, impedit fugit!</p>

        <button>
          Comprar agora
        </button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}