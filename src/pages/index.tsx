import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

/**
 * FORMAS CHAMADAS HTTP
 * Client-Side - Outros casos algo que é carregado a uma ação do usuário, informações que não necessitam serem pre recarregados
 * Server-Side - Indexaçao, dados dinâmicos, sessão do usuário , informações em tempo real do usuário contexto...
 * Static Site Generation - Indexaçao, Performance, salvar conteúdo estático (que é o mesmo para todos os usuários)
 *
 * Post Blog
 *
 * Conteúdo (SSG)
 * Comentário (Client-Side)
 */

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ignews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

/**
 * Funções executadas no next
 * getServerSideProps -> SSR
 * getStaticProps -> SSG
 */

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KLcptKxIhwMYggjWlM6wWN9");
  /**
   * Como segundo parâmetro do retrive pode se passar {expand: ["product"]}
   * Nesse caso além de recuperar o preço pegaria os outros dados do produto
   */

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas (informar em minutos)
  };
};
