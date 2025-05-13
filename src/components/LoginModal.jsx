// src/components/LoginModal.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // importe o cliente do Supabase

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);
  const [errors, setErrors] = useState({ email: false, senha: false });
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    const newErrors = { email: false, senha: false };
    if (email.trim() === "") newErrors.email = true;
    if (senha.trim() === "") newErrors.senha = true;
    setErrors(newErrors);
    if (newErrors.email || newErrors.senha) {
      return;
    }

    // Tenta realizar o login com o Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      console.error("Erro de login:", error.message);
      setLoginError(error.message);
      return;
    }

    console.log("Login realizado com sucesso!", data);
    onClose();
  };

  // Renderiza a label com asterisco caso haja erro
  const renderLabel = (label, field) => (
    <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">
      {label} {errors[field] && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Faça Login ou Cadastre-se</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {renderLabel("Email", "email")}
            <input
              id="email"
              type="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="mb-4">
            {renderLabel("Senha", "senha")}
            <input
              id="senha"
              type="password"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.senha ? "border-red-500" : ""
              }`}
            />
          </div>
          {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
          <div className="flex items-center mb-4">
            <input
              id="manterConectado"
              type="checkbox"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="manterConectado" className="text-sm text-gray-700">
              Me mantenha conectado
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <Link
              to="/cadastro-usuario"
              className="inline-block align-baseline font-bold text-sm text-emerald-500 hover:text-emerald-800"
              onClick={onClose}
            >
              Não possui uma conta? Cadastre-se.
            </Link>
          </div>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 hover:text-gray-800"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
