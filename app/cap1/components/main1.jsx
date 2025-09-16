'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo1() {
  const [showLogo, setShowLogo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogo(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden font-inter">
      {/* Imagen de fondo principal */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/d2/e1/fd/d2e1fd42e3bd9f18b48f334d4c9135f9.jpg')" }}
      />

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Contenido */}
      <div className="absolute bottom-20 left-12 z-20 text-white max-w-4xl space-y-6">
        <img
          src="/logo.png"
          alt="Logo GLY-IA College"
          className={`w-28 sm:w-36 transition-all duration-1000 ${
            showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        />

        <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug text-white">
          Bienvenido al Primer Módulo
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          Hoy vas a crear tu primer agente <span className="font-bold">REAL de Inteligencia Artificial</span>. 
          No un bot cualquiera, sino un asistente que razona, actúa y evoluciona con cada interacción.
        </p>

        

      

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-5 py-2 text-sm sm:text-base font-bold bg-white text-black rounded-lg transition hover:bg-gray-200"
        >
          Antes de empezar revisa esto
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div
            className="relative w-[80vw] h-[80vh] rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: "url('https://i.pinimg.com/736x/c1/88/40/c18840acbf9dfb23e295b30fc882171b.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay semitransparente */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Contenedor del contenido con blur */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 max-w-3xl text-white overflow-y-auto space-y-4">
                <h2 className="text-2xl font-bold mb-2">Requisitos antes de comenzar</h2>

                <p className="text-sm">
                  Antes de iniciar con este módulo, es importante que tengas tu entorno de trabajo listo.
                  Asegúrate de cumplir con lo siguiente:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <span className="font-semibold">Visual Studio Code instalado:</span> 
                    Editor principal, ligero y con muchas extensiones útiles.
                  </li>
                  <li>
                    <span className="font-semibold">Python instalado (3.9+ recomendado):</span> 
                    Incluye intérprete y terminal. Opcional: gestor de entornos como venv o conda.
                  </li>
                  <li>
                    <span className="font-semibold">Conocimientos básicos de programación:</span> 
                    Variables, funciones, bucles, instalación de librerías con pip, manejo de terminal y conceptos básicos de arquitectura de software.
                  </li>
                </ul>

                <p className="text-sm font-semibold">
                  Con estas bases, estarás listo para aprovechar al máximo el contenido y avanzar sin obstáculos.
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
