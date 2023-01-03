import { ReactNode } from "react";
import { DefaultLayoutContainer } from "./styles";
import Header from "../../components/Header";


interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {

  return (
    <DefaultLayoutContainer>
      <Header />
      {children}
    </DefaultLayoutContainer>
  );
}