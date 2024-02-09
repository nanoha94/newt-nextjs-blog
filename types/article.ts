export type Article = {
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
  meta: {
    title: string;
    description: string;
    ogImage: {
      _id: string;
      src: string;
      fileType: string;
      fileSize: number;
      fileName: string;
      width: number;
      height: number;
    };
  };
  thumbnail: {
    src: string;
    altTExt: string;
    width: number;
    height: number;
  };
  category: {
    _id: string;
    title: string;
    slug: string;
  };
  body: string;
};
