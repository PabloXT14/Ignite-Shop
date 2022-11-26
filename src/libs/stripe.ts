import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // data sugerida de forma automática
  appInfo: {// informações opcionais que podemos adicionar ao realizar as requisições à api do stripe
    name: 'Ignite Shop'
  }
})