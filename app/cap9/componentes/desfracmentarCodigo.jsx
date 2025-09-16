'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMemory, FaKey, FaCogs, FaRobot, FaTerminal, FaNetworkWired, FaUserCog, FaSearch, FaClock, FaLayerGroup, FaFileCode } from 'react-icons/fa';

export default function LangGraphPythonExplained() {
  const [activeTab, setActiveTab] = useState('imports');

  const nodes = [
    {
      key: 'imports',
      name: 'Imports y Librerías',
      icon: FaKey,
      content: (
        <>
          <p>
            Se importan librerías esenciales: <strong>os</strong>, <strong>random</strong>, <strong>requests</strong> y <strong>datetime</strong> para manejo de entorno, generación de IDs, consultas web y tiempo. Además, se integran <strong>LangGraph</strong> y <strong>LangChain</strong> para nodos, agentes y prompts dinámicos.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`import os, random, requests, datetime
from dotenv import load_dotenv
from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory`}
          </p>
        </>
      ),
    },
    {
      key: 'dotenv',
      name: 'Cargar API Keys',
      icon: FaCogs,
      content: (
        <>
          <p>
            Se cargan las API keys necesarias para el LLM y búsquedas web: <strong>GROQ_API_KEY</strong> para ChatGroq y <strong>SERPER_API_KEY</strong> para consultas en la web.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
serper_api_key = os.getenv("SERPER_API_KEY")

if not api_key:
    raise ValueError("Falta la API Key de GROQ")
if not serper_api_key:
    raise ValueError("Falta la API Key de SERPER")`}
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
            Se instancia el LLM con ChatGroq, configurando modelo y temperatura. Este nodo es el **agente central**, responsable de procesar prompts integrados con memoria y resultados de búsquedas web.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=api_key,
    temperature=0.4,
)`}
          </p>
        </>
      ),
    },
    {
      key: 'prompttemplate',
      name: 'Prompt Dinámico',
      icon: FaTerminal,
      content: (
        <>
          <p>
            Se define un <strong>PromptTemplate</strong> que integra:
            <ul className="list-disc ml-6">
              <li>Contexto temporal ({'{fecha}'})</li>
              <li>Historial de conversación (memoria)</li>
              <li>Resultados de búsqueda web ({'{busqueda}'})</li>
              <li>Entrada del usuario</li>
            </ul>
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`Prompt_estructura = """
[CONTEXTO]
Hoy es {fecha}.
Tienes acceso a memoria y resultados de búsqueda web.
Responde de forma natural y conversacional.

[BUSQUEDA WEB]
{busqueda}

[MEMORIA]
{historial}

[ENTRADA DEL USUARIO]
Consulta: {mensaje}

[RESPUESTA COMO {rol}]
"""

prompt = PromptTemplate(
    input_variables=["rol","mensaje","historial","busqueda","fecha"],
    template=Prompt_estructura.strip()
)`}
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
            El <strong>TypedDict State</strong> define el estado de cada interacción: mensaje, rol, historial, búsqueda, respuesta y user_id. Esto permite que cada nodo lea y actualice la información centralizada.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`class State(TypedDict):
    mensaje: str
    rol: str
    historial: str
    respuesta: str
    busqueda: str
    user_id: str`}
          </p>
        </>
      ),
    },
    {
      key: 'memory',
      name: 'Memoria de Usuario',
      icon: FaMemory,
      content: (
        <>
          <p>
            Cada usuario tiene su historial con <strong>ConversationBufferMemory</strong>. Esto permite que el agente recuerde interacciones pasadas y genere respuestas contextuales.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`usuarios = {}

def get_memory(user_id: str):
    if user_id not in usuarios:
        usuarios[user_id] = ConversationBufferMemory(
            memory_key="historial",
            input_key="mensaje"
        )
    return usuarios[user_id}`}
          </p>
        </>
      ),
    },
    {
      key: 'serper',
      name: 'Nodo de Búsqueda Serper',
      icon: FaSearch,
      content: (
        <>
          <p>
            Este nodo consulta información en tiempo real usando <strong>Serper API</strong>. Recupera los resultados más relevantes de Google, los procesa y los integra en el prompt para que la IA ofrezca respuestas actualizadas.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def serper_node(state: State) -> State:
    try:
        q = state.get("mensaje", "")
        headers = {"X-API-KEY": serper_api_key, "Content-Type": "application/json"}
        resp = requests.post("https://google.serper.dev/search", headers=headers, json={"q": q})
        data = resp.json()
        if "organic" in data and len(data["organic"])>0:
            resumen = [f"{item.get('title')} - {item.get('link','')}" for item in data["organic"][:3]]
            state["busqueda"] = " | ".join(resumen)
        else:
            state["busqueda"] = "No hubo resultados"
    except Exception as e:
        state["busqueda"] = f"Error en búsqueda: {e}"
    return state`}
          </p>
        </>
      ),
    },
    {
      key: 'agente',
      name: 'Nodo Agente Principal',
      icon: FaNetworkWired,
      content: (
        <>
          <p>
            Este nodo central integra la memoria del usuario, resultados de búsqueda y genera el prompt final para ChatGroq. Decide cuándo activar la búsqueda según palabras clave en la consulta.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def agente_node(state: State) -> State:
    memory = get_memory(state.get("user_id","default"))
    historial = memory.load_memory_variables({}).get("historial","")
    fecha = datetime.date.today().strftime("%d/%m/%Y")
    
    activar_busqueda = any(p in state["mensaje"].lower() for p in ["quién","cuándo","actual","último","presidente","hoy","noticia","última hora"])
    if activar_busqueda:
        state = serper_node(state)
    
    texto_prompt = prompt.format(
        rol=state["rol"],
        mensaje=state["mensaje"],
        historial=historial,
        busqueda=state.get("busqueda",""),
        fecha=fecha,
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
      icon: FaLayerGroup,
      content: (
        <>
          <p>
            Se construye un <strong>StateGraph</strong> que organiza los nodos, define la entrada y la finalización, permitiendo flujos modulares y escalables.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`workflow = StateGraph(State)
workflow.add_node("serper", serper_node)
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
      name: 'CLI Interactiva',
      icon: FaFileCode,
      content: (
        <>
          <p>
            Permite simular un flujo de agentes interactivos: genera un ID, cambia roles dinámicamente y ejecuta el grafo con memoria y búsquedas web.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`user_id = str(random.randint(10000,90000))
rol = "auditor"
while True:
    user_input = input("Tu: ")
    if user_input.lower() == "salir": break
    result = app.invoke({"mensaje": user_input,"rol":rol,"historial":"","busqueda":"","user_id":user_id})
    print("LLM:", result["respuesta"])`}
          </p>
        </>
      ),
    },
    {
      key: 'rol',
      name: 'Roles Dinámicos',
      icon: FaUserCog,
      content: (
        <>
          <p>
            Se pueden definir roles para cambiar la perspectiva de las respuestas: auditor, desarrollador, vendedor, etc. Esto altera cómo el LLM interpreta y responde a cada consulta.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`roles = {
    "auditor": "actua como auditor empresarial",
    "desarrollador": "explica con detalle técnico",
    "vendedor": "vende software"
}

if user_input.startswith("/rol "):
    nuevo_rol = user_input.split("/rol ",1)[1].lower().strip()
    if nuevo_rol in roles:
        rol = nuevo_rol
        print(f"✅ nuevo rol: {nuevo_rol}")`}
          </p>
        </>
      ),
    },
    {
      key: 'debug',
      name: 'Debug y Logs',
      icon: FaClock,
      content: (
        <>
          <p>
            Se imprimen resultados de búsqueda y memoria para depuración, lo que permite auditar el comportamiento del agente en tiempo real.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`print("DEBUG búsqueda:", state["busqueda"])
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
          Script Python LangGraph + LangChain + Groq: Nodos y Agentes
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada tab representa un nodo conceptual del flujo con memoria, búsqueda web y roles
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
                  ${isActive ? 'bg-orange-500 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
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
