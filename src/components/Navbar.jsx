import React from 'react';
import ThothLogo from '../assets/ThothLogo.png'; // ajuste o caminho se necessário
import { UserIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  return (
    <div className="w-full h-23 bg-emerald-500 flex items-center justify-center">
      {/* Logo clicável que leva para a página inicial */}
      <a href="/" className="h-55 w-55 object-contain mr-4">
        <img
          src={ThothLogo}
          alt="Logo"
          className="h-55 w-55 object-contain"
        />
      </a>
      {/* Retângulo Nyanza (navbar) */}
      <nav className="bg-[#E9FFDB] w-[95%] max-w-7xl h-19
       rounded-xl shadow-md flex items-center justify-between px-6">
        {/* Links à esquerda */}
        <ul className="flex space-x-6 text-sm font-semibold text-gray-800">
          <li>
            <a href="#" className="hover:text-emerald-600 transition">
              Início
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-600 transition">
              Quero Ajudar
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-600 transition">
              Contato
            </a>
          </li>
        </ul>

        {/* Cadastre-se + Config à direita */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-sm font-semibold text-gray-800 hover:text-emerald-600 transition">
            <UserIcon className="h-5 w-5 mr-1" />
            Cadastre-se
          </button>
          <Cog6ToothIcon className="h-6 w-6 text-gray-800 hover:text-emerald-600 transition cursor-pointer" />
        </div>
      </nav>
    </div>
  );
}