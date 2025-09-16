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
from scipy.stats import skew, zscore

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
    media, mediana, mínimo, máximo, desviación estándar y cuartiles.
    """
    data = df[columna]
    return {
        "media": np.mean(data),
        "mediana": np.median(data),
        "minimo": np.min(data),
        "maximo": np.max(data),
        "desviacion": np.std(data),
        "Q1": np.percentile(data, 25),
        "Q3": np.percentile(data, 75),
        "IQR": np.percentile(data, 75) - np.percentile(data, 25)
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
# 4. Normalización
# ========================

def normalizacion_minmax(df, columna):
    """
    Escala los datos entre 0 y 1 usando Min-Max Scaling.
    """
    col = df[columna]
    return (col - col.min()) / (col.max() - col.min())

def normalizacion_zscore(df, columna):
    """
    Normaliza los datos con Z-Score (media = 0, desviación estándar = 1).
    """
    return zscore(df[columna])

# ========================
# 5. Ejemplo de uso
# ========================
print("Estadísticas de ventas:")
print(estadisticas(df, "ventas"))

print("\\nTabla de frecuencias de productos:")
print(tabla_frecuencias(df, "producto"))

print("\\nSesgo de ventas:")
print(calcular_sesgo(df, "ventas"))

print("\\nNormalización Min-Max de ventas:")
print(normalizacion_minmax(df, "ventas").head())

print("\\nNormalización Z-Score de ventas:")
print(normalizacion_zscore(df, "ventas")[:5])
  `;

  const explanationJSX = (
    <>
      <p>
        Este flujo intermedio de <strong>Ciencia de Datos</strong> muestra cómo analizar datos,
        detectar valores atípicos (<em>outliers</em>), entender sesgos y aplicar técnicas de
        normalización. Todo esto es esencial para preparar datos de calidad antes de
        entrenar modelos de IA.
      </p>
      <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm">
        <li>
          <strong>Estadísticas descriptivas:</strong> se calculan <em>media</em>, <em>mediana</em>,
          mínimos, máximos y <em>cuartiles</em>. El rango intercuartílico (IQR) es clave para
          identificar valores atípicos que pueden distorsionar un modelo.
        </li>
        <li>
          <strong>Sesgo (Skewness):</strong> mide si los datos están distribuidos de forma simétrica
          o cargados hacia un lado. Un alto sesgo indica necesidad de transformación
          (logarítmica, Box-Cox, etc.).
        </li>
        <li>
          <strong>Normalización:</strong> incluye Min-Max (escala entre 0 y 1) y Z-Score
          (centrado en media 0 y desviación estándar 1). Estas técnicas homogenizan
          los datos para algoritmos sensibles a la escala, como regresión o clustering.
        </li>
        <li>
          <strong>Outliers:</strong> valores que quedan fuera de los cuartiles y afectan la media.
          Detectarlos permite decidir si eliminarlos, ajustarlos o conservarlos.
        </li>
        <li>
          <strong>Base de datos vectorial:</strong> una vez limpios y normalizados, los datos deben
          almacenarse en estructuras vectoriales completas y ordenadas. Esto permite
          búsquedas semánticas rápidas, clustering y recuperación eficiente en
          proyectos de Machine Learning.
        </li>
      </ol>
      <p className="mt-3">
        <strong>En resumen:</strong> dominar estos conceptos te permite preparar datasets robustos,
        listos para análisis estadístico avanzado o integración con arquitecturas de IA
        basadas en vectores.
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
