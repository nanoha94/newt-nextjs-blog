export type ArticleCategory = {
  _id: string;
  _sys: {
    createdAt: string;
    updatedAt: string;
    raw: {
      createdAt: string;
      updatedAt: string;
      firstPublishedAt: string;
      publishedAt: string;
    };
  };
  title: string;
  slug: string;
};
