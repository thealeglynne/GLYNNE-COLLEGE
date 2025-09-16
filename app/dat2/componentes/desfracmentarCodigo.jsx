'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileCsv, FaDatabase, FaCalculator, FaChartLine, FaInfoCircle, FaProjectDiagram, FaLayerGroup, FaBalanceScale } from 'react-icons/fa';

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
            Para análisis de datos necesitamos <strong>pandas</strong> (para manipulación de tablas tipo Excel), <strong>numpy</strong> (para cálculos matemáticos rápidos sobre arrays) y <strong>scipy.stats</strong> (para medidas estadísticas avanzadas como sesgo o skewness). Sin estas librerías, no podemos hacer análisis estructurado de datos.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`import pandas as pd
import numpy as np
from scipy.stats import skew`}
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
            Cargamos un CSV con <code>pd.read_csv</code>. CSV = valores separados por comas. Este es el formato estándar para datos tabulares: ventas, clientes, productos, inventarios, etc.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`df = pd.read_csv("datos_empresa.csv")`}
          </p>
        </>
      ),
    },
    {
      key: 'estadisticas',
      name: 'Función Estadísticas',
      icon: FaCalculator,
      content: (
        <>
          <p>
            La función <strong>estadisticas()</strong> calcula medidas básicas de tendencia central y dispersión para una columna numérica: 
            <code>media, mediana, mínimo, máximo y desviación estándar</code>. Esto permite entender rápidamente el comportamiento de los datos.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def estadisticas(df, columna):
    data = df[columna]
    return {
        "media": np.mean(data),
        "mediana": np.median(data),
        "minimo": np.min(data),
        "maximo": np.max(data),
        "desviacion": np.std(data)
    }`}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Por ejemplo, con <code>estadisticas(df, "ventas")</code> obtendrás un resumen rápido de la distribución de ventas, útil para detectar valores atípicos o tendencias generales.
          </p>
        </>
      ),
    },
    {
      key: 'frecuencias',
      name: 'Tabla de Frecuencias',
      icon: FaLayerGroup,
      content: (
        <>
          <p>
            La función <strong>tabla_frecuencias()</strong> devuelve el conteo de cada valor único en una columna, ya sea numérica o categórica. Es la forma más directa de ver qué valores se repiten y cuántas veces.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def tabla_frecuencias(df, columna):
    return df[columna].value_counts()`}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Por ejemplo, <code>tabla_frecuencias(df, "producto")</code> te mostrará cuántos registros hay por cada producto, facilitando análisis de inventario o ventas más frecuentes.
          </p>
        </>
      ),
    },
    {
      key: 'sesgo',
      name: 'Cálculo de Sesgo',
      icon: FaBalanceScale,
      content: (
        <>
          <p>
            La función <strong>calcular_sesgo()</strong> mide el <em>skewness</em> de una columna numérica. El sesgo indica si los datos están inclinados hacia la izquierda (negativo) o derecha (positivo), ayudando a detectar distribuciones no simétricas.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def calcular_sesgo(df, columna):
    return skew(df[columna])`}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Esto es clave para análisis estadístico y decisiones de transformación de datos antes de modelos predictivos o visualizaciones.
          </p>
        </>
      ),
    },
    {
      key: 'ejemplo',
      name: 'Ejemplo de Uso',
      icon: FaChartLine,
      content: (
        <>
          <p>
            Una vez definidas las funciones, podemos aplicarlas fácilmente:
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`print("Estadísticas de ventas:")
print(estadisticas(df, "ventas"))

print("\\nTabla de frecuencias de productos:")
print(tabla_frecuencias(df, "producto"))

print("\\nSesgo de ventas:")
print(calcular_sesgo(df, "ventas"))`}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Esto produce un análisis rápido de los datos cargados, mostrando distribución, frecuencia de categorías y si hay inclinación significativa en los valores.
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
          Ciencia de Datos Básica con Python
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada nodo explica un concepto o función clave de análisis de datos
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
