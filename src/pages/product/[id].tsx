import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { SpinnerLoading } from '../../components/SpinnerLoading'
import { stripe } from '../../libs/stripe'
import { formatteMoney } from '../../utils/formatter'

import * as S from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const { addItem, cartDetails } = useShoppingCart();
  const priceWithTwoDecimals = product?.price / 100;


  async function handleAddProductInCart() {
    // try {
    //   setIsCreatingCheckoutSession(true)
    //   //COMO O API ROUTE DO NEXT RODA NO MESMO ENDEREÇO DA NOSSA APLICAÇÃO PODEMOS UTILIZAR DIRETO O AXIOS SEM UM BASEURL, POIS JÁ É SETADO POR PADRÃO A URL DE EXECUÇÃO DA NOSSA APLICAÇÃO
    //   const response = await axios.post('/api/checkout', {
    //     priceId: product.defaultPriceId,
    //   })

    //   const { checkoutUrl } = response.data;

    //   //REDIRECIONANDO PARA PÁGINA EXTERNA
    //   if (typeof window !== undefined) {
    //     window.location.href = checkoutUrl;
    //   }
    // } catch(error) {
    //   setIsCreatingCheckoutSession(false)
    //   alert('Falha ao redirecionar ao checkout!')
    // }
    await addItem({
      ...product,
      currency: 'BRL',
      sku: product.id,
    });
  
    console.log(cartDetails);

  }

  if (isFallback) { 
    return <SpinnerLoading />
  }

  return (
    <>
    <Head>
      <title>{product.name} | Ignite Shop</title>
    </Head>
      <S.ProductContainer>
        <S.ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </S.ImageContainer>

        <S.ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatteMoney(priceWithTwoDecimals)}</span>

          <p>{product.description}</p>

          <button
            // disabled={isCreatingCheckoutSession}
            onClick={handleAddProductInCart}
          >
            Colocar na sacola
          </button>
        </S.ProductDetails>
      </S.ProductContainer>
    </>
  )
}

// GetStaticPaths => diz quais parâmetros de rota dinâmicos a nossa Geração Estatica (SSG) receberá
export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [
      { params: { id: 'prod_MrOKqBqqYz3p0A' }}// id de um dos produtos cadastrados no stripe
    ],
    fallback: true,
  }
}


// GetStaticProps<tigaem do retorno, tipagem dos parâmetros recebidos pela rota>
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;// parâmetro vindo da rota da página de produto

  // Buscando dados do produto
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  // Declarando tipagem do price
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}