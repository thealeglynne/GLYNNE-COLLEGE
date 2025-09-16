'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo6() {
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
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/95/66/3e/95663ed81d940e3bf813d36fae915e62.jpg')" }}
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
          Capítulo 6 — Nodos y Flujos Inteligentes
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          Descubre cómo <span className="font-bold">LangGraph organiza nodos</span> para crear flujos inteligentes, escalables y con memoria, transformando un LLM en un sistema interactivo y modular.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-5 py-2 text-sm sm:text-base font-bold bg-white text-black rounded-lg transition hover:bg-gray-200"
        >
          Antes de empezar revisa los conceptos clave
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
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 max-w-3xl text-white overflow-y-auto space-y-4">
                <h2 className="text-2xl font-bold mb-2">Conceptos clave antes de comenzar</h2>

                <p className="text-sm">
                  LangGraph permite estructurar la interacción de tu agente mediante nodos modulares y flujos inteligentes.
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <span className="font-semibold">Nodos como bloques de construcción:</span> Cada nodo encapsula la lógica de entrada, prompt, memoria y salida.
                  </li>
                  <li>
                    <span className="font-semibold">Memoria integrada:</span> Cada nodo accede al historial para mantener coherencia y continuidad en las respuestas.
                  </li>
                  <li>
                    <span className="font-semibold">Flujos controlados:</span> Los nodos siguen secuencias definidas, evitando redundancias y garantizando consistencia en cada interacción.
                  </li>
                  <li>
                    <span className="font-semibold">Escalabilidad y modularidad:</span> Se pueden agregar nodos para nuevos roles, análisis o integraciones sin afectar el flujo principal.
                  </li>
                  <li>
                    <span className="font-semibold">Aplicación empresarial:</span> Procesos visuales, auditables y replicables, transformando el LLM en un asesor estratégico y adaptable.
                  </li>
                </ul>

                <p className="text-sm font-semibold">
                  Dominar nodos y flujos convierte a tu agente en un sistema inteligente, coherente y preparado para evolucionar con cada interacción.
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
