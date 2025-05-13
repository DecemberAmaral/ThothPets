// src/pages/UserPublications.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function UserPublications({ user, setShowLoginModal }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adocaoPublications, setAdocaoPublications] = useState([]);
  const [resgatePublications, setResgatePublications] = useState([]);

  // Se o usuário não estiver autenticado, redireciona e exibe uma tela de login completa.
  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
      navigate("/");
    }
  }, [user, setShowLoginModal, navigate]);

  // Busca as publicações do usuário logado no Supabase.
  useEffect(() => {
    async function fetchPublications() {
      setLoading(true);

      // Consulta publicações de adoção vinculadas ao usuário logado
      const { data: adocaoData, error: adocaoError } = await supabase
        .from("adocao_publications")
        .select("*")
        .eq("user_id", user.id);

      if (adocaoError) {
        console.error("Erro ao buscar publicações de adoção:", adocaoError);
      } else {
        setAdocaoPublications(adocaoData);
      }

      // Consulta publicações de resgate vinculadas ao usuário logado
      const { data: resgateData, error: resgateError } = await supabase
        .from("resgate_publications")
        .select("*")
        .eq("user_id", user.id);

      if (resgateError) {
        console.error("Erro ao buscar publicações de resgate:", resgateError);
      } else {
        setResgatePublications(resgateData);
      }

      setLoading(false);
    }

    if (user) {
      fetchPublications();
    }
  }, [user]);

  // Função para marcar uma publicação de adoção como "Adotado" (excluindo o registro)
  async function markAdotado(id) {
    if (window.confirm("Você confirma que esse animal foi adotado?")) {
      const { error } = await supabase
        .from("adocao_publications")
        .delete()
        .eq("id", id);
      if (error) {
        alert("Erro ao marcar como adotado: " + error.message);
      } else {
        // Atualiza o estado removendo o item
        setAdocaoPublications((prev) => prev.filter((pub) => pub.id !== id));
        alert("Animal marcado como adotado e removido do seu histórico!");
      }
    }
  }

  // Função para marcar uma publicação de resgate como "Resgatado" (excluindo o registro)
  async function markResgatado(id) {
    if (window.confirm("Você confirma que esse animal foi resgatado?")) {
      const { error } = await supabase
        .from("resgate_publications")
        .delete()
        .eq("id", id);
      if (error) {
        alert("Erro ao marcar como resgatado: " + error.message);
      } else {
        // Atualiza o estado removendo o item
        setResgatePublications((prev) => prev.filter((pub) => pub.id !== id));
        alert("Animal marcado como resgatado e removido do seu histórico!");
      }
    }
  }

  // Tela de carregamento
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#D2B48C" }}>
        <p className="text-xl font-semibold">Carregando publicações...</p>
      </div>
    );
  }

  // Se o usuário não estiver autenticado (caso a verificação não tenha redirecionado), exibe uma tela de login completa.
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pb-20" style={{ backgroundColor: "#D2B48C" }}>
        <p className="text-xl font-semibold text-center mb-4">
          Para acessar seu histórico de publicações, você precisa estar logado.
        </p>
        <button
          onClick={() => setShowLoginModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
        >
          Login / Cadastro
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#D2B48C" }}>
      {/* Header */}
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold">Histórico de Publicações</h1>
      </header>

      {/* Conteúdo principal (flex-grow para empurrar o footer para baixo) */}
      <main className="flex-grow p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Publicações para Adoção</h2>
          {adocaoPublications.length > 0 ? (
            <ul className="space-y-4">
              {adocaoPublications.map((pub) => (
                <li key={pub.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-xl">{pub.titulo}</h3>
                  <p className="text-gray-700">{pub.descricao}</p>
                  <button
                    onClick={() => markAdotado(pub.id)}
                    className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Marcar como Adotado
                  </button>
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
                  <button
                    onClick={() => markResgatado(pub.id)}
                    className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Marcar como Resgatado
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma publicação para resgate encontrada.</p>
          )}
        </section>
      </main>
      {/* O Footer é renderizado no App.jsx (abaixo da rota), garantindo que essa página ocupe toda a altura */}
    </div>
  );
}
