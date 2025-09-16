'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { horas: 1, sueno: 6, nota: 2 },
  { horas: 2, sueno: 7, nota: 4 },
  { horas: 3, sueno: 7, nota: 5 },
  { horas: 4, sueno: 6, nota: 7 },
  { horas: 5, sueno: 8, nota: 8 },
  { horas: 6, sueno: 7, nota: 9 },
];

// Explicación teórica en JSX con títulos naranjas
const explanationJSX = (
  <>
    <h3 className="mt-4 font-bold text-orange-500">Ejemplo práctico: regresión lineal múltiple</h3>
    <p>
      Supongamos que queremos predecir la <strong className="text-orange-500">nota final</strong> (variable dependiente <code>y</code>) 
      en función de dos variables: las <strong className="text-orange-500">horas de estudio</strong> y las 
      <strong className="text-orange-500"> horas de sueño</strong>. 
    </p>

    <h4 className="mt-4 font-semibold text-orange-500">Ecuación general en forma vectorial</h4>
    <p>
      En regresión múltiple, representamos la relación con matrices y vectores:
    </p>
    <p className="text-center mt-2">
      <code className="text-orange-500">ŷ = Xβ</code>
    </p>
    <ul className="list-disc pl-6 mt-2 text-sm space-y-1">
      <li><strong className="text-orange-500">X</strong>: matriz de variables independientes (horas de estudio, horas de sueño, y columna de 1s para el sesgo).</li>
      <li><strong className="text-orange-500">β</strong>: vector de parámetros (β₀ es el sesgo, β₁ y β₂ son los coeficientes).</li>
      <li><strong className="text-orange-500">y</strong>: vector de notas observadas.</li>
      <li><strong className="text-orange-500">ŷ</strong>: vector de predicciones.</li>
    </ul>

    <h4 className="mt-4 font-semibold text-orange-500">Solución vectorial</h4>
    <p>
      Para calcular los parámetros se usa la fórmula de mínimos cuadrados:
    </p>
    <p className="text-center mt-2">
      <code className="text-orange-500">β = (XᵀX)<sup>-1</sup> Xᵀ y</code>
    </p>
  </>
);

// Código en Python del ejemplo vectorial
const codePython = `
import numpy as np

# Variables independientes: horas de estudio y horas de sueño
X = np.array([
    [1, 6],  # 1 hora estudio, 6 horas sueño
    [2, 7],
    [3, 7],
    [4, 6],
    [5, 8],
    [6, 7]
])

# Variable dependiente: nota
y = np.array([2, 4, 5, 7, 8, 9])

# Agregar columna de 1s para el sesgo
X_b = np.c_[np.ones((X.shape[0], 1)), X]

# Cálculo de β
beta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
print("Parámetros β:", beta)

# Predicción para 7h estudio y 8h sueño
nuevo = np.array([1, 7, 8])  # incluye el 1 para el sesgo
prediccion = nuevo @ beta
print("Predicción:", prediccion)
`;

export default function ScriptEjm() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      {explanationJSX}

      <h4 className="mt-6 font-semibold text-orange-500">Visualización de los datos</h4>
      <p className="mb-4 text-sm">
        A continuación vemos cómo cada variable (horas de estudio y horas de sueño) 
        se relaciona individualmente con la nota. En regresión múltiple, ambas 
        se combinan para dar una predicción más precisa.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="w-full h-64">
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="horas" name="Horas de estudio" label={{ value: 'Horas de estudio', position: 'insideBottom', fill: '#f97316' }} />
              <YAxis dataKey="nota" name="Nota" label={{ value: 'Nota', angle: -90, position: 'insideLeft', fill: '#f97316' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Datos" data={data} fill="#f97316" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="sueno" name="Horas de sueño" label={{ value: 'Horas de sueño', position: 'insideBottom', fill: '#f97316' }} />
              <YAxis dataKey="nota" name="Nota" label={{ value: 'Nota', angle: -90, position: 'insideLeft', fill: '#f97316' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Datos" data={data} fill="#16a34a" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h4 className="mt-6 font-semibold text-orange-500">Implementación en Python (forma vectorial)</h4>
      <SyntaxHighlighter language="python" style={oneLight}>
        {codePython}
      </SyntaxHighlighter>

      <p className="mt-4 text-sm leading-relaxed">
  En la regresión lineal múltiple, el objetivo no es simplemente trazar una línea que 
  explique la relación entre una variable independiente y una dependiente, como ocurre en 
  la regresión simple. En su lugar, el modelo busca ajustar un 
  <strong className="text-orange-500"> plano</strong> (cuando existen dos variables explicativas) 
  o, en general, un <strong className="text-orange-500">hiperplano</strong> en espacios de 
  mayor dimensión (cuando existen tres o más características).  
  <br /><br />
  En nuestro ejemplo, utilizamos dos variables independientes: 
  <em>horas de estudio</em> y <em>horas de sueño</em>. Si representamos estos datos en un 
  sistema tridimensional, cada estudiante sería un punto en el espacio con coordenadas 
  (horas de estudio, horas de sueño, nota). El modelo busca encontrar un plano que “pase 
  lo más cerca posible” de todos esos puntos, minimizando la suma de los errores 
  cuadrados entre las notas reales y las notas predichas por la ecuación vectorial:
  <br /><br />
  <code className="text-orange-500">ŷ = β₀ + β₁·x₁ + β₂·x₂</code>
  <br /><br />
  Donde:
  <ul className="list-disc pl-6 mt-2 space-y-1">
    <li><code>β₀</code> representa el sesgo o intercepto del modelo, es decir, el valor esperado de la nota cuando todas las variables son cero.</li>
    <li><code>β₁</code> es el coeficiente asociado a las horas de estudio: cuánto cambia la nota en promedio cuando se estudia una hora más, manteniendo constante el número de horas de sueño.</li>
    <li><code>β₂</code> es el coeficiente asociado a las horas de sueño: cuánto varía la nota cuando se duerme una hora más, manteniendo constante el tiempo de estudio.</li>
  </ul>
  <br />
  Este plano en 3D resume cómo ambas variables influyen de manera conjunta en la 
  calificación. Mientras que en un gráfico bidimensional resulta fácil visualizar la 
  recta de ajuste, en el caso de varias variables debemos imaginar la extensión de esa 
  idea hacia dimensiones superiores: con tres predictores el modelo ajustaría un 
  “volumen 4D” y así sucesivamente. Aunque no siempre podemos visualizar estos 
  hiperplanos, matemáticamente siguen el mismo principio: cada nueva variable independiente 
  añade una dimensión adicional al espacio de búsqueda.  
  <br /><br />
  En resumen, la regresión lineal múltiple permite capturar relaciones más realistas y 
  complejas entre varias características simultáneamente. Esto hace que, en escenarios del 
  mundo real (como el rendimiento académico, el precio de una vivienda o la eficiencia de 
  un proceso industrial), podamos construir modelos predictivos más precisos al tener en 
  cuenta múltiples factores que influyen en el resultado final.
</p>

    </main>
  );
}
