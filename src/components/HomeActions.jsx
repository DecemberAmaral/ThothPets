// src/components/HomeActions.jsx
import { useNavigate } from 'react-router-dom';
import adoptIcon from '../assets/adoptIcon.png';
import helpIcon from '../assets/helpIcon.png';

export default function HomeActions() {
  const navigate = useNavigate();

  const handleQueroAdotar = () => {
    navigate('/adocao');  // Redireciona para a página de adoção
  };

  const handlePrecisoAjuda = () => {
    navigate('/resgate');   // Redireciona para a página de ajuda
  };

  return (
    <div
      className="
        w-[90%] max-w-4xl bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto mb-20
        md:sticky md:top-[70vh]
      "
    >
      {/* Botão "Quero Adotar" */}
      <div className="flex flex-col items-center text-center">
        <p className="text-gray-800 text-xl font-bold mb-4">
          Procura um amigão para a vida? O Thoth não vai te deixar na mão!
        </p>
        <button 
          onClick={handleQueroAdotar}
          className="w-56 bg-gray-300 hover:bg-emerald-500 hover:text-white text-gray-800 font-bold text-2xl py-3 px-6 rounded transition duration-300 flex flex-col items-center"
        >
          <span>QUERO ADOTAR!</span>
          <img
            src={adoptIcon}
            alt="Ícone Adotar"
            className="h-16 w-40 mt-2 transition-colors duration-300 object-contain"
          />
        </button>
      </div>
      
      {/* Botão "Preciso de Ajuda" */}
      <div className="flex flex-col items-center text-center">
        <p className="text-gray-800 text-xl font-bold mb-4">
          Seu bichinho sumiu? O Thoth e seus usuários vão te ajudar a procurar!
        </p>
        <button 
          onClick={handlePrecisoAjuda}
          className="w-56 bg-gray-300 hover:bg-emerald-500 hover:text-white text-gray-800 font-bold text-2xl py-3 px-6 rounded transition duration-300 flex flex-col items-center"
        >
          <span>PRECISO DE AJUDA!</span>
          <img
            src={helpIcon}
            alt="Ícone Preciso de Ajuda"
            className="h-16 w-40 mt-2 transition-colors duration-300 object-contain"
          />
        </button>
      </div>
    </div>
  );
}
