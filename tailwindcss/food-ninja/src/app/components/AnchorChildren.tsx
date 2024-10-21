type Props = {
  link: string;
  children: JSX.Element;
};

const AnchorChildren = ({ link, children }: Props) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:flex-row items-center gap-2 font-bold text-lg hover:text-primary transition ease-out duration-300"
    >
      {children}
    </a>
  );
};

export default AnchorChildren;
