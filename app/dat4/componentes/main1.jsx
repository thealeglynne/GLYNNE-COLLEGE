'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo4() {
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
            "url('https://i.pinimg.com/736x/7d/8b/aa/7d8baaf2114c528387179a585b7c3f8e.jpg')",
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
          Módulo 4 — Limpieza y Preparación de Datos
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          En este módulo aprenderás a <span className="font-bold">detectar valores nulos y duplicados</span>, 
          transformar columnas con <span className="font-bold">tipos de datos correctos</span> y 
          aplicar <span className="font-bold">estrategias de imputación</span> para datos faltantes. 
          También verás cómo <span className="font-bold">unir y dividir datasets</span>, construir 
          <span className="font-bold">tablas limpias y normalizadas</span> y preparar la información 
          para análisis estadísticos, visualizaciones y entrenar modelos de inteligencia artificial 
          sin sesgos ni inconsistencias.
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
