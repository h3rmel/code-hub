//#region Imports

import { useState, useMemo } from "react";

import { ConfirmButton, Input } from "@/components/Index";

import { Check, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import { updateState } from "@/utils/updateState";
import { isObjectComplete } from "@/utils/isObjectComplete";

//#endregion

/**
 * Componente que renderiza uma lista de categorias.
 *
 * @param {React.ReactNode} children - Os elementos filho, representando itens de categoria.
 * @returns {JSX.Element} Componente de lista de categorias.
 */
export const CategoriesList = ({ children }) => {
  return (
    <ul className="bg-neutral py-7 border-[1px] border-neutral-50/10 mt-4 rounded-2xl max-h-96 overflow-y-auto">
      {children}
    </ul>
  );
};

/**
 * Componente que renderiza um item de categoria.
 *
 * @param {Object} category - Os dados da categoria.
 * @param {number} index - O índice do item na lista.
 * @param {function} deleteCategory - Função para deletar uma categoria.
 * @param {function} editCategory - Função para editar uma categoria.
 * @returns {JSX.Element} Componente de item de categoria.
 */
export const CategoriesListItem = ({
  category,
  index,
  deleteCategory,
  editCategory,
}) => {
  // Estados e variáveis
  const [newCategory, setNewCategory] = useState({ ...category });
  const [isEditing, setIsEditing] = useState(false);

  // Verifica se o campo de nome da categoria foi preenchido
  const fieldCompleted = useMemo(
    () => isObjectComplete(newCategory, ["name"]),
    [newCategory]
  );

  //#region Methods

  /**
   * Manipula as mudanças nos campos do formulário.
   *
   * @param {Event} event - O evento de mudança.
   */
  const handleChange = (event) => {
    updateState(event, setNewCategory);
  };

  /**
   * Manipula o envio do formulário de edição da categoria.
   *
   * Este método é chamado quando o usuário confirma a edição da categoria.
   * Ele invoca a função 'editCategory' para atualizar os dados da categoria
   * existente com os novos valores do estado 'newCategory'.
   * Em seguida, define o estado 'isEditing' como 'false' para sair do modo de edição.
   */
  const handleSubmit = () => {
    editCategory(category.id, newCategory);
    setIsEditing(false);
  };

  //#endregion

  return (
    <li
      className={`flex items-center justify-between px-6 py-2 ${
        index === 0 ? "border-y-[1px]" : "border-b-[1px]"
      } border-base-100/50`}
    >
      {isEditing ? (
        <Input
          id="name"
          type="text"
          value={newCategory.name}
          valueChange={handleChange}
          placeholder="Escreva aqui..."
        />
      ) : (
        <p className="text-lg capitalize">{category.name}</p>
      )}
      <div className="flex gap-2">
        {/* Botão de confirmação para excluir */}
        <ConfirmButton
          onConfirm={() => deleteCategory(category.id)}
          className="btn-error btn-square text-neutral-50"
          messages={["Remover", "Confirmar"]}
          dialog={[
            <TrashSimple size={20} weight="bold" />,
            <Check size={20} weight="bold" />,
          ]}
        />
        {/* Botão de confirmação para editar */}
        <ConfirmButton
          onFirstClick={() => setIsEditing(true)}
          onConfirm={handleSubmit}
          messages={["Editar", "Confirmar"]}
          dialog={[
            <PencilSimple size={20} weight="bold" />,
            <Check size={20} weight="bold" />,
          ]}
          className={`btn-primary btn-square text-neutral-50 ${
            fieldCompleted ? "" : "btn-disabled"
          }`}
        />
      </div>
    </li>
  );
};
