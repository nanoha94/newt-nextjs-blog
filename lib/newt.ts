import "server-only";
import { createClient } from "newt-client-js";
import { cache } from "react";
import type { Article } from "@/types/article";
import { ArticleCategory } from "@/types/article-category";

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + "",
  token: process.env.NEWT_CDN_API_TOKEN + "",
  apiType: "cdn",
});

export const getArticles = cache(async () => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: [
        "_id",
        "_sys",
        "title",
        "slug",
        "thumbnail",
        "meta",
        "category",
        "body",
      ],
    },
  });
  return items;
});

export const getArticlesByCategory = cache(async (category_id: string) => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: [
        "_id",
        "_sys",
        "title",
        "slug",
        "thumbnail",
        "meta",
        "category",
        "body",
      ],
      category: {
        in: [category_id],
      },
    },
  });
  return items;
});

export const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      slug,
      select: [
        "_id",
        "_sys",
        "title",
        "slug",
        "thumbnail",
        "meta",
        "category",
        "body",
      ],
    },
  });
  return article;
});

export const getCategories = cache(async () => {
  const { items } = await client.getContents<ArticleCategory>({
    appUid: "blog",
    modelUid: "article-category",
    query: {
      select: ["_id", "_sys", "title", "slug"],
      order: ["slug"],
    },
  });
  return items;
});

export const getCategoryBySlug = cache(async (slug: string) => {
  const category = await client.getFirstContent<ArticleCategory>({
    appUid: "blog",
    modelUid: "article-category",
    query: {
      slug,
      select: ["_id", "_sys", "title", "slug"],
    },
  });
  return category;
});
