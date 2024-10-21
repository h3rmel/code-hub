/**
 * Formata um valor numérico como uma string no formato de moeda brasileira (BRL).
 *
 * @param {number} value - O valor numérico a ser formatado.
 * @returns {string} O valor formatado como uma string no formato de moeda brasileira (BRL).
 */
export const getFormattedValue = (value) => {
  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  
  return new Intl.NumberFormat("pt-BR", options).format(value);
};
