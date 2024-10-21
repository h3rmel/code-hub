import { Link, useRouteError } from "react-router-dom";

import * as notFoundCss from "@modules/notFound.module.css";

export const Error = () => {
  const error = useRouteError();
  return (
    <div className={notFoundCss.container}>
      <div className={notFoundCss.card}>
        <h2>{error.message}</h2>
        <Link to="/" className={notFoundCss.link}>
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};
