// src/pages/AdoptionPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AdoptionActions from "../components/AdoptionActions";
import AdoptionCards from "../components/AdoptionCards";
import adoptionHeroImage from "../assets/hero-adoption.png";

export default function AdoptionPage() {
  const [filter, setFilter] = useState({
    species: "",
    sex: "",
    size: "",
    state: "",
    city: "",
    age: ""
  });
  const navigate = useNavigate();

  return (
    <div
      className="relative overflow-x-hidden"
      style={{ backgroundColor: "#D2B48C" }} // Cor bege aplicada
    >
      {/* Hero com o título "Adoção" */}
      <Hero backgroundImage={adoptionHeroImage} title="Adoção" />
      
      {/* Container centralizado para filtros e cards */}
      <div className="container mx-auto px-4 py-8">
        {/* Ajuste o mt para posicionar o container abaixo do Hero conforme desejado */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-[-150px] mb-32 relative z-10">
          <AdoptionActions onFilterChange={setFilter} />
          <AdoptionCards filter={filter} />
        </div>
      </div>
      
      {/* Botão flutuante unificado para cadastro */}
      <button
        onClick={() => navigate("/cadastro-adocao")}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-white font-bold">
          Publique um pet para adoção aqui!
        </span>
      </button>
    </div>
  );
}
