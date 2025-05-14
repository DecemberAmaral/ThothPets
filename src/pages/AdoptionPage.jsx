// src/pages/AdoptionPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AdoptionActions from "../components/AdoptionActions";
import AdoptionCards from "../components/AdoptionCards";
import adoptionHeroImage from "../assets/hero-adoption.png";

export default function AdoptionPage({ setShowLoginModal, user }) {
  const [filter, setFilter] = useState({
    species: "",
    sex: "",
    size: "",
    state: "",
    city: "",
    age: ""
  });
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showAnimalPopup, setShowAnimalPopup] = useState(false);
  
  const navigate = useNavigate();

  const handleAdopt = (animal) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setSelectedAnimal(animal);
    setShowAnimalPopup(true);
  };

  const closePopup = () => {
    setSelectedAnimal(null);
    setShowAnimalPopup(false);
  };

  const handlePublishAnimal = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    navigate("/cadastro-adocao");
  };

  return (
    <div className="relative overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <Hero backgroundImage={adoptionHeroImage} title="Adoção" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mt-[-150px] mb-32 relative z-10">
          <AdoptionActions onFilterChange={setFilter} />
          <AdoptionCards filter={filter} onAdopt={handleAdopt} />
        </div>
      </div>
      <button
        onClick={handlePublishAnimal}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-white font-bold">
          Publique um pet para adoção aqui!
        </span>
      </button>
      {showAnimalPopup && selectedAnimal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button onClick={closePopup}
              className="absolute top-2 right-2 text-xl font-bold"
            >
              &times;
            </button>
            {selectedAnimal.image ? (
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-full h-64 object-cover rounded"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
                Sem imagem
              </div>
            )}
            <h3 className="text-xl font-bold my-2">{selectedAnimal.name}</h3>
            <p className="text-gray-600">
              {selectedAnimal.description || "Sem descrição disponível"}
            </p>
            <p className="text-gray-600 mt-2">
              Raça: {selectedAnimal.breed || "Não informada"}
            </p>
            <p className="text-gray-600 mt-2">
              Idade: {selectedAnimal.age}{" "}
              {selectedAnimal.age_unit === "meses"
                ? parseInt(selectedAnimal.age, 10) > 1 ? "meses" : "mês"
                : parseInt(selectedAnimal.age, 10) > 1 ? "anos" : "ano"}
            </p>
            <p className="text-gray-600 mt-2">
              Localização: {selectedAnimal.location || `${selectedAnimal.city}, ${selectedAnimal.state}`}
            </p>
            {selectedAnimal.contact && (
              (() => {
                // Se houver ";" separando telefone e email:
                const contacts = selectedAnimal.contact.includes(";")
                  ? selectedAnimal.contact.split(";").map(c => c.trim())
                  : [selectedAnimal.contact.trim()];
                // Extrai telefone removendo caracteres não numéricos
                const phoneCandidate = contacts.find(c => !c.includes("@"));
                const phoneNumber = phoneCandidate ? phoneCandidate.replace(/\D/g, "") : null;
                // Extrai email (contendo "@")
                const emailCandidate = contacts.find(c => c.includes("@"));
                const emailAddress = emailCandidate ? emailCandidate.trim() : null;
                
                if (phoneNumber && emailAddress) {
                  return (
                    <div className="mt-4 flex gap-4">
                      <a
                        href={`https://wa.me/${phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
                      >
                        Contato WhatsApp
                      </a>
                      <a
                        href={`mailto:${emailAddress}?subject=Interesse na adoção de ${selectedAnimal.name}&body=Olá,%0D%0A%0D%0ATenho interesse em adotar ${selectedAnimal.name}, que tem ${selectedAnimal.age} ${
                          selectedAnimal.age_unit === "meses"
                            ? parseInt(selectedAnimal.age, 10) > 1 ? "meses" : "mês"
                            : parseInt(selectedAnimal.age, 10) > 1 ? "anos" : "ano"
                        }. Gostaria de obter mais informações.%0D%0A%0D%0AObrigado!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                      >
                        Contato Email
                      </a>
                    </div>
                  );
                } else if (phoneNumber) {
                  return (
                    <div className="mt-4">
                      <a
                        href={`https://wa.me/${phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
                      >
                        Entrar em contato via WhatsApp
                      </a>
                    </div>
                  );
                } else if (emailAddress) {
                  return (
                    <div className="mt-4">
                      <a
                        href={`mailto:${emailAddress}?subject=Interesse na adoção de ${selectedAnimal.name}&body=Olá,%0D%0A%0D%0ATenho interesse em adotar ${selectedAnimal.name}, que tem ${selectedAnimal.age} ${
                          selectedAnimal.age_unit === "meses"
                            ? parseInt(selectedAnimal.age, 10) > 1 ? "meses" : "mês"
                            : parseInt(selectedAnimal.age, 10) > 1 ? "anos" : "ano"
                        }. Gostaria de obter mais informações.%0D%0A%0D%0AObrigado!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                      >
                        Entrar em contato via Email
                      </a>
                    </div>
                  );
                } else {
                  return (
                    <div className="mt-4">
                      <p className="text-gray-600 text-center">
                        Sem contato informado.
                      </p>
                    </div>
                  );
                }
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
}
