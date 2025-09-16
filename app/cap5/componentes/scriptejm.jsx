'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatGroqTutorial() {
  const scriptCode = `
  import os, random
  from dotenv import load_dotenv
  from typing import TypedDict
  from langgraph.graph import StateGraph, END
  from langchain_groq import ChatGroq
  from langchain.prompts import PromptTemplate
  from langchain.memory import ConversationBufferMemory
  
  # ========================
  # 1. Configuración
  # ========================
  load_dotenv()
  api_key = os.getenv("GROQ_API_KEY")
  if not api_key:
      raise ValueError("en el .env no hay una api valida")
  
  llm = ChatGroq(
      model="llama3-70b-8192",
      api_key=api_key,
      temperature=0.4,
  )
  
  # ========================
  # 2. Prompt
  # ========================
  Prompt_estructura = """
  [META]
  tu meta es analizar el negocio del usuario, hacer consulta puntual
  y poder generar un diagnóstico de cómo la IA puede mejorar el crecimiento empresarial,
  explicando como si fueras un {rol} profesional. 
  
  [Formato Respuesta]
  La respuesta debe ser clara en base a {rol}, no más de 100 palabras, profesional y corporativa. 
  
  [ADVERTENCIA]
  - No saludes en cada consulta 
  - No inventes datos 
  - Mantén el tono conciso 
  
  [MEMORIA]
  Usa siempre el contexto de la memoria: {historial}
  
  [ENTRADA DEL USUARIO]
  consulta: {mensaje}
  
  respuesta:
  """
  
  prompt = PromptTemplate(
      input_variables=["rol", "mensaje", "historial"],
      template=Prompt_estructura.strip(),
  )
  
  # ========================
  # 3. Estado global
  # ========================
  class State(TypedDict):
      mensaje: str
      rol: str
      historial: str
      respuesta: str
  
  `

  const explanationJSX = (
    <>
    <p> La verdadera potencia de este script no reside únicamente en la capacidad del LLM para generar texto, sino en cómo <strong>LangGraph gestiona estados y flujos de interacción</strong>. Mientras que un modelo de lenguaje por sí solo responde de manera aislada, LangGraph permite estructurar cada consulta dentro de un <strong>grafo de estados</strong>, facilitando seguimiento, decisiones dinámicas y memoria contextual avanzada. </p> <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm"> <li> <strong>Modelado de flujo con StateGraph:</strong> Cada interacción se representa como un <em>nodo</em> dentro de un grafo. La clase <code>StateGraph</code> organiza estos nodos y sus transiciones, permitiendo que el script controle qué sucede después de cada mensaje, cuándo finalizar, o cómo ramificar respuestas según condiciones definidas. </li> <li> <strong>Estados con significado:</strong> Cada estado no es solo un mensaje; es un contenedor de <em>rol, historial y contexto</em>. Esto asegura que el agente recuerde información clave entre pasos, integrando el comportamiento deseado de manera coherente. Por ejemplo, un estado puede representar que el usuario pidió un análisis financiero, mientras el siguiente adapta la respuesta considerando recomendaciones previas. </li> <li> <strong>Memoria integrada y dinámica:</strong> A diferencia de un LLM aislado, LangGraph permite que cada nodo acceda a la memoria de la conversación (<code>ConversationBufferMemory</code>) y la integre en la generación de respuestas. Esto garantiza continuidad y que cada respuesta sea contextual, profesional y adaptada al historial acumulado. </li> <li> <strong>Control de flujo sofisticado:</strong> Gracias a las transiciones entre estados, el script no solo reacciona pasivamente a consultas, sino que <strong>orquesta la interacción</strong> como si fuese un asesor que sigue un plan lógico. Esto evita redundancias, mantiene consistencia en el rol y permite ajustes dinámicos según el comportamiento del usuario. </li> <li> <strong>Escalabilidad y personalización:</strong> La arquitectura de LangGraph permite agregar nodos adicionales para nuevos roles, departamentos o tipos de análisis sin reescribir el flujo principal. Cada módulo se acopla al grafo de forma modular, asegurando que el sistema pueda evolucionar y crecer con las necesidades del negocio. </li> </ol> <p className="mt-3"> <strong>En conclusión:</strong> LangGraph transforma un simple LLM en un sistema inteligente de toma de decisiones y seguimiento, donde cada interacción es significativa, coherente y estratégicamente organizada. La combinación de <code>StateGraph</code>, memoria de conversación y prompts estructurados convierte este script en un verdadero asistente corporativo con inteligencia contextual y capacidad de evolución. </p>
    </>
  )

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
