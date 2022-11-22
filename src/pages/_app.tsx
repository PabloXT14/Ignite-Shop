import { globalStyles } from "../styles/global"
import Image from 'next/image' 
import logoImg from '../assets/logo-ignite-shop.svg'
import * as S from '../styles/pages/app'

globalStyles();// recomendado colocar aqui ao invés do dentro do App, pois a cada alteração que fizer com que o componente App seja recarregado todo o globalStyles seria recarrergado, o que é ruim para performance.

export default function App({ Component, pageProps }) {
  return (
    <S.AppContainer>
      <S.Header>
        <Image src={logoImg} alt="" quality={100} />
      </S.Header>
      <Component {...pageProps} />
    </S.AppContainer>
  )
}
