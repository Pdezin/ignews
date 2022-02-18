import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * _document só é carregado uma vez
 * Ideal para itens onde não necessitam de atualização constante
 * Ex: Importação de fontes
 * IMPORTAÇÃO DE ESTILOS GLOBAIS É NO _app JÁ QUE O _document É MAIS VOLTADO AO HTML PURO MESMO
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
