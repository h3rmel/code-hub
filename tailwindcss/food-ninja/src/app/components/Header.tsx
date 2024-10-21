type Props = {
  title: string;
  subtitle: string;
};

const Header = ({ title, subtitle }: Props) => {
  return (
    <header>
      <h2 className="text-gray-700 text-6xl font-semibold">{title}</h2>
      <h3 className="text-2xl font-semibold">{subtitle}</h3>
    </header>
  );
};

export default Header;
