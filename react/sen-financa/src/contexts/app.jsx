//#region Imports

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAllTransactions } from "@/services/transactions";
import { getAllCategories } from "@/services/categories";

//#endregion

/**
 * Contexto da aplicação que fornece estados globais e funções relacionadas.
 */
const AppContext = createContext();

/**
 * Provedor do contexto da aplicação que gerencia os estados globais.
 *
 * @param {object} children - Os componentes filhos que terão acesso ao contexto.
 * @returns {JSX.Element} O componente do provedor de contexto.
 */
const AppProvider = ({ children }) => {
  // Estado para armazenar as transações
  const [transactions, setTransactions] = useState([]);

  // Estado para armazenar as categorias
  const [categories, setCategories] = useState([]);

  /**
   * Função para atualizar as transações com base nos dados salvos.
   */
  const updateTransactions = useCallback(() => {
    const savedTransactions = getAllTransactions();
    setTransactions(savedTransactions);
  }, []);

  /**
   * Função para atualizar as categorias com base nos dados salvos.
   */
  const updateCategories = useCallback(() => {
    const savedCategories = getAllCategories();
    setCategories(savedCategories);
  }, []);

  // Executa as funções de atualização ao montar o componente
  useEffect(() => {
    updateTransactions();
    updateCategories();
  }, []);

  return (
    // Fornece os estados globais e funções relacionadas ao contexto
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        updateTransactions,
        categories,
        setCategories,
        updateCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
