'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function DataScienceTutorial() {
  const scriptCode = `
# PSEUDO-CÓDIGO (INSTRUCTIVO, NO EJECUTABLE)
# "Qué hacerle a un DATASET antes de usarlo para IA" — nivel: ultra-detalhado

# METADATA & INGESTA
# - Registrar origenes, timestamps, checksum
# - Ingesta sincronizada + streaming: fuente A (CSV S3), B (DB SQL), C (API)
# - Dedupe en ingest: mantener first/last by key
# - Guardar snapshot crudo: /raw/dataset/v1/...

# VALIDACIÓN INICIAL (SANITY CHECKS)
# - Verificar esquema: columnas, tipos esperados (int, float, str, datetime)
# - Counts por partición (fecha), ratio nulos por columna
# - Validación de ranges: e.g., 0 <= edad <= 120
# - Checksums & row counts vs origen
# - Rechazar ingest si fail crítico -> alert

# LIMPIEZA (CLEANING)
# - Tipos: forzar parse datetime, cast numeric, detectar strings numeric-like
# - Missing values:
#     * estrategia por columna: drop, imputar (mean/median/mode), imputación basada en modelo
#     * marcar con flag "is_missing_colX" cuando necesario
# - Dupes: agrupar por key business, elegir política (keep last / aggregate)
# - Normalizar strings: strip(), lower(), unicode normalize
# - Corrección de formatos (teléfonos, monedas)

# DETECCIÓN Y TRATAMIENTO DE OUTLIERS
# - IQR method: Q1, Q3, IQR = Q3-Q1; outlier si < Q1-1.5*IQR o > Q3+1.5*IQR
# - z-score method: z = (x - mean)/std, marcar |z|>3
# - Model-based: IsolationForest para detectar outliers multivariantes
# - Políticas: keep + cap, winsorize, imputar o remover según impacto
# - Registrar decisiones (audit trail) para reproducibilidad

# ESTADÍSTICAS EXPLORATORIAS
# - media, mediana, moda, std, skewness, kurtosis
# - percentiles (Q1, Q2, Q3), IQR
# - tablas de frecuencia para categóricas
# - correlación (pearson/spearman) y matriz de correlaciones

# TRANSFORMACIONES Y NORMALIZACIÓN
# - Transformaciones de escala:
#     * Min-Max (0..1)
#     * Standard (Z-score) -> media 0, std 1
#     * Robust scaler (mediana + IQR) para outliers
# - Transformaciones no-lineales:
#     * log(x+1), Box-Cox, Yeo-Johnson (para reducir skew)
# - Decidir por columna según distribución y algoritmos objetivo

# ENCODING DE CATEGORICAS
# - One-hot para cardinalidad baja
# - Ordinal si existe orden natural
# - Frequency / target encoding cuando cardinalidad grande
# - Entity embeddings (NN) para categorías con muchas clases
# - Manejo de unknowns / rare categories

# FEATURE ENGINEERING
# - Crear features temporales (hora, dia, mes, lag, rolling mean)
# - Agregaciones por grupo (sum, count, mean)
# - Interacciones, polinomios, boolean flags
# - Selección inicial: correlation filter, variance threshold, feature importance baseline

# LABELS & ETIQUETADO
# - Definir reglas de labeling (business logic)
# - Calidad del label: sampling + revisión manual
# - Weak supervision: snorkel / labeling functions con consenso
# - Balanceo de clases: estrategia si classes imbalance (SMOTE / resampling / class weights)

# AUGMENTACIÓN (si aplica)
# - Tabular: sintetizar casos minoritarios (SMOTE)
# - Texto/imagen/audio: augmentaciones específicas (token masking, flips, ruido)

# SPLIT Y VALIDACIÓN
# - Time-aware split para series temporales (no leak)
# - Stratified split para clasificación desbalanceada
# - GroupKFold si hay grupos (clientes, devices)
# - Guardar splits reproducibles y versiones

# PIPELINE & ORQUESTACIÓN
# - Pipeline idempotente: ingest -> validate -> clean -> fe -> split -> store
# - Orquestadores: Airflow / Prefect / Dagster
# - Cada job produce artefactos versionados (parquet, feature store entries)

# VECTORIZACIÓN Y EMBEDDINGS
# - Texto -> embeddings (transformer / sentence encoder)
# - Filas -> row embeddings (tabular-to-vector via NN)
# - Normalizar vectores (L2 or unit norm)
# - Dimensionality reduction (PCA / UMAP / SVD) para indexado opcional

# BASE DE DATOS VECTORIAL (VECTOR DB)
# - Guardar vectores + metadata (id, source, timestamp, schema version)
# - Index: HNSW / IVF-PQ según latencia/throughput
# - Similarity metric: cosine vs dot vs L2 (elegir según embedding)
# - Versionado y namespace por dataset/version
# - Upsert policy y TTL si aplica

# GOVERNANCE, VERSIONING Y LINEAGE
# - Dataset versions: v1, v2...
# - Data diff y migraciones (what changed)
# - Lineage: quien, cuando, por qué (audit logs)
# - Data contracts entre equipos (schema, SLA)

# TESTS, VALIDACIONES Y MONITOREO
# - Unit tests para transformaciones
# - Tests de integridad: cardinalidad, ranges, nulos
# - Data quality metrics: completeness, consistency, freshness
# - Monitoring: drift detection (feature distribution + label drift)
# - Alerting + automatic rollback triggers

# PRIVACY & SEGURIDAD
# - PII detection & redaction / tokenization
# - Hashing / encryption of sensitive keys
# - Differential privacy techniques si requerido
# - Control de acceso y encriptado en reposo/transito

# DOCUMENTACIÓN Y DATA DICTIONARY
# - Data dictionary por columna: tipo, rango, descripción, ejemplo
# - README con pipeline steps y decisiones
# - Samples and exploratory notebooks para reproducir análisis

# ARTIFACTOS FINALES (OUTPUTS)
# - /processed/dataset/vX.parquet (clean + types)
# - /features/featurestore/ (materialized features)
# - /embeddings/vector_db/ (index + metadata)
# - /reports/quality-report-vX.html (EDA, outliers, skew)
# - schema.json + tests

# CHECKLIST (AL ENTREGAR DATASET PARA IA)
# - [ ] Schema validado
# - [ ] Nulos manejados o marcados
# - [ ] Outliers tratados con política documentada
# - [ ] Features normalizados/estandarizados según algoritmo
# - [ ] Labels verificados y muestreados
# - [ ] Vectores generados y versionados
# - [ ] Vector DB con metadata y index configurado
# - [ ] Monitoreo + tests automatizados
# - [ ] Documentación y data dictionary
  `;

  const explanationJSX = (
    <>
      <p>
        Los datos son la materia prima de cualquier sistema de <strong>inteligencia artificial</strong>. Sin datos limpios,
        correctos y bien estructurados no existe modelo que aguante la prueba del mundo real — <em>garbage in, garbage out</em>.
      </p>

      <p className="mt-3">
        Este pseudo-código detalla el ciclo completo que debe seguir un dataset antes de convertirse en insumo para un modelo:
        desde la <strong>ingesta</strong> y los <strong>sanity checks</strong>, hasta la <strong>vectorización</strong> y el almacenamiento
        en una <strong>base de datos vectorial</strong>. Cada bloque es una decisión técnica con impacto directo en la calidad
        del resultado final.
      </p>

      <h4 className="mt-4 font-semibold">Por qué cada etapa importa (nivel técnico medio)</h4>
      <ol className="list-decimal pl-6 mt-2 space-y-2 text-sm">
        <li>
          <strong>Validación y tipos:</strong> si los tipos están rotos (strings en columnas numéricas, timestamps mal parseados),
          el pipeline falla o, peor, introduce sesgos silenciosos. Forzar tipos y checks evita errores de producción.
        </li>

        <li>
          <strong>Outliers y cuartiles (IQR):</strong> detectar outliers con IQR o z-score permite decidir si recortarlos, imputarlos o mantenerlos.
          La media es sensible a outliers; la <em>mediana</em> y los <em>cuartiles</em> (Q1/Q3) ofrecen una visión robusta. Documentar la política
          (p. ej. winsorize o drop) es crítico para reproducibilidad.
        </li>

        <li>
          <strong>Sesgo (skewness):</strong> columnas fuertemente sesgadas (skew) suelen necesitar transformaciones (log, Box-Cox) antes de entrenar.
          El sesgo no solo afecta métricas: también puede inducir decisiones erróneas si el modelo amplifica rarezas.
        </li>

        <li>
          <strong>Normalización / Estandarización:</strong> muchos algoritmos (SVM, KNN, redes neuronales) son sensibles a la escala.
          Min-Max o Z-Score normalizan la escala; <em>RobustScaler</em> es útil cuando hay outliers.
        </li>

        <li>
          <strong>Encoding y embeddings:</strong> transformar categóricas correctamente evita fuga de información y reduce cardinalidad.
          Para texto o high-cardinality categories, usar embeddings y guardarlos junto con metadata en la vector DB permite búsquedas semánticas.
        </li>

        <li>
          <strong>Vector DB:</strong> una base vectorial bien diseñada (vectores + metadata + versionado) es esencial para aplicaciones modernas:
          recuperación semántica, nearest neighbor, reranking. Elegir index (HNSW, IVF) y métricas (cosine vs L2) impacta latencia y calidad.
        </li>

        <li>
          <strong>Versionado & lineage:</strong> el dataset cambia con el tiempo. Versionarlo y conservar lineage permite reproducir resultados y auditar decisiones.
        </li>

        <li>
          <strong>Tests y monitoreo:</strong> validar transformaciones con tests unitarios, detectar drift (shift en distribución) y establecer alertas mantiene la salud del modelo en producción.
        </li>

        <li>
          <strong>Privacidad y governance:</strong> identificar PII, aplicar redaction/hashing y políticas de acceso minimizan riesgos legales y éticos.
        </li>
      </ol>

      <h4 className="mt-4 font-semibold">Impacto práctico</h4>
      <p className="mt-2 text-sm">
        Un modelo entrenado sobre datos incompletos, sin normalizar o con labels ruidosos probablemente:
      </p>
      <ul className="list-disc pl-6 mt-2 text-sm">
        <li>Sobreajustará a ruido o sesgos no documentados.</li>
        <li>Fallará en producción ante cambios menores en la entrada.</li>
        <li>Generará resultados poco explicables y difíciles de auditar.</li>
      </ul>

      <p className="mt-3 text-sm">
        En cambio, invertir tiempo en pipeline de datos —ingesta segura, validaciones, limpieza reproducible, vectorización y
        almacenamiento ordenado en una vector DB— multiplica la probabilidad de éxito del proyecto de IA.
      </p>

      <p className="mt-4 text-sm font-semibold">
        Si quieres, puedo transformar este pseudo-código en:
        <ul className="list-disc pl-6 mt-2">
          <li>Un checklist PDF para pipelines de datos.</li>
          <li>Un notebook con ejemplos reproducibles (IQR, z-score, MinMax, embeddings).</li>
          <li>Un spec técnico para una Vector DB (schema, index, metadata, upsert policy).</li>
        </ul>
      </p>
    </>
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Contenedor Código (pseudo-código instructivo) */}
      <div className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[600px] overflow-auto shadow-md">
        <h3 className="text-lg font-bold mb-2 text-orange-500">Guía práctica (pseudo-código) — Prepara tu dataset</h3>
        <SyntaxHighlighter
          language="text"
          style={oneLight}
          wrapLines
          showLineNumbers
          customStyle={{ fontSize: '0.85rem', backgroundColor: '#ffffff' }}
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
        className="flex-1 bg-white border border-gray-300 rounded-xl p-6 max-h-[600px] overflow-auto shadow-md"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="text-lg font-bold mb-2 text-orange-500">Por qué los datos importan (explicación técnica)</h3>
        <div className="text-gray-800 leading-relaxed text-sm">{explanationJSX}</div>
      </motion.div>
    </div>
  )
}
