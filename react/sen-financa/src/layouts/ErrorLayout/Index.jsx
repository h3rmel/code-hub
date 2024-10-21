//#region Imports

import { useEffect } from "react";

import { Link } from "react-router-dom";

//#endregion

/**
 * Componente de layout para exibir mensagens de erro.
 *
 * @param {string} pageTitle - O título da página de erro.
 * @param {string} message - A mensagem de erro a ser exibida.
 * @returns {JSX.Element} O componente de layout de erro.
 */
export const ErrorLayout = ({ pageTitle, message }) => {
  /**
   * Atualiza o título da página no navegador quando o componente é montado.
   *
   * @effect
   */
  useEffect(() => {
    document.title = `${pageTitle} | SenFinança`;
  }, [pageTitle]);

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <article className="card mx-4 sm:w-5/12 bg-neutral shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{pageTitle}</h2>
          <p>{message}</p>
          <div className="card-actions mt-4">
            {/* Botão para voltar à página inicial */}
            <Link to="/" className="btn btn-error w-full">
              Voltar
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};
