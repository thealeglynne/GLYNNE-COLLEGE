'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPython, FaFileCsv, FaCalculator, FaChartLine, FaBookOpen, FaExternalLinkAlt 
} from 'react-icons/fa';

// Componente actualizado: tarjetas con enlaces verificados a documentación oficial
export default function DocumentationCards() {
  const [selected, setSelected] = useState(null);

  // Enlaces verificados y de confianza (Python, pandas, numpy, scikit-learn, statsmodels, Wikipedia)
  const docs = [
    {
      icon: <FaPython size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'Python Oficial',
      description: 'Documentación oficial del lenguaje Python (tutorial, library reference).',
      detail: 'Documentación oficial de Python: tutorial, reference y HOWTOs. Recurso imprescindible para sintaxis, tipos y buenas prácticas.',
      link: 'https://docs.python.org/3/'
    },
    {
      icon: <FaFileCsv size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'CSV (Comma Separated Values)',
      description: 'Descripción y especificaciones del formato CSV (Wiki / RFC).',
      detail: 'Guía práctica sobre el formato CSV, sus limitaciones y recomendaciones para intercambio de datos tabulares.',
      link: 'https://en.wikipedia.org/wiki/Comma-separated_values'
    },
    {
      icon: <FaBookOpen size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'pandas Oficial',
      description: 'Documentación y user guide de pandas (DataFrames, io, limpieza).',
      detail: 'Documentación oficial de pandas: lectura/escritura, manejo de nulos, transformaciones y funciones de exploración de datos.',
      link: 'https://pandas.pydata.org/docs/'
    },
    {
      icon: <FaCalculator size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'NumPy Oficial',
      description: 'Referencia de NumPy para arrays y operaciones vectorizadas.',
      detail: 'NumPy: arrays, operaciones matemáticas vectorizadas y funciones estadísticas básicas. Útil para implementaciones eficientes en Python.',
      link: 'https://numpy.org/doc/stable/'
    },
    {
      icon: <FaChartLine size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'Linear models — scikit-learn',
      description: 'Sección de modelos lineales (LinearRegression, OLS) en scikit-learn.',
      detail: 'Referencia y ejemplos de LinearRegression en scikit-learn: cómo ajustar modelos lineales, coeficientes, intercepto y métricas de evaluación.',
      link: 'https://scikit-learn.org/stable/modules/linear_model.html'
    },
    {
      icon: <FaExternalLinkAlt size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'Regresión lineal y OLS — statsmodels',
      description: 'Módulo de regresión y ejemplos con OLS en statsmodels.',
      detail: 'Statsmodels ofrece estimación por mínimos cuadrados ordinarios (OLS) y herramientas estadísticamente completas para análisis de regresión.',
      link: 'https://www.statsmodels.org/stable/regression.html'
    },
    {
      icon: <FaExternalLinkAlt size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'Regresión Lineal — Wikipedia',
      description: 'Explicación teórica y formulación matemática de la regresión lineal.',
      detail: 'Artículo con la formulación matemática de la regresión lineal (simple y múltiple) y vínculos a least squares y supuestos del modelo.',
      link: 'https://en.wikipedia.org/wiki/Linear_regression'
    },
    {
      icon: <FaExternalLinkAlt size={40} className="text-orange-500 drop-shadow-sm" />,
      title: 'Gradient Descent — Wikipedia',
      description: 'Algoritmo de optimización (gradiente descendente) usado para minimizar funciones de costo.',
      detail: 'Explicación de gradient descent, variantes y consideraciones sobre learning rate y convergencia.',
      link: 'https://en.wikipedia.org/wiki/Gradient_descent'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

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
            Documentación verificada — Python, pandas, NumPy y Regresión Lineal
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4 text-base md:text-lg">
            Recursos oficiales y artículos de referencia que corroboran la teoría matemática (ecuaciones),
            las implementaciones en Python y las prácticas recomendadas para preparar datasets y entrenar
            modelos de regresión lineal.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 w-full"
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
              whileHover={{ scale: 1.02 }}
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
              transition={{ duration: 0.25 }}
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-11/12 max-w-4xl bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
              >
                <Dialog.Title className="text-2xl font-extrabold mb-4 text-gray-900">{selected?.title}</Dialog.Title>
                <Dialog.Description className="text-gray-700 text-base whitespace-pre-line leading-relaxed">{selected?.detail}</Dialog.Description>

                <a
                  href={selected?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
                >
                  Ver documentación <FaExternalLinkAlt />
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
