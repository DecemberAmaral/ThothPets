// src/pages/UserPublications.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function UserPublications({ user, setShowLoginModal }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adoptionPublications, setAdoptionPublications] = useState([]);
  const [rescuePublications, setRescuePublications] = useState([]);

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
      navigate("/");
    }
  }, [user, setShowLoginModal, navigate]);

  useEffect(() => {
    async function fetchAllPublications() {
      setLoading(true);
      console.log("User ID:", user.id);

      // Consulta de adoção: pode vir de duas tabelas
      const { data: adoPub, error: adoPubError } = await supabase
        .from("adocao_publications")
        .select("*")
        .eq("user_id", user.id);
      if (adoPubError) {
        console.error("Erro ao buscar adocao_publications:", adoPubError);
      } else {
        console.log("AdoPub:", adoPub);
      }

      const { data: animalsAdocao, error: animalsAdocaoError } = await supabase
        .from("animals_adocao")
        .select("*")
        .eq("user_id", user.id);
      if (animalsAdocaoError) {
        console.error("Erro ao buscar animals_adocao:", animalsAdocaoError);
      } else {
        console.log("AnimalsAdocao:", animalsAdocao);
      }

      // Consulta de resgate: pode vir de duas tabelas
      const { data: resPub, error: resPubError } = await supabase
        .from("resgate_publications")
        .select("*")
        .eq("user_id", user.id);
      if (resPubError) {
        console.error("Erro ao buscar resgate_publications:", resPubError);
      } else {
        console.log("ResgatePublications:", resPub);
      }

      const { data: lostAnimals, error: lostError } = await supabase
        .from("lost_animals")
        .select("*")
        .eq("user_id", user.id);
      if (lostError) {
        console.error("Erro ao buscar lost_animals:", lostError);
      } else {
        console.log("LostAnimals:", lostAnimals);
      }

      // Mapeia os registros de adoção
      const adoptionRecords1 = (adoPub || []).map(item => ({
        id: item.id,
        type: "adocao_publication",
        title: item.titulo,
        description: item.descricao,
        created_at: item.created_at,
      }));
      const adoptionRecords2 = (animalsAdocao || []).map(item => ({
        id: item.id,
        type: "animals_adocao",
        title: item.name, // ajuste para item.nome se sua coluna for esse
        description: item.description,
        created_at: item.created_at,
      }));
      const allAdoptionRecords = [...adoptionRecords1, ...adoptionRecords2].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      // Mapeia os registros de resgate
      const rescueRecords1 = (resPub || []).map(item => ({
        id: item.id,
        type: "resgate_publication",
        title: item.titulo,
        description: item.descricao,
        created_at: item.created_at,
      }));
      const rescueRecords2 = (lostAnimals || []).map(item => ({
        id: item.id,
        type: "lost_animals",
        title: item.nome,
        description: item.descricao,
        created_at: item.created_at,
      }));
      const allRescueRecords = [...rescueRecords1, ...rescueRecords2].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      console.log("Adoption Publications fetched:", allAdoptionRecords);
      console.log("Rescue Publications fetched:", allRescueRecords);

      setAdoptionPublications(allAdoptionRecords);
      setRescuePublications(allRescueRecords);
      setLoading(false);
    }

    if (user) {
      fetchAllPublications();
    }
  }, [user]);

  async function markRecord(id, type) {
    if (window.confirm("Você confirma que esse anúncio foi finalizado?")) {
      let table;
      if (type === "adocao_publication") table = "adocao_publications";
      else if (type === "animals_adocao") table = "animals_adocao";
      else if (type === "resgate_publication") table = "resgate_publications";
      else if (type === "lost_animals") table = "lost_animals";
      if (!table) return;
      
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) {
        alert("Erro ao remover o anúncio: " + error.message);
      } else {
        // Atualiza separadamente os estados de adoção e resgate:
        setAdoptionPublications(prev => prev.filter(pub => pub.id !== id));
        setRescuePublications(prev => prev.filter(pub => pub.id !== id));
        alert("Anúncio removido do seu histórico!");
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-semibold">Carregando publicações...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-32 bg-white">
      <header className="text-center py-4 mt-12">
        <h1 className="text-3xl font-bold">Histórico de Publicações</h1>
      </header>

      {/* Seção de Adoção */}
      <section className="px-4 pt-8">
        <h2 className="text-2xl font-bold mb-4">Publicações de Adoção</h2>
        {adoptionPublications.length === 0 ? (
          <p className="text-center text-xl">Nenhum anúncio de adoção cadastrado.</p>
        ) : (
          <ul className="space-y-4">
            {adoptionPublications.map(pub => (
              <li key={pub.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-xl">{pub.title}</h3>
                <p className="text-gray-700">{pub.description}</p>
                <button
                  onClick={() => markRecord(pub.id, pub.type)}
                  className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
                >
                  {pub.type === "adocao_publication" || pub.type === "animals_adocao"
                    ? "Já adotaram"
                    : "Foi encontrado"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Seção de Resgate */}
      <section className="px-4 pt-8">
        <h2 className="text-2xl font-bold mb-4">Publicações de Resgate</h2>
        {rescuePublications.length === 0 ? (
          <p className="text-center text-xl">Nenhum anúncio de resgate cadastrado.</p>
        ) : (
          <ul className="space-y-4">
            {rescuePublications.map(pub => (
              <li key={pub.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-xl">{pub.title}</h3>
                <p className="text-gray-700">{pub.description}</p>
                <button
                  onClick={() => markRecord(pub.id, pub.type)}
                  className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
                >
                  {pub.type === "resgate_publication" || pub.type === "lost_animals"
                    ? "Foi encontrado"
                    : "Já adotaram"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
