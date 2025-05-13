// src/components/AdoptionCard.jsx
export default function AdoptionCard({ animal, onAdopt }) {
  console.log("Animal recebido no card:", animal);

  const ageLabel =
    animal.age_unit === "meses"
      ? parseInt(animal.age, 10) > 1
        ? "meses"
        : "mês"
      : parseInt(animal.age, 10) > 1
      ? "anos"
      : "ano";
  const descriptionText = animal.description || "Sem descrição disponível";
  const breedText = animal.breed || "Não informada";
  const locationText =
    animal.location ||
    `${animal.city || "Cidade não informada"}, ${animal.state || "Estado não informado"}`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full">
      <div className="h-40 w-full bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center">
        {animal.image ? (
          <img
            src={animal.image}
            alt={animal.name}
            className="h-full w-full object-cover rounded"
          />
        ) : (
          <span>Imagem do animal</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">
        {animal.name} ({animal.age} {ageLabel})
      </h3>
      <p className="text-sm text-gray-600">{descriptionText}</p>
      <p className="text-sm text-gray-600">Raça: {breedText}</p>
      <p className="text-sm text-gray-600">Localização: {locationText}</p>
      <p className="text-sm text-gray-600">Sexo: {animal.gender}</p>
      <button
        onClick={() => onAdopt(animal)}
        className="mt-4 w-full px-6 py-3 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
      >
        Quero Adotar
      </button>
    </div>
  );
}
