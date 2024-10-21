import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { AirplaneTakeoff } from "phosphor-react";

export const Header = () => {
  const bookTripSize = useSelector((state) => state.bookTrip.length);

  return (
    <header>
      <Link to="/" className="logo">
        ReduXplorer
        <AirplaneTakeoff size={28} />
      </Link>
      <div className="header-nav">
        <Link to="/books">Minhas reservas</Link>
        <span>{bookTripSize} Reservas</span>
      </div>
    </header>
  );
};
