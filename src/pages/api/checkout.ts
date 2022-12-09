import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from '../../libs/stripe'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body;// id do preço de um produto cadastrado

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed!" });
  }

  if (!priceId) {
    return res.status(400).json({ error: "Price ID not founded!" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
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
