// src/components/LostAnimalList.jsx
import LostAnimalCard from "./LostAnimalCard";

export default function LostAnimalList({ animals, onViewDetails }) {
  if (!animals || animals.length === 0) {
    return <p>Nenhum anúncio encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {animals.map((animal) => (
        <div key={animal.id} onClick={() => onViewDetails(animal)}>
          <LostAnimalCard animal={animal} onViewDetails={onViewDetails} />
        </div>
      ))}
    </div>
  );
}
