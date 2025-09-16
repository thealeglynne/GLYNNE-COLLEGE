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
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/69/a4/39/69a439c202f1ff1489ebc44bed92b8bb.jpg')",
        }}
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
          Módulo 1 — Introducción al Aprendizaje Automático (Machine Learning)
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          En este módulo conocerás los <span className="font-bold">fundamentos del Machine Learning</span>: 
          qué es, cómo funciona y por qué es clave en la revolución tecnológica actual. 
          Aprenderás sobre <span className="font-bold">datos como materia prima</span>, 
          la diferencia
          y el papel de los <span className="font-bold">modelos matemáticos</span> 
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
