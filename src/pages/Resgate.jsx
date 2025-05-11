// src/pages/Resgate.jsx
import { useState } from "react";
import Hero from "../components/Hero";
import LostAnimalForm from "../components/LostAnimalForm";
import LostAnimalList from "../components/LostAnimalList";
import resgateHeroImage from "../assets/resgateHero.png";

export default function Resgate() {
  // Dummy posts para exibir os últimos anúncios de resgate
  const [animals, setAnimals] = useState([
    {
      id: 1,
      nome: "Totó",
      especie: "Cachorro",
      sexo: "Macho",
      porte: "Médio",
      mensagem: "Visto pela última vez na rua X.",
      local: "SP - São Paulo",
      image: "",
    },
    {
      id: 2,
      nome: "Luna",
      especie: "Gato",
      sexo: "Fêmea",
      porte: "Pequeno",
      mensagem: "Perdida próxima ao shopping.",
      local: "RJ - Rio de Janeiro",
      image: "",
    },
    {
      id: 3,
      nome: "Max",
      especie: "Cachorro",
      sexo: "Macho",
      porte: "Grande",
      mensagem: "Ajudem a encontrar!",
      local: "MG - Belo Horizonte",
      image: "",
    },
    {
      id: 4,
      nome: "Bella",
      especie: "Cachorro",
      sexo: "Fêmea",
      porte: "Médio",
      mensagem: "Desaparecida desde ontem.",
      local: "RS - Porto Alegre",
      image: "",
    },
  ]);

  const handlePublish = (formData) => {
    // Exemplo: inserindo o novo anúncio na lista
    const newAnimal = {
      id: animals.length + 1,
      nome: "Novo Animal", // Caso deseje incluir também o nome via formulário, adicione esse campo.
      ...formData,
      mensagem: formData.descricao,
      local: `${formData.cidade ? formData.cidade + ", " : ""}${formData.estado.toUpperCase()}`
    };
    setAnimals([newAnimal, ...animals]);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#D2B48C" }}
    >
      <Hero
        backgroundImage={resgateHeroImage}
        title="Resgate"
        subtitle="Procure seu bichinho ou ajude a encontrá-lo!"
      />

      <div className="container mx-auto px-4 py-8">
        {/* A caixa unificada com o formulário e a listagem dos anúncios */}
        <div className="bg-white rounded-lg shadow-lg p-6 relative z-10 -mt-37 mb-32">
          <h2 className="text-2xl font-bold mb-4">Publicar Anúncio de Resgate</h2>
          <LostAnimalForm onPublish={handlePublish} />

          {/* Separador visual */}
          <hr className="my-8" />

          <h2 className="text-xl font-bold mb-4">Últimos Anúncios de Resgate</h2>
          <LostAnimalList animals={animals} />
        </div>
      </div>
    </div>
  );
}
