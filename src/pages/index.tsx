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
import { SpinnerLoading } from "../components/SpinnerLoading";
import React, { useCallback, useEffect, useState } from "react";
import { IProduct } from "../@types/ProductType";
import { ProductSkeleton } from "../components/ProductSkeleton";
import useEmblaCarousel from "embla-carousel-react";


import * as S from '../styles/pages/home'

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 'auto', // quantidade de intens que irá aparecer sem precisar dar scroll no slide
      spacing: 48, // espaçamento em px entre os itens
    }
  })
  const [isLoadingDatas, setIsLoadingDatas] = useState(true);

  useEffect(() => {
    // fake loading to use skeleton loading
    const timeOut = setTimeout(() => setIsLoadingDatas(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);

  const { addItem } = useShoppingCart();
  const [idProductClicked, setIdProductClicked] = useState('');

  function handleAddingProductToCart(product: IProduct) {
    addItem(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <S.HomeContainer>

        <div className="embla" ref={emblaRef}>
          <S.SliderContainer className="embla__container container">
            <S.ArrowButton
              direction="left"
              className="embla__prev"
              onClick={scrollPrev}
            >
              <CaretLeft size={48} />
            </S.ArrowButton>

            <S.ArrowButton
              direction="right"
              className="embla__next"
              onClick={scrollNext}
            >
              <CaretRight size={48} />
            </S.ArrowButton>

            {isLoadingDatas
              ? (
                <>
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                </>
              ) : (
                products.map(product => {
                  const priceWithTwoDecimals = product.price / 100;

                  return (
                    <div key={product.id}>
                      <S.Product className="embla__slide">
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          prefetch={false}
                          onClick={() => setIdProductClicked(product.id)}
                        >
                          {idProductClicked === product.id && (<SpinnerLoading size="lg" className="spinnerLoading" />)}

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
                })
              )}
          </S.SliderContainer>
        </div>
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