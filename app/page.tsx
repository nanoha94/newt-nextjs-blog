import styles from "./page.module.css";
import { Metadata } from "next";
import { getArticles } from "@/lib/newt";
import { getFormattedDate } from "@/utils/formatDate";
import Link from "next/link";
import { getThumbnail } from "@/utils/thumbnail";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Newt・Next.jsブログ",
  description: "NewtとNext.jsを利用したブログです",
};

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text-3xl md:text-6xl mb-4 md:mb-6">NEWS</h1>
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
                    <p className="mb-2.5">
                      {getFormattedDate(article._sys.raw.firstPublishedAt)}
                    </p>
                    <p className="font-bold">{article.title}</p>
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
