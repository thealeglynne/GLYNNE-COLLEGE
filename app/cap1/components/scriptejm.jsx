'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatGroqTutorial() {
  const [activeTab, setActiveTab] = useState('codigo')

  // Código Python exacto
  const scriptCode = `
import os 
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

# Cargar API key
load_dotenv()
api_key = os.getenv('GROQ_API_KEY')
if not api_key:
    raise ValueError("No hay una API key en el .env")

# Inicializar LLM
llm = ChatGroq(
    model='llama3-70b-8192',
    api_key=api_key,
    temperature=0.5
)

# Prompt template fijo
PROMPT_STRUCTURE = """
[META]
Tu meta es analizar la consulta del usuario y generar un diagnóstico de cómo la IA
puede mejorar el crecimiento empresarial, de forma profesional.

[FORMATO RESPUESTA]
La respuesta debe ser clara, concisa y profesional, no más de 100 palabras.

[ADVERTENCIA]
No saludes.
No inventes datos.
Mantén el tono corporativo y claro.

[ENTRADA DEL USUARIO]
Consulta: {mensaje}

Respuesta:
"""

prompt_template = PromptTemplate(
    input_variables=['mensaje'],
    template=PROMPT_STRUCTURE.strip()
)

# Función de chat
def chat(mensaje):
    prompt = prompt_template.format(mensaje=mensaje)
    respuesta = llm.invoke(prompt)
    return respuesta.content if hasattr(respuesta, 'content') else str(respuesta)

# Loop principal
if __name__ == '__main__':
    print('LLM INICIADO')
    
    while True:
        user_input = input('Tu: ')
        if user_input.lower() == 'salir':
            break
        print('LLM:', chat(user_input))
`

const explanation = `
Este script representa el primer paso para dar “vida” a un agente de inteligencia artificial. Aunque básico, permite entender cómo podemos iniciar un asistente que interpreta preguntas y genera respuestas estratégicas para negocios. No necesitamos manejar todos los detalles de un modelo complejo; basta con comprender que el agente ya puede recibir entradas, analizarlas y producir información útil de forma autónoma.

Desde un punto de vista integral, el código configura un entorno controlado: importa herramientas necesarias, carga la clave de API para autenticación, define un prompt que guía al comportamiento del agente y crea una función de chat que procesa los mensajes del usuario. Esto es como sentar las bases de un consultor digital que actúa siguiendo reglas claras y coherentes.

El loop principal simula un diálogo continuo: cada entrada es interpretada y respondida. Esta interacción demuestra cómo un agente, aunque sencillo, puede mantener conversaciones, evaluar contexto y ofrecer recomendaciones. En términos prácticos, es equivalente a tener un asistente humano que escucha y analiza información para dar un diagnóstico rápido, pero con la ventaja de automatización completa.

El diseño del prompt garantiza consistencia y profesionalismo. Define el tono, los límites y la estructura de las respuestas, evitando errores y manteniendo un estilo corporativo. Este enfoque integral asegura que, aunque estemos usando un modelo básico, las respuestas sean claras y aplicables a un contexto real de negocio.

Finalmente, este ejemplo básico es la puerta de entrada para modelos más avanzados. Permite que un principiante entienda cómo un script puede “activar” un agente de IA, mostrar resultados inmediatos y sentar las bases para escalabilidad futura. Cada concepto aprendido aquí se aplicará y expandirá en los siguientes módulos de la serie, haciendo más sofisticados a los agentes de IA paso a paso.
`

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Contenedor Código */}
      <div className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[600px] overflow-y-auto shadow-md">
        <h3 className="text-lg font-bold mb-2 text-orange-500">Código de ejemplo (Python)</h3>
        <SyntaxHighlighter
          language="python"
          style={oneLight}
          wrapLines={true}
          showLineNumbers
          customStyle={{ fontSize: '0.9rem', backgroundColor: '#fff' }}
          codeTagProps={{
            style: { fontFamily: 'Fira Code, monospace' },
          }}
          lineProps={(lineNumber) => ({
            style: { display: 'block' }
          })}
        >
          {scriptCode}
        </SyntaxHighlighter>
      </div>

      {/* Contenedor Explicación */}
      <div className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[600px] overflow-y-auto shadow-md">
        <h3 className="text-lg font-bold mb-2 text-orange-500">Explicación detallada</h3>
        <p className="text-gray-800 whitespace-pre-line">{explanation}</p>
      </div>
    </div>
  )
}
