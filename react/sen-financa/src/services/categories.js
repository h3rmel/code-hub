/**
 * Módulo responsável pelas operações CRUD (Create, Read, Update, Delete) de categorias usando o localStorage.
 */

import { initialCategories } from "@/constants/initialCategories.json";

// Chave de armazenamento para as categorias
const CATEGORY_STORAGE_KEY = "sf-categories";

/**
 * Classe que define a estrutura de uma categoria.
 */
class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

/**
 * Retorna as categorias armazenadas no localStorage ou as categorias iniciais se não houver nenhuma.
 *
 * @returns {Category[]} Um array de objetos de categoria.
 */
const getCategories = () => {
  return JSON.parse(localStorage.getItem(CATEGORY_STORAGE_KEY)) || initialCategories;
};

/**
 * Salva as categorias no localStorage.
 *
 * @param {Category[]} categories - Um array de objetos de categoria a serem salvos.
 */
const saveCategories = (categories) => {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
};

/**
 * Adiciona uma nova categoria.
 *
 * @param {object} categoryData - Os dados da categoria a serem adicionados.
 * @param {string} categoryData.name - O nome da nova categoria.
 * @returns {Category} A categoria recém-adicionada.
 */
const addCategory = ({ name }) => {
  const id = new Date().getTime();

  const newCategory = new Category(id, name);

  let categories = getCategories();

  categories.unshift(newCategory);
  saveCategories(categories);

  return newCategory;
};

/**
 * Atualiza uma categoria existente.
 *
 * @param {number} id - O ID da categoria a ser atualizada.
 * @param {object} updatedCategory - Os novos dados da categoria.
 * @returns {Category|null} A categoria atualizada ou `null` se a categoria não for encontrada.
 */
const updateCategory = (id, updatedCategory) => {
  let categories = getCategories();
  const index = categories.findIndex((category) => category.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updatedCategory };
    saveCategories(categories);
    return categories[index];
  }
  return null;
};

/**
 * Exclui uma categoria pelo seu ID.
 *
 * @param {number} id - O ID da categoria a ser excluída.
 */
const deleteCategory = (id) => {
  let categories = getCategories();
  categories = categories.filter((category) => category.id !== id);
  saveCategories(categories);
};

/**
 * Retorna todas as categorias.
 *
 * @returns {Category[]} Um array contendo todas as categorias.
 */
const getAllCategories = () => {
  return getCategories();
};

/**
 * Retorna uma categoria pelo seu ID.
 *
 * @param {number} id - O ID da categoria a ser encontrada.
 * @returns {Category|undefined} A categoria correspondente ou `undefined` se não encontrada.
 */
const getCategoryById = (id) => {
  let categories = getCategories();
  return categories.find((category) => category.id === id);
}

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
