// src/pages/CadastroAdocao.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask"; // Importa o IMaskInput
import { supabase } from "../supabaseClient";
import Hero from "../components/Hero";
import cadastroAdocaoImg from "../assets/cadastroAdocaoImg.png"; // Corrija o caminho se necessário

// Recebe "user" como prop
export default function CadastroAdocao({ user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    sexo: "",
    porte: "",
    idade: "",
    unidadeIdade: "anos", // "anos" ou "meses"
    cidade: "",
    cep: "",
    estado: "",
    foto: null,
    description: "",
    breed: "",
    contact: ""
  });

  // Estado para definir se o contato informado é telefone ou email
  const [contactType, setContactType] = useState("phone");
  const [errors, setErrors] = useState({});
  const [idadeError, setIdadeError] = useState("");

  const handleChange = (e) => {
    const { name } = e.target;
    let value;
    if (name === "foto") {
      value = e.target.files ? e.target.files[0] : null;
    } else {
      value = e.target.value;
    }
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    // Validação específica para idade: se a unidade for "meses", limite a 11
    if (name === "idade" || name === "unidadeIdade") {
      if (
        updatedFormData.unidadeIdade === "meses" &&
        updatedFormData.idade !== "" &&
        parseInt(updatedFormData.idade, 10) > 11
      ) {
        setIdadeError(
          "A idade em meses não pode exceder 11. Se for maior, por favor selecione 'anos'."
        );
      } else {
        setIdadeError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "nome",
      "especie",
      "sexo",
      "porte",
      "idade",
      "cidade",
      "cep",
      "estado",
      "foto",
      "description",
      "breed",
      "contact"
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && formData[field].trim() === "")
      ) {
        newErrors[field] = true;
      }
    });
    if (idadeError || Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Por favor, preencha os campos obrigatórios corretamente.");
      return;
    }

    // Faz o upload da foto para o Supabase Storage
    let photoUrl = "";
    if (formData.foto) {
      console.log("Arquivo selecionado:", formData.foto);
      const file = formData.foto;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("animals")
        .upload(filePath, file);
      if (uploadError) {
        alert("Erro no upload da imagem: " + uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("animals").getPublicUrl(filePath);
      console.log("Public URL gerada:", data.publicUrl);
      photoUrl = data.publicUrl;
    }

    // Constrói a localização concatenando cidade e estado
    const location = `${formData.cidade}, ${formData.estado}`;

    const insertData = {
      name: formData.nome,
      species: formData.especie,
      gender: formData.sexo,
      size: formData.porte,
      age: parseInt(formData.idade, 10),
      city: formData.cidade,
      cep: formData.cep,
      state: formData.estado,
      image: photoUrl,
      description: formData.description,
      breed: formData.breed,
      contact: formData.contact,
      location: location,
      user_id: user ? user.id : null // Vincula o pet ao usuário logado
    };

    const { error: insertError } = await supabase
      .from("animals_adocao")
      .insert([insertData]);

    if (insertError) {
      alert("Erro ao cadastrar o pet: " + insertError.message);
      console.error("Erro ao inserir pet:", insertError);
      return;
    }

    alert("Pet cadastrado com sucesso!");
    setFormData({
      nome: "",
      especie: "",
      sexo: "",
      porte: "",
      idade: "",
      unidadeIdade: "anos",
      cidade: "",
      cep: "",
      estado: "",
      foto: null,
      description: "",
      breed: "",
      contact: ""
    });
    navigate("/adocao");
  };

  const renderLabel = (labelText, fieldName) => (
    <label className="block text-sm font-medium text-gray-700">
      {labelText} {errors[fieldName] && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
      <Hero
        backgroundImage={cadastroAdocaoImg}
        title="Cadastro para Adoção"
        subtitle="Coloque as informações do pet que será adotado."
      />

      <div className="relative z-30 mt-[-240px] py-12">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto space-y-6"
          >
            {/* Nome do pet */}
            <div>
              {renderLabel("Nome do animal", "nome")}
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Coloque o nome do pet que será adotado."
                className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                  errors.nome ? "border-red-500" : ""
                }`}
              />
              {errors.nome && (
                <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
              )}
            </div>

            {/* Linha para Espécie, Sexo e Porte */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                {renderLabel("Espécie", "especie")}
                <select
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.especie ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.especie && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>

              <div>
                {renderLabel("Sexo", "sexo")}
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.sexo ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
                {errors.sexo && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>

              <div>
                {renderLabel("Porte", "porte")}
                <select
                  name="porte"
                  value={formData.porte}
                  onChange={handleChange}
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.porte ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
                {errors.porte && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
            </div>

            {/* Linha para Idade e Cidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {renderLabel("Idade do animal", "idade")}
                {idadeError && (
                  <p className="text-red-500 text-xs mt-1">{idadeError}</p>
                )}
                <div className="flex space-x-2 mt-1">
                  <input
                    type="number"
                    name="idade"
                    min="0"
                    max={formData.unidadeIdade === "meses" ? 11 : undefined}
                    value={formData.idade}
                    onChange={handleChange}
                    placeholder="Idade"
                    className={`p-2 block w-full border border-gray-300 rounded ${
                      errors.idade ? "border-red-500" : ""
                    }`}
                  />
                  <select
                    name="unidadeIdade"
                    value={formData.unidadeIdade}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="anos">Anos</option>
                    <option value="meses">Meses</option>
                  </select>
                </div>
                {errors.idade && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div>
                {renderLabel("Cidade para o encontro do adotante", "cidade")}
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Insira o nome da sua cidade."
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.cidade ? "border-red-500" : ""
                  }`}
                />
                {errors.cidade && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
            </div>

            {/* Seção para Descrição, Raça e Contato */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                {renderLabel("Descrição do animal", "description")}
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descreva o animal"
                  rows="3"
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div>
                {renderLabel("Raça do animal", "breed")}
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Insira a raça do animal"
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.breed ? "border-red-500" : ""
                  }`}
                />
                {errors.breed && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div>
                {renderLabel("Contato para adoção", "contact")}
                <div className="mb-2">
                  <span className="block text-sm font-medium text-gray-700">
                    Tipo de contato
                  </span>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactType"
                        value="phone"
                        checked={contactType === "phone"}
                        onChange={(e) => setContactType(e.target.value)}
                        className="mr-2"
                      />
                      Telefone
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactType"
                        value="email"
                        checked={contactType === "email"}
                        onChange={(e) => setContactType(e.target.value)}
                        className="mr-2"
                      />
                      Email
                    </label>
                  </div>
                </div>
                {contactType === "phone" ? (
                  <IMaskInput
                    mask="+55 (00) 00000-0000"
                    unmask={false}
                    name="contact"
                    value={formData.contact}
                    onAccept={(value) =>
                      setFormData({ ...formData, contact: value })
                    }
                    placeholder="+55 (11) 12345-6789"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded"
                  />
                ) : (
                  <input
                    type="email"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="seuemail@exemplo.com"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded"
                  />
                )}
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
            </div>

            {/* Linha para CEP, Estado e Foto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                {renderLabel("CEP", "cep")}
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="Insira o CEP."
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.cep ? "border-red-500" : ""
                  }`}
                />
                {errors.cep && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div className="sm:col-span-1">
                {renderLabel("Estado", "estado")}
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={`mt-1 p-2 block w-full border border-gray-300 rounded ${
                    errors.estado ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
                {errors.estado && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div className="sm:col-span-1">
                {renderLabel("Foto do animal", "foto")}
                <div className="mt-1">
                  <label className="inline-block px-4 py-2 bg-emerald-500 text-white rounded cursor-pointer hover:bg-emerald-600">
                    Selecionar foto
                    <input
                      type="file"
                      name="foto"
                      onChange={handleChange}
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      className="hidden"
                    />
                  </label>
                  {formData.foto && (
                    <span className="ml-2 text-gray-700">{formData.foto.name}</span>
                  )}
                  {errors.foto && (
                    <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded transition"
            >
              Anuncie seu pet para um novo lar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
