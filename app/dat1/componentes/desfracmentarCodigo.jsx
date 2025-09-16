'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileCsv, FaDatabase, FaCalculator, FaChartLine, FaInfoCircle, FaProjectDiagram, FaClock, FaLayerGroup } from 'react-icons/fa';

export default function LangGraphCSVExplained() {
  const [activeTab, setActiveTab] = useState('imports');

  const nodes = [
    {
      key: 'imports',
      name: 'Importar Librerías',
      icon: FaFileCsv,
      content: (
        <>
          <p>
            Arrancamos importando lo básico: <strong>pandas</strong> para manipular datos tipo Excel, <strong>numpy</strong> para matemáticas rápidas sobre arrays. Sin esto, nada de análisis.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`import pandas as pd
import numpy as np`}
          </p>
        </>
      ),
    },
    {
      key: 'load_csv',
      name: 'Cargar CSV',
      icon: FaDatabase,
      content: (
        <>
          <p>
            Cargamos un CSV. Recuerda, CSV = valores separados por comas. Muy útil para inventarios, ventas, clientes… todo tabular.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`df = pd.read_csv("datos_empresa.csv")`}
          </p>
        </>
      ),
    },
    {
      key: 'head',
      name: 'Primeras Filas',
      icon: FaInfoCircle,
      content: (
        <>
          <p>
            Queremos echar un vistazo rápido: <code>head()</code> nos muestra las primeras filas. Ideal para confirmar que cargamos bien el CSV.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`print(df.head())`}
          </p>
        </>
      ),
    },
    {
      key: 'describe',
      name: 'Estadísticas Básicas',
      icon: FaCalculator,
      content: (
        <>
          <p>
            Con <code>describe()</code> sacamos media, mínimo, máximo, desviación… todo lo numérico. Datos crudos listos para analizar tendencias.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`print(df.describe())`}
          </p>
        </>
      ),
    },
    {
      key: 'info',
      name: 'Info General',
      icon: FaClock,
      content: (
        <>
          <p>
            <code>info()</code> nos dice tipos de columnas, nulos y tamaño del dataset. Fundamental antes de cualquier operación.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`print(df.info())`}
          </p>
        </>
      ),
    },
    {
      key: 'column',
      name: 'Acceder a Columna',
      icon: FaChartLine,
      content: (
        <>
          <p>
            Accedemos a una columna concreta, por ejemplo <strong>'ventas'</strong>. Luego podemos hacer cálculos, gráficas o filtros.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`print(df["ventas"])`}
          </p>
        </>
      ),
    },
    {
      key: 'numpy_ops',
      name: 'Operaciones con Numpy',
      icon: FaProjectDiagram,
      content: (
        <>
          <p>
            Convertimos la columna a un array de <strong>numpy</strong> para calcular rápido promedio, máximo, mínimo… todo lo que quieras.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`ventas_array = np.array(df["ventas"])
print("Promedio de ventas:", np.mean(ventas_array))
print("Máximo de ventas:", np.max(ventas_array))
print("Mínimo de ventas:", np.min(ventas_array))`}
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
          Aprendizaje de CSV con Python Desestructurado
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada nodo es un paso del flujo, explicado de forma libre y práctica
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
                  ${isActive ? 'bg-orange-500 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
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
