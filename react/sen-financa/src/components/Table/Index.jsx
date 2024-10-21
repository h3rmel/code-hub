//#region Imports

import { useContext, useMemo, useState } from "react";

import { AppContext } from "@/contexts/app";

import { Select, Input, Stat } from "@/components/Index";

import { IMaskInput } from "react-imask";

import {
  ArrowDown,
  ArrowUp,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";

import { updateState, updateStateMaskedInput } from "@/utils/updateState";
import { getFormattedValue } from "@/utils/formattedValue";
import { getEntries } from "@/services/transactions";

//#endregion

/**
 * Componente que exibe um conjunto de filtros, uma tabela de transações e estatísticas relacionadas.
 *
 * Este componente exibe uma seção com opções de filtragem, uma tabela de transações ordenável
 * e estatísticas resumidas relacionadas às transações exibidas.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {function} props.openDeleteModal - Função para abrir o modal de exclusão de transação.
 * @param {function} props.openEditModal - Função para abrir o modal de edição de transação.
 * @returns {JSX.Element} O componente que exibe filtros, tabela de transações e estatísticas.
 */
export const Table = ({ openDeleteModal, openEditModal }) => {
  // Estados para os filtros e classificação
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    title: "",
    valueMin: 0,
    valueMax: 0,
    createdAt: "",
  });

  const [sorter, setSorter] = useState({
    field: null,
    order: "asc",
  });

  // Obtém os dados de transações e categorias do contexto
  const { transactions, categories } = useContext(AppContext);

  //#region Methods

  /**
   * Manipula a ação de ordenação das transações com base no campo e na ordem especificados.
   *
   * @param {string} field - O campo pelo qual as transações devem ser ordenadas.
   * @param {string} order - A ordem de ordenação, que pode ser "asc" (ascendente) ou "desc" (descendente).
   */
  const handleSort = (field, order) => {
    setSorter({
      field: field,
      order: order,
    });
  };

  /**
   * Ordena as transações com base nos critérios de ordenação definidos.
   *
   * @returns {Array} Uma matriz de transações ordenadas de acordo com os critérios de ordenação definidos.
   */
  const sortedTransactions = useMemo(() => {
    let sorted = [...transactions];

    if (sorter.field) {
      sorted = sorted.sort((a, b) => {
        const valueA = a[sorter.field];
        const valueB = b[sorter.field];

        // Verifica se os valores são números para ordenação númerica ou strings para ordenação alfabética
        if (typeof valueA === "number" && typeof valueB === "number")
          return sorter.order === "asc" ? valueA - valueB : valueB - valueA;
        else
          return sorter.order === "asc"
            ? valueA.toString().localeCompare(valueB.toString())
            : valueB.toString().localeCompare(valueA.toString());
      });
    }

    return sorted;
  }, [transactions, sorter]);

  /**
   * Filtra as transações com base nos filtros definidos.
   *
   * @returns {Array} Uma matriz de transações filtradas de acordo com os filtros definidos.
   */
  const filteredTransactions = useMemo(() => {
    return sortedTransactions.filter((transaction) => {
      const valueInRange =
        (filters.valueMin === 0 ||
          filters.valueMin === "" ||
          transaction.value >= parseFloat(filters.valueMin)) &&
        (filters.valueMax === 0 ||
          filters.valueMax === "" ||
          transaction.value <= parseFloat(filters.valueMax));
      if (
        // Verificação de Tipo
        (filters.type === "all" || transaction.type === filters.type) &&
        // Verificação de categoria
        (filters.category === "all" ||
          transaction.category === filters.category) &&
        // Verificação de título
        (filters.title === "" ||
          transaction.title
            .toLowerCase()
            .includes(filters.title.toLowerCase())) &&
        // Verificação de Valor
        valueInRange &&
        // Verificação de data
        (filters.createdAt === "" ||
          transaction.createdAt.includes(filters.createdAt))
      )
        return true;

      return false;
    });
  }, [sortedTransactions, filters]);

  /**
   * Manipula as mudanças nos campos do formulário.
   *
   * @param {Event} event - O evento de mudança.
   */
  const handleChange = (event) => {
    updateState(event, setFilters);
  };

  /**
   * Manipula as mudanças nos campos do formulário com máscara.
   *
   * @param {string} value - O valor com máscara.
   * @param {Event} event - O evento que acionou a mudança.
   */
  const handleMaskChange = (value, event) => {
    updateStateMaskedInput(value, event, setFilters);
  };

  // Redefine os filtros e classificação
  const resetFiltersAndSorters = () => {
    setFilters({
      type: "all",
      category: "all",
      title: "",
      valueMin: 0,
      valueMax: 0,
      createdAt: "",
    });

    setSorter({
      field: null,
      order: "asc",
    });
  };

  //#endregion

  return (
    <>
      {/* Seção de filtros colapsável */}
      <article className="collapse collapse-arrow sm:max-w-xl sm:w-max bg-base-100 mb-8 border-[1px] border-neutral shadow-lg hover:outline-none focus:outline-none focus-visible:outline-none">
        <input type="checkbox" className="w-auto" />
        <div className="collapse-title text-xl font-medium">Filtros</div>
        <div className="collapse-content flex flex-row flex-wrap justify-center sm:justify-start items-end gap-4">
          <Input
            id="title"
            type="text"
            value={filters.title}
            valueChange={handleChange}
            label="Título"
            placeholder="Escreva aqui..."
            className="max-w-none sm:basis-[48%]"
          />
          <Select
            id="type"
            value={filters.type}
            valueChange={handleChange}
            label="Tipo"
            className="max-w-none sm:basis-[48%]"
          >
            <option value="all">Todos</option>
            <option value="income">Entrada</option>
            <option value="expense">Sáida</option>
          </Select>
          <Select
            id="category"
            value={filters.category}
            valueChange={handleChange}
            label="Categoria"
            className="max-w-none sm:basis-[48%]"
          >
            <option value="all">Todas</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name} className="capitalize">
                {category.name}
              </option>
            ))}
          </Select>
          <div className="form-control w-full max-w-none sm:basis-[48%]">
            <label htmlFor="createdAt" className="label">
              <span className="label-text">Data</span>
            </label>
            <IMaskInput
              mask="00/00/0000"
              name="createdAt"
              id="createdAt"
              value={filters.createdAt}
              onAccept={(value, mask, event) => handleMaskChange(value, event)}
              required
              placeholder="00/00/0000"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <Input
            id="valueMin"
            type="number"
            value={filters.valueMin}
            valueChange={handleChange}
            label="Valor Mínimo (R$)"
            placeholder="Escreva aqui..."
            className="max-w-none sm:basis-[48%]"
          />
          <Input
            id="valueMax"
            type="number"
            value={filters.valueMax}
            valueChange={handleChange}
            label="Valor Máximo (R$)"
            placeholder="Escreva aqui..."
            className="max-w-none sm:basis-[48%]"
          />
          <button
            className="btn btn-primary w-full"
            onClick={resetFiltersAndSorters}
          >
            Resetar Filtros
          </button>
        </div>
      </article>
      {/* Tabela de transações */}
      <article className="card bg-base-100 w-full border-[1px] border-neutral overflow-x-auto shadow-lg">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr className="text-base">
                <th>#</th>
                <th>
                  <div className="flex items-center gap-2">
                    Título
                    <button
                      onClick={() => handleSort("title", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("title", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Tipo
                    <button
                      onClick={() => handleSort("type", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("type", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Categoria
                    <button
                      onClick={() => handleSort("category", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("category", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Valor
                    <button
                      onClick={() => handleSort("value", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("value", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-2">
                    Data
                    <button
                      onClick={() => handleSort("createdAt", "asc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowUp size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleSort("createdAt", "desc")}
                      className="btn btn-ghost min-h-0 h-fit p-1 flex justify-center items-center"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </button>
                  </div>
                </th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id} className="text-md">
                  <th>{index + 1}</th>
                  <td className="capitalize">{transaction.title}</td>
                  <td className="capitalize">
                    {transaction.type === "income" ? "Entrada" : "Saída"}
                  </td>
                  <td className="capitalize">{transaction.category}</td>
                  <td>{getFormattedValue(transaction.value)}</td>
                  <td>{transaction.createdAt}</td>
                  <td className="flex gap-2">
                    <div className="tooltip tooltip-info" data-tip="Remover">
                      <button
                        onClick={() => openDeleteModal(transaction.id)}
                        className="btn btn-error btn-square text-white"
                      >
                        <TrashSimple size={20} weight="bold" />
                      </button>
                    </div>
                    <div className="tooltip tooltip-info" data-tip="Editar">
                      <button
                        onClick={() => openEditModal(transaction.id)}
                        className="btn btn-primary btn-square"
                      >
                        <PencilSimple size={20} weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      {/* Estatísticas relacionadas às transações */}
      <article className="stats w-full overflow-x-auto border-[1px] border-neutral shadow-xl mt-8">
        <Stat
          title={`Total (${getEntries("", "", true)})`}
          value={getFormattedValue(getEntries("", ""))}
          description="Valor total das entradas e saídas."
        />
        <Stat
          title={`Entradas (${getEntries("type", "income", true)})`}
          value={getFormattedValue(getEntries("", "income"))}
          description="Valor total somente das entradas."
        />
        <Stat
          title={`Saídas (${getEntries("type", "expense", true)})`}
          value={getFormattedValue(getEntries("type", "expense"))}
          description="Valor total somente das saídas."
        />
        {filters.category !== "all" && (
          <Stat
            title={`Total - ${filters.category} (${getEntries(
              "category",
              filters.category,
              true
            )})`}
            value={getFormattedValue(getEntries("category", filters.category))}
            description={`Valor total de gastos com (${filters.category})`}
          />
        )}
      </article>
    </>
  );
};
