import { AppProps } from "next/app";

/**
 * _app é recarregado sempre que trocar de página
 */

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
