/**
 * Componente reutilizável para renderizar estatísticas ou informações resumidas.
 *
 * Este componente renderiza uma estatística ou informação resumida, consistindo de um título,
 * um valor numérico e uma descrição. É adequado para exibir valores numéricos associados a um
 * título e uma explicação concisa.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.title - O título da estatística.
 * @param {string} props.value - O valor numérico da estatística.
 * @param {string} props.description - A descrição ou explicação da estatística.
 * @returns {JSX.Element} O componente de estatística.
 */
export const Stat = ({ title, value, description }) => {
  return (
    <div className="stat">
      <h3 className="stat-title">{title}</h3>
      <div className="stat-value my-2 text-neutral-200">{value}</div>
      <div className="stat-desc">{description}</div>
    </div>
  );
};
