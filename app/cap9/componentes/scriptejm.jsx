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

# ========================
# 4. Nodo de búsqueda Serper
# ========================
def serper_node(state: State) -> State:
    try:
        q = state.get("mensaje", "")
        headers = {"X-API-KEY": serper_api_key, "Content-Type": "application/json"}
        resp = requests.post(
            "https://google.serper.dev/search",
            headers=headers,
            json={"q": q},
        )
        data = resp.json()
        if "organic" in data and len(data["organic"]) > 0:
            resumen = [
                f"{item.get('title')} - {item.get('link','')}"
                for item in data["organic"][:3]
            ]
            state["busqueda"] = " | ".join(resumen)
        else:
            state["busqueda"] = "No hubo resultados"
    except Exception as e:
        state["busqueda"] = f"Error en búsqueda: {e}"
    
    print("DEBUG búsqueda:", state["busqueda"])  # 👈 Debug
    return state

# ========================
# 5. Nodo agente (usa búsqueda + historial)
# ========================
def agente_node(state: State) -> State:
    memory = get_memory(state.get("user_id", "default"))
    historial = memory.load_memory_variables({}).get("historial", "")
    fecha = datetime.date.today().strftime("%d/%m/%Y")

    # 🔑 Lógica: decidir si activar búsqueda
    activar_busqueda = any(
        palabra in state["mensaje"].lower()
        for palabra in ["quién", "cuándo", "actual", "último", "presidente", "hoy", "noticia", "última hora"]
    )

    if activar_busqueda:
        state = serper_node(state)  # ejecuta búsqueda solo si hace falta

  

    texto_prompt = prompt.format(
        rol=state["rol"],
        mensaje=state["mensaje"],
        historial=historial,
        busqueda=state.get("busqueda", ""),
        fecha=fecha,
    )
    respuesta = llm.invoke(texto_prompt).content

    # Guardar en memoria
    memory.save_context({"mensaje": state["mensaje"]}, {"respuesta": respuesta})

    state["respuesta"] = respuesta
    state["historial"] = historial
    return state

# ========================
# 6. Grafo
# ========================
workflow = StateGraph(State)
workflow.add_node("serper", serper_node)
workflow.add_node("agente", agente_node)

workflow.set_entry_point("agente")   # 👈 ahora empieza en el agente
workflow.add_edge("agente", END)

app = workflow.compile()

# ========================
# 7. CLI
# ========================
print("LLM iniciado con LangGraph + Serper dinámico")
user_id = str(random.randint(10000, 90000))
rol = "auditor"
print(f"tu user id es {user_id}")

while True:
    user_input = input("Tu: ")
    if user_input.lower() == "salir":
        break

    result = app.invoke(
        {"mensaje": user_input, "rol": rol, "historial": "", "user_id": user_id}
    )
    print("LLM:", result["respuesta"])

  
  `

  const explanationJSX = (
    <>
      <p>
        La verdadera potencia de este script no está únicamente en el LLM <strong>ChatGroq</strong>, sino en cómo <strong>la arquitectura modular y los nodos gestionan la información, la memoria y las búsquedas web</strong> para crear flujos inteligentes y escalables. Cada componente está diseñado para manejar entradas, ejecutar el modelo y mantener coherencia, permitiendo una IA que no solo responde, sino que aprende y se adapta.
      </p>
      <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm">
        <li>
          <strong>Nodos como bloques de construcción:</strong> Cada nodo representa una unidad de lógica independiente. Por ejemplo, <strong>el nodo de Serper</strong> se encarga de consultar información actualizada en internet antes de generar la respuesta. Otros nodos pueden formatear prompts, invocar el LLM o guardar la memoria. Esto permite que los flujos sean visuales, testeables y fácilmente ampliables.
        </li>
        <li>
          <strong>Nodo de búsqueda Serper:</strong> Este nodo hace una petición HTTP a <strong>Serper API</strong> con la consulta del usuario, recupera los resultados más relevantes y los integra directamente en el prompt. Así, la IA combina conocimiento previo con información actual, ofreciendo respuestas precisas, actualizadas y contextuales.
        </li>
        <li>
          <strong>Acceso a memoria integrada:</strong> Gracias a <strong>ConversationBufferMemory</strong>, cada usuario mantiene un historial de interacciones. Cuando un nodo necesita generar una respuesta, puede consultar la memoria para contextualizar la respuesta y asegurar coherencia en toda la conversación. Esto es fundamental para mantener un diálogo continuo y personalizado.
        </li>
        <li>
          <strong>Estado global y control de flujo:</strong> La estructura con <strong>TypedDict State</strong> centraliza la información de cada usuario: mensaje, rol, historial, búsqueda y resultado. Cada nodo puede leer y actualizar este estado, asegurando que el flujo no pierda contexto y que cada respuesta se construya de manera consistente. LangGraph permite definir claramente la secuencia de nodos y su interconexión.
        </li>
        <li>
          <strong>Integración con prompts dinámicos:</strong> El prompt se construye combinando historial, búsqueda web y mensaje actual, usando <strong>PromptTemplate</strong>. Esto asegura que la IA interprete correctamente la intención del usuario y genere respuestas coherentes, naturales y enriquecidas con información en tiempo real.
        </li>
        <li>
          <strong>Escalabilidad y modularidad:</strong> Gracias a esta organización, se pueden agregar nuevos nodos para manejar distintos roles, análisis de datos adicionales o integraciones externas. Cada nodo mantiene su lógica independiente, mientras que la memoria global y la integración web aseguran coherencia y continuidad en todo el flujo.
        </li>
        <li>
          <strong>Visión práctica y empresarial:</strong> Con esta estructura, la IA deja de ser un “cajón negro”: los procesos son auditables, replicables y visualmente trazables. La combinación de nodos, memoria y acceso web permite crear diagnósticos progresivos, recomendaciones acumulativas y una experiencia de usuario adaptable.
        </li>
      </ol>
      <p className="mt-3">
        <strong>En resumen:</strong> Este script transforma al LLM en un sistema inteligente y modular: los nodos encapsulan procesos, la memoria mantiene continuidad, y la integración con internet a través del <strong>nodo Serper</strong> permite generar respuestas precisas y actualizadas. Cada flujo se convierte en un bloque de arquitectura escalable listo para integrarse en sistemas más complejos y automatizados.
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
