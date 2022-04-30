import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Link href="/">
            <a className={styles.continueReading}>
              Wanna continue reading?
              <span>Subscribe now 🤗</span>
            </a>
          </Link>
        </article>
      </main>
    </>
  );
}

/*
  Neste caso teremos muitas variações da preview , seria gerado um html estático para cada preview, o Next por padrão
  gera essa páginas estáticas no momento da build e gerar umas 1000 páginas dessa seria com certeza um problema.
  -> Ai entra o getStaticPaths, que somente ira gerar o html estático da página no seu primeiro acesso.
  -> Temos o meio termo que seria usar o paths, nele passa a subrota/código identificador, nesse 
  caso slugs das previews que seu HTML serão gerados em tempo de buid. (Bom atribuir
  por exemplo nas páginas mais acessadas)
*/

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "um-guia-de-estilo-opinado-para-escrever-sass-com-pes",
        },
      },
    ],
    fallback: "blocking",
    /* 
      *** fallback (true, false, blocking) ***
      true ==> (RARAMENTE USADO) Usuário acessou a página que não tem HTML estático gerado,
              vai ser carregado o conteúdo do zero.
              Problema: Carrega a página, porém sem conteúdo prévio ficando vázia até fazer
                        as requisições. Ruim pra CEO, sem conteúdo, problemas no indexamento do site.
      false ==> (USANDO EM CASOS BEM ESPECÍFICOS)  Usuário acessou a página que não tem HTML estático gerado,
              dará erro 404 (não encontrado).
      blocking ==> (MAIS USADO) Usuário acessou a página que não tem HTML estático gerado,
              vai ser carregado o conteúdo do zero PORÉM NA CAMADA DO NEXT, entregando a página depois de ser
              totalmente carregada.
    */
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response: any = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 4)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, //30 minutos
  };
};
