'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPython, FaFileCsv, FaCalculator, FaChartLine, FaBookOpen, FaExternalLinkAlt 
} from 'react-icons/fa';

const docs = [
  {
    icon: <FaPython size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Python Oficial',
    description: 'Documentación oficial del lenguaje Python.',
    detail: 'Python es el lenguaje principal para análisis de datos. Aprende sintaxis, estructuras de control, módulos integrados y buenas prácticas para scripts y automatización.',
    link: 'https://www.python.org/doc/'
  },
  {
    icon: <FaFileCsv size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'CSV (Comma Separated Values)',
    description: 'Guía sobre archivos CSV.',
    detail: 'Formato de texto para datos tabulares, donde cada línea es un registro y los valores están separados por comas. Ideal para exportar o importar datos desde hojas de cálculo.',
    link: 'https://en.wikipedia.org/wiki/Comma-separated_values'
  },
  {
    icon: <FaBookOpen size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'pandas Oficial',
    description: 'Documentación oficial de pandas para Python.',
    detail: 'pandas permite cargar, explorar y manipular datos tabulares de manera eficiente. Aprende sobre DataFrames, series, lectura de CSV y operaciones básicas de limpieza y análisis.',
    link: 'https://pandas.pydata.org/docs/'
  },
  {
    icon: <FaCalculator size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'numpy Oficial',
    description: 'Documentación oficial de numpy.',
    detail: 'Librería para cálculos numéricos en Python. Aprende a usar arrays, operaciones matemáticas vectorizadas, funciones estadísticas como promedio, mínimo y máximo.',
    link: 'https://numpy.org/doc/stable/'
  },
  {
    icon: <FaChartLine size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Exploración de Datos',
    description: 'Cómo explorar y resumir información de un DataFrame.',
    detail: 'Usa df.head() para primeras filas, df.describe() para estadísticas básicas y df.info() para información de columnas y nulos. Combina con numpy para cálculos adicionales.',
    link: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html'
  },
  {
    icon: <FaExternalLinkAlt size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Acceso a Columnas y Operaciones',
    description: 'Trabajar con columnas específicas de DataFrames.',
    detail: 'Puedes acceder a columnas con df["nombre_columna"], convertirlas a arrays de numpy y calcular promedio, máximo, mínimo u otras métricas estadísticas.',
    link: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html'
  }
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
            Documentación Python, pandas, numpy y CSV
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4 text-base md:text-lg">
            Accede a la documentación oficial y guías de uso para trabajar con datos tabulares en Python, explorarlos y realizar cálculos básicos con pandas y numpy.
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
