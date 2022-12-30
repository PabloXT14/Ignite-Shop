import Image from "next/image";
import logoImg from '../../assets/logo-ignite-shop.svg'
import { ButtonAddToCart } from "../ButtonAddToCart";
import { HeaderContainer } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";
import Cart from "../Cart";
import { useShoppingCart } from "use-shopping-cart";


export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { removeItem, cartDetails, clearCart, formattedTotalPrice, cartCount } = useShoppingCart();

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <Dialog.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
        <Dialog.Trigger asChild={true}>
          <ButtonAddToCart productsQuantity={cartCount} />
        </Dialog.Trigger>

        <Cart />
      </Dialog.Root>
    </HeaderContainer>
  );
}