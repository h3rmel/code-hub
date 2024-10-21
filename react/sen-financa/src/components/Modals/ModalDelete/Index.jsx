//#region Imports

import { useContext } from "react";

import { AppContext } from "@/contexts/app";

import { Modal } from "@/components/Index";

import { deleteTransaction } from "@/services/transactions";

//#endregion

/**
 * Componente de modal para confirmar a exclusão de uma transação.
 *
 * @param {number} id - O ID da transação a ser excluída.
 * @param {boolean} open - Indica se o modal está aberto.
 * @param {function} setOpen - Função para controlar o estado do modal.
 * @returns {JSX.Element} O componente de modal para confirmar a exclusão de uma transação.
 */
export const ModalDelete = ({ id, open, setOpen }) => {
  const { updateTransactions } = useContext(AppContext);

  //#region Methods

  /**
   * Manipula o fechamento do modal.
   *
   * @param {Event} event - O evento de clique.
   */
  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  /**
   * Manipula a submissão do formulário de exclusão.
   *
   * @param {Event} event - O evento de clique.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Deleta a transação usando o ID fornecido
    deleteTransaction(id);

    // Atualiza as transações após a exclusão
    updateTransactions();

    // Fecha o modal
    setOpen(false);
  };

  //#endregion

  return (
    <Modal
      id="removeTransaction"
      title="Remover transação"
      open={open}
      className="max-w-none w-fit"
    >
      <form className="flex justify-between flex-wrap mt-2">
        <p>Você tem certeza que deseja excluir esta transação? 🤔</p>
        <section className="modal-action flex gap-2 w-full">
          {/* Botão para cancelar a exclusão */}
          <button onClick={handleClose} className="btn btn-outline flex-grow">
            Cancelar
          </button>
          {/* Botão para confirmar a exclusão */}
          <button onClick={handleSubmit} className="btn btn-error flex-grow">
            Remover
          </button>
        </section>
      </form>
    </Modal>
  );
};
