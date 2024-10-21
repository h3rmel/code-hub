//#region Imports

import { useState, useMemo, useContext } from "react";

import { AppContext } from "@/contexts/app";

import { Modal, Input } from "@/components/Index";
import { CategoriesList, CategoriesListItem } from "./CategoriesList";

import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "@/services/categories";

import { updateState } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

/**
 * Componente de modal para gerenciar categorias.
 *
 * @param {boolean} open - Estado que determina se o modal está aberto.
 * @param {function} setOpen - Função para alterar o estado do modal.
 * @returns {JSX.Element} O componente de modal para gerenciar categorias.
 */
export const ModalCategories = ({ open, setOpen }) => {
  // Contexto e estados
  const { categories, updateCategories } = useContext(AppContext);

  const [newCategory, setNewCategory] = useState({ name: "" });

  // Calcula se o campo foi preenchido
  const fieldCompleted = useMemo(
    () => isObjectComplete(newCategory, ["name"]),
    [newCategory]
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
  const handleAddChange = (event) => {
    updateState(event, setNewCategory);
  };

  /**
   * Adiciona nova categoria e atualiza as categorias do contexto.
   *
   * @param {Event} event - O evento de envio.
   */
  const handleAddSubmit = (event) => {
    event.preventDefault();

    addCategory({ ...newCategory });
    updateCategories();

    setNewCategory({ name: "" });
  };

  /**
   * Exclui uma categoria e atualiza as categorias com Context API.
   *
   * @param {number} id - ID da categoria selecionada.
   */
  const handleDelete = (id) => {
    deleteCategory(id);
    updateCategories();
  };

  /**
   * Atualiza uma categoria existente e atualiza as categorias com Context API.
   *
   * @param {number} id - ID da categoria selecionada.
   * @param {Category} updatedCategory - A categoria já atualizada.
   */
  const handleEdit = (id, updatedCategory) => {
    updateCategory(id, updatedCategory);
    updateCategories();
  };

  //#endregion

  return (
    <Modal id="modalCategories" title="Categorias" open={open}>
      <form
        onSubmit={handleAddSubmit}
        className="flex flex-col sm:flex-row items-end gap-4"
      >
        {/* Formulário para adicionar nova categoria */}
        <Input
          id="name"
          type="text"
          value={newCategory.name}
          valueChange={handleAddChange}
          placeholder="Escreva aqui..."
          label="Nome"
        />
        <button
          className={`btn btn-primary w-full sm:w-auto ${
            fieldCompleted ? "" : "btn-disabled"
          }`}
          type="submit"
        >
          Adicionar
        </button>
      </form>
      {/* Lista de categorias */}
      <CategoriesList>
        {categories.map((category, index) => (
          <CategoriesListItem
            key={category.id}
            category={category}
            index={index}
            deleteCategory={handleDelete}
            editCategory={handleEdit}
          />
        ))}
      </CategoriesList>
      {/* Botão de fechar */}
      <section className="modal-action flex w-full justify-start">
        <button
          className="btn btn-outline btn-error w-full"
          onClick={handleClose}
        >
          Fechar
        </button>
      </section>
    </Modal>
  );
};
