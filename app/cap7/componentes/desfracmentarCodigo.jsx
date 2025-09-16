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
            El script inicia cargando librerías esenciales para el flujo de nodos y agentes:
            <span className="font-bold"> os</span> y <span className="font-bold">dotenv</span> para manejar variables de entorno,
            <span className="font-bold"> random</span> para generar IDs de usuario,
            <span className="font-bold">requests</span> y <span className="font-bold">datetime</span> para consultas web y manejo temporal.
            También se integran <span className="font-bold">LangGraph</span> y <span className="font-bold">LangChain</span> para estructurar agentes con memoria y prompts dinámicos.
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
            Se cargan las claves de API necesarias para el LLM y las búsquedas web:
            <span className="font-bold">GROQ_API_KEY</span> para ChatGroq y
            <span className="font-bold">SERPER_API_KEY</span> para consultas en la web.
            Esto garantiza que cada agente pueda actuar de forma segura y conectarse a fuentes externas.
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
            Se instancia el LLM con ChatGroq, configurando modelo y temperatura.
            Este nodo actúa como **agente central**, procesando prompts integrados con memoria y resultados de búsquedas web.
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
            Se define un <span className="font-bold">PromptTemplate</span> que integra:
            <ul className="list-disc ml-6">
              <li>Contexto temporal ({'{fecha}'})</li>
              <li>Historial de conversación (memoria por usuario)</li>
              <li>Resultados de búsqueda web ({'{busqueda}'})</li>
              <li>Entrada del usuario</li>
            </ul>
            Este nodo garantiza que cada respuesta del agente sea coherente, natural y adaptada a información externa.
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
      key: 'memory',
      name: 'Memoria por Usuario',
      icon: FaMemory,
      content: (
        <>
          <p>
            Cada usuario tiene su propio historial mediante <span className="font-bold">ConversationBufferMemory</span>.
            Este nodo de memoria permite que los agentes recuerden interacciones previas y respondan con contexto completo.
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
      key: 'estado',
      name: 'Estado Global',
      icon: FaUserCog,
      content: (
        <>
          <p>
            Se define un <span className="font-bold">TypedDict</span> que representa el estado de cada nodo/agente:
            mensaje, rol, historial, respuesta, búsqueda y user_id.
            Cada nodo puede acceder y actualizar este estado de manera estandarizada.
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
      key: 'agente',
      name: 'Nodo Principal (Agente)',
      icon: FaNetworkWired,
      content: (
        <>
          <p>
            Este nodo central del grafo:
            <ul className="list-disc ml-6">
              <li>Obtiene la memoria del usuario</li>
              <li>Integra resultados de búsqueda web</li>
              <li>Genera el prompt dinámico para el LLM</li>
              <li>Guarda la respuesta y actualiza el estado</li>
            </ul>
            Así, cada interacción se comporta como un flujo de nodos conectados, con capacidad de reacción a información externa.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def agente_node(state: State) -> State:
    memory = get_memory(state.get("user_id","default"))
    historial = memory.load_memory_variables({}).get("historial","")
    
    texto_prompt = prompt.format(
        rol=state["rol"],
        mensaje=state["mensaje"],
        historial=historial,
        busqueda=state.get("busqueda",""),
        fecha=str(datetime.datetime.now().date())
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
            Se construye un <span className="font-bold">StateGraph</span> que organiza los nodos:
            define entrada, nodos principales y flujo de finalización.
            Este grafo permite que agentes y nodos interactúen en un flujo controlado y modular.
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
            Simula un flujo de agentes interactivos:
            <ul className="list-disc ml-6">
              <li>Genera un ID de usuario</li>
              <li>Permite cambiar roles dinámicamente</li>
              <li>Invoca el grafo de nodos con memoria y búsquedas web</li>
            </ul>
            Esto permite probar la interacción de nodos y agentes en tiempo real.
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

    # Invoca el grafo con el estado actual
    result = app.invoke({
        "mensaje": user_input,
        "rol": rol,
        "historial": "",
        "busqueda": "", 
        "user_id": user_id
    })
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
          Script LangGraph + LangChain + Groq: Agentes, Nodos y Web Search
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada tab representa un nodo conceptual del flujo con memoria y búsqueda web
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
