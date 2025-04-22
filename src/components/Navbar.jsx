import React, { useState } from 'react';
import ThothLogo from '../assets/ThothLogo.png'; // ajuste o caminho se necessário
import { UserIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="w-full h-23 bg-emerald-500 flex items-center justify-center">
        {/* Logo clicável que leva para a página inicial */}
        <a href="/" className="h-55 w-55 object-contain mr-4">
          <img
            src={ThothLogo}
            alt="Logo"
            className="h-55 w-55 object-contain"
          />
        </a>

        {/* Retângulo Nyanza com a parte interna da navbar */}
        <nav className="bg-[#E9FFDB] w-[95%] max-w-7xl h-19 rounded-xl shadow-md flex items-center justify-between px-6">
          {/* Menu desktop – somente visível em telas médias e maiores */}
          <ul className="hidden md:flex space-x-6 text-sm font-semibold text-gray-800">
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
            <li>
              <a href="#" className="hover:text-emerald-600 transition">
                Sobre-nós
              </a>
            </li>
          </ul>
          
          

          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-sm font-semibold text-gray-800 hover:text-emerald-600 transition">
              <UserIcon className="h-5 w-5 mr-1" />
              Cadastre-se
            </button>
            <Cog6ToothIcon className="h-6 w-6 text-gray-800 hover:text-emerald-600 transition cursor-pointer" />
          </div>

          {/* Botão hamburger – somente visível em telas pequenas */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="text-gray-800 focus:outline-none"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile – exibido somente se menuOpen for true */}
      {menuOpen && (
        <div className="md:hidden bg-[#E9FFDB] w-[95%] max-w-7xl mx-auto mt-2 rounded-xl shadow-md px-6 py-4">
          <ul className="flex flex-col space-y-4 text-sm font-semibold text-gray-800">
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
            <li>
              <a href="#" className="hover:text-emerald-600 transition">
                Sobre-Nós
              </a>
            </li>
          </ul>
          <div className="mt-4 flex flex-col space-y-4">
            <button className="flex items-center text-sm font-semibold text-gray-800 hover:text-emerald-600 transition">
              <UserIcon className="h-5 w-5 mr-1" />
              Cadastre-se
            </button>
            <button className="flex items-center text-sm font-semibold text-gray-800 hover:text-emerald-600 transition">
              <Cog6ToothIcon className="h-6 w-6 mr-1" />
              Configurações
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
