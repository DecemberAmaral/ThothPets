import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carouselItems = [
  {
    image: '/assets/gato1.png', // Substitua pelo caminho da sua imagem
    text: 'Salvando vidas, um pet de cada vez',
  },
  // Adicione mais objetos conforme necessário
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  // Avança o slide automaticamente a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    fade: true,
    speed: 1000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-6">
      <Slider {...settings}>
        {carouselItems.map((item, idx) => (
          <div key={idx} className="relative">
            <img
              src={item.image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
            {index === idx && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl font-serif text-[#FFFCF4] opacity-80 px-4 py-2 rounded">
                  {item.text}
                </p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
