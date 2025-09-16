'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLightbulb,
  FaSearch,
  FaTools,
  FaRetweet,
  FaExclamationTriangle,
  FaChartLine,
  FaChartBar,
  FaServer,
  FaRobot,
  FaBriefcase,
} from 'react-icons/fa';

const instrucciones = [
  {
    label: 'Ciencia de Datos Aplicada',
    icon: <FaLightbulb className="text-orange-500 text-lg" />,
    descripcion: `Trabajas directamente con datasets reales, limpiando, explorando y analizando información para tus proyectos de IA.`,
  },
  {
    label: 'Modelos de IA en Acción',
    icon: <FaSearch className="text-orange-500 text-lg" />,
    descripcion: `Construyes y entrenas modelos de ML y DP usando Python, PyTorch y Sklearn, aplicando algoritmos a problemas concretos sin teoría abstracta.`,
  },
  {
    label: 'Pipelines Funcionales',
    icon: <FaTools className="text-orange-500 text-lg" />,
    descripcion: `Diseñas pipelines completos que van desde la preparación de datos hasta el despliegue de modelos, todo implementado y testeado en proyectos reales.`,
  },
  {
    label: 'Chatbots Inteligentes',
    icon: <FaRetweet className="text-orange-500 text-lg" />,
    descripcion: `Desarrollas chatbots con memoria, rol y personalidad usando LangGraph y LangChain, integrando herramientas externas y escenarios prácticos de negocio.`,
  },
  {
    label: 'Integración de Herramientas y Automatización',
    icon: <FaExclamationTriangle className="text-orange-500 text-lg" />,
    descripcion: `Conectas tus modelos y chatbots a sistemas y APIs reales como Notion, Gmail, CRMs, logrando procesos automatizados que funcionan desde el primer día.`,
  },
  {
    label: 'Proyectos Completos',
    icon: <FaChartLine className="text-orange-500 text-lg" />,
    descripcion: `Cada módulo culmina en un proyecto real que integra todo lo aprendido: datasets, modelos, pipelines, chatbots y automatizaciones listas para producción.`,
  },
  {
    label: 'Visualización Avanzada',
    icon: <FaChartBar className="text-orange-500 text-lg" />,
    descripcion: `Aprendes a construir dashboards interactivos con librerías como Plotly y herramientas BI para comunicar resultados con impacto.`,
  },
  {
    label: 'MLOps y Despliegue',
    icon: <FaServer className="text-orange-500 text-lg" />,
    descripcion: `Dominas cómo versionar modelos, monitorizarlos y desplegarlos en la nube con prácticas de MLOps y CI/CD.`,
  },
  {
    label: 'Agentes Autónomos',
    icon: <FaRobot className="text-orange-500 text-lg" />,
    descripcion: `Configuras agentes que toman decisiones por sí mismos, orquestando tareas y colaborando entre sí en entornos simulados.`,
  },
  {
    label: 'Estrategia y Negocio',
    icon: <FaBriefcase className="text-orange-500 text-lg" />,
    descripcion: `No solo código: entiendes cómo alinear soluciones de IA con objetivos de negocio y medir su retorno de inversión (ROI).`,
  },
];

export default function InstruccionesAuditoriaCompact() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full max-w-[500px] mx-auto p-4 space-y-4 bg-white rounded-2xl shadow-lg border border-gray-200">
      <motion.h2
        className="text-lg font-bold text-center text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Aprende Inteligencia Artificial de Forma 100% Práctica
      </motion.h2>

      <p className="text-sm text-gray-500 text-center">
        Desde datasets reales y pipelines funcionales hasta chatbots con memoria y personalidad, todo implementado con LangGraph, LangChain y Python.
      </p>

      <div className="flex flex-col gap-3">
        {instrucciones.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => setActiveIndex(index)}
            className="bg-white border border-gray-300 rounded-xl p-3 cursor-pointer hover:shadow-md transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-start gap-2 text-sm font-semibold text-gray-700">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-white/40 z-50 flex items-center justify-center px-4"
            onClick={() => setActiveIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white max-w-sm w-full rounded-xl p-5 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3 className="text-md font-bold mb-2 text-gray-800">
                {instrucciones[activeIndex].label}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {instrucciones[activeIndex].descripcion}
              </p>
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-2 right-3 text-lg font-bold text-gray-400 hover:text-black"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
