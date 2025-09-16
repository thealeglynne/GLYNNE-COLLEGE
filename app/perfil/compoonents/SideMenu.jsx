'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PerfilUsuario from './perfil';
import PreguntasPredefinidas from './preguntasPredefinidas';

export default function SideMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`absolute top-4 left-4 z-50 p-3 rounded-md mt-[50px] transition-colors duration-300 ${
          menuOpen ? 'bg-black' : 'bg-white'
        }`}
      >
        {menuOpen ? <FaTimes className="text-white text-xl" /> : <FaBars className="text-black text-xl" />}
      </button>

      {/* Menú lateral */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-white shadow-md transition-all duration-500 ease-in-out overflow-hidden
          ${menuOpen ? 'w-[300px] sm:w-[30vw]' : 'w-0'}`}
      >
        <div className="h-full p-5 overflow-y-auto flex flex-col gap-6">
          {/* Perfil desplazado 50px */}
          <div className="border-b border-gray-200 pb-4 mt-[50px]">
            <PerfilUsuario />
          </div>

          {/* Preguntas predefinidas */}
          <div className="border-b border-gray-200 pb-4">
            <PreguntasPredefinidas />
          </div>
        </div>
      </div>
    </div>
  );
}
