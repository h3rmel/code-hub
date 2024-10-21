/**
 * Obtém a data atual formatada como uma string no formato "dd/mm/yyyy".
 *
 * @returns {string} A data formatada no formato "dd/mm/yyyy".
 */
export const getFormattedDate = () => {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getDate() - 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());

  return `${day}/${month}/${year}`;
};
