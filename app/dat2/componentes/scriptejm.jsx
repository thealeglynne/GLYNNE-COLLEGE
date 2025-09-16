'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function DataScienceTutorial() {
  const scriptCode = `
# ========================
# 1. Importar librerías
# ========================
import pandas as pd
import numpy as np
from scipy.stats import skew

# ========================
# 2. Cargar CSV
# ========================
df = pd.read_csv("datos_empresa.csv")

# ========================
# 3. Funciones básicas
# ========================

def estadisticas(df, columna):
    """
    Calcula estadísticas básicas de una columna numérica:
    media, mediana, mínimo, máximo y desviación estándar.
    """
    data = df[columna]
    return {
        "media": np.mean(data),
        "mediana": np.median(data),
        "minimo": np.min(data),
        "maximo": np.max(data),
        "desviacion": np.std(data)
    }

def tabla_frecuencias(df, columna):
    """
    Crea una tabla de frecuencias de una columna categórica o numérica.
    Devuelve el conteo de cada valor único.
    """
    return df[columna].value_counts()

def calcular_sesgo(df, columna):
    """
    Calcula el sesgo (skewness) de una columna numérica.
    Indica si los datos están sesgados hacia la izquierda o derecha.
    """
    return skew(df[columna])

# ========================
# 4. Ejemplo de uso
# ========================
print("Estadísticas de ventas:")
print(estadisticas(df, "ventas"))

print("\\nTabla de frecuencias de productos:")
print(tabla_frecuencias(df, "producto"))

print("\\nSesgo de ventas:")
print(calcular_sesgo(df, "ventas"))
  `;

  const explanationJSX = (
    <>
      <p>
        Este ejemplo introduce un flujo básico de <strong>Ciencia de Datos</strong> usando <strong>Python</strong>, <strong>pandas</strong>, <strong>numpy</strong> y <strong>scipy</strong>.
        Aquí aprenderás cómo explorar datos, obtener estadísticas, crear tablas de frecuencias y medir el sesgo de los datos.
      </p>
      <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm">
        <li>
          <strong>Función <code>estadisticas</code>:</strong> Calcula media, mediana, mínimo, máximo y desviación estándar de una columna numérica.
          Es útil para entender rápidamente la distribución y el rango de tus datos.
        </li>
        <li>
          <strong>Función <code>tabla_frecuencias</code>:</strong> Genera la frecuencia de cada valor único de una columna, ideal para analizar categorías o valores repetidos.
        </li>
        <li>
          <strong>Función <code>calcular_sesgo</code>:</strong> Calcula el <em>skewness</em>, que indica si los datos están sesgados hacia la izquierda (negativo) o derecha (positivo). Esto ayuda a decidir transformaciones de datos o detectar anomalías.
        </li>
        <li>
          <strong>Uso práctico:</strong> Al aplicar estas funciones, puedes explorar tu dataset de manera rápida y entender patrones básicos, distribuciones y posibles irregularidades.
        </li>
      </ol>
      <p className="mt-3">
        <strong>En resumen:</strong> Este flujo enseña cómo hacer un análisis inicial de datos con Python, combinando estadística descriptiva, tablas de frecuencia y sesgos. Es la base para análisis más avanzados, visualizaciones o modelos predictivos.
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
