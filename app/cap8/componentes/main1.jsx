'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo8() {
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
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/47/c3/6c/47c36c59584ee6182b2fd1329715ac6c.jpg')" }}
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
          Capítulo 8 — Búsqueda Web y Nodos Avanzados
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          Aprende a combinar <span className="font-bold">nodos avanzados, memoria y búsquedas en tiempo real</span> para generar respuestas precisas y contextuales con tu agente de IA.
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
                  Este capítulo enseña cómo integrar nodos, memoria y búsquedas web para que tu agente genere respuestas enriquecidas y adaptativas.
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <span className="font-semibold">Nodos como bloques de construcción:</span> Cada nodo gestiona entrada, prompt, memoria y salida, manteniendo modularidad y claridad.
                  </li>
                  <li>
                    <span className="font-semibold">Nodo de búsqueda Serper:</span> Consulta Serper API en tiempo real, incorporando resultados relevantes en el prompt para respuestas precisas y actuales.
                  </li>
                  <li>
                    <span className="font-semibold">Acceso a memoria integrada:</span> ConversationBufferMemory permite que cada interacción se construya sobre el historial previo.
                  </li>
                  <li>
                    <span className="font-semibold">Estado global y control de flujo:</span> TypedDict State centraliza mensaje, rol, historial, búsqueda y resultado, asegurando coherencia en todo el flujo.
                  </li>
                  <li>
                    <span className="font-semibold">Escalabilidad y modularidad:</span> Nuevos nodos pueden agregarse sin alterar el flujo principal, garantizando replicabilidad y adaptabilidad.
                  </li>
                </ul>

                <p className="text-sm font-semibold">
                  Con nodos avanzados, memoria y búsqueda web, tu agente deja de ser un modelo aislado y se convierte en un sistema inteligente, auditable y adaptable a entornos empresariales reales.
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
