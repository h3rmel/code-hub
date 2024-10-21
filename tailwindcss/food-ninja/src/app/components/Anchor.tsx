type Props = {
  link: string;
  text: string;
};

const Anchor = ({ link, text }: Props) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="underline font-bold hover:text-primary transition ease-out duration-300"
    >
      {text}
    </a>
  );
};

export default Anchor;
