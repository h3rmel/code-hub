/**
 * Atualiza um estado do componente com base em um evento de mudança de valor.
 *
 * @param {Event} event - O evento de mudança que contém informações sobre o alvo da mudança.
 * @param {function} setState - A função de estado do React para atualizar o estado.
 */
export const updateState = (event, setState) => {
  const { name, value } = event.target;

  setState((prevState) => ({ ...prevState, [name]: value }));
};

/**
 * Atualiza um estado do componente com base em um valor e um evento de mudança.
 * Esta função é usada em componentes que possuem entradas mascaradas ou outros elementos de entrada personalizados.
 *
 * @param {string} value - O valor a ser atualizado no estado.
 * @param {Event} event - O evento que desencadeou a atualização, contendo informações sobre o alvo da mudança.
 * @param {function} setState - A função de estado do React para atualizar o estado.
 */
export const updateStateMaskedInput = (value, event, setState) => {
  const name = event.target.name;
  if (name !== undefined)
    setState((prevState) => ({ ...prevState, [name]: value }));
};
