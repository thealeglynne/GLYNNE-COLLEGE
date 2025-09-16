'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaProjectDiagram, FaEquals, FaArrowDown, FaChartLine,
  FaPython, FaCheckCircle, FaVectorSquare, FaLayerGroup,
  FaCubes, FaTable, FaUniversity, FaBullseye, FaInfinity,
  FaSuperscript, FaBrain
} from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codePython = `
import numpy as np

# Variables independientes: horas de estudio y horas de sueño
X = np.array([
    [1, 6],
    [2, 7],
    [3, 7],
    [4, 6],
    [5, 8],
    [6, 7]
])

# Variable dependiente
y = np.array([2, 4, 5, 7, 8, 9])

# Agregar columna de 1s (sesgo)
X_b = np.c_[np.ones((X.shape[0], 1)), X]

# Cálculo de beta = (X^T X)^-1 X^T y
beta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
print("Parámetros β:", beta)

# Predicción: 7h estudio y 8h sueño
nuevo = np.array([1, 7, 8])
prediccion = nuevo @ beta
print("Predicción:", prediccion)
`;

export default function DataScienceConcepts() {
  const [activeTab, setActiveTab] = useState('modelo');

  const nodes = [
    {
      key: 'modelo',
      name: 'Modelo Matemático',
      icon: FaProjectDiagram,
      content: (
        <>
          <p>
            En regresión lineal <strong className="text-orange-500">múltiple</strong> buscamos predecir una variable dependiente 
            (nota final) a partir de varias independientes (horas de estudio y horas de sueño).
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-orange-500 text-center">
            ŷ = β₀ + β₁·x₁ + β₂·x₂
          </pre>
        </>
      ),
    },
    {
      key: 'vectorial',
      name: 'Forma Vectorial',
      icon: FaVectorSquare,
      content: (
        <>
          <p>
            La notación general se expresa como:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-orange-500 text-center">
            ŷ = Xβ
          </pre>
          <p className="mt-2">
            Donde <code>X</code> es la matriz de características, <code>β</code> el vector de parámetros 
            y <code>ŷ</code> el vector de predicciones.
          </p>
        </>
      ),
    },
    {
      key: 'coeficientes',
      name: 'Coeficientes β',
      icon: FaLayerGroup,
      content: (
        <>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>β₀</strong>: intercepto o sesgo.</li>
            <li><strong>β₁</strong>: efecto de una hora extra de estudio.</li>
            <li><strong>β₂</strong>: efecto de una hora extra de sueño.</li>
          </ul>
        </>
      ),
    },
    {
      key: 'matrizX',
      name: 'Matriz X',
      icon: FaTable,
      content: (
        <>
          <p>
            La matriz de entrada incluye todas las variables y una columna de 1s:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm text-orange-500">
{`X_b = [
 [1, x₁, x₂],
 [1, x₁, x₂],
 ...
]`}
          </pre>
        </>
      ),
    },
    {
      key: 'solucion',
      name: 'Solución Normal',
      icon: FaEquals,
      content: (
        <>
          <p>
            Los parámetros se obtienen con la <strong className="text-orange-500">ecuación normal</strong>:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-orange-500 text-center">
            β = (XᵀX)⁻¹ Xᵀy
          </pre>
        </>
      ),
    },
    {
      key: 'plano',
      name: 'Plano en 3D',
      icon: FaCubes,
      content: (
        <>
          <p>
            Con dos variables independientes, el modelo ajusta un 
            <strong className="text-orange-500"> plano</strong> en el espacio tridimensional 
            que aproxima los puntos de datos.
          </p>
        </>
      ),
    },
    {
      key: 'hiperplano',
      name: 'Hiperplano',
      icon: FaInfinity,
      content: (
        <>
          <p>
            Si hay más de 3 variables, el modelo ajusta un 
            <strong className="text-orange-500"> hiperplano</strong> en un espacio de 
            dimensiones superiores.
          </p>
        </>
      ),
    },
    {
      key: 'interpretacion',
      name: 'Interpretación',
      icon: FaCheckCircle,
      content: (
        <>
          <p>
            Cada coeficiente indica cómo cambia la nota esperada si se aumenta una variable 
            en una unidad, manteniendo las demás constantes.
          </p>
        </>
      ),
    },
    {
      key: 'sesgo',
      name: 'El Sesgo β₀',
      icon: FaBullseye,
      content: (
        <>
          <p>
            El sesgo (<code>β₀</code>) representa la nota base, el valor esperado cuando todas 
            las variables independientes son cero.
          </p>
        </>
      ),
    },
    {
      key: 'ejemplo',
      name: 'Ejemplo Real',
      icon: FaUniversity,
      content: (
        <>
          <p>
            Si un estudiante estudia 7 horas y duerme 8, el modelo predice una nota 
            combinando ambos efectos según los parámetros aprendidos.
          </p>
        </>
      ),
    },
    {
      key: 'implementacion',
      name: 'Implementación Python',
      icon: FaPython,
      content: (
        <>
          <p>
            Cálculo de los parámetros con álgebra lineal:
          </p>
          <SyntaxHighlighter language="python" style={oneLight}>
            {codePython}
          </SyntaxHighlighter>
        </>
      ),
    },
    {
      key: 'aplicaciones',
      name: 'Aplicaciones',
      icon: FaBrain,
      content: (
        <>
          <p>
            La regresión lineal múltiple se usa para predecir precios de casas, rendimiento 
            académico, demanda de productos y muchos otros fenómenos reales.
          </p>
        </>
      ),
    },
    {
      key: 'errores',
      name: 'Errores y Residuos',
      icon: FaArrowDown,
      content: (
        <>
          <p>
            La diferencia entre los valores reales y los predichos son los 
            <strong className="text-orange-500"> residuos</strong>. El modelo busca minimizar 
            la suma de sus cuadrados.
          </p>
        </>
      ),
    },
    {
      key: 'notacion',
      name: 'Notación General',
      icon: FaSuperscript,
      content: (
        <>
          <p>
            Con m muestras y n variables:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm text-orange-500">
{`X ∈ ℝ^(m×n), β ∈ ℝ^n, y ∈ ℝ^m`}
          </pre>
        </>
      ),
    },
    {
      key: 'resumen',
      name: 'Resumen',
      icon: FaChartLine,
      content: (
        <>
          <p>
            La regresión múltiple extiende la idea de la línea de ajuste a espacios de 
            varias dimensiones, ofreciendo modelos más precisos y aplicables a problemas 
            reales.
          </p>
        </>
      ),
    },
  ];

  const current = nodes.find(node => node.key === activeTab);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-16 bg-gray-50">
      <div className="w-full max-w-7xl flex flex-col items-center text-center space-y-10 p-6 sm:p-12 ring-1 ring-black/10 shadow-xl rounded-3xl bg-white">
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-orange-600 text-center"
        >
          Regresión Lineal Múltiple: Guía Interactiva
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-3 w-full">
          {nodes.map(node => {
            const Icon = node.icon;
            const isActive = activeTab === node.key;
            return (
              <button
                key={node.key}
                onClick={() => setActiveTab(node.key)}
                className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2
                  ${isActive ? 'bg-orange-500 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                <Icon className={`text-lg ${isActive ? 'text-white' : 'text-orange-500'}`} />
                <span className="font-medium">{node.name}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200 text-left"
          >
            <h3 className="text-2xl font-semibold text-orange-600 text-center mb-6">
              {current.name}
            </h3>
            <div className="text-gray-800 text-base sm:text-lg leading-relaxed text-justify whitespace-pre-line">
              {current.content}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
