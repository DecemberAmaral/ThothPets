// src/pages/Home.jsx
import Hero from "../components/Hero";
import HomeActions from "../components/HomeActions";
import homeHeroImage from "../assets/gato1.png"; // Imagem do Hero
import sobreNosImage from "../assets/sobre-nos-image.png"; 
import queroAjudarImage from "../assets/quero-ajudar-image.png"; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Hero backgroundImage={homeHeroImage} title="Sempre buscando um lugar seguro!">
        <HomeActions />
      </Hero>

      <div className="container mx-auto px-4 py-12 mt-96 md:mt-32">
        {/* Box "Sobre Nós" com id para scroll */}
        <div id="sobre-nos" className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0 text-left">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Sobre Nós</h2>
              <p className="text-gray-700 text-lg">
                Este projeto nasceu com a missão de criar um lugar seguro para os animais e unir pessoas que se importam com o bem-estar pet. Aqui, buscamos conectar adotantes e pessoas que querem ajudar a transformar vidas.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={sobreNosImage}
              alt="Sobre Nós"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Box "Quero Ajudar" com id para scroll */}
        <div id="quero-ajudar" className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-8">
          <div className="md:w-1/2 mb-6 md:mb-0 text-left">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Quero Ajudar</h2>
              <p className="text-gray-700 text-lg">
                Se você quer fazer a diferença, o Thoth conecta pessoas dispostas a ajudar com causas que transformam a vida dos animais. Descubra como você pode contribuir para dar um lar seguro e amoroso para os nossos amigos de quatro patas.
              </p>
              <p className="mt-4 text-lg font-bold">
                <a 
                  href="https://observatorio3setor.org.br/lista-conheca-7-ongs-brasileiras-que-atuam-na-protecao-de-animais/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Clique aqui
                </a>
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={queroAjudarImage}
              alt="Quero Ajudar"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Footer com id para scroll no item "Contato" */}
      <footer id="contato" className="bg-white-500 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p></p>
          {/* Outras informações de contato podem ser adicionadas aqui */}
        </div>
      </footer>
    </div>
  );
}
