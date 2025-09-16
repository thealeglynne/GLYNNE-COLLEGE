'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFileAlt, FaExternalLinkAlt, FaBookOpen, FaTools, FaRobot
} from 'react-icons/fa';

const docs = [
  {
    icon: <FaBookOpen size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Prompt Engineering Guide (OpenAI)',
    description: 'Guía oficial de OpenAI sobre cómo escribir prompts efectivos.',
    detail: 'Explica técnicas para estructurar prompts, definir roles, instrucciones y ejemplos de entrada-salida para LLMs.',
    link: 'https://platform.openai.com/docs/guides/completion/prompting'
  },
  {
    icon: <FaFileAlt size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Prompt Design Best Practices (Anthropic)',
    description: 'Buenas prácticas para diseñar prompts claros y seguros.',
    detail: 'Detalla cómo formular prompts que minimicen errores, sesgos y resultados inesperados en modelos LLM.',
    link: 'https://www.anthropic.com/research/constitutional-ai'
  },
  {
    icon: <FaTools size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Prompt Engineering Guide (Hugging Face)',
    description: 'Guía de Hugging Face para prompt engineering.',
    detail: 'Recursos sobre cómo estructurar prompts, ajustar contexto y controlar la salida de modelos de lenguaje.',
    link: 'https://huggingface.co/docs/transformers/main/en/main_classes/pipelines#prompting'
  },
  {
    icon: <FaRobot size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'LLM Prompting Resources',
    description: 'Colección de guías y artículos sobre prompting.',
    detail: 'Incluye referencias y ejemplos de prompts para distintos casos de uso en negocios, desarrollo y creatividad.',
    link: 'https://www.promptingguide.ai/es/introduction/examples'
  },
  {
    icon: <FaBookOpen size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Anatomía de un Prompt',
    description: 'Explicación de los bloques de un prompt efectivo.',
    detail: 'Define secciones como [META], [FORMATO RESPUESTA], [ADVERTENCIA], y cómo estas secciones crean la personalidad y estilo del LLM.',
    link: 'https://www.promptingguide.ai/es/introduction/anatomy'
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PromptDocumentationCards() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-10 pt-[100px] bg-gray-50">
      <div className="relative z-10 w-full max-w-[90vw] flex flex-col items-center text-center space-y-10 p-6 sm:p-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-gray-900">
            Recursos Oficiales de Anatomía de Prompts
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4 text-base md:text-lg">
            Accede a guías, ejemplos y buenas prácticas oficiales para estructurar prompts y dar personalidad a modelos de lenguaje.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {docs.map((doc, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(doc)}
            >
              <div className="mb-4 flex justify-center">{doc.icon}</div>
              <h3 className="text-lg font-bold uppercase text-gray-900 mb-2">{doc.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{doc.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Popup con detalle y enlace */}
      <AnimatePresence>
        {selected && (
          <Dialog open={!!selected} onClose={() => setSelected(null)} className="relative z-50">
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-11/12 max-w-4xl bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
              >
                <Dialog.Title className="text-2xl font-extrabold mb-4 text-gray-900">
                  {selected?.title}
                </Dialog.Title>
                <Dialog.Description className="text-gray-700 text-base whitespace-pre-line leading-relaxed">
                  {selected?.detail}
                </Dialog.Description>
                <a
                  href={selected?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
                >
                  Ver Documentación <FaExternalLinkAlt />
                </a>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setSelected(null)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
