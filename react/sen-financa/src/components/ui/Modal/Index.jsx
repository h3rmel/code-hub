/**
 * Componente reutilizável para renderizar um modal.
 *
 * Este componente renderiza um modal que pode ser usado para exibir conteúdo como um formulário,
 * detalhes de uma transação, etc. O modal é exibido com um título e o conteúdo é passado através
 * das propriedades `children`.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.id - O ID do modal.
 * @param {string} props.title - O título do modal.
 * @param {JSX.Element} props.children - O conteúdo do modal, passado como elementos filhos.
 * @param {string} props.className - Classes CSS adicionais a serem aplicadas ao modal.
 * @param {boolean} props.open - Indica se o modal está aberto ou fechado.
 * @returns {JSX.Element} O componente de modal.
 */
export const Modal = ({ id, title, children, className, open }) => {
  return (
    <dialog id={id} className="modal bg-overlay" open={open}>
      <div className={`modal-box mx-4 max-w-[800px] w-fit-content ${className}`}>
        {/* Título do Modal */}
        <h3 className="font-semibold text-lg">{title}</h3>
        {/* Conteúdo do Modal */}
        {children}
      </div>
    </dialog>
  );
};
