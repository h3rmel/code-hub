import { NavLink } from "react-router-dom";

/**
 * Componente para a barra de navegação da aplicação.
 *
 * @returns {JSX.Element} O componente da barra de navegação.
 */
export const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 navbar px-4 bg-base-100 border-b-[1px] border-b-neutral">
      <section className="flex justify-between max-w-[1200px] w-full mx-auto">
        <NavLink to="/" className="text-3xl duration-300 hover:scale-125 hover:no-underline">
          🪙
        </NavLink>
        <div className="flex flex-grow justify-end">
          <ul className="menu menu-horizontal gap-2">
            <li>
              <NavLink to="/" className="hover:no-underline">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:no-underline">Sobre</NavLink>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
};
