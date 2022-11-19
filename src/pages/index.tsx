import Head from "next/head";

import { styled } from "../styles";

const Button = styled("button", {
  backgroundColor: '$rocketseat',
  color: '$white',
  borderRadius: 4,
  border: 0,
  padding: '1rem 1.5rem',
})

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <Button>
        Click me
      </Button>
    </div>
  )
}
