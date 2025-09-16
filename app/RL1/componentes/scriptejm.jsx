'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Datos para la gráfica de ejemplo
const data = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 6 },
  { x: 4, y: 8 },
  { x: 5, y: 10 },
]

export default function LinearRegressionTutorial() {
  const pythonCode = `
# =============================================
# REGRESIÓN LINEAL SIMPLE EN PYTHON
# =============================================

import numpy as np

# Datos simulados
X = np.array([1, 2, 3, 4, 5])
Y = np.array([2, 4, 6, 8, 10])

# Inicialización
w, b = 0.0, 0.0
alpha, epochs = 0.01, 1000
m = len(X)

for epoch in range(epochs):
    Y_pred = w * X + b
    dw = (2/m) * np.sum((Y_pred - Y) * X)
    db = (2/m) * np.sum(Y_pred - Y)
    w -= alpha * dw
    b -= alpha * db

print("Peso (w):", w)
print("Sesgo (b):", b)
print("Predicción para x=6:", w*6 + b)
`

  const explanationJSX = (
    <>
      <p>
        La <strong>regresión lineal</strong> es uno de los modelos más sencillos y fundamentales en <em>machine learning</em>.
        Su idea central es trazar una <strong>línea recta</strong> que explique la relación entre una variable independiente <code>x</code> 
        y una variable dependiente <code>y</code>.
      </p>

      <p className="mt-3">
        Aunque simple, este modelo es la <strong>piedra angular</strong> de muchos algoritmos más complejos. 
        De hecho, redes neuronales, regresión logística y hasta transformers heredan el concepto de
        <em> pesos (w)</em> y <em>sesgos (b)</em> como parámetros ajustables.
      </p>

      <h4 className="mt-4 font-semibold">¿Por qué es tan importante?</h4>
      <ul className="list-disc pl-6 mt-2 text-sm space-y-2">
        <li>
          Es el <strong>primer paso</strong> para entender cómo los modelos aprenden patrones: 
          minimizando un error (función de costo) mediante optimización (gradiente descendente).
        </li>
        <li>
          Proporciona <strong>interpretabilidad</strong>: el peso indica cuánto cambia la predicción
          cuando la variable de entrada aumenta en una unidad.
        </li>
        <li>
          Su forma simple permite <strong>entrenamiento rápido</strong> y es una buena base de comparación
          contra modelos más complejos.
        </li>
      </ul>

      <p className="mt-3 text-sm">
        En conclusión, la regresión lineal no solo predice valores continuos: también enseña 
        la <em>filosofía del aprendizaje supervisado</em>, donde buscamos ajustar parámetros que
        conviertan datos en predicciones útiles y generalizables.
      </p>
    </>
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Caja 1: Fórmulas matemáticas */}
      <motion.div
        className="bg-white border border-gray-300 rounded-xl p-6 shadow-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-bold mb-4 text-orange-600">
          📘 Regresión Lineal Simple — Formulación Matemática
        </h3>
        <p className="text-gray-800 text-sm leading-relaxed">
          El modelo de regresión lineal busca ajustar una <strong>recta</strong> que explique la relación entre 
          una variable independiente (<code>x</code>) y una variable dependiente (<code>y</code>).
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mt-3 text-sm">
          <p><strong>Modelo (Hipótesis):</strong></p>
          <p className="font-mono text-orange-600">ŷ = w·x + b</p>
          <ul className="list-disc pl-6 mt-2">
            <li>ŷ: valor predicho</li>
            <li>x: variable independiente</li>
            <li>w: peso (pendiente de la recta)</li>
            <li>b: sesgo (intercepto)</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-3 text-sm">
          <p><strong>Función de costo (MSE):</strong></p>
          <p className="font-mono text-orange-600">
            J(w, b) = (1/m) Σ ( (w·xᵢ + b) - yᵢ )²
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-3 text-sm">
          <p><strong>Actualización por gradiente descendente:</strong></p>
          <p className="font-mono text-orange-600">w := w - α ∂J/∂w</p>
          <p className="font-mono text-orange-600">b := b - α ∂J/∂b</p>
        </div>
      </motion.div>

      {/* Caja 2: Gráfica animada */}
      <motion.div
        className="bg-white border border-gray-300 rounded-xl p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-bold mb-4 text-green-600">
          📊 Ejemplo Gráfico
        </h3>
        <p className="text-gray-700 text-sm mb-3">
          A continuación se observa una relación lineal perfecta entre X y Y (y = 2x).  
          La recta de regresión coincide con los puntos.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#f97316" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Caja 3: Código Python */}
      <motion.div
        className="bg-white border border-gray-300 rounded-xl p-6 shadow-md"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-bold mb-4 text-purple-600">
          ⌨️ Implementación en Python
        </h3>
        <SyntaxHighlighter
          language="python"
          style={oneLight}
          wrapLines
          showLineNumbers
          customStyle={{ fontSize: '0.85rem', backgroundColor: '#ffffff' }}
        >
          {pythonCode}
        </SyntaxHighlighter>
      </motion.div>

      {/* Caja 4: Explicación conceptual */}
      <motion.div
        className="bg-white border border-gray-300 rounded-xl p-6 shadow-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-bold mb-4 text-orange-600">
          🧠 Importancia de la Regresión Lineal
        </h3>
        <div className="text-gray-800 leading-relaxed text-sm">
          {explanationJSX}
        </div>
      </motion.div>
    </div>
  )
}
