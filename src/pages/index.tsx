import Image from 'next/image'
import Head from "next/head";
import * as S from '../styles/pages/home'

import shirt1 from '../assets/shirts/1.png'
import shirt2 from '../assets/shirts/2.png'
import shirt3 from '../assets/shirts/3.png'

export default function Home() {
  return (
    <S.HomeContainer>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <S.Product>
        <Image src={shirt1} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>

      <S.Product>
        <Image src={shirt2} alt="" />

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>
    </S.HomeContainer>
  )
}
