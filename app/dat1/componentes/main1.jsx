'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo1() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogo(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden font-inter">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/93/34/eb/9334eb367faf2a1c566a358adb8ae504.jpg')" }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Contenido */}
      <div className="absolute bottom-20 left-12 z-20 text-white max-w-4xl space-y-6">
        <img
          src="/logo.png"
          alt="Logo GLYNNE"
          className={`w-28 sm:w-36 transition-all duration-1000 ${
            showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        />

        <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug text-white">
          Módulo 1 — Introducción a Ciencia de Datos
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          Aprende a manipular y analizar datos con <span className="font-bold">Python, pandas y numpy</span>. Explora CSV, calcula estadísticas básicas y prepárate para proyectos reales de datos.
        </p>

        <button
          className="mt-4 px-5 py-2 text-sm sm:text-base font-bold bg-white text-black rounded-lg transition hover:bg-gray-200"
        >
          Comenzar el módulo
        </button>
      </div>
    </main>
  );
}
