// src/pages/Home.jsx
import Hero from "../components/Hero";
import HomeActions from "../components/HomeActions";
import homeHeroImage from "../assets/gato1.png"; // Imagem do Hero

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "#D2B48C" }} // Cor bege tipo café com leite
    >
      <Hero backgroundImage={homeHeroImage} title="Sempre buscando um lugar seguro!">
        <HomeActions />
      </Hero>
    </div>
  );
}
