// src/components/AdoptionActions.jsx
import { useState } from "react";

export default function AdoptionActions({ onFilterChange }) {
  const [filters, setFilters] = useState({
    species: "",
    sex: "",
    size: "",
    state: "",
    city: "",
    age: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-4">Filtrar Animais</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* Espécie */}
        <div>
          <label className="block text-sm font-medium mb-1">Espécie</label>
          <select
            name="species"
            value={filters.species}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Todas</option>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        {/* Sexo */}
        <div>
          <label className="block text-sm font-medium mb-1">Sexo</label>
          <select
            name="sex"
            value={filters.sex}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Todos</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>
        {/* Porte */}
        <div>
          <label className="block text-sm font-medium mb-1">Porte</label>
          <select
            name="size"
            value={filters.size}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Todos</option>
            <option value="pequeno">Pequeno</option>
            <option value="medio">Médio</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        {/* Estado */}
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            name="state"
            value={filters.state}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Todos</option>
            <option value="PR">PR</option>
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
          </select>
        </div>
        {/* Cidade */}
        <div>
          <label className="block text-sm font-medium mb-1">Cidade</label>
          <select
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Todas</option>
            <option value="Ivaiporã">Ivaiporã</option>
            <option value="Curitiba">Curitiba</option>
            <option value="São Paulo">São Paulo</option>
          </select>
        </div>
        {/* Idade */}
        <div>
          <label className="block text-sm font-medium mb-1">Idade</label>
          <select
            name="age"
            value={filters.age}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Todas</option>
            <option value="0-1">0-1 ano</option>
            <option value="1-3">1-3 anos</option>
            <option value="3-5">3-5 anos</option>
            <option value=">5">5 anos +</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition"
      >
        Buscar
      </button>
    </form>
  );
}
