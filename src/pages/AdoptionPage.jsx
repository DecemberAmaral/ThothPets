// src/pages/AdoptionPage.jsx
import React, { useState } from "react";
import Hero from "../components/Hero";
import AdoptionActions from "../components/AdoptionActions";
import AdoptionCards from "../components/AdoptionCards";
import adoptionHeroImage from "../assets/hero-adoption.png";
import Footer from "../components/Footer";

export default function AdoptionPage() {
  const [filter, setFilter] = useState({
    species: "",
    sex: "",
    size: "",
    state: "",
    city: "",
    age: ""
  });

  return (
    <div>
      <div className="relative">
        <Hero backgroundImage={adoptionHeroImage} title="Adoção" />
        {/* 
          Ajuste o valor de -mt-16 conforme necessário.
          Esse valor negativo faz com que a caixa branca com filtros e cards fique
          posicionada exatamente abaixo da palavra "Adoção" (sobrepondo um pouquinho o Hero)
          sem criar um grande intervalo ou espaço em branco.
        */}
        <div className="mx-auto w-[90%] max-w-4xl bg-white rounded-lg shadow-lg p-6 -mt-110 relative z-10">
          <AdoptionActions onFilterChange={setFilter} />
          <AdoptionCards filter={filter} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
