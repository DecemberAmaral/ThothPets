import React from 'react';
import Hero from '../components/Hero';
import HomeActions from '../components/HomeActions';
import homeHeroImage from '../assets/gato1.png'; // Certifique-se que o arquivo exista
import Footer from '../components/Footer';
export default function Home() {
  return (
    <div>
      <Hero backgroundImage={homeHeroImage} title="Sempre buscando um lugar seguro!">
        {/* HomeActions será renderizado logo abaixo do título dentro do Hero */}
        <HomeActions />
        </Hero>
        <Footer />
      {/* Outros conteúdos da Home podem vir aqui, se houver */}
    </div>
  );
}



