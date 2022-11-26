import { stripe } from '../libs/stripe';
import Image from 'next/image'
import Head from "next/head";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react'

import shirt1 from '../assets/shirts/1.png'
import shirt2 from '../assets/shirts/2.png'
import shirt3 from '../assets/shirts/3.png'

import * as S from '../styles/pages/home'
import Stripe from 'stripe';
import { GetServerSideProps } from 'next';


interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}

export default function Home({ products }: HomeProps) {
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

      {products.map(product => {
        return (
          <S.Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </S.Product>
        )
      })}
    </S.HomeContainer>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  // BUSCANDO PRODUTOS NA API DO STRIPE
  const response = await stripe.products.list({
    expand: ['data.default_price']// como o <price> dos produtos não vem por padrão (pois este dado esta na relação da tabela de produtos com alguma tabela de prices) dizemos para a api do stripe retornar nos produtos dentro do objeto <default_price> o price para cada produto
  })

  // FILTRANDO DADOS QUE UTILIZAREMOS DOS PRODUTOS
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price // tipando preço do produto

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100, // deixando em centavos (melhor forma de trabalhar com dinheiro)
    }
  })

  return {
    props: {
      products,
    },
  }
}