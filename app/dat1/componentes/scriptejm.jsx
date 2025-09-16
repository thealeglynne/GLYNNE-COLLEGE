'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatGroqTutorial() {
  const scriptCode = `
# ========================
# 1. Importar librerías
# ========================
import pandas as pd
import numpy as np

# ========================
# 2. Cargar un archivo CSV
# ========================
# CSV: Comma Separated Values. Es un formato de archivo de texto donde cada línea es un registro
# y los valores están separados por comas. Ideal para datos tabulares (como hojas de cálculo)
df = pd.read_csv("datos_empresa.csv")

# ========================
# 3. Explorar la información
# ========================
# Muestra las primeras 5 filas del CSV
print("Primeras filas del CSV:")
print(df.head())

# Describe estadísticas básicas de cada columna numérica
print("\\nEstadísticas descriptivas:")
print(df.describe())

# Información general de las columnas (tipo de dato, nulos, etc.)
print("\\nInformación del DataFrame:")
print(df.info())

# Acceder a una columna específica
print("\\nColumna 'ventas':")
print(df["ventas"])

# Operaciones con numpy
ventas_array = np.array(df["ventas"])
print("\\nPromedio de ventas:", np.mean(ventas_array))
print("Máximo de ventas:", np.max(ventas_array))
print("Mínimo de ventas:", np.min(ventas_array))
  `;

  const explanationJSX = (
    <>
      <p>
        Este ejemplo reemplaza el script de LLM con un flujo básico de análisis de datos usando <strong>Python</strong>, <strong>pandas</strong> y <strong>numpy</strong>. Te muestra cómo leer un archivo CSV, explorar su contenido y realizar operaciones simples de análisis.
      </p>
      <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm">
        <li>
          <strong>CSV:</strong> Es un archivo de texto donde cada línea representa un registro y los valores están separados por comas. Se usa comúnmente para almacenar datos tabulares, como ventas, clientes o inventarios.
        </li>
        <li>
          <strong>pandas:</strong> Librería de Python para manipulación y análisis de datos. Permite cargar datos desde CSV, Excel, bases de datos, limpiar información y hacer estadísticas básicas de manera muy simple.
        </li>
        <li>
          <strong>numpy:</strong> Librería para cálculos numéricos. Nos permite realizar operaciones matemáticas sobre arrays de manera eficiente, como calcular promedio, máximo o mínimo.
        </li>
        <li>
          <strong>Cargar CSV:</strong> Con <code>pd.read_csv("archivo.csv")</code> obtenemos un DataFrame, que es una estructura de datos tabular con filas y columnas, similar a una hoja de cálculo.
        </li>
        <li>
          <strong>Explorar información:</strong> <code>head()</code> muestra las primeras filas; <code>describe()</code> ofrece estadísticas básicas (media, desviación estándar, min, max); <code>info()</code> muestra los tipos de datos y la cantidad de valores nulos.
        </li>
        <li>
          <strong>Acceder a columnas:</strong> Podemos tomar una columna específica usando <code>df["nombre_columna"]</code> y luego convertirla a un array de numpy para hacer cálculos rápidos.
        </li>
        <li>
          <strong>Operaciones básicas:</strong> Con numpy podemos obtener promedio, máximo, mínimo y otras estadísticas de manera muy eficiente sobre los datos.
        </li>
      </ol>
      <p className="mt-3">
        <strong>En resumen:</strong> Este flujo enseña lo esencial de cómo manejar datos tabulares con Python, explicando qué es un CSV, cómo explorarlo y cómo realizar cálculos básicos. Es la base para análisis más complejos, visualizaciones o integración con sistemas más avanzados de datos.
      </p>
    </>
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Contenedor Código */}
      <div className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[500px] overflow-auto shadow-md">
        <h3 className="text-lg font-bold mb-2 text-orange-500">Código de ejemplo</h3>
        <SyntaxHighlighter
          language="python"
          style={oneLight}
          wrapLines
          showLineNumbers
          customStyle={{ fontSize: '0.875rem', backgroundColor: '#ffffff' }}
          lineProps={{ style: { wordBreak: 'break-word', whiteSpace: 'pre-wrap' } }}
          codeTagProps={{
            style: { fontFamily: 'Fira Code, monospace', color: '#000' },
          }}
        >
          {scriptCode}
        </SyntaxHighlighter>
      </div>

      {/* Contenedor Explicación */}
      <motion.div
        className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[500px] overflow-auto shadow-md"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="text-lg font-bold mb-2 text-orange-500">Explicación detallada</h3>
        <div className="text-gray-800 leading-relaxed text-sm">{explanationJSX}</div>
      </motion.div>
    </div>
  )
}
