// src/components/LostAnimalCard.jsx
export default function LostAnimalCard({ animal, onViewDetails }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      {/* Imagem do anúncio */}
      <div className="w-full h-32 bg-gray-200 rounded mb-2 overflow-hidden flex items-center justify-center">
        {animal.image ? (
          <img 
            src={animal.image} 
            alt={animal.nome} 
            className="w-full h-full object-cover rounded" 
          />
        ) : (
          <span>Sem Imagem</span>
        )}
      </div>

      {/* Informações resumidas do anúncio */}
      <h3 className="font-bold">{animal.nome}</h3>
      <p className="text-sm">{animal.mensagem}</p>
      <p className="text-xs text-gray-500">
        {animal.local} | {animal.especie} | {animal.sexo} | {animal.porte}
      </p>

      {/* Botão único para abrir os detalhes */}
      <button
        onClick={() => onViewDetails && onViewDetails(animal)}
        className="mt-4 block text-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded"
      >
        Saiba Mais / Posso Ajudar
      </button>
    </div>
  );
}
