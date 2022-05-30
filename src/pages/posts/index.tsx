import { GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "../../services/prismic";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Creating a Mororepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared
            </p>
          </a>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Creating a Mororepo wih Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared
            </p>
          </a>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Creating a Mororepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient();

  const page = await client.getAllByType("post-id", {
    fetch: ["data.title", "data.content"],
  });

  console.log(page);

  return {
    props: { page },
  };
};
