import "server-only";
import { createClient } from "newt-client-js";
import { cache } from "react";
import type { Article } from "@/types/article";

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
      select: ["_id", "_sys", "title", "slug", "meta", "body"],
    },
  });
  return items;
});
