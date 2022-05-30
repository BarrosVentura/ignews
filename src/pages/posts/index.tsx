import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { createClient } from "../../services/prismic";
import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
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

  const posts = page.map((item) => {
    return {
      slug: item.uid,
      title: item.data.title,
      excerpt:
        item.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(item.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
