/**
 * Módulo responsável pelas operações CRUD (Create, Read, Update, Delete) de transações usando o localStorage.
 */

// Importa a função para obter a data formatada
import { getFormattedDate } from "@/utils/formattedDate";

// Chave de armazenamento para as transações
const STORAGE_KEY = "sf-transactions";

/**
 * Classe que define a estrutura de uma transação.
 */
class Transaction {
  constructor(id, title, type, category, value, createdAt) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.category = category;
    this.value = value;
    this.createdAt = createdAt;
  }
}

/**
 * Retorna as transações armazenadas no localStorage ou um array vazio se não houver nenhuma.
 *
 * @returns {Transaction[]} Um array de objetos de transação.
 */
const getTransactions = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

/**
 * Salva as transações no localStorage.
 *
 * @param {Transaction[]} transactions - Um array de objetos de transação a serem salvos.
 */
const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

/**
 * Adiciona uma nova transação.
 *
 * @param {object} transactionData - Os dados da transação a serem adicionados.
 * @param {string} transactionData.title - O título da nova transação.
 * @param {string} transactionData.type - O tipo da transação (income ou expense).
 * @param {string} transactionData.category - A categoria da transação.
 * @param {number} transactionData.value - O valor da transação.
 * @returns {Transaction} A transação recém-adicionada.
 */
const addTransaction = ({ title, type, category, value }) => {
  const createdAt = getFormattedDate();
  const id = new Date().getTime();

  const newTransaction = new Transaction(
    id,
    title,
    type,
    category,
    parseFloat(value),
    createdAt
  );

  let transactions = getTransactions();

  transactions.push(newTransaction);
  saveTransactions(transactions);

  return newTransaction;
};

/**
 * Atualiza uma transação existente.
 *
 * @param {number} id - O ID da transação a ser atualizada.
 * @param {object} updatedTransaction - Os novos dados da transação.
 * @returns {Transaction|null} A transação atualizada ou `null` se a transação não for encontrada.
 */
const updateTransaction = (id, updatedTransaction) => {
  let transactions = getTransactions();
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updatedTransaction };
    saveTransactions(transactions);
    return transactions[index];
  }
  return null;
};

/**
 * Exclui uma transação pelo seu ID.
 *
 * @param {number} id - O ID da transação a ser excluída.
 */
const deleteTransaction = (id) => {
  let transactions = getTransactions();
  transactions = transactions.filter((transaction) => transaction.id !== id);
  saveTransactions(transactions);
};

/**
 * Retorna todas as transações.
 *
 * @returns {Transaction[]} Um array contendo todas as transações.
 */
const getAllTransactions = () => {
  return getTransactions();
};

/**
 * Retorna uma transação pelo seu ID.
 *
 * @param {number} id - O ID da transação a ser encontrada.
 * @returns {Transaction|undefined} A transação correspondente ou `undefined` se não encontrada.
 */
const getTransactionById = (id) => {
  let transactions = getTransactions();
  return transactions.find((transaction) => transaction.id === id);
};

/**
 * Retorna o valor total ou o número total de transações com base em um filtro.
 *
 * @param {string} filterType - O tipo de filtro (campo) a ser aplicado.
 * @param {string|number} filterValue - O valor de filtro a ser comparado.
 * @param {boolean} returnLength - Indica se o valor total ou o número total de transações deve ser retornado.
 * @returns {number} O valor total ou o número total de transações.
 */
const getEntries = (filterType, filterValue, returnLength = false) => {
  const transactions = getTransactions();

  const filteredTransactions = filterType
    ? transactions.filter((transaction) => transaction[filterType] === filterValue)
    : transactions;

  const totalLength = filteredTransactions.length;

  const totalValue = filteredTransactions.reduce((accumulator, transaction) => {
    if (transaction.type === "income") {
      return accumulator + parseFloat(transaction.value);
    } else if (transaction.type === "expense") {
      return accumulator - parseFloat(transaction.value);
    }
    return accumulator;
  }, 0);

  if (returnLength) return totalLength;
  else return totalValue;
};

export {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  getEntries
};
