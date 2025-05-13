// src/components/AdoptionCards.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdoptionCard from "./AdoptionCard";

export default function AdoptionCards({ filter, onAdopt }) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function fetchAnimals() {
      const { data, error } = await supabase
        .from("animals_adocao")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Erro ao buscar animais para adoção:", error);
      } else {
        setAnimals(data);
      }
    }
    fetchAnimals();
  }, []);

  const filteredAnimals = animals.filter((animal) => {
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

  // Ordena pelos registros com data mais recente primeiro.
  const sortedAnimals = filteredAnimals.sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
      {sortedAnimals.map((animal) => (
        <AdoptionCard key={animal.id} animal={animal} onAdopt={onAdopt} />
      ))}
    </div>
  );
}
