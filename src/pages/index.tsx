import Head from "next/head";
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next';
import Stripe from 'stripe';
import { stripe } from '../libs/stripe';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react'


import * as S from '../styles/pages/home'

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
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
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
    
      <S.HomeContainer ref={sliderRef} className="keen-slider">
        

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
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <S.Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </S.Product>
            </Link>
          )
        })}
      </S.HomeContainer>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,// 2 hours
  }
}