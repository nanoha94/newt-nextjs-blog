import "@/styles/label.scss";
import Link from "next/link";

interface Props {
  href: string;
  title: string | undefined;
  size?: "large" | "normal" | undefined;
  selected?: boolean | undefined;
}

const classSize = (size: string | undefined) => {
  if (size !== undefined) {
    return "label-" + size;
  }
  return "";
};

const additionalClass = (props: Props) => {
  let className = "";

  if (props.size !== undefined) {
    className += "label-" + props.size;
  }

  if (props.selected !== undefined && props.selected) {
    className += " label-selected";
  }
  return className;
};

const LabelButton = (props: Props) => {
  if (!props.title) {
    return <></>;
  }

  return (
    <Link
      href={props.href}
      className={`label-button ${additionalClass(props)}`}
    >
      {props.title}
    </Link>
  );
};

export default LabelButton;
