'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaKey, FaCogs, FaFileAlt, FaRobot, FaPlay } from 'react-icons/fa';

export default function ChatGroqExplained() {
  const [activeTab, setActiveTab] = useState('anatomia_prompt');

  const nodes = [
    {
      key: 'anatomia_prompt',
      name: 'Anatomía del Prompt',
      icon: FaFileAlt,
      content: (
        <>
          <p>
            La <span className="font-bold">anatomía del prompt</span> define la personalidad y comportamiento del agente de IA. 
            Incluye secciones como meta, formato de respuesta, advertencias y entrada del usuario.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`Prompt_estruccture = """
[META]
Tu meta es analizar el negocio del usuario y generar un diagnóstico sobre cómo la IA
puede mejorar el crecimiento empresarial, explicando como si fueras un {rol} profesional.

[FORMATO RESPUESTA]
La respuesta debe ser clara, concisa y profesional, no más de 100 palabras.

[ADVERTENCIA]
No saludes.
No inventes datos.
Mantén el tono corporativo y claro.

[ENTRADA DEL USUARIO]
Consulta: {mensaje}

Respuesta:
"""`}
          </p>
          <p>
            Modificar cualquiera de estas secciones permite cambiar cómo se comporta la IA, su tono y estilo de respuesta.
          </p>
        </>
      ),
    },
    {
      key: 'roles',
      name: 'Roles y Personalidad',
      icon: FaCogs,
      content: (
        <>
          <p>
            Definir un <span className="font-bold">{'{rol}'}</span> en el prompt permite que la IA adopte diferentes perspectivas:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Auditor: enfocado en diagnóstico empresarial.</li>
            <li>Desarrollador: analiza procesos técnicos y arquitecturas de software.</li>
            <li>Vendedor: explica cómo la IA puede impulsar ventas y resultados.</li>
          </ul>
          <p className="mt-2">
            Así, la misma IA puede comportarse de manera diferente según el contexto del usuario, creando personalidad y estilo propio.
          </p>
        </>
      ),
    },
    {
      key: 'formato_respuesta',
      name: 'Formato de Respuesta',
      icon: FaRobot,
      content: (
        <>
          <p>
            La sección <span className="font-bold">[FORMATO RESPUESTA]</span> define la estructura, extensión y tono de la salida. 
            Por ejemplo, limitar la respuesta a 100 palabras y mantener profesionalismo asegura claridad y coherencia.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`[FORMATO RESPUESTA]
La respuesta debe ser clara, concisa y profesional, no más de 100 palabras.`}
          </p>
          <p>
            Ajustar estos parámetros cambia cómo el modelo comunica la información, fortaleciendo su personalidad.
          </p>
        </>
      ),
    },
    {
      key: 'advertencias',
      name: 'Advertencias y Control',
      icon: FaKey,
      content: (
        <>
          <p>
            La sección <span className="font-bold">[ADVERTENCIA]</span> sirve para imponer reglas de comportamiento al modelo: 
            evitar saludos, no inventar datos y mantener un tono corporativo.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`[ADVERTENCIA]
No saludes.
No inventes datos.
Mantén el tono corporativo y claro.`}
          </p>
          <p>
            Esto asegura consistencia y evita respuestas inesperadas que rompan la personalidad definida.
          </p>
        </>
      ),
    },
    {
      key: 'template_python',
      name: 'PromptTemplate en Python',
      icon: FaPlay,
      content: (
        <>
          <p>
            En Python, se utiliza <span className="font-bold">PromptTemplate</span> para conectar la anatomía del prompt con el LLM. 
            Permite reemplazar variables como {`{rol}`} y {`{mensaje}`} en tiempo de ejecución.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`promot_template = PromptTemplate(
    user_input=['rol', 'mensaje'],
    template=Prompt_estruccture.strip()
)`}
          </p>
          <p>
            Aquí es donde la personalidad del modelo se hace dinámica, adaptándose a la entrada y rol del usuario.
          </p>
        </>
      ),
    },
  ];

  const current = nodes.find(node => node.key === activeTab);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 bg-gray-50">
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-10 p-6 sm:p-12 ring-1 ring-black/10 shadow-xl rounded-3xl bg-white">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-black text-center px-4"
        >
          Cómo dar personalidad a un modelo de IA usando prompts
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada nodo representa un componente de la anatomía del prompt
        </motion.h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {nodes.map(node => {
            const Icon = node.icon;
            const isActive = activeTab === node.key;
            return (
              <button
                key={node.key}
                onClick={() => setActiveTab(node.key)}
                className={`relative group overflow-hidden px-4 py-2 rounded-full border transition-all flex items-center gap-2
                  ${isActive
                    ? 'bg-orange-500 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`text-xl transition-colors ${isActive ? 'text-white' : 'text-orange-500'}`} />
                  <span className="font-medium">{node.name}</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </button>
            );
          })}
        </div>

        {/* Contenido dinámico */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 text-left"
          >
            <h3 className="text-2xl font-semibold text-black text-center mb-6">{current.name}</h3>
            <div className="text-gray-800 text-base sm:text-lg leading-relaxed text-justify whitespace-pre-line">
              {current.content}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
