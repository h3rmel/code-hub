import { useState } from "react";

/**
 * Componente para um botão de confirmação que requer cliques repetidos para ação.
 *
 * @param {function} onFirstClick - Função opcional a ser chamada no primeiro clique.
 * @param {function} onConfirm - Função a ser chamada após o número especificado de cliques.
 * @param {number} times - Número de cliques necessários para acionar a função de confirmação.
 * @param {string[]} messages - Mensagens correspondentes aos diferentes estados de cliques.
 * @param {string[]} dialog - Textos correspondentes aos diferentes estados de cliques no botão.
 * @param {string} className - Classe CSS adicional a ser aplicada ao botão.
 * @returns {JSX.Element} O componente do botão de confirmação.
 */
export const ConfirmButton = ({
  onFirstClick = null,
  onConfirm,
  times = 2,
  messages,
  dialog,
  className,
}) => {
  // Estado para contar o número de cliques
  const [timesPressed, setTimesPressed] = useState(0);

  /**
   * Manipula o clique no botão.
   */
  const onPress = () => {
    setTimesPressed(timesPressed + 1);

    // Chama a função de primeiro clique se fornecida
    if (onFirstClick) onFirstClick();

    // Chama a função de confirmação quando o número de cliques atinge o limite
    if (timesPressed + 1 === times) {
      onConfirm();
      setTimesPressed(0);
    }
  };

  return (
    <div
      className="tooltip tooltip-info"
      data-tip={`${messages[timesPressed]}`}
    >
      {/* Botão de confirmação */}
      <button className={`btn ${className}`} onClick={onPress}>
        {dialog[timesPressed]}
      </button>
    </div>
  );
};
