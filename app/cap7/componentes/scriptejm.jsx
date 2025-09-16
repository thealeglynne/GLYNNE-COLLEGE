'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatGroqTutorial() {
  const scriptCode = `
  import os, random, requests, datetime
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
serper_api_key = os.getenv("SERPER_API_KEY")

if not api_key:
    raise ValueError("en el .env no hay una api valida de GROQ")

if not serper_api_key:
    raise ValueError("en el .env no hay una api valida de SERPER")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=api_key,
    temperature=0.4,
)

# ========================
# 2. Prompt
# ========================
Prompt_estructura = """
[CONTEXTO]
Hoy es {fecha}.
Tienes acceso a memoria y a resultados de búsqueda web (cuando existan).
Responde de forma natural y conversacional:
- Si hay resultados de búsqueda: intégralos en tu respuesta sin sonar forzado.
- Si no hay resultados de búsqueda: responde con tu conocimiento previo, pero menciona brevemente que puede estar desactualizado.
- Siempre prioriza ser útil, claro y conciso, evitando repetir advertencias innecesarias.

[BUSQUEDA WEB]
{busqueda}

[MEMORIA]
{historial}

[ENTRADA DEL USUARIO]
Consulta: {mensaje}

[RESPUESTA COMO {rol}]
"""

prompt = PromptTemplate(
    input_variables=["rol", "mensaje", "historial", "busqueda", "fecha"],
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
    busqueda: str
    user_id: str

usuarios = {}

def get_memory(user_id: str):
    if user_id not in usuarios:
        usuarios[user_id] = ConversationBufferMemory(
            memory_key="historial", input_key="mensaje"
        )
    return usuarios[user_id]

  
  `

  const explanationJSX = (
    <>
      <p> La verdadera potencia de este script no está únicamente en el LLM <strong>ChatGroq</strong>, sino en cómo <strong>la arquitectura modular y los nodos gestionan la información, la memoria y las búsquedas web</strong> para crear flujos inteligentes y escalables. Cada componente está diseñado para manejar entradas, ejecutar el modelo y mantener coherencia, permitiendo una IA que no solo responde, sino que aprende y se adapta. </p> <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm"> <li> <strong>Nodos como bloques de construcción:</strong> Cada nodo representa una unidad de lógica independiente. Por ejemplo, uno puede encargarse de formatear el prompt con el contexto del usuario, otro de invocar el LLM y otro de almacenar la memoria. Esto permite que los flujos sean visuales, testeables y fácilmente ampliables. </li> <li> <strong>Acceso a memoria integrada:</strong> Gracias a <strong>ConversationBufferMemory</strong>, cada usuario mantiene un historial de interacciones. Cuando un nodo necesita generar una respuesta, puede consultar la memoria para contextualizar la respuesta y asegurar coherencia en toda la conversación. </li> <li> <strong>Integración con búsquedas web:</strong> Algunos nodos están diseñados para consultar resultados en tiempo real a través de <strong>Serper API</strong>. Antes de generar la respuesta, el flujo puede solicitar información externa, integrarla en el prompt y entregar respuestas actualizadas y precisas, evitando depender únicamente del conocimiento estático del modelo. </li> <li> <strong>Estado global y control de flujo:</strong> La estructura con <strong>TypedDict State</strong> permite centralizar la información de cada usuario: mensaje, rol, historial, búsqueda y resultado. Cada nodo puede leer y actualizar este estado, asegurando que el flujo no pierda contexto y que cada respuesta se construya de manera consistente. </li> <li> <strong>Escalabilidad y modularidad:</strong> Gracias a esta organización, se pueden agregar nuevos nodos para manejar distintos roles, análisis de datos adicionales o integraciones externas. Cada nodo mantiene su lógica, mientras que la memoria global y las búsquedas web aseguran coherencia y continuidad en todo el flujo. </li> <li> <strong>Visión práctica y empresarial:</strong> Con esta estructura, la IA deja de ser un “cajón negro”: los procesos son auditable, replicables y visualmente trazables. La combinación de nodos, memoria y acceso web permite crear diagnósticos progresivos, recomendaciones acumulativas y una experiencia de usuario adaptable. </li> </ol> <p className="mt-3"> <strong>En resumen:</strong> Este script transforma al LLM en un sistema inteligente y modular: los nodos encapsulan procesos, la memoria mantiene continuidad, y la integración con internet permite generar respuestas precisas y actualizadas. Cada flujo se convierte en un bloque de arquitectura escalable listo para integrarse en sistemas más complejos y automatizados. </p>
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
