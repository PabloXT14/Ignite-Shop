import Image from 'next/image'
import Head from "next/head";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react'

import shirt1 from '../assets/shirts/1.png'
import shirt2 from '../assets/shirts/2.png'
import shirt3 from '../assets/shirts/3.png'

import * as S from '../styles/pages/home'


export default function Home(props) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2, // quantidade de intens que irá aparecer sem precisar dar scroll no slide
      spacing: 48, // espaçamento em px entre os itens
    },
  })

  return (
    <S.HomeContainer ref={sliderRef} className="keen-slider">
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <S.ArrowButton
        direction="left"
        onClick={() => instanceRef.current.prev()}
      >
        <CaretLeft size={48} />
      </S.ArrowButton>

      <S.ArrowButton
        direction="right"
        onClick={() => instanceRef.current.next()}
      >
        <CaretRight size={48} />
      </S.ArrowButton>

      <S.Product className="keen-slider__slide">
        <Image src={shirt1} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>

      <S.Product className="keen-slider__slide">
        <Image src={shirt2} alt="" />

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>

      <S.Product className="keen-slider__slide">
        <Image src={shirt3} alt="" />

        <footer>
          <strong>Camiseta Z</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>

      <S.Product className="keen-slider__slide">
        <Image src={shirt1} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>

      <S.Product className="keen-slider__slide">
        <Image src={shirt2} alt="" />

        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>

      <S.Product className="keen-slider__slide">
        <Image src={shirt3} alt="" />

        <footer>
          <strong>Camiseta Z</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>
    </S.HomeContainer>
  )
}


export const getServerSideProps = async () => {
  // SIMULANDO DELAY DE BUSCA EM UMA API
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // ESTE CONSOLE SÓ APARECE NO LADO DO SERVIDOR EM NÃO DO CLIENTE
  console.log('Executado do lado do servidor👍')

  return {
    props: {
      listItems: [1, 2, 3]
    },
  }
}