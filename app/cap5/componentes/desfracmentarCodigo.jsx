'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMemory, FaCogs, FaRobot, FaTerminal } from 'react-icons/fa';

export default function ChatGroqLangGraphExplained() {
  const [activeTab, setActiveTab] = useState('estado');

  const nodes = [
    {
      key: 'estado',
      name: 'Clase State y LangGraph',
      icon: FaTerminal,
      content: (
        <>
          <p>
            En este fragmento se define la clase <span className="font-bold">State</span> usando <code>TypedDict</code>. 
            Esto es fundamental para <strong>tipar de manera estricta el estado que recorrerá cada nodo del grafo</strong>.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`class State(TypedDict):
    mensaje: str
    rol: str
    historial: str
    respuesta: str`}
          </p>
          <p className="mt-4">
            <strong>Desglose de los campos:</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><span className="font-bold">mensaje:</span> Contiene el input actual del usuario. Cada nodo puede acceder a este mensaje para generar respuestas.</li>
            <li><span className="font-bold">rol:</span> Define el “rol profesional” con el que el modelo responderá (auditor, desarrollador, vendedor...). Influye directamente en el prompt.</li>
            <li><span className="font-bold">historial:</span> Contiene toda la memoria de la conversación hasta ese momento, proveniente de <code>ConversationBufferMemory</code>. Cada nodo la utiliza para mantener contexto y coherencia.</li>
            <li><span className="font-bold">respuesta:</span> Almacena la salida generada por el LLM después de ejecutar el nodo. Puede ser reutilizada por otros nodos o para mostrarla al usuario.</li>
          </ul>

          <p className="mt-4">
            Una vez definida la estructura del estado, se construye el grafo con <span className="font-bold">LangGraph</span>:
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`workflow = StateGraph(State)
workflow.add_node("agente", agente_node)
workflow.set_entry_point("agente")
workflow.add_edge("agente", END)
app = workflow.compile()`}
          </p>

          <p className="mt-4">
            <strong>Explicación línea por línea:</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <span className="font-bold">StateGraph(State):</span> Se crea un grafo de estados que sabe qué estructura tendrá cada nodo gracias a la clase <code>State</code>.
            </li>
            <li>
              <span className="font-bold">add_node("agente", agente_node):</span> Se agrega un nodo llamado "agente", que ejecutará la función <code>agente_node</code>. Cada nodo recibe y devuelve un <code>State</code>.
            </li>
            <li>
              <span className="font-bold">set_entry_point("agente"):</span> Define el nodo inicial del flujo. Todos los inputs del usuario empezarán en este nodo.
            </li>
            <li>
              <span className="font-bold">add_edge("agente", END):</span> Conecta el nodo "agente" con el estado final del grafo (<code>END</code>), indicando que después de procesar, el flujo puede terminar o pasar a otro nodo si se define.
            </li>
            <li>
              <span className="font-bold">compile():</span> Genera una versión ejecutable del grafo, que podemos invocar con <code>app.invoke()</code>, pasando un estado inicial.
            </li>
          </ul>

          <p className="mt-4">
            🔹 <strong>Concepto clave:</strong> Cada nodo en LangGraph recibe un <code>State</code> (mensaje, rol, historial, respuesta), ejecuta lógica (como llamar a un LLM con memoria), y devuelve un nuevo <code>State</code>. Esto permite construir flujos de conversación complejos, modulares y con memoria persistente.
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
          Clase State y LangGraph
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cómo cada nodo procesa estado y memoria
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
