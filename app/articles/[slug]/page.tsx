import { getArticles, getArticleBySlug } from "@/lib/newt";
import styles from "@/app/page.module.css";
import type { Metadata } from "next";
import type { Article } from "@/types/article";
import { getFormattedDate } from "@/utils/formatDate";
import "@/styles/globals.scss";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  const ogImageSrc: string | URL = new URL(
    article?.meta?.ogImage?.src || "http://localhost:3000"
  );

  return {
    metadataBase: new URL("http://localhost:3000/"),
    title: article?.meta?.title,
    description: article?.meta?.description,
    openGraph: {
      title: article?.meta?.title,
      description: article?.meta?.description,
      url: `./${slug}`,
      images: [
        {
          url: ogImageSrc,
        },
      ],
      type: `article`,
    },
  };
}

export default async function Article({ params }: Props) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  if (!article) return;

  return (
    <main className={styles.main}>
      <div className="article-container">
        <p className="article-published-at">
          {getFormattedDate(article._sys.raw.firstPublishedAt)}
        </p>
        <h1 className="article-title">{article.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: article.body }}
          className="article"
        />
      </div>
    </main>
  );
}
