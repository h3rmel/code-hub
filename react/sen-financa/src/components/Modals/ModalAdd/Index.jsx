//#region Imports

import { useContext, useMemo, useState } from "react";

import { AppContext } from "@/contexts/app";

import { Modal, Input, Select } from "@/components/Index";

import { IMaskInput } from "react-imask";

import { addTransaction } from "@/services/transactions";

import { updateState, updateStateMaskedInput } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

/**
 * Componente de modal para adicionar uma nova transação.
 *
 * @param {boolean} open - Estado que determina se o modal está aberto.
 * @param {function} setOpen - Função para alterar o estado do modal.
 * @returns {JSX.Element} O componente de modal para adicionar transação.
 */
export const ModalAdd = ({ open, setOpen }) => {
  // Contexto e estados
  const { updateTransactions, categories } = useContext(AppContext);

  const [newTransaction, setNewTransaction] = useState({
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
    updateStateMaskedInput(value, event, setNewTransaction);
  };

  /**
   * Manipula o envio do formulário.
   *
   * @param {Event} event - O evento de envio.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Adiciona nova transação
    addTransaction({ ...newTransaction });

    // Atualiza as transações após a adição
    updateTransactions();

    // Limpa o estado React newTransaction
    setNewTransaction({
      title: "",
      type: "",
      category: "",
      value: 0,
    });

    // Fecha o Modal
    setOpen(false);
  };

  //#endregion

  return (
    <Modal id="addTransaction" title="Adicionar Transação" open={open}>
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
          <option value="expense">Saída</option>
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
          >
            Adicionar
          </button>
        </section>
      </form>
    </Modal>
  );
};
