import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from '../../libs/stripe'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const priceId = 'price_1M7fY7Irupz0jzbxvWUkVCqD'// id do preço de um produto cadastrado

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,// Redirecionar para rota/url de compra concluida
    cancel_url: cancelUrl,// Redirecionar para rota/url de compra cancelada
    mode: 'payment',// tipo de compra (payment = pagou uma vez só pelo produto)
    line_items: [// informações sobre o produto a ser comprado
      {
        price: priceId,
        quantity: 1
      }
    ]
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
