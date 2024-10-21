/**
 * Componente reutilizável para renderizar um campo de seleção (select).
 *
 * Este componente renderiza um campo de seleção (select) que permite ao usuário escolher uma opção
 * de um conjunto de opções. O componente suporta a exibição de um rótulo (label), opções filhas
 * passadas como elementos filhos e rótulos adicionais na parte inferior do campo de seleção.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.id - O ID do campo de seleção.
 * @param {string} props.label - O rótulo do campo de seleção.
 * @param {boolean} props.required - Indica se o campo de seleção é obrigatório.
 * @param {JSX.Element} props.children - As opções do campo de seleção, passadas como elementos filhos.
 * @param {string} props.value - O valor selecionado no campo de seleção.
 * @param {function} props.valueChange - A função de callback para lidar com a alteração do valor selecionado.
 * @param {string} props.rightLabel - Rótulo que aparece à direita do rótulo principal.
 * @param {string} props.bottomLabel - Rótulo que aparece abaixo do campo de seleção.
 * @param {string} props.bottomRightLabel - Rótulo que aparece abaixo e à direita do campo de seleção.
 * @param {string} props.className - Classes CSS adicionais a serem aplicadas ao campo de seleção.
 * @returns {JSX.Element} O componente de campo de seleção.
 */
export const Select = ({
  id,
  label,
  required,
  children,
  value,
  valueChange,
  rightLabel,
  bottomLabel,
  bottomRightLabel,
  className,
}) => {
  return (
    <div className={`form-control w-full max-w-xs ${className}`}>
      {(label || rightLabel) && (
        <label className="label" htmlFor={id}>
          {label && <span className="label-text">{label}</span>}
          {rightLabel && <span className="label-text-alt">{rightLabel}</span>}
        </label>
      )}
      <select
        name={id}
        id={id}
        className="select select-bordered"
        value={value}
        onChange={valueChange}
        required={required}
      >
        <option value="">Selecione uma</option>
        {children}
      </select>
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
