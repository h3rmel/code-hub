//#region Imports

import { useEffect } from "react";

import { Navbar } from "@/components/Index";

//#endregion

/**
 * Componente de layout principal para as páginas da aplicação.
 *
 * @param {string} pageTitle - O título da página a ser exibido no navegador.
 * @param {ReactNode} children - Os elementos filhos a serem renderizados dentro do layout principal.
 * @returns {JSX.Element} O componente de layout principal.
 */
export const MainLayout = ({ pageTitle, children }) => {
  /**
   * Atualiza o título da página no navegador quando o componente é montado.
   *
   * @effect
   */
  useEffect(() => {
    document.title = `${pageTitle} | SenFinança`;
  }, [pageTitle]);

  return (
    <>
      {/* Barra de navegação compartilhada */}
      <Navbar />
      {/* Área principal do layout */}
      <main className="my-8">{children}</main>
    </>
  );
};
