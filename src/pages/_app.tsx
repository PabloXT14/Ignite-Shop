import { globalStyles } from "../styles/global"
import Image from 'next/image' 
import logoImg from '../assets/logo-ignite-shop.svg'
import { Handbag } from 'phosphor-react'

import * as S from '../styles/pages/app'
import { ButtonAddOnCart } from "../components/ButtonAddToCart/styles"

globalStyles();// recomendado colocar aqui ao invés do dentro do App, pois a cada alteração que fizer com que o componente App seja recarregado todo o globalStyles seria recarrergado, o que é ruim para performance.

export default function App({ Component, pageProps }) {
  return (
    <S.AppContainer>
      <S.Header>
        <Image src={logoImg} alt="" />

        <ButtonAddOnCart>
          <Handbag weight="bold"/>
        </ButtonAddOnCart>
      </S.Header>
      <Component {...pageProps} />
    </S.AppContainer>
  )
}
