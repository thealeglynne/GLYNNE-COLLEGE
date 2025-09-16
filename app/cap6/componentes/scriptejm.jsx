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
  
  # memoria por usuario
  usuarios = {}
  
  def get_memory(user_id: str):
      if user_id not in usuarios:
          usuarios[user_id] = ConversationBufferMemory(
              memory_key="historial", input_key="mensaje"
          )
      return usuarios[user_id]
  
  # ========================
  # 4. Nodo principal
  # ========================
  def agente_node(state: State) -> State:
      memory = get_memory(state.get("user_id", "default"))
      historial = memory.load_memory_variables({}).get("historial", "")
  
      texto_prompt = prompt.format(
          rol=state["rol"], mensaje=state["mensaje"], historial=historial
      )
      respuesta = llm.invoke(texto_prompt).content
  
      # guardar en memoria
      memory.save_context({"mensaje": state["mensaje"]}, {"respuesta": respuesta})
  
      # actualizar estado
      state["respuesta"] = respuesta
      state["historial"] = historial
      return state
  
  # ========================
  # 5. Construcción del grafo
  # ========================
  workflow = StateGraph(State)
  workflow.add_node("agente", agente_node)
  workflow.set_entry_point("agente")
  workflow.add_edge("agente", END)
  app = workflow.compile()
  
  # ========================
  # 6. CLI interactiva
  # ========================
  print("LLM iniciado con LangGraph")
  
  roles = {
      "auditor": "actua como un auditor empresarial...",
      "desarrollador": "explica con detalle técnico...",
      "vendedor": "vende software con mala técnica...",
  }
  
  user_id = str(random.randint(10000, 90000))
  print(f"tu user id es {user_id}")
  
  rol = "auditor"
  
  while True:
      try:
          user_input = input("Tu: ")
          if user_input.lower() == "salir":
              break
  
          if user_input.startswith("/rol "):
              nuevo_rol = user_input.split("/rol ", 1)[1].lower().strip()
              if nuevo_rol in roles:
                  rol = nuevo_rol
                  print(f"✅ tu nuevo rol es {nuevo_rol}")
              else:
                  print("⚠️ rol no disponible")
              continue
  
          # ejecutar grafo
          result = app.invoke(
              {"mensaje": user_input, "rol": rol, "historial": "", "user_id": user_id}
          )
          print("LLM:", result["respuesta"])
          print("📝 memoria:", get_memory(user_id).load_memory_variables({}))
      except Exception as e:
          print("❌ Error:", str(e))
          break
  
  `

  const explanationJSX = (
    <>
      <p>
        La verdadera potencia de este script no reside solo en el LLM, sino en cómo <strong>LangGraph organiza los procesos en nodos</strong> para crear flujos inteligentes y escalables. Cada nodo representa una unidad de lógica que puede manejar memoria, ejecutar el modelo y actualizar el estado, permitiendo una arquitectura modular y fácil de extender.
      </p>
  
      <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm">
        <li>
          <strong>Nodos como bloques de construcción:</strong> Cada nodo de LangGraph encapsula una acción específica: tomar la entrada del usuario, formatear el prompt, invocar el LLM y actualizar la memoria. Esto facilita depuración, pruebas y reuso de componentes.
        </li>
  
        <li>
          <strong>Memoria integrada en cada nodo:</strong> Gracias a <strong>ConversationBufferMemory</strong>, cada nodo puede acceder al historial de la conversación. Esto asegura que el flujo no pierda contexto y que cada respuesta se construya sobre la información previa.
        </li>
  
        <li>
          <strong>Flujos controlados:</strong> LangGraph permite definir claramente la secuencia de ejecución entre nodos. En este script, el nodo principal <em>agente</em> recibe la entrada, utiliza la memoria y produce la salida antes de terminar el flujo. Esto transforma al LLM en un sistema interactivo, no en un simple modelo aislado.
        </li>
  
        <li>
          <strong>Escalabilidad y modularidad:</strong> Nuevos nodos pueden agregarse fácilmente para manejar análisis adicionales, diferentes roles o integración con otros sistemas. Cada nodo mantiene su propia lógica, mientras que la memoria global asegura coherencia.
        </li>
  
        <li>
          <strong>Visión empresarial:</strong> Con LangGraph, la IA deja de ser una caja negra: los procesos son visuales, auditables y replicables. La memoria, combinada con la estructura de nodos, permite generar diagnósticos progresivos, recomendaciones acumulativas y asesoría continua.
        </li>
      </ol>
  
      <p className="mt-3">
        <strong>En conclusión:</strong> LangGraph no solo organiza la ejecución del LLM, sino que redefine la interacción: los nodos encapsulan procesos, la memoria mantiene continuidad, y cada flujo se convierte en un sistema empresarial inteligente y adaptable.
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
