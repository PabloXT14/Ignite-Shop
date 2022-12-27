import Image from "next/image";
import { ReactNode } from "react";
import { DefaultLayoutContainer, Header } from "./styles";
import logoImg from '../../assets/logo-ignite-shop.svg'
import { ButtonAddToCart } from "../../components/ButtonAddToCart";
import { useRouter } from "next/router";


interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const { pathname } = useRouter();

  console.log(pathname);

  return (
    <DefaultLayoutContainer>
      {pathname !== '/success' && (
        <Header>
          <Image src={logoImg} alt="" />

          <ButtonAddToCart />
        </Header>
      )}

      {children}
    </DefaultLayoutContainer>
  );
}