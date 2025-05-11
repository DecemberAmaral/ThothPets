export default function AdoptionCard({ animal }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full">
      {/* Área para a imagem */}
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

      {/* Informações do animal */}
      <h3 className="text-lg font-bold text-gray-800 mb-1">
        {animal.name} ({animal.age} {animal.age > 1 ? "anos" : "ano"})
      </h3>
      <p className="text-sm text-gray-600">{animal.description}</p>
      <p className="text-sm text-gray-600">{animal.location}</p>
      <p className="text-sm text-gray-600">Raça: {animal.breed}</p>
      <p className="text-sm text-gray-600">Sexo: {animal.gender}</p>

      {/* Botão "Quero Adotar" */}
      <button className="mt-4 w-full px-6 py-3 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition">
        Quero Adotar
      </button>
    </div>
  );
}
