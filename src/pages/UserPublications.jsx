// src/pages/UserPublications.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define a prop "setShowLoginModal" com valor padrão para evitar erros se ela não for passada.
export default function UserPublications({ setShowLoginModal = () => {} }) {
  const navigate = useNavigate();

  // Simulação do estado de autenticação.
  // Em produção, você deverá usar o estado real de autenticação (por exemplo, via Supabase).
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  // Estados para as publicações simuladas.
  const [loading, setLoading] = useState(true);
  const [adocaoPublications, setAdocaoPublications] = useState([]);
  const [resgatePublications, setResgatePublications] = useState([]);

  useEffect(() => {
    // Simula a verificação do usuário
    const fakeUserLogged = false; // Altere para 'true' para simular um usuário autenticado.
    setIsAuthenticated(fakeUserLogged);
    if (!fakeUserLogged) {
      // Aciona o login modal se o usuário não estiver autenticado.
      setShowLoginModal(true);
    }
  }, [setShowLoginModal]);

  // Enquanto verifica a autenticação
  if (isAuthenticated === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#D2B48C" }}
      >
        <p className="text-xl font-semibold">Verificando autenticação...</p>
      </div>
    );
  }

  // Se o usuário não estiver autenticado, exibe uma mensagem e um botão para login.
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#D2B48C" }}
      >
        <p className="text-xl font-semibold text-center">
          Para acessar seu histórico de publicações, você precisa estar logado.
        </p>
        <button
          onClick={() => setShowLoginModal(true)}
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
        >
          Login / Cadastro
        </button>
      </div>
    );
  }

  // Se o usuário está autenticado, busca as publicações simuladas.
  useEffect(() => {
    // Simula uma chamada à API
    setTimeout(() => {
      setAdocaoPublications([
        {
          id: 1,
          titulo: "Adote o Bilu",
          descricao: "Bilu é um cachorro super amigável e procura um lar cheio de carinho.",
          status: "", // Valor inicial: sem status
        },
        {
          id: 2,
          titulo: "Adoção: Mimi",
          descricao: "Gata meiga e tranquila, ideal para famílias que amam animais.",
          status: "",
        },
      ]);
      setResgatePublications([
        {
          id: 3,
          titulo: "Resgate urgente de Rex",
          descricao: "Cachorro encontrado próximo à avenida, necessitando de cuidados imediatos.",
          status: "",
        },
        {
          id: 4,
          titulo: "Resgate: Lola",
          descricao: "Gata resgatada em situação de risco, precisa de ajuda para recuperar a saúde.",
          status: "",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const markAdotado = (id) => {
    if (window.confirm("Você confirma que esse animal foi adotado?")) {
      setAdocaoPublications((prev) =>
        prev.map((pub) =>
          pub.id === id ? { ...pub, status: "Adotado" } : pub
        )
      );
      alert("Animal marcado como Adotado!");
    }
  };

  const markResgatado = (id) => {
    if (window.confirm("Você confirma que esse animal foi resgatado?")) {
      setResgatePublications((prev) =>
        prev.map((pub) =>
          pub.id === id ? { ...pub, status: "Resgatado" } : pub
        )
      );
      alert("Animal marcado como Resgatado!");
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#D2B48C" }}
      >
        <p className="text-xl font-semibold">Carregando publicações...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-30" style={{ backgroundColor: "#D2B48C" }}>
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold">Histórico de Publicações</h1>
      </header>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Publicações para Adoção</h2>
        {adocaoPublications.length > 0 ? (
          <ul className="space-y-4">
            {adocaoPublications.map((pub) => (
              <li key={pub.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-xl">{pub.titulo}</h3>
                <p className="text-gray-700">{pub.descricao}</p>
                {pub.status ? (
                  <div className="mt-2 text-green-700 font-bold">{pub.status}</div>
                ) : (
                  <button
                    onClick={() => markAdotado(pub.id)}
                    className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Marcar como Adotado
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma publicação para adoção encontrada.</p>
        )}
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Publicações para Resgate</h2>
        {resgatePublications.length > 0 ? (
          <ul className="space-y-4">
            {resgatePublications.map((pub) => (
              <li key={pub.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-xl">{pub.titulo}</h3>
                <p className="text-gray-700">{pub.descricao}</p>
                {pub.status ? (
                  <div className="mt-2 text-green-700 font-bold">{pub.status}</div>
                ) : (
                  <button
                    onClick={() => markResgatado(pub.id)}
                    className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Marcar como Resgatado
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma publicação para resgate encontrada.</p>
        )}
      </section>
    </div>
  );
}
