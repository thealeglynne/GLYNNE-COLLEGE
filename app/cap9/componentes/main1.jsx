'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo9() {
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
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/1e/5a/4e/1e5a4eb83b7a95167a476ab5330585db.jpg')" }}
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
          Capítulo 9 — Desenlace: Integración y Maestría del Agente
        </h2>

        <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
          En este capítulo final consolidamos todo lo aprendido: <span className="font-bold">nodos, memoria, búsquedas web y prompts dinámicos</span> para que tu agente se convierta en un sistema inteligente, coherente y escalable.
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
                  Este capítulo cierra el módulo consolidando la arquitectura de nodos, memoria y búsqueda web, creando un agente completo y funcional.
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <span className="font-semibold">Nodos como bloques de construcción:</span> Cada nodo gestiona tareas específicas, desde prompts hasta memoria y ejecución de LLM.
                  </li>
                  <li>
                    <span className="font-semibold">Nodo Serper y búsqueda en tiempo real:</span> Integración de información actualizada en el flujo del agente, para respuestas precisas y contextualizadas.
                  </li>
                  <li>
                    <span className="font-semibold">Memoria integrada:</span> ConversationBufferMemory asegura que cada interacción sea coherente y que el historial se mantenga activo para todo el flujo.
                  </li>
                  <li>
                    <span className="font-semibold">Estado global y control de flujo:</span> TypedDict State permite centralizar mensaje, rol, historial, búsqueda y resultado, manteniendo la consistencia.
                  </li>
                  <li>
                    <span className="font-semibold">Escalabilidad y modularidad:</span> Se pueden agregar nodos nuevos sin afectar la estructura existente, garantizando replicabilidad y adaptabilidad empresarial.
                  </li>
                  <li>
                    <span className="font-semibold">Visión práctica y empresarial:</span> Cada flujo es auditable, replicable y visualmente trazable, permitiendo diagnósticos progresivos y recomendaciones acumulativas.
                  </li>
                </ul>

                <p className="text-sm font-semibold">
                  Al finalizar este capítulo, tu agente deja de ser un modelo aislado y se transforma en un sistema modular, escalable y preparado para integrarse en soluciones complejas de automatización e IA empresarial.
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
