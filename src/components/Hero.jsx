import React from 'react';
import heroImage from '../assets/gato1.png'; 
import adoptIcon from '../assets/adoptIcon.png'; 
import helpIcon from '../assets/helpIcon.png';   

export default function Hero() {
  return (
    <section className="relative h-screen w-full -mt-6">
      {/* Imagem de fundo */}
      <img
        src={heroImage}
        alt="Fundo do Hero"
        className="w-full h-full object-cover"
      />
      {/* Sobreposição para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Conteúdo centralizado: título e retângulo com informações */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-3xl md:text-6xl font-bold text-center transform -translate-y-[100%]">
          Sempre buscando um lugar seguro!
        </h1>
        
        {/* Retângulo com as informações e botões */}
        <div className="mt-8 w-[90%] max-w-4xl bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Coluna "QUERO ADOTAR" */}
          <div className="flex flex-col justify-between items-center text-center min-h-[160px]">
            <p className="text-gray-800 text-xl font-bold">
              Procura um amigão para a vida? O Thoth não vai te deixar na mão!
            </p>
            <button className="w-56 bg-gray-300 hover:bg-emerald-500 hover:text-white text-gray-800 font-bold text-2xl py-3 px-6 rounded transition duration-300 flex flex-col items-center">
              <span>QUERO ADOTAR!</span>
              <img
                src={adoptIcon}
                alt="Ícone Adotar"
                className="h-10 w-10 mt-2 transition-colors duration-300"
              />
            </button>
          </div>
          
          {/* Coluna "PRECISO DE AJUDA" */}
          <div className="flex flex-col justify-between items-center text-center min-h-[160px]">
            <p className="text-gray-800 text-xl font-bold">
              Seu bichinho sumiu? O Thoth e seus usuários próximos da sua região te ajudarão a procurar!
            </p>
            <button className="w-56 bg-gray-300 hover:bg-emerald-500 hover:text-white text-gray-800 font-bold text-2xl py-3 px-6 rounded transition duration-300 flex flex-col items-center">
              <span>PRECISO DE AJUDA!</span>
              <img
                src={helpIcon}
                alt="Ícone Preciso de Ajuda"
                className="h-10 w-10 mt-2 transition-colors duration-300"
              />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
