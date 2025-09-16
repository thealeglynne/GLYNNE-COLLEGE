'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPython, FaFileCode, FaKey, FaRobot, FaFileAlt, FaExternalLinkAlt,
  FaCogs, FaDatabase, FaServer, FaBookOpen, FaTools
} from 'react-icons/fa';

const docs = [
  // ==================== Documentación LangGraph ====================
  {
    icon: <FaTools size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'LangGraph Oficial',
    description: 'Documentación oficial de LangGraph.',
    detail: 'Guía completa de LangGraph para construir grafos de estados en Python, con nodos, edges, compilación de workflows y mejores prácticas.',
    link: 'https://python.langgraph.com/docs/introduction/'
  },
  {
    icon: <FaTools size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Nodos y Estados',
    description: 'Cómo crear nodos y definir estados en LangGraph.',
    detail: 'Explicación detallada de cómo cada nodo recibe un State, ejecuta lógica y devuelve un nuevo State, manteniendo coherencia y modularidad.',
    link: 'https://python.langgraph.com/docs/concepts/nodes_states/'
  },
  {
    icon: <FaTools size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Edges y Flujo',
    description: 'Conectar nodos y definir el flujo del grafo.',
    detail: 'Define cómo los nodos se conectan entre sí y al END, controlando el flujo de la ejecución y permitiendo múltiples rutas en el workflow.',
    link: 'https://python.langgraph.com/docs/concepts/edges/'
  },
  {
    icon: <FaTools size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Compile y Ejecutar',
    description: 'Cómo compilar y ejecutar workflows en LangGraph.',
    detail: 'Transforma tu grafo de estados en un workflow ejecutable con .compile(), y llama a app.invoke() para procesar inputs con memoria y lógica definida.',
    link: 'https://python.langgraph.com/docs/concepts/compile_invoke/'
  },
  // ==================== Documentación previa (Python, LangChain, Groq...) ====================
  {
    icon: <FaPython size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Python Oficial',
    description: 'Documentación oficial del lenguaje Python.',
    detail: 'Python es el lenguaje principal de todo el sistema. Desde variables de entorno hasta scripts de automatización, conocer su documentación oficial te ayudará a entender la sintaxis y módulos integrados.',
    link: 'https://www.python.org/doc/'
  },
  {
    icon: <FaKey size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'dotenv (.env)',
    description: 'Uso de variables de entorno para la API key.',
    detail: 'El paquete dotenv permite cargar variables de entorno desde un archivo .env. Esto asegura que las API keys y credenciales sensibles no estén hardcodeadas en tu código.',
    link: 'https://pypi.org/project/python-dotenv/'
  },
  {
    icon: <FaRobot size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'LangChain Oficial',
    description: 'Documentación de LangChain para Python.',
    detail: 'Guía completa para aprender a integrar LLMs en Python usando LangChain.',
    link: 'https://python.langchain.com/docs/introduction/'
  },
  {
    icon: <FaRobot size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Groq',
    description: 'Documentación oficial de Groq.',
    detail: 'Sitio oficial de Groq, con documentación de sus modelos y herramientas.',
    link: 'https://groq.com/'
  },
  {
    icon: <FaRobot size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Groq Models',
    description: 'Documentación de los modelos Groq.',
    detail: 'Cómo interactuar con los modelos Groq, configuraciones y ejemplos de uso.',
    link: 'https://console.groq.com/docs/models'
  },
  // ... resto de tarjetas como PromptGuide, PromptTemplate, Ejemplo de Uso, etc.
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function DocumentationCards() {
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
            Documentación LLM, LangChain y LangGraph
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4 text-base md:text-lg">
            Accede a las guías oficiales y ejemplos de uso de cada componente del código Python de LangChain, Groq y LangGraph que estamos utilizando.
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
