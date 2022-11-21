import { globalStyles } from "../styles/global"

globalStyles();// recomendado colocar aqui ao invés do dentro do App, pois a cada alteração que fizer com que o componente App seja recarregado todo o globalStyles seria recarrergado, o que é ruim para performance.

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
