// src/components/AdoptionCards.jsx
import React from "react";
import AdoptionCard from "./AdoptionCard";

const dummyAnimals = [
  {
    id: 1,
    species: "cachorro",
    sex: "Macho",
    size: "grande",
    state: "PR",
    city: "Ivaiporã",
    age: "2", // Valor numérico em string
    name: "Rex",
    description: "Amigável e brincalhão!",
    location: "Ivaiporã, PR",
    breed: "Vira-lata",
    gender: "Macho",
    image: "",
  },
  {
    id: 2,
    species: "gato",
    sex: "Fêmea",
    size: "pequeno",
    state: "PR",
    city: "Curitiba",
    age: "1",
    name: "Luna",
    description: "Carinhosa e alegre!",
    location: "Curitiba, PR",
    breed: "Persa",
    gender: "Fêmea",
    image: "",
  },
  // Adicione mais animais conforme necessário. Certifique-se de que IDs maiores correspondam ao post mais recente.
];

export default function AdoptionCards({ filter }) {
  // Filtra os animais conforme os filtros selecionados
  const filteredAnimals = dummyAnimals.filter((animal) => {
    let ageValid = true;
    if (filter.age !== "") {
      const numericAge = parseInt(animal.age, 10);
      if (filter.age === "0-1") {
        ageValid = numericAge >= 0 && numericAge <= 1;
      } else if (filter.age === "1-3") {
        ageValid = numericAge >= 1 && numericAge <= 3;
      } else if (filter.age === "3-5") {
        ageValid = numericAge >= 3 && numericAge <= 5;
      } else if (filter.age === ">5") {
        ageValid = numericAge > 5;
      }
    }

    return (
      (filter.species === "" || animal.species === filter.species) &&
      (filter.sex === "" || animal.gender.toLowerCase() === filter.sex.toLowerCase()) &&
      (filter.size === "" || animal.size === filter.size) &&
      (filter.state === "" || animal.state.toLowerCase() === filter.state.toLowerCase()) &&
      (filter.city === "" || animal.city.toLowerCase() === filter.city.toLowerCase()) &&
      ageValid
    );
  });

  // Ordena os animais do mais recente para o menos recente (supondo que IDs maiores são mais recentes)
  const sortedAnimals = filteredAnimals.sort((a, b) => b.id - a.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAnimals.map((animal) => (
        <AdoptionCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}
