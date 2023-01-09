import Head from "next/head";
import { GetStaticProps } from 'next';
import Stripe from 'stripe';
import { stripe } from '../libs/stripe';
import React, { useEffect, useState } from "react";
import { IProduct } from "../@types/ProductType";
import { Slider } from "../components/Slider";

import * as S from '../styles/pages/home'

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const [isLoadingDatas, setIsLoadingDatas] = useState(true);

  useEffect(() => {
    // fake loading to use skeleton loading
    const timeOut = setTimeout(() => setIsLoadingDatas(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <S.HomeContainer>
        {isLoadingDatas
          ? (
            <Slider />
          ) : (
            <Slider products={products} />
          )
        }
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