// src/components/LostAnimalForm.jsx
import { useState } from "react";

export default function LostAnimalForm({ onPublish }) {
  const [formData, setFormData] = useState({
    nome: "",
    image: null,
    especie: "",
    porte: "",
    sexo: "",
    estado: "",
    cidade: "",
    descricao: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    // Validação do campo Nome do Animal
    if (!formData.nome) newErrors.nome = "Campo obrigatório";
    // Validação dos demais campos obrigatórios
    if (!formData.image) newErrors.image = "Campo obrigatório";
    if (!formData.especie) newErrors.especie = "Campo obrigatório";
    if (!formData.porte) newErrors.porte = "Campo obrigatório";
    if (!formData.sexo) newErrors.sexo = "Campo obrigatório";
    if (!formData.estado) newErrors.estado = "Campo obrigatório";
    if (!formData.cidade) newErrors.cidade = "Campo obrigatório";
    if (!formData.descricao) newErrors.descricao = "Campo obrigatório";

    // Pelo menos um dos contatos deve ser preenchido
    if (!formData.email && !formData.phone) {
      newErrors.contact = "Pelo menos um contato (e-mail ou telefone) é obrigatório";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      // Não envia se houver erros
      return;
    }

    console.log("Dados enviados:", formData);
    onPublish(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo Nome do Animal */}
      <div>
        <label className="block mb-1 font-bold">
          Nome do Animal <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Digite o nome do animal"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Imagem */}
        <div>
          <label className="block mb-1 font-bold">
            Imagem <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        {/* Espécie */}
        <div>
          <label className="block mb-1 font-bold">
            Espécie <span className="text-red-500">*</span>
          </label>
          <select
            name="especie"
            value={formData.especie}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione</option>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="outros">Outros</option>
          </select>
          {errors.especie && <p className="text-red-500 text-xs mt-1">{errors.especie}</p>}
        </div>

        {/* Porte */}
        <div>
          <label className="block mb-1 font-bold">
            Porte <span className="text-red-500">*</span>
          </label>
          <select
            name="porte"
            value={formData.porte}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione</option>
            <option value="pequeno">Pequeno</option>
            <option value="medio">Médio</option>
            <option value="grande">Grande</option>
          </select>
          {errors.porte && <p className="text-red-500 text-xs mt-1">{errors.porte}</p>}
        </div>

        {/* Sexo */}
        <div>
          <label className="block mb-1 font-bold">
            Sexo <span className="text-red-500">*</span>
          </label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
          {errors.sexo && <p className="text-red-500 text-xs mt-1">{errors.sexo}</p>}
        </div>

        {/* Estado */}
        <div>
          <label className="block mb-1 font-bold">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione</option>
            <option value="sp">SP</option>
            <option value="rj">RJ</option>
            <option value="mg">MG</option>
          </select>
          {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado}</p>}
        </div>

        {/* Cidade */}
        <div>
          <label className="block mb-1 font-bold">
            Cidade <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            placeholder="Cidade"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.cidade && <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>}
        </div>
      </div>

      {/* Campos para contato */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1 font-bold">
            Contato (E-mail) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplo@dominio.com"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">
            Contato (Telefone) <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="551199123456"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}

      {/* Descrição */}
      <div>
        <label className="block mb-1 font-bold">
          Descrição <span className="text-red-500">*</span>
        </label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descreva os detalhes do resgate, como o local e o contexto..."
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao}</p>}
      </div>

      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
      >
        Publicar
      </button>
    </form>
  );
}
