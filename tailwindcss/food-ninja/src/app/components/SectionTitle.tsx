type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props) => {
  return <h4 className="section-title">{title}</h4>;
};

export default SectionTitle;
