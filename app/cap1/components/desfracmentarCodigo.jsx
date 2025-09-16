'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaKey,
  FaCogs,
  FaFileAlt,
  FaRobot,
  FaPlay,
} from 'react-icons/fa';

export default function ChatGroqExplained() {
  const [activeTab, setActiveTab] = useState('cargar_api');

  const nodes = [
    {
      key: 'cargar_api',
      name: 'Carga de API Key',
      icon: FaKey,
      content: (
        <>
          <p>
            Este bloque carga la clave de acceso a la API de Groq desde un archivo <code className="text-orange-500 font-mono bg-gray-100 px-1 rounded">.env</code> utilizando 'dotenv'. 
            Es fundamental para autenticar solicitudes y proteger tus credenciales.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`load_dotenv()
api_key = os.getenv('GROQ_API_KEY')
if not api_key:
    raise ValueError("No hay una API key en el .env")`}
          </p>
          <p>Este paso asegura que tu LLM pueda conectarse a Groq de forma segura y confiable.</p>
        </>
      ),
    },
    {
      key: 'inicializar_llm',
      name: 'Inicialización del LLM',
      icon: FaCogs,
      content: (
        <>
          <p>
            Aquí se instancia el modelo ChatGroq con el nombre del modelo, tu API key y la temperatura de respuesta. 
            La temperatura controla la creatividad del LLM (0.5 es un equilibrio entre precisión y creatividad).
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`llm = ChatGroq(
    model='llama3-70b-8192',
    api_key=api_key,
    temperature=0.5
)`}
          </p>
          <p>Este nodo es esencial para preparar al agente antes de recibir consultas del usuario.</p>
        </>
      ),
    },
    {
      key: 'prompt_template',
      name: 'Definición del Prompt Template',
      icon: FaFileAlt,
      content: (
        <>
          <p>
            Se define la estructura del prompt que se enviará al LLM. Incluye metadatos, formato de respuesta y advertencias, asegurando consistencia y profesionalismo.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`PROMPT_STRUCTURE = """
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
)`}
          </p>
          <p>Este nodo garantiza que la salida sea coherente y útil para decisiones empresariales.</p>
        </>
      ),
    },
    {
      key: 'funcion_chat',
      name: 'Función de Chat',
      icon: FaRobot,
      content: (
        <>
          <p>Define la función que toma la entrada del usuario, genera el prompt y llama al LLM. También maneja la extracción segura del contenido de respuesta.</p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`def chat(mensaje):
    prompt = prompt_template.format(mensaje=mensaje)
    respuesta = llm.invoke(prompt)
    return respuesta.content if hasattr(respuesta, 'content') else str(respuesta)`}
          </p>
          <p>Este nodo es la puerta de interacción entre el usuario y la IA.</p>
        </>
      ),
    },
    {
      key: 'loop_principal',
      name: 'Loop Principal de Interacción',
      icon: FaPlay,
      content: (
        <>
          <p>
            El bucle principal mantiene el chat en ejecución hasta que el usuario escriba 'salir'. Permite conversaciones dinámicas y continuas con el LLM.
          </p>
          <p className="mt-2 font-mono text-orange-500 bg-gray-100 p-3 rounded overflow-x-auto">
{`if __name__ == '__main__':
    print('LLM INICIADO')
    
    while True:
        user_input = input('Tu: ')
        if user_input.lower() == 'salir':
            break
        print('LLM:', chat(user_input))`}
          </p>
          <p>Este nodo asegura que la aplicación funcione en tiempo real y sea interactiva.</p>
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
          Explicación Detallada del Script ChatGroq
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-orange-600 text-center"
        >
          Cada nodo corresponde a un bloque funcional del script
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
