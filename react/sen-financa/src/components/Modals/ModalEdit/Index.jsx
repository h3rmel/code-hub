//#region Imports

import { useEffect, useState, useMemo, useContext } from "react";

import { AppContext } from "@/contexts/app";

import { Modal, Input, Select } from "@/components/Index";

import { IMaskInput } from "react-imask";

import { getTransactionById, updateTransaction } from "@/services/transactions";

import { updateState, updateStateMaskedInput } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

/**
 * Componente de modal para edição de uma transação existente.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {number} props.id - O ID da transação a ser editada.
 * @param {boolean} props.open - Indica se o modal está aberto.
 * @param {function} props.setOpen - Função para controlar o estado do modal.
 * @returns {JSX.Element} O componente de modal para edição de uma transação.
 */
export const ModalEdit = ({ id, open, setOpen }) => {
  // Estado para armazenar os campos da nova transação em edição
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    title: "",
    type: "",
    category: "",
    value: 0,
    createdAt: "",
  });

  // Calcula se todos os campos estão preenchidos
  const fieldsCompleted = useMemo(
    () =>
      isObjectComplete(newTransaction, [
        "title",
        "type",
        "category",
        "value",
        "createdAt",
      ]),
    [newTransaction]
  );

  // Obtém o contexto da aplicação para acesso a transações e categorias
  const { updateTransactions, categories } = useContext(AppContext);

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
   * Manipula as mudanças nos campos do formulário.
   *
   * @param {Event} event - O evento de mudança.
   */
  const handleChange = (event) => {
    updateState(event, setNewTransaction);
  };

  /**
   * Manipula as mudanças nos campos do formulário com máscara.
   *
   * @param {string} value - O valor com máscara.
   * @param {Event} event - O evento que acionou a mudança.
   */
  const handleMaskChange = (value, event) => {
    if (!event) return;

    updateStateMaskedInput(value, event, setNewTransaction);
  };

  /**
   * Manipula o envio do formulário.
   *
   * @param {Event} event - O evento de envio.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Atualiza a transação usando o ID fornecido
    updateTransaction(id, newTransaction);

    // Atualiza as transações após a edição
    updateTransactions();

    // Fecha o Modal
    setOpen(false);
  };

  // Preenche o formulário com os dados da transação a ser editada
  useEffect(() => {
    const oldTransaction = getTransactionById(id);
    setNewTransaction((prevNewTransaction) => ({
      ...prevNewTransaction,
      ...oldTransaction,
    }));
  }, [id]);

  //#endregion

  return (
    <Modal id="editTransaction" title="Adicionar Transação" open={open}>
      <form className="flex flex-wrap justify-evenly mt-2">
        {/* Campos do formulário */}
        <Input
          id="title"
          type="text"
          value={newTransaction.title}
          valueChange={handleChange}
          placeholder="Escreva aqui..."
          label="Título"
        />
        <Select
          id="type"
          value={newTransaction.type}
          valueChange={handleChange}
          label="Tipo"
        >
          <option value="income">Entrada</option>
          <option value="expense">Sáida</option>
        </Select>
        <Select
          id="category"
          value={newTransaction.category}
          valueChange={handleChange}
          label="Categoria"
        >
          {categories.map((category, index) => (
            <option key={index} value={category.name} className="capitalize">
              {category.name}
            </option>
          ))}
        </Select>
        <Input
          id="value"
          type="number"
          value={newTransaction.value}
          valueChange={handleChange}
          placeholder="Valor aqui..."
          label="Valor"
        />
        <div className="form-control w-full max-w-xs">
          <label htmlFor="createdAt" className="label">
            <span className="label-text">Data</span>
          </label>
          <IMaskInput
            mask="00/00/0000"
            name="createdAt"
            id="createdAt"
            value={newTransaction.createdAt}
            onAccept={(value, mask, event) => handleMaskChange(value, event)}
            required
            placeholder="00/00/0000"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        {/* Botões de ação */}
        <section className="modal-action flex gap-2 w-full">
          <button
            onClick={handleClose}
            className="btn btn-outline btn-error flex-grow"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className={`btn btn-primary flex-grow ${
              fieldsCompleted ? "" : "btn-disabled"
            }`}
            type="submit"
          >
            Atualizar
          </button>
        </section>
      </form>
    </Modal>
  );
};
