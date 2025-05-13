// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThothLogo from "../assets/ThothLogo.png";
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import historyIcon from "../assets/historyIcon.png"; // Ícone personalizado para Histórico
import { supabase } from "../supabaseClient"; // Certifique-se de que o supabaseClient está configurado

export default function Navbar({ setShowLoginModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // Estados para gerenciar a sessão e o perfil do usuário
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getSession() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        setUser(sessionData.session.user);
        fetchProfile(sessionData.session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    }
    getSession();

    // Listener para mudanças na autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Função para buscar o perfil do usuário na tabela "profiles"
  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (!error) {
      setProfile(data);
    } else {
      console.error("Erro ao buscar perfil:", error);
    }
  }

  // Função para realizar logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
      setShowUserMenu(false);
      navigate("/");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-500">
      <div className="w-full h-23 flex items-center justify-center">
        {/* Logo clicável que redireciona para a Home */}
        <Link to="/" className="h-55 w-55 object-contain mr-4">
          <img src={ThothLogo} alt="Logo" className="h-55 w-55 object-contain" />
        </Link>

        {/* Retângulo com a parte interna da Navbar */}
        <nav className="bg-[#E9FFDB] w-[95%] max-w-7xl h-19 rounded-xl shadow-md flex items-center justify-between px-6">
          {/* Menu Desktop */}
          <ul className="hidden md:flex space-x-6 text-sm font-semibold text-gray-800">
            <li>
              <Link to="/" className="hover:text-emerald-600 transition">
                Início
              </Link>
            </li>
            <li>
              <Link to="/adocao" className="hover:text-emerald-600 transition">
                Adoção
              </Link>
            </li>
            <li>
              <Link to="/resgate" className="hover:text-emerald-600 transition">
                Resgate
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-600 transition">
                Quero Ajudar
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-600 transition">
                Contato
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-600 transition">
                Sobre-nós
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex items-center space-x-4 relative">
            {user && profile ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="text-sm font-semibold text-gray-800 border border-[#E9FFDB] bg-[#E9FFDB] px-3 py-1 rounded-full hover:bg-[#D0F1C9] transition"
                >
                  Olá, {profile.nome}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-md">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center text-sm font-semibold text-gray-800 hover:text-emerald-600 transition"
              >
                <UserIcon className="h-5 w-5 mr-1" />
                Login/Cadastro
              </button>
            )}
            <button onClick={() => navigate("/minhas-publicacoes")}>
              <img
                src={historyIcon}
                alt="Histórico de Publicações"
                className="h-8 w-8 transition cursor-pointer"
              />
            </button>
          </div>

          {/* Botão hamburger para Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="text-gray-800 focus:outline-none"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[#E9FFDB] w-[95%] max-w-7xl mx-auto mt-2 rounded-xl shadow-md px-6 py-4">
          <ul className="flex flex-col space-y-4 text-sm font-semibold text-gray-800">
            <li>
              <Link to="/" className="hover:text-emerald-600 transition">
                Início
              </Link>
            </li>
            <li>
              <Link to="/adocao" className="hover:text-emerald-600 transition">
                Adoção
              </Link>
            </li>
            <li>
              <Link to="/resgate" className="hover:text-emerald-600 transition">
                Resgate
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-600 transition">
                Quero Ajudar
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-600 transition">
                Contato
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-600 transition">
                Sobre-Nós
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex flex-col space-y-4">
            {user && profile ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="text-sm font-semibold text-gray-800 border border-[#E9FFDB] bg-[#E9FFDB] px-3 py-1 rounded-full hover:bg-[#D0F1C9] transition"
                >
                  Olá, {profile.nome}
                </button>
                {showUserMenu && (
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition"
                  >
                    Sair
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center text-sm font-semibold text-gray-800 hover:text-emerald-600 transition"
              >
                <UserIcon className="h-5 w-5 mr-1" />
                Cadastre-se
              </button>
            )}
            <button
              onClick={() => navigate("/minhas-publicacoes")}
              className="flex items-center text-sm font-semibold text-gray-800 hover:text-emerald-600 transition"
            >
              <img
                src={historyIcon}
                alt="Histórico de Publicações"
                className="h-8 w-8 mr-1"
              />
              Histórico
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
