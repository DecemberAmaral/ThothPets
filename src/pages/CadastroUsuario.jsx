// src/pages/CadastroUsuario.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    nascimento: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handler genérico para inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  // Handler de submit que valida e cria a conta
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.senha.trim()) newErrors.senha = true;
    if (!formData.cpf.trim()) newErrors.cpf = true;
    if (!formData.telefone.trim()) newErrors.telefone = true;
    if (!formData.nascimento.trim()) newErrors.nascimento = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return; // Não submete se houver erros na validação
    }

    // Cria o usuário na tabela de autenticação do Supabase (auth.users)
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.senha,
    });

    if (error) {
      setMessage(`Erro: ${error.message}`);
      console.error("Erro ao cadastrar:", error);
      return;
    }

    // Insere os dados adicionais na tabela 'profiles'
    const userId = data?.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId, // Relaciona o profile ao usuário criado
          nome: formData.nome,
          cpf: formData.cpf,
          telefone: formData.telefone,
          nascimento: formData.nascimento,
        },
      ]);

      if (profileError) {
        setMessage(`Erro ao salvar perfil: ${profileError.message}`);
        console.error("Erro ao inserir perfil:", profileError);
        return;
      }

      setMessage("Cadastro realizado com sucesso! Verifique seu e-mail para confirmação.");
      setTimeout(() => navigate("/"), 3000);
    }
  };

  // Função auxiliar para renderizar as labels com asterisco quando houver erro
  const renderLabel = (label, field) => (
    <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">
      {label} {errors[field] && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen p-4 pt-27">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Conta</h1>
        {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            {renderLabel("Nome Completo", "nome")}
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.nome ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {/* Email */}
          <div>
            {renderLabel("Email", "email")}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {/* Senha */}
          <div>
            {renderLabel("Senha", "senha")}
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Crie sua senha"
              value={formData.senha}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.senha ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {/* CPF */}
          <div>
            {renderLabel("CPF", "cpf")}
            <input
              type="text"
              id="cpf"
              name="cpf"
              placeholder="Seu CPF"
              value={formData.cpf}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.cpf ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {/* Telefone */}
          <div>
            {renderLabel("Telefone", "telefone")}
            <input
              type="text"
              id="telefone"
              name="telefone"
              placeholder="Seu telefone"
              value={formData.telefone}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.telefone ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {/* Data de Nascimento */}
          <div>
            {renderLabel("Data de Nascimento", "nascimento")}
            <input
              type="date"
              id="nascimento"
              name="nascimento"
              value={formData.nascimento}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.nascimento ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">Já possui uma conta? </span>
          <Link
            to="/login-usuario"
            className="text-sm font-bold text-emerald-500 hover:text-emerald-800"
          >
            Faça o Login.
          </Link>
        </div>
      </div>
    </div>
  );
}
