import "@/styles/label.scss";

interface Props {
  title: string | null;
}

const Label = (props: Props) => {
  if (!props.title) {
    return <></>;
  }

  return <span className="label">{props.title}</span>;
};

export default Label;
