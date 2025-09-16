'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaKey, FaCogs, FaFileAlt, FaRobot, FaPlay, FaUsers, FaTerminal, FaRandom } from 'react-icons/fa';

export default function ChatGroqExplained() {
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
            <span className="font-bold">random</span> para IDs de usuario, y módulos de 
            <span className="font-bold"> LangChain</span> y <span className="font-bold">Groq</span>.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`import os
from dotenv import load_dotenv
import random
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain`}
          </p>
          <p>
            Esta es la base para crear un asistente con roles dinámicos.
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
            Si no existe, el programa se detiene con un error.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`load_dotenv()
api_key = os.getenv('GROQ_API_KEY')
if not api_key:
    raise ValueError('en el .env no hay una api valida')`}
          </p>
          <p>
            Esto asegura seguridad: nunca se expone la API directamente en el código.
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
            Se inicializa <span className="font-bold">ChatGroq</span> con el modelo 
            <code>llama3-70b-8192</code> y un <code>temperature=0.4</code> para mantener
            respuestas controladas y profesionales.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`llm = ChatGroq(
    model='llama3-70b-8192',
    api_key=api_key,
    temperature=0.4
)`}
          </p>
          <p>
            Este modelo es el motor central de todo el sistema.
          </p>
        </>
      ),
    },
    {
      key: 'prompt',
      name: 'Estructura del Prompt',
      icon: FaFileAlt,
      content: (
        <>
          <p>
            Se define un <span className="font-bold">prompt estructurado</span> que dicta cómo responde el modelo:
            incluye la meta, formato, advertencias y la consulta del usuario.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`Prompt_estruccture = """
[META]
Analiza el negocio del usuario y genera un diagnóstico como si fueras un {rol}.

[FORMATO RESPUESTA]
Clara, concisa, no más de 100 palabras.

[ADVERTENCIA]
No saludes.
No inventes datos.
Tono corporativo.

[ENTRADA DEL USUARIO]
consulta: {mensaje}

respuesta:
"""`}
          </p>
          <p>
            Este bloque controla la personalidad y estilo de las respuestas.
          </p>
        </>
      ),
    },
    {
      key: 'prompttemplate',
      name: 'Uso de PromptTemplate',
      icon: FaPlay,
      content: (
        <>
          <p>
            <span className="font-bold">PromptTemplate</span> conecta la plantilla anterior con el modelo.
            Aquí se definen las variables dinámicas <code>{`{rol}`}</code> y <code>{`{mensaje}`}</code>.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`prompt = PromptTemplate(
    input_variables=['rol','mensaje'],
    template=Prompt_estruccture.strip()
)`}
          </p>
          <p>
            Así el mismo prompt puede adaptarse a diferentes roles y entradas.
          </p>
        </>
      ),
    },
    {
      key: 'roles',
      name: 'Definir Roles',
      icon: FaUsers,
      content: (
        <>
          <p>
            Se definen <span className="font-bold">tres roles</span> que alteran la personalidad de la IA:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <span className="font-bold">Auditor:</span> análisis empresarial y estrategias de crecimiento.
            </li>
            <li>
              <span className="font-bold">Desarrollador:</span> explicaciones técnicas sobre integración y software.
            </li>
            <li>
              <span className="font-bold">Vendedor:</span> discurso de ventas con mala técnica, casi sarcástico.
            </li>
          </ul>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`roles = {
  'auditor': 'actua como un auditor empresarial...',
  'desarrollador': 'responde de forma técnica...',
  'vendedor': 'vende software con mala técnica...'
}`}
          </p>
          <p>
            Esto permite simular múltiples personalidades con un solo script.
          </p>
        </>
      ),
    },
    {
      key: 'userid',
      name: 'Generar User ID',
      icon: FaRandom,
      content: (
        <>
          <p>
            Se crea un ID aleatorio para cada sesión de usuario, garantizando que cada conversación
            sea única e independiente.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`user_id = str(random.randint(10000,90000))
print(f"tu user id es {user_id}")`}
          </p>
          <p>
            Esto simula un identificador de cliente en un sistema real.
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
            El programa entra en un <span className="font-bold">loop</span> que:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Toma la entrada del usuario.</li>
            <li>Permite cambiar de rol escribiendo <code>/rol auditor</code>, <code>/rol desarrollador</code>, etc.</li>
            <li>Envía el mensaje al modelo y recibe la respuesta.</li>
          </ul>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`while True:
    user_input = input('Tu ')
    if user_input.lower() == 'salir':
        break
    if user_input.startswith('/rol '):
        nuevo_rol = user_input.split('/rol ', 1)[1]
        # cambia el rol dinámicamente
        continue
    respuesta = chain.run(rol=rol, mensaje=user_input)
    print(respuesta)`}
          </p>
          <p>
            Esto convierte el script en un chat interactivo controlado desde la terminal.
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
          Explicación paso a paso del Script con LangChain + Groq
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada botón corresponde a una parte desfragmentada del código
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
