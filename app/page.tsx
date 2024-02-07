import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import { getArticles } from "@/lib/newt";
import Link from "next/link";

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
          <ul>
            {articles.map((article) => {
              return (
                <li
                  key={article._id}
                  className="flex flex-col lg:flex-row gap-2 lg:gap-10 mb-10 lg:mb-2"
                >
                  <p>{article._sys.raw.firstPublishedAt}</p>
                  <p className="font-bold hover:text-gray-600">
                    {article.title}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
