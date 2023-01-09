import Image from "next/image";
import logoImg from '../../assets/logo-ignite-shop.svg'
import { ButtonAddToCart } from "../ButtonAddToCart";
import { HeaderContainer } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";
import Cart from "../Cart";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Header() {
  const { pathname } = useRouter();
  const { cartCount } = useShoppingCart();

  const showCart = pathname !== "/success" 

  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      {showCart && <Cart />}
    </HeaderContainer>
  );
}