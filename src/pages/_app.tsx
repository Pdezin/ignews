import { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/global.scss";

/**
 * _app é recarregado sempre que trocar de página
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
