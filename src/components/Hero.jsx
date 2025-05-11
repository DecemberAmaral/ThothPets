export default function Hero({ backgroundImage, title, children }) {
  return (
    <section className="relative h-[600px] w-full">
      {/* Imagem de fundo */}
      <img
        src={backgroundImage}
        alt="Fundo do Hero"
        className="w-full h-full object-cover"
      />
      {/* Sobreposição para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Container para o título centralizado */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
          {title}
        </h1>
      </div>
      
      {/* Container para os children, posicionado na parte inferior e ajustado para sobrepor o background */}
      <div className="absolute left-0 right-0 bottom-0 flex justify-center transform translate-y-[60%]">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </div>
    </section>
  );
}
