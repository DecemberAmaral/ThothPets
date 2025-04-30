import React from 'react';

export default function Hero({ backgroundImage, title, children }) {
  return (
    <section className="relative h-screen w-full">
      {/* Imagem de fundo */}
      <img
        src={backgroundImage}
        alt="Fundo do Hero"
        className="w-full h-full object-cover"
      />
      {/* Sobreposição para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Conteúdo do Hero: título e conteúdo adicional */}
      <div className="absolute inset-0 flex flex-col items-center justify-start gap-4 px-4 pt-59">
        {/* Título, ex: "Adoção" */}
        <h1 className="text-white text-3xl md:text-6xl font-bold text-center">
          {title}
        </h1>
        {/* Container para o children, posicionado abaixo do título */}
        <div className="mt-8 w-full max-w-4xl">
          {children}
        </div>
      </div>
    </section>
  );
}
