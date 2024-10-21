import { Link } from "react-router-dom";

import * as notFoundCss from "@modules/notFound.module.css";

export const NotFound = () => {
  return (
    <div className={notFoundCss.container}>
      <div className={notFoundCss.card}>
        <h2>404 - Página não encontrada</h2>
        <Link to="/" className={notFoundCss.link}>
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};
