'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo3() {
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
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/14/82/ec/1482ec973314f59e3cd0ce232d51f421.jpg')" }}
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
          Capítulo 3 — Agentes con Roles Dinámicos
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          Aprende a asignar <span className="font-bold">roles estratégicos</span> a tu agente de IA. Cada rol transforma su personalidad y respuestas, creando agentes especializados sin duplicar modelos.
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
                  Este capítulo introduce roles dinámicos para tu agente de IA. Cada rol define su personalidad, estilo de respuestas y comportamiento en toda la conversación.
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <span className="font-semibold">Roles como eje central:</span> Auditor, desarrollador o asesor; cambiar el rol redefine su comportamiento.
                  </li>
                  <li>
                    <span className="font-semibold">Memoria y contexto:</span> La interacción mantiene coherencia con el rol elegido.
                  </li>
                  <li>
                    <span className="font-semibold">Flexibilidad y pruebas:</span> Puedes alternar roles para evaluar cómo varía la personalidad del agente.
                  </li>
                  <li>
                    <span className="font-semibold">Aplicación empresarial:</span> Ideal para consultoría, soporte, capacitación o ventas sin duplicar modelos.
                  </li>
                </ul>

                <p className="text-sm font-semibold">
                  Dominar los roles te permitirá crear agentes especializados, coherentes y adaptables en cualquier escenario.
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
