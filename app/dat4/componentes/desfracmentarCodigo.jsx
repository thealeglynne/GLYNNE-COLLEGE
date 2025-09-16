'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFileCsv, FaDatabase, FaCalculator, FaChartLine, FaInfoCircle, FaProjectDiagram,
  FaLayerGroup, FaBalanceScale, FaSlidersH, FaSearchPlus, FaSortNumericDown,
  FaVectorSquare, FaCheckCircle, FaTrashAlt, FaChartPie
} from 'react-icons/fa';

export default function DataScienceConcepts() {
  const [activeTab, setActiveTab] = useState('importancia');

  const nodes = [
    {
      key: 'importancia',
      name: 'Por qué los Datos importan',
      icon: FaInfoCircle,
      content: (
        <>
          <p>
            Los datos son la base de cualquier sistema de <strong>Inteligencia Artificial</strong>. 
            Sin datos limpios y bien estructurados, los modelos no pueden aprender ni generalizar. 
            La calidad de la IA depende directamente de la calidad de los datos.
          </p>
        </>
      ),
    },
    {
      key: 'importar',
      name: 'Importar Librerías',
      icon: FaFileCsv,
      content: (
        <>
          <p>
            En un flujo real, se necesitan librerías como <code>pandas</code>, <code>numpy</code> y 
            <code>scipy</code>. Estas herramientas permiten manipular, transformar y analizar datasets 
            rápidamente.
          </p>
        </>
      ),
    },
    {
      key: 'cargar',
      name: 'Cargar Dataset',
      icon: FaDatabase,
      content: (
        <>
          <p>
            Generalmente trabajamos con CSV, bases SQL o JSON. Cargar los datos es el primer paso 
            para explorarlos y detectar posibles problemas en su estructura.
          </p>
        </>
      ),
    },
    {
      key: 'estadisticas',
      name: 'Estadísticas Básicas',
      icon: FaCalculator,
      content: (
        <>
          <p>
            Se calculan <strong>media</strong>, <strong>mediana</strong>, <strong>mínimo</strong>, 
            <strong>máximo</strong> y <strong>desviación estándar</strong>. Estos valores permiten 
            entender la distribución general de los datos.
          </p>
        </>
      ),
    },
    {
      key: 'cuartiles',
      name: 'Cuartiles e IQR',
      icon: FaSortNumericDown,
      content: (
        <>
          <p>
            Los cuartiles dividen los datos en cuatro partes iguales. El rango intercuartílico (IQR) 
            se usa para detectar <em>outliers</em>, que son valores que se alejan demasiado de la media.
          </p>
        </>
      ),
    },
    {
      key: 'outliers',
      name: 'Detección de Outliers',
      icon: FaSearchPlus,
      content: (
        <>
          <p>
            Los valores atípicos pueden distorsionar los modelos. Detectarlos con IQR o desviación 
            estándar es esencial para decidir si se eliminan o transforman.
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
            El sesgo (<em>skewness</em>) indica si los datos están inclinados a un lado de la media. 
            Un dataset sesgado puede afectar los resultados de un modelo de predicción.
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
            Ayuda a contar cuántas veces aparece cada valor en una columna. Es útil para analizar 
            categorías como productos, clientes o tipos de eventos.
          </p>
        </>
      ),
    },
    {
      key: 'normalizacion',
      name: 'Normalización',
      icon: FaSlidersH,
      content: (
        <>
          <p>
            Escalar los datos es vital. Existen técnicas como <strong>Min-Max</strong> (0 a 1) y 
            <strong>Z-Score</strong> (media 0, desviación 1). Esto asegura que ninguna variable domine 
            en el entrenamiento.
          </p>
        </>
      ),
    },
    {
      key: 'limpieza',
      name: 'Limpieza de Datos',
      icon: FaTrashAlt,
      content: (
        <>
          <p>
            Incluye eliminar duplicados, rellenar valores nulos, corregir errores tipográficos y 
            estandarizar formatos. Es la parte más costosa pero crucial.
          </p>
        </>
      ),
    },
    {
      key: 'estructura',
      name: 'Estructuración',
      icon: FaProjectDiagram,
      content: (
        <>
          <p>
            Organizar los datos en tablas limpias y relaciones claras. La estructuración adecuada 
            asegura que los modelos reciban datos consistentes.
          </p>
        </>
      ),
    },
    {
      key: 'vectorial',
      name: 'Bases Vectoriales',
      icon: FaVectorSquare,
      content: (
        <>
          <p>
            Una <strong>DB vectorial</strong> permite almacenar representaciones numéricas de los datos. 
            Esto es esencial para búsquedas semánticas, embeddings y Machine Learning moderno.
          </p>
        </>
      ),
    },
    {
      key: 'validacion',
      name: 'Validación de Calidad',
      icon: FaCheckCircle,
      content: (
        <>
          <p>
            Antes de usar los datos en un modelo, deben validarse con métricas de completitud, 
            consistencia y precisión. Solo así se garantiza robustez.
          </p>
        </>
      ),
    },
    {
      key: 'visualizacion',
      name: 'Visualización',
      icon: FaChartPie,
      content: (
        <>
          <p>
            Los gráficos ayudan a entender patrones. Histogramas, boxplots y diagramas de dispersión 
            permiten identificar tendencias y anomalías fácilmente.
          </p>
        </>
      ),
    },
    {
      key: 'pipeline',
      name: 'Pipeline de Datos',
      icon: FaChartLine,
      content: (
        <>
          <p>
            Un <strong>pipeline</strong> une todas las etapas: carga, limpieza, normalización, análisis, 
            almacenamiento vectorial y validación. Es la base de la ciencia de datos moderna.
          </p>
        </>
      ),
    },
  ];

  const current = nodes.find(node => node.key === activeTab);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 bg-gray-50">
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-10 p-6 sm:p-12 ring-1 ring-black/10 shadow-xl rounded-3xl bg-white">
        
        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-black text-center px-4"
        >
          Fundamentos de Datos para IA
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada botón explica un paso esencial en el ciclo de vida de los datos
        </motion.h2>

        {/* Botones */}
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
