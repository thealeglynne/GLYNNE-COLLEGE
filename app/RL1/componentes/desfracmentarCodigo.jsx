'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaProjectDiagram, FaEquals, FaCalculator, FaBalanceScale, FaChartLine, FaCog,
  FaArrowDown, FaPython, FaCheckCircle
} from 'react-icons/fa';

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
            La <strong>regresión lineal simple</strong> busca una recta que relacione una variable independiente <code>x</code> con una dependiente <code>y</code>:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm">
            ŷ = w·x + b
          </pre>
          <ul className="list-disc pl-6 mt-3 text-sm">
            <li><strong>ŷ</strong>: valor predicho</li>
            <li><strong>w</strong>: peso o pendiente</li>
            <li><strong>b</strong>: sesgo o intercepto</li>
            <li><strong>x</strong>: variable independiente</li>
          </ul>
        </>
      ),
    },
    {
      key: 'costo',
      name: 'Función de Costo',
      icon: FaEquals,
      content: (
        <>
          <p>
            Para evaluar qué tan buena es la recta, usamos el <strong>Error Cuadrático Medio (MSE)</strong>:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm">
            J(w, b) = (1/m) Σ ( (w·xᵢ + b) - yᵢ )²
          </pre>
          <p className="mt-3">
            Donde <code>m</code> es el número de datos. El objetivo es <strong>minimizar J(w,b)</strong>.
          </p>
        </>
      ),
    },
    {
      key: 'gradiente',
      name: 'Gradiente Descendente',
      icon: FaArrowDown,
      content: (
        <>
          <p>
            Usamos gradiente descendente para ajustar <code>w</code> y <code>b</code>:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm">
            w := w - α ∂J/∂w
            b := b - α ∂J/∂b
          </pre>
          <p className="mt-3">Las derivadas parciales son:</p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm">
            ∂J/∂w = (2/m) Σ( (w·xᵢ + b - yᵢ)·xᵢ )
            ∂J/∂b = (2/m) Σ( w·xᵢ + b - yᵢ )
          </pre>
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
            Ejemplo en <strong>NumPy</strong> para entrenar un modelo lineal:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-xs overflow-auto">
{`import numpy as np

X = np.array([1, 2, 3, 4, 5])
Y = np.array([2, 4, 6, 8, 10])

w, b = 0.0, 0.0
alpha = 0.01
epochs = 1000
m = len(X)

for epoch in range(epochs):
    Y_pred = w*X + b
    dw = (2/m) * np.sum((Y_pred - Y) * X)
    db = (2/m) * np.sum(Y_pred - Y)
    w -= alpha * dw
    b -= alpha * db

print("Peso (w):", w)
print("Sesgo (b):", b)
print("Predicción para x=6:", w*6+b)`}
          </pre>
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
            <strong>w</strong> indica cuánto cambia <code>ŷ</code> por cada unidad de <code>x</code>.
          </p>
          <p className="mt-2">
            <strong>b</strong> representa el punto donde la recta cruza el eje Y.
          </p>
          <p className="mt-2">
            Si el modelo está bien entrenado, las predicciones <code>ŷ</code> se acercan mucho a los valores reales <code>y</code>.
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
          Regresión Lineal Simple Paso a Paso
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada pestaña explica una parte de la teoría y su implementación
        </motion.h2>

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