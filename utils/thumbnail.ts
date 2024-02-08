interface Props {
  src: string;
  altText?: string;
  width?: number;
  height?: number;
  isDefault?: boolean;
}

export const getThumnail = ({
  src = "",
  altText,
  width,
  height,
  isDefault = false,
}: Props) => {
  if (src == "" && isDefault === true) {
    return {
      src: "/default-thumbnail-min.jpg",
      altText: "default",
      width: 300,
      height: 230,
    };
  }

  return {
    src: src,
    altText: altText,
    width: width,
    height: height,
  };
};
