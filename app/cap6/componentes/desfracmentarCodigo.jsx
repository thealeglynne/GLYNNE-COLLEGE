'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMemory, FaKey, FaCogs, FaRobot, FaTerminal, FaNetworkWired, FaUserCog } from 'react-icons/fa';

export default function ChatGroqMemoryExplained() {
  const [activeTab, setActiveTab] = useState('inicio');

  const nodes = [
    {
      key: 'inicio',
      name: 'Imports y Librerías',
      icon: FaKey,
      content: (
        <>
          <p>
            El script inicia cargando librerías esenciales:
            <span className="font-bold"> os</span> para variables de entorno,
            <span className="font-bold"> dotenv</span> para leer el archivo <code>.env</code>,
            <span className="font-bold"> random</span> para generar IDs de usuario y módulos de
            <span className="font-bold"> LangChain</span>, <span className="font-bold">LangGraph</span> y <span className="font-bold">Groq</span>.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`import os, random
from dotenv import load_dotenv
from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory`}
          </p>
          <p>
            Estas librerías forman la base para crear un modelo LLM con memoria contextual, prompts dinámicos y un flujo de nodos modular.
          </p>
        </>
      ),
    },
    {
      key: 'dotenv',
      name: 'Cargar API Key',
      icon: FaCogs,
      content: (
        <>
          <p>
            Se utiliza <span className="font-bold">dotenv</span> para cargar la clave de la API desde el archivo <code>.env</code>, garantizando que no se exponga públicamente.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("en el .env no hay una api valida")`}
          </p>
          <p>
            Esto asegura que la conexión con el modelo ChatGroq será válida y segura.
          </p>
        </>
      ),
    },
    {
      key: 'llm',
      name: 'Inicializar ChatGroq',
      icon: FaRobot,
      content: (
        <>
          <p>
            Se crea la instancia de <span className="font-bold">ChatGroq</span>, el LLM que procesará los prompts.
            Se define modelo, API key y temperatura para controlar creatividad vs precisión.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`llm = ChatGroq(
    model="llama3-70b-8192",
    api_key=api_key,
    temperature=0.4
)`} 
          </p>
        </>
      ),
    },
    {
      key: 'prompttemplate',
      name: 'Prompt y Estructura',
      icon: FaTerminal,
      content: (
        <>
          <p>
            Se define un <span className="font-bold">PromptTemplate</span> que integra la memoria y el rol del usuario.
            Esto permite que cada consulta al LLM tenga contexto y sea coherente.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`Prompt_estructura = """
[META]
Analiza el negocio del usuario y genera diagnóstico
explicando como si fueras un {rol} profesional.

[Formato Respuesta]
Respuesta clara, profesional, <100 palabras.

[ADVERTENCIA]
- No saludes
- No inventes datos
- Tono conciso

[MEMORIA]
Usa siempre el contexto: {historial}

[ENTRADA]
consulta: {mensaje}

respuesta:
"""

prompt = PromptTemplate(
    input_variables=["rol", "mensaje", "historial"],
    template=Prompt_estructura.strip()
)`} 
          </p>
        </>
      ),
    },
    {
      key: 'memory',
      name: 'Memoria por Usuario',
      icon: FaMemory,
      content: (
        <>
          <p>
            Se implementa <span className="font-bold">ConversationBufferMemory</span> para cada usuario.
            Esto permite que el LLM recuerde interacciones previas y mantenga coherencia en la conversación.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`usuarios = {}

def get_memory(user_id: str):
    if user_id not in usuarios:
        usuarios[user_id] = ConversationBufferMemory(
            memory_key="historial",
            input_key="mensaje"
        )
    return usuarios[user_id]`} 
          </p>
          <p>
            Cada usuario obtiene su propio historial, lo que permite múltiples sesiones independientes.
          </p>
        </>
      ),
    },
    {
      key: 'estado',
      name: 'Estado Global',
      icon: FaUserCog,
      content: (
        <>
          <p>
            Se define un <span className="font-bold">TypedDict</span> para estructurar el estado: mensaje actual, rol, historial y respuesta.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`class State(TypedDict):
    mensaje: str
    rol: str
    historial: str
    respuesta: str`} 
          </p>
          <p>
            Esto estandariza la información que cada nodo del grafo recibe y devuelve.
          </p>
        </>
      ),
    },
    {
      key: 'agente',
      name: 'Nodo Principal (Agente)',
      icon: FaNetworkWired,
      content: (
        <>
          <p>
            El nodo principal toma el estado, obtiene la memoria del usuario y construye el prompt para enviar al LLM.
            Después guarda la respuesta en la memoria y actualiza el estado.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def agente_node(state: State) -> State:
    memory = get_memory(state.get("user_id","default"))
    historial = memory.load_memory_variables({}).get("historial","")
    
    texto_prompt = prompt.format(
        rol=state["rol"],
        mensaje=state["mensaje"],
        historial=historial
    )
    respuesta = llm.invoke(texto_prompt).content
    
    memory.save_context({"mensaje": state["mensaje"]}, {"respuesta": respuesta})
    
    state["respuesta"] = respuesta
    state["historial"] = historial
    return state`} 
          </p>
        </>
      ),
    },
    {
      key: 'grafo',
      name: 'Construcción del Grafo',
      icon: FaTerminal,
      content: (
        <>
          <p>
            Se crea el grafo de estados usando <span className="font-bold">StateGraph</span>.
            Se agrega un nodo, se define punto de entrada y se conecta al final.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`workflow = StateGraph(State)
workflow.add_node("agente", agente_node)
workflow.set_entry_point("agente")
workflow.add_edge("agente", END)
app = workflow.compile()`} 
          </p>
        </>
      ),
    },
    {
      key: 'cli',
      name: 'CLI Interactiva y Roles',
      icon: FaTerminal,
      content: (
        <>
          <p>
            Se genera un ID aleatorio de usuario y se inicia un bucle donde el usuario puede interactuar con el LLM.
            También se pueden cambiar roles dinámicamente usando comandos como <code>/rol auditor</code>.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`roles = {
    "auditor": "actua como un auditor empresarial...",
    "desarrollador": "explica con detalle técnico...",
    "vendedor": "vende software con mala técnica..."
}

user_id = str(random.randint(10000,90000))
rol = "auditor"

while True:
    user_input = input("Tu: ")
    if user_input.lower() == "salir":
        break
    if user_input.startswith("/rol "):
        nuevo_rol = user_input.split("/rol ",1)[1].lower().strip()
        if nuevo_rol in roles:
            rol = nuevo_rol
            print(f"✅ tu nuevo rol es {nuevo_rol}")
        else:
            print("⚠️ rol no disponible")
        continue

    result = app.invoke({"mensaje": user_input,"rol":rol,"historial":"","user_id":user_id})
    print("LLM:", result["respuesta"])
    print("📝 memoria:", get_memory(user_id).load_memory_variables({}))`} 
          </p>
        </>
      ),
    },
  ];

  const current = nodes.find(node => node.key === activeTab);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 bg-gray-50">
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-10 p-6 sm:p-12 ring-1 ring-black/10 shadow-xl rounded-3xl bg-white">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-black text-center px-4"
        >
          Script LangGraph + LangChain + Groq: Memoria y Nodos
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada tab representa un nodo conceptual del flujo con memoria contextual
        </motion.h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {nodes.map(node => {
            const Icon = node.icon;
            const isActive = activeTab === node.key;
            return (
              <button
                key={node.key}
                onClick={() => setActiveTab(node.key)}
                className={`relative group overflow-hidden px-4 py-2 rounded-full border transition-all flex items-center gap-2
                  ${isActive
                    ? 'bg-orange-500 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`text-xl transition-colors ${isActive ? 'text-white' : 'text-orange-500'}`} />
                  <span className="font-medium">{node.name}</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </button>
            );
          })}
        </div>

        {/* Contenido dinámico */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 text-left"
          >
            <h3 className="text-2xl font-semibold text-black text-center mb-6">{current.name}</h3>
            <div className="text-gray-800 text-base sm:text-lg leading-relaxed text-justify whitespace-pre-line">
              {current.content}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
