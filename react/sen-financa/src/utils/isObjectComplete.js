/**
 * Verifica se um objeto possui valores não vazios em determinados campos especificados.
 *
 * @param {Object} obj - O objeto a ser verificado.
 * @param {string[]} fields - Um array contendo os nomes dos campos a serem verificados.
 * @returns {boolean} `true` se todos os campos especificados no objeto não são vazios ("" ou 0), caso contrário, `false`.
 */
export const isObjectComplete = (obj, fields) => {
  return fields.every((field) => obj[field] !== "" && obj[field] !== 0);
};
