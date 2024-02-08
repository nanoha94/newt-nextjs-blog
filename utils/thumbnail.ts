interface Props {
  src: string | null;
  altText?: string;
  width?: number;
  height?: number;
  isDefault?: boolean;
}

export const getThumbnail = ({
  src = null,
  altText,
  width,
  height,
  isDefault = false,
}: Props) => {
  if (src !== null) {
    return {
      src: src,
      altText: altText,
      width: width,
      height: height,
    };
  }

  if (isDefault === true) {
    return {
      src: "/default-thumbnail-min.jpg",
      altText: "default",
      width: 300,
      height: 230,
    };
  }

  return null;
};
