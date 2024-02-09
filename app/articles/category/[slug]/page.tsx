import {
  getArticlesByCategory,
  getCategories,
  getCategoryBySlug,
} from "@/lib/newt";
import styles from "@/app/page.module.css";
import type { Metadata } from "next";
import type { Article } from "@/types/article";
import { getFormattedDate } from "@/utils/formatDate";
import "@/styles/article.scss";
import { getThumbnail } from "@/utils/thumbnail";
import Image from "next/image";
import Label from "@/components/Label";
import Link from "next/link";
import CategoryLabelList from "@/components/CategoryLabelList";

interface Props {
  params: {
    slug: string;
  };
}

export const metadata: Metadata = {
  title: "Newt・Next.jsブログ",
  description: "NewtとNext.jsを利用したブログです",
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
export const dynamicParams = false;

export default async function Article({ params }: Props) {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);
  const articles = await getArticlesByCategory(category?._id || "");
  if (!articles) {
    return <></>;
  }

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text-3xl md:text-4xl mb-4 md:mb-8">ブログ一覧</h1>
        <CategoryLabelList selectedSlug={category?.slug} />
        <div className="mb-10 md:mb-20">
          <ul className="grid grid-cols-3 gap-x-5 gap-y-10">
            {articles.map((article) => {
              const thumbnail = getThumbnail(
                {
                  ...article?.thumbnail,
                  isDefault: true,
                } || { src: null, isDefault: true }
              );

              return (
                <li key={article._id}>
                  <Link
                    href={`articles/${article.slug}`}
                    className="flex flex-col transition-opacity hover:opacity-[.7]"
                  >
                    {thumbnail && (
                      <figure className="mb-5 w-full aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={thumbnail.src as string}
                          alt={thumbnail.altText as string}
                          width={thumbnail.width}
                          height={thumbnail.height}
                          className="w-full object-cover object-center"
                        />
                      </figure>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                      <span className="w-fit">
                        {getFormattedDate(article._sys.raw.firstPublishedAt)}
                      </span>
                      <Label title={article?.category?.title} />
                      <p className="w-full font-bold">{article.title}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
