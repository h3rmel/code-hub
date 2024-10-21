/**
 * Componente reutilizável para renderizar um campo de entrada de dados.
 *
 * Este componente renderiza um campo de entrada HTML e inclui suporte para rótulos e informações
 * adicionais abaixo ou à direita do campo.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.id - O ID do campo de entrada.
 * @param {string} props.type - O tipo do campo de entrada (por exemplo, 'text', 'number', etc.).
 * @param {string} props.placeholder - O texto de placeholder exibido no campo de entrada.
 * @param {function} props.valueChange - Função chamada quando o valor do campo de entrada muda.
 * @param {string} props.value - O valor atual do campo de entrada.
 * @param {string} props.label - O rótulo do campo de entrada exibido acima do campo.
 * @param {boolean} props.required - Indica se o campo de entrada é obrigatório.
 * @param {string} props.rightLabel - Rótulo adicional exibido à direita do campo.
 * @param {string} props.bottomLabel - Rótulo adicional exibido abaixo do campo.
 * @param {string} props.bottomRightLabel - Rótulo adicional exibido abaixo e à direita do campo.
 * @param {string} props.className - Classes CSS adicionais a serem aplicadas ao componente.
 * @returns {JSX.Element} O componente de campo de entrada.
 */
export const Input = ({
  id,
  type,
  placeholder,
  valueChange,
  value,
  label,
  required,
  rightLabel,
  bottomLabel,
  bottomRightLabel,
  className,
}) => {
  return (
    <div className={`form-control w-full max-w-xs ${className}`}>
      {/* Label acima do campo */}
      {(label || rightLabel) && (
        <label className="label" htmlFor={id}>
          {label && <span className="label-text">{label}</span>}
          {rightLabel && <span className="label-text-alt">{rightLabel}</span>}
        </label>
      )}
      {/* Campo de Entrada */}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={valueChange}
        placeholder={placeholder}
        required={required}
        className="input input-bordered w-full max-w-xs"
      />
      {/* Label abaixo do campo */}
      {(bottomLabel || bottomRightLabel) && (
        <label className="label" htmlFor={id}>
          {bottomLabel && <span className="label-text-alt">{bottomLabel}</span>}
          {bottomRightLabel && (
            <span className="label-text-alt">{bottomRightLabel}</span>
          )}
        </label>
      )}
    </div>
  );
};
