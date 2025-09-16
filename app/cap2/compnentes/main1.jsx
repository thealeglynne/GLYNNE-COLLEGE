'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo2() {
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
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/62/33/c3/6233c353463bee0967bd6482fbd6fe31.jpg')" }}
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
          Capítulo 2 — Dale Personalidad a tu Agente
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          En este capítulo aprenderemos a darle <span className="font-bold">personalidad y estilo propio</span> a tu agente de IA mediante la anatomía de prompts, 
          su inserción estratégica y la configuración de características que guiarán su comportamiento y respuestas.
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
            {/* Overlay semitransparente */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Contenedor del contenido con blur */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 max-w-3xl text-white overflow-y-auto space-y-4">
                <h2 className="text-2xl font-bold mb-2">Conceptos clave antes de comenzar</h2>

                <p className="text-sm">
                  Antes de iniciar este capítulo, es fundamental entender cómo dar personalidad a tu agente y configurar su comportamiento:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <span className="font-semibold">Anatomía del Prompt:</span> Cómo estructurar prompts que guíen al agente de manera estratégica.
                  </li>
                  <li>
                    <span className="font-semibold">Inserción de comportamiento:</span> Definir características y reglas que el agente seguirá en sus respuestas.
                  </li>
                  <li>
                    <span className="font-semibold">Consistencia y coherencia:</span> Mantener el estilo y tono del agente a lo largo de la interacción.
                  </li>
                  <li>
                    <span className="font-semibold">Prueba de interacciones:</span> Evaluar cómo responde el agente ante distintos escenarios para ajustarlo antes de despliegue.
                  </li>
                  <li>
                    <span className="font-semibold">Preparación para módulos avanzados:</span> Este capítulo es la base para agentes con personalidad compleja y autonomía progresiva.
                  </li>
                </ul>

                <p className="text-sm font-semibold">
                  Tener claros estos conceptos te permitirá configurar un agente más humano, coherente y eficaz en cada interacción.
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
