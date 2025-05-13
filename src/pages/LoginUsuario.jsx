// src/pages/LoginUsuario.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Certifique-se de ter configurado o supabaseClient

export default function LoginUsuario() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);
  const [errors, setErrors] = useState({ email: false, senha: false });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: false, senha: false };

    if (email.trim() === "") newErrors.email = true;
    if (senha.trim() === "") newErrors.senha = true;
    setErrors(newErrors);

    if (newErrors.email || newErrors.senha) return;

    // Autentica o usuário com o Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setMessage(`Erro ao fazer login: ${error.message}`);
      return;
    }

    setMessage("Login realizado com sucesso!");
    // Redireciona após um breve delay (opcional)
    setTimeout(() => navigate("/"), 2000);
  };

  // Função auxiliar para renderizar as labels com asterisco (se houver erro)
  const renderLabel = (label, field) => (
    <label htmlFor={field} className="block text-gray-700 text-sm font-bold mb-2">
      {label} {errors[field] && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#D2B48C" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login de Usuário</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {renderLabel("Email", "email")}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <div>
            {renderLabel("Senha", "senha")}
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={`w-full p-2 rounded border ${
                errors.senha ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="manterConectado"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="manterConectado" className="text-sm text-gray-700">
              Me mantenha conectado
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">Não possui uma conta? </span>
          <Link
            to="/cadastro-usuario"
            className="text-sm font-bold text-emerald-500 hover:text-emerald-800"
          >
            Cadastre-se.
          </Link>
        </div>
      </div>
    </div>
  );
}
