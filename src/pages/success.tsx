import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../libs/stripe'

import * as S from '../styles/pages/success'

interface SuccessProps {
  costumerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
  totalQuantityOfProducts: number;
}

export default function Success({ 
  costumerName,
  products,
  totalQuantityOfProducts 
}: SuccessProps) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />{/* Para os buscandores dos navegadores não indexarem esta página */}
      </Head>
      <S.SuccessContainer>

        <S.ImagesContainer>
          {products.map(product => {
            return (
              <S.ImageContainer key={product.name}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </S.ImageContainer>
            )
          })}
        </S.ImagesContainer>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{' '}
          { totalQuantityOfProducts > 1 
            ? `${totalQuantityOfProducts} camisetas` 
            : `${totalQuantityOfProducts} camiseta`}{' '}
          (de {products.length > 1 ? `${products.length} tipos diferentes` : `1 único tipo`}){' '}
          já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </S.SuccessContainer>
    </>
  )
}

// query: recebe o parâmetros presentes na rota (no caso queremos o session_id)
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      // notFound: true,// => redireciona para um erro 404 (Content not found)
      redirect: {
        destination: '/',// rota de destino
        permanent: false,// pois só quando não tiver session_id que será redirecionado para esta rota de destino
      }
    }
  }


  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const initialQuantity = 0;
  const totalQuantityOfProducts = session.line_items.data.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    initialQuantity
  );

  const costumerName = session.customer_details.name;
  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product;

    return ({
      name: product.name,
      imageUrl: product.images[0],
    })
  })

  return {
    props: {
      costumerName,
      products,
      totalQuantityOfProducts,
    }
  }
}