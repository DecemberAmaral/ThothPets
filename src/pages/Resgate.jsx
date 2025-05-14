// src/pages/Resgate.jsx
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import LostAnimalForm from "../components/LostAnimalForm";
import LostAnimalList from "../components/LostAnimalList";
import resgateHeroImage from "../assets/resgateHero.png";
import { supabase } from "../supabaseClient";

export default function Resgate({ user, setShowLoginModal }) {
  // Lista de anúncios vem do Supabase (inicia vazia)
  const [animals, setAnimals] = useState([]);

  // Estados para controlar o popup de detalhes
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showAnimalPopup, setShowAnimalPopup] = useState(false);

  // Função para buscar os anúncios de resgate do Supabase
  async function fetchAnimals() {
    const { data, error } = await supabase
      .from("lost_animals")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Erro ao buscar anúncios de resgate:", error);
    } else {
      setAnimals(data);
    }
  }

  useEffect(() => {
    fetchAnimals();
  }, []);

  // Função para publicar um anúncio (o usuário precisa estar logado)
  const handlePublish = async (formData) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    const newAnimal = {
      nome: formData.nome || "Novo Animal",
      especie: formData.especie,
      porte: formData.porte,
      sexo: formData.sexo,
      estado: formData.estado || "Desconhecido",  // Fornece valor padrão se necessário
      cidade: formData.cidade,
      local: `${formData.cidade ? formData.cidade + ", " : ""}${(formData.estado || "Desconhecido").toUpperCase()}`,
      image: formData.image,
      descricao: formData.descricao,
      mensagem: formData.descricao,
      email: formData.email,
      phone: formData.phone,
      user_id: user ? user.id : null
    };

    const { error } = await supabase.from("lost_animals").insert([newAnimal]);
    if (error) {
      alert("Erro ao publicar: " + error.message);
    } else {
      fetchAnimals();
    }
  };

  // Abre o popup com os detalhes do anúncio
  const handleViewDetails = (animal) => {
    setSelectedAnimal(animal);
    setShowAnimalPopup(true);
  };

  const closePopup = () => {
    setSelectedAnimal(null);
    setShowAnimalPopup(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Hero
        backgroundImage={resgateHeroImage}
        title="Resgate"
        subtitle="Procure seu bichinho ou ajude a encontrá-lo!"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 relative z-10 -mt-37 mb-32">
          <h2 className="text-2xl font-bold mb-4">Publicar Anúncio de Resgate</h2>
          {user ? (
            <LostAnimalForm onPublish={handlePublish} />
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold mb-4">
                Você precisa estar logado para publicar anúncios de resgate.
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
              >
                Login / Cadastro
              </button>
            </div>
          )}

          <hr className="my-8" />

          <h2 className="text-xl font-bold mb-4">Últimos Anúncios de Resgate</h2>
          <LostAnimalList animals={animals} onViewDetails={handleViewDetails} />
        </div>
      </div>

      {showAnimalPopup && selectedAnimal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-3xl font-bold text-gray-600"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full h-80 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                {selectedAnimal.image ? (
                  <img
                    src={selectedAnimal.image}
                    alt={selectedAnimal.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>Sem Imagem</span>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">{selectedAnimal.nome}</h3>
                <p className="text-lg">
                  <strong>Espécie:</strong> {selectedAnimal.especie || "Não informado"}
                </p>
                <p className="text-lg">
                  <strong>Sexo:</strong> {selectedAnimal.sexo || "Não informado"}
                </p>
                <p className="text-lg">
                  <strong>Porte:</strong> {selectedAnimal.porte || "Não informado"}
                </p>
                <p className="text-lg">
                  <strong>Local:</strong> {selectedAnimal.local || "Não informado"}
                </p>
                <p className="text-lg">
                  <strong>Mensagem:</strong> {selectedAnimal.mensagem || "Sem mensagem"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              {user ? (
                <div className="flex flex-col md:flex-row gap-4">
                  {selectedAnimal.phone && (
                    <a
                      href={`https://wa.me/${selectedAnimal.phone.replace(/\D/g, "")}?text=Olá,%20vi%20seu%20anúncio%20de%20resgate%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded transition"
                    >
                      Contato via WhatsApp
                    </a>
                  )}
                  {selectedAnimal.email && (
                    <a
                      href={`mailto:${selectedAnimal.email}?subject=Contato%20sobre%20seu%20an%C3%BAncio%20de%20resgate&body=Olá,%20vi%20seu%20anúncio%20e%20gostaria%20de%20conversar.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition"
                    >
                      Contato via Email
                    </a>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
                  >
                    Faça login para ver os contatos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
