'use client';

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

// Explicación teórica en JSX con títulos naranjas
const explanationJSX = (
  <>
    <h3 className="mt-4 font-bold text-orange-500">Ejemplo práctico: horas de estudio vs calificación</h3>
    <p>
      Supongamos que queremos predecir la <strong className="text-orange-500">nota final</strong> (variable dependiente <code>y</code>) 
      en función de las <strong className="text-orange-500">horas de estudio</strong> (variable independiente <code>x</code>).
    </p>

    <h4 className="mt-4 font-semibold text-orange-500">Ecuación general</h4>
    <p>
      La regresión lineal simple se define como:
    </p>
    <p className="text-center mt-2">
      <code className="text-orange-500">y = w · x + b</code>
    </p>
    <ul className="list-disc pl-6 mt-2 text-sm space-y-1">
      <li><strong className="text-orange-500">w</strong>: peso (cuánto cambia y por cada hora de estudio).</li>
      <li><strong className="text-orange-500">b</strong>: sesgo (nota base aunque no se estudie nada).</li>
      <li><strong className="text-orange-500">x</strong>: variable independiente (horas de estudio).</li>
      <li><strong className="text-orange-500">y</strong>: variable dependiente (nota obtenida).</li>
    </ul>

    <h4 className="mt-4 font-semibold text-orange-500">Visualización de los datos</h4>
    <p>
      Observamos cómo los puntos siguen un patrón lineal: a más horas de estudio, 
      mayor calificación. 
    </p>
  </>
);

// Código en Python del ejemplo
const codePython = `
import numpy as np
from sklearn.linear_model import LinearRegression

# Datos: horas de estudio (X) y notas (y)
X = np.array([1, 2, 3, 4, 5, 6]).reshape(-1, 1)
y = np.array([2, 4, 5, 7, 8, 9])

# Crear y entrenar el modelo
modelo = LinearRegression()
modelo.fit(X, y)

# Obtener parámetros
w = modelo.coef_[0]   # peso
b = modelo.intercept_ # sesgo

print(f"Ecuación: y = {w:.2f}x + {b:.2f}")

# Predecir nota para 7 horas de estudio
prediccion = modelo.predict([[7]])
print(f"Predicción para 7 horas de estudio: {prediccion[0]:.2f}")
`;

export default function ScriptEjm() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      {explanationJSX}

      <div className="w-full h-64 mt-6">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="horas" label={{ value: 'Horas de estudio', position: 'insideBottom', offset: -5, fill: '#f97316' }} />
            <YAxis label={{ value: 'Nota', angle: -90, position: 'insideLeft', fill: '#f97316' }} />
            <Tooltip />
            <Line type="monotone" dataKey="nota" stroke="#f97316" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h4 className="mt-6 font-semibold text-orange-500">Implementación en Python</h4>
      <SyntaxHighlighter language="python" style={oneLight}>
        {codePython}
      </SyntaxHighlighter>

      <p className="mt-4 text-sm">
        En este ejemplo, el modelo aprendería un valor aproximado de <strong className="text-orange-500">w ≈ 1.4</strong> y 
        <strong className="text-orange-500"> b ≈ 0.5</strong>.  
        Es decir, cada hora de estudio incrementa la nota en promedio 1.4 puntos.
      </p>
    </main>
  );
}
