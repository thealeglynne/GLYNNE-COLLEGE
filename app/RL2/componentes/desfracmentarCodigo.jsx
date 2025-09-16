'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaProjectDiagram, FaEquals, FaArrowDown, FaChartLine,
  FaPython, FaCheckCircle
} from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { horas: 1, nota: 2 },
  { horas: 2, nota: 4 },
  { horas: 3, nota: 5 },
  { horas: 4, nota: 7 },
  { horas: 5, nota: 8 },
  { horas: 6, nota: 9 },
];

export default function DataScienceConcepts() {
  const [activeTab, setActiveTab] = useState('modelo');

  const codePython = `
import numpy as np
from sklearn.linear_model import LinearRegression

# Datos: horas de estudio (X) y notas (y)
X = np.array([1, 2, 3, 4, 5, 6]).reshape(-1, 1)
y = np.array([2, 4, 5, 7, 8, 9])

# Crear y entrenar el modelo
modelo = LinearRegression()
modelo.fit(X, y)

# Parámetros del modelo
w = modelo.coef_[0]
b = modelo.intercept_

print(f"Ecuación: y = {w:.2f}x + {b:.2f}")

# Predicción para 7 horas
print("Predicción:", modelo.predict([[7]])[0])
`;

  const nodes = [
    {
      key: 'modelo',
      name: 'Modelo Matemático',
      icon: FaProjectDiagram,
      content: (
        <>
          <p>
            Queremos predecir la <strong className="text-orange-500">nota final (y)</strong> a partir de las 
            <strong className="text-orange-500"> horas de estudio (x)</strong>.
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm text-orange-500 text-center">
            y = w·x + b
          </pre>
          <ul className="list-disc pl-6 mt-3 text-sm">
            <li><strong className="text-orange-500">w</strong>: cuánto aumenta la nota por cada hora.</li>
            <li><strong className="text-orange-500">b</strong>: nota base sin estudiar.</li>
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
            Para medir el error usamos el <strong className="text-orange-500">Error Cuadrático Medio (MSE)</strong>:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm text-orange-500 text-center">
            J(w, b) = (1/m) Σ ( (w·xᵢ + b) - yᵢ )²
          </pre>
          <p className="mt-3">
            El objetivo es <strong className="text-orange-500">minimizar J(w,b)</strong>.
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
            Ajustamos los parámetros para reducir el error:
          </p>
          <pre className="bg-gray-100 p-3 rounded-md mt-3 text-sm text-orange-500">
{`w := w - α ∂J/∂w
b := b - α ∂J/∂b`}
          </pre>
          <p className="mt-3">
            Con esto, poco a poco encontramos la mejor recta que se ajusta a los datos.
          </p>
        </>
      ),
    },
    {
      key: 'grafica',
      name: 'Visualización',
      icon: FaChartLine,
      content: (
        <>
          <p>
            Los puntos muestran las <strong className="text-orange-500">notas reales</strong> 
            según horas de estudio.
          </p>
          <div className="w-full h-64 mt-6">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="horas"
                  label={{ value: 'Horas de estudio', position: 'insideBottom', offset: -5, fill: '#f97316' }}
                />
                <YAxis
                  label={{ value: 'Nota', angle: -90, position: 'insideLeft', fill: '#f97316' }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="nota" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
            Ejemplo con <strong className="text-orange-500">scikit-learn</strong>:
          </p>
          <SyntaxHighlighter language="python" style={oneLight}>
            {codePython}
          </SyntaxHighlighter>
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
            El modelo aprende que <strong className="text-orange-500">cada hora de estudio</strong> 
            aumenta la nota en promedio en <strong className="text-orange-500">1.4 puntos</strong>.
          </p>
          <p className="mt-2">
            El sesgo <strong className="text-orange-500">b ≈ 0.5</strong> significa que incluso sin estudiar,
            la nota base es cercana a 0.5.
          </p>
          <p className="mt-2">
            Así podemos predecir nuevas calificaciones, por ejemplo:
            <br />
            7 horas de estudio → <strong className="text-orange-500">≈ 10 puntos</strong>.
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
          className="text-3xl font-bold text-orange-600 text-center px-4"
        >
          Regresión Lineal Simple: Ejemplo Completo
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg font-medium text-orange-500 text-center"
        >
          Horas de estudio → Nota final
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
            <h3 className="text-2xl font-semibold text-orange-600 text-center mb-6">{current.name}</h3>
            <div className="text-gray-800 text-base sm:text-lg leading-relaxed text-justify whitespace-pre-line">
              {current.content}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
