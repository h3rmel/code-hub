//#region Imports

import { useContext, useState } from "react";

import { AppContext } from "@/contexts/app";

import { MainLayout } from "@/layouts/Index";

import { Table } from "@/components/Index";
import {
  ModalAdd,
  ModalDelete,
  ModalEdit,
  ModalCategories,
} from "@/components/Modals/Index";

import { Plus, Info } from "@phosphor-icons/react";

//#endregion

export const Home = () => {
  // Estados para controlar a exibição dos modais
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalCategoriesCRUD, setOpenModalCategoriesCRUD] = useState(false);

  // Estado para armazenar o ID da transação selecionada para edição ou exclusão
  const [selectedModalId, setSelectedModalId] = useState(0);

  // Obtém as transações do contexto usando Context API
  const { transactions } = useContext(AppContext);

  /**
   * Abre o modal de adição de transação.
   */
  const openAddTransactionModal = () => {
    setOpenModalAdd(true);
  };

  /**
   * Abre o modal de exclusão de transação.
   * @param {number} id - ID da transação selecionada.
   */
  const openDeleteTransactionModal = (id) => {
    setOpenModalDelete(true);
    setSelectedModalId(id);
  };

  /**
   * Abre o modal de edição de transação.
   * @param {number} id - ID da transação selecionada.
   */
  const openEditTransactionModal = (id) => {
    setOpenModalEdit(true);
    setSelectedModalId(id);
  };

  /**
   * Abre o modal de gerenciamento de categorias.
   */
  const openModalCategories = () => {
    setOpenModalCategoriesCRUD(true);
  };

  return (
    <MainLayout pageTitle="Home">
      <section className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between sm:items-center container">
        <hgroup>
          <h1 className="text-4xl font-semibold tracking-wider">SenFinança</h1>
          <p className="text-sm text-neutral-400">
            Seu aplicativo de finanças pessoais!
          </p>
        </hgroup>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={openModalCategories}
          >
            Categorias
          </button>
          <button
            onClick={openAddTransactionModal}
            className="btn btn-primary w-full sm:w-auto"
          >
            Adicionar Transação <Plus size={16} weight="bold" />
          </button>
        </div>
      </section>
      <div className="divider" />
      <section className="container flex flex-col justify-center">
        {transactions.length > 0 ? (
          <Table
            openDeleteModal={openDeleteTransactionModal}
            openEditModal={openEditTransactionModal}
          />
        ) : (
          <article className="alert alert-info w-fit mx-auto">
            <Info size={24} weight="bold" />
            <span>Nenhuma transação registrada.</span>
          </article>
        )}
      </section>
      <ModalAdd open={openModalAdd} setOpen={setOpenModalAdd} />
      <ModalDelete
        id={selectedModalId}
        open={openModalDelete}
        setOpen={setOpenModalDelete}
      />
      <ModalEdit
        id={selectedModalId}
        open={openModalEdit}
        setOpen={setOpenModalEdit}
      />
      <ModalCategories
        open={openModalCategoriesCRUD}
        setOpen={setOpenModalCategoriesCRUD}
      />
    </MainLayout>
  );
};
