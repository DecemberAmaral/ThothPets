// src/components/LostAnimalCard.jsx
export default function LostAnimalCard({ animal }) {
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

      {/* Informações do anúncio */}
      <h3 className="font-bold">{animal.nome}</h3>
      <p className="text-sm">{animal.mensagem}</p>
      <p className="text-xs text-gray-500">
        {animal.local} | {animal.especie} | {animal.sexo} | {animal.porte}
      </p>

      {/* Botão de Contato via WhatsApp */}
      {/* Certifique-se que o objeto animal possua uma propriedade 'phone' com o número completo no formato internacional */}
      <a
        href={`https://wa.me/${animal.phone}?text=Olá,%20vi%20seu%20anúncio%20de%20resgate%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
      >
        Contato via WhatsApp
      </a>


      <a
        href={`mailto:${animal.email}?subject=Contato%20sobre%20seu%20an%C3%BAncio&body=Olá, vi seu anúncio e gostaria de conversar.`}
        className="mt-4 block text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Contato via Email
      </a>
    
    </div>
  );
}