'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMemory, FaKey, FaCogs, FaRobot, FaTerminal } from 'react-icons/fa';

export default function ChatGroqMemoryExplained() {
  const [activeTab, setActiveTab] = useState('inicio');

  const nodes = [
    {
      key: 'inicio',
      name: 'Carga e Imports',
      icon: FaKey,
      content: (
        <>
          <p>
            El script inicia importando librerías esenciales: 
            <span className="font-bold"> os</span> para variables de entorno, 
            <span className="font-bold"> dotenv</span> para leer el archivo <code>.env</code>, 
            <span className="font-bold">random</span> para generar IDs de usuario, y módulos de 
            <span className="font-bold"> LangChain</span> y <span className="font-bold">Groq</span>.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`import os
from dotenv import load_dotenv
import random
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain`}
          </p>
          <p>
            Estas librerías forman la base para crear un modelo con memoria contextual.
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
            Se usa <span className="font-bold">dotenv</span> para cargar la clave desde el archivo <code>.env</code>. 
            Esto garantiza que el modelo se pueda conectar al LLM sin exponer la API.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`load_dotenv()
api_key = os.getenv('GROQ_API_KEY')
if not api_key:
    raise ValueError('en el .env no hay una api valida')`}
          </p>
        </>
      ),
    },
    {
      key: 'llm',
      name: 'Configurar el LLM',
      icon: FaRobot,
      content: (
        <>
          <p>
            Se inicializa <span className="font-bold">ChatGroq</span> con un modelo potente y controlado, que será capaz de responder manteniendo coherencia gracias a la memoria.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`llm = ChatGroq(
    model='llama3-70b-8192',
    api_key=api_key,
    temperature=0.4
)`}
          </p>
        </>
      ),
    },
    {
      key: 'memory',
      name: 'Memoria de Conversación',
      icon: FaMemory,
      content: (
        <>
          <p>
            <strong>La memoria es el corazón del script:</strong> sin ella, el modelo trataría cada mensaje como aislado y perdería contexto. Aquí se crea la memoria que guarda el historial de conversación.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`memory = ConversationBufferMemory(
    memory_key='historial',
    input_key='mensaje'
)`}
          </p>
          <p>
            Esto permite:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Mantener coherencia entre respuestas.</li>
            <li>Que el modelo recuerde instrucciones y contexto previos.</li>
            <li>Permitir un diagnóstico progresivo y útil en cada interacción.</li>
          </ul>
        </>
      ),
    },
    {
      key: 'prompttemplate',
      name: 'Conectar Memoria al Prompt',
      icon: FaTerminal,
      content: (
        <>
          <p>
            Se usa <span className="font-bold">PromptTemplate</span> para integrar la memoria en la respuesta del modelo. El prompt incorpora la variable <code>{'{historial}'}</code>, que mantiene la continuidad.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`prompt = PromptTemplate(
    input_variables=['rol','mensaje','historial'],
    template=Prompt_estruccture.strip()
)`}
          </p>
          <p>
            Así, cada respuesta considera lo que se ha conversado previamente.
          </p>
        </>
      ),
    },
    {
      key: 'loop',
      name: 'Bucle de Interacción',
      icon: FaTerminal,
      content: (
        <>
          <p>
            El script permite interactuar de forma continua. Cada input del usuario se envía al modelo y se guarda en la memoria, garantizando coherencia entre preguntas y respuestas.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`while True:
    user_input = input('Tu ')
    if user_input.lower() == 'salir':
        break
    respuesta = chain.run(rol=rol, mensaje=user_input)
    print(respuesta)
    print(chain.memory.load_memory_variables({}))`}
          </p>
          <p>
            Esto demuestra cómo la memoria transforma un LLM aislado en un <strong>asesor que recuerda, aprende y mantiene contexto</strong>.
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
          Script LangChain + Groq: Enfoque en Memoria
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada botón explica cómo la memoria potencia la utilidad del modelo
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
