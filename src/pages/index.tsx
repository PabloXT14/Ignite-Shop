import Head from "next/head";
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next';
import Stripe from 'stripe';
import { stripe } from '../libs/stripe';
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { ButtonAddToCart } from "../components/ButtonAddToCart";
import { useShoppingCart } from "use-shopping-cart";
import { formatteMoney } from "../utils/formatter";
import { CartEntry as ICartEntry } from 'use-shopping-cart/core';
import { SpinnerLoading } from "../components/SpinnerLoading";
import { useState } from "react";

import * as S from '../styles/pages/home'

interface HomeProps {
  products: ICartEntry[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2, // quantidade de intens que irá aparecer sem precisar dar scroll no slide
      spacing: 48, // espaçamento em px entre os itens
    },
  })
  const { addItem, currency } = useShoppingCart();
  const [idProductClicked, setIdProductClicked] = useState('');

  function handleAddingProductToCart(product: ICartEntry) {

    addItem({
      ...product,
      currency: currency,
      sku: product.id,
    });
  }

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
          const priceWithTwoDecimals = product.price / 100;

          return (
            <div key={product.id}>
              <S.Product className="keen-slider__slide">
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  prefetch={false}
                  onClick={() => setIdProductClicked(product.id)}
                >
                  {idProductClicked === product.id && (<SpinnerLoading size="lg" className="spinnerLoading"/>)}
                  
                  <Image src={product.imageUrl} width={520} height={480} alt="" />
                </Link>

                <S.ProductFooter>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {formatteMoney(priceWithTwoDecimals)}
                    </span>
                  </div>

                  <ButtonAddToCart
                    size="lg"
                    bgColor="green"
                    iconColor="white"
                    onClick={() => handleAddingProductToCart(product)}
                  />
                </S.ProductFooter>
              </S.Product>
            </div>
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
      price: price.unit_amount,
      defaultPriceId: price.id,
    }
  })

  const hourInSeconds = 60 * 60;
  const revalidateTimeInSeconds = hourInSeconds * 2

  return {
    props: {
      products,
    },
    revalidate: revalidateTimeInSeconds,
  }
}