'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { getCurrentUser, subscribeToAuthState } from '../../lib/supabaseClient';

export default function ChatSeccion() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [empresaInfo, setEmpresaInfo] = useState({ nombreEmpresa: '', rol: '' });
  const [welcomeSent, setWelcomeSent] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(0);
  const messagesEndRef = useRef(null);

  const API_URL = 'https://gly-ai-brain.onrender.com';
  const REQUEST_TIMEOUT = 40000;

  // 🔹 Preguntas frecuentes
  const questions = [
    "¿Qué función cumple 'import os' en este script?",
    "¿Para qué sirve la librería dotenv y por qué uso load_dotenv()?",
    "¿Qué es una API key y por qué es necesario cargarla desde .env?",
    "¿Qué pasaría si no configuro la variable GROQ_API_KEY en el .env?",
    "¿Qué es ChatGroq y en qué se diferencia de otros modelos de LangChain?",
    "¿Por qué se usa el modelo llama3-70b-8192 y qué significa ese nombre?",
    "¿Qué hace el parámetro temperature=0.5?",
    "¿Podría cambiar el valor de temperature para hacer las respuestas más creativas?",
    "¿Qué es exactamente un PromptTemplate en LangChain?",
    "¿Por qué en PromptTemplate se define input_variables=['mensaje']?",
    "¿Qué importancia tiene el bloque META, FORMATO RESPUESTA y ADVERTENCIA dentro del prompt?",
    "¿Por qué usamos prompt_template.format en lugar de concatenar texto directamente?",
    "¿Qué devuelve realmente llm.invoke(prompt)?",
    "¿Por qué en la función chat() se usa respuesta.content?",
    "¿Qué pasa si el modelo no devuelve content?",
    "¿Cómo funciona el while True en el loop principal?",
    "¿Por qué se evalúa if user_input.lower() == 'salir': break?",
    "¿Cómo puedo probar este script en mi terminal paso a paso?",
    "¿Qué diferencia habría si lo conecto a una API con FastAPI o Flask?",
    "¿Cómo puedo extender este código para guardar las conversaciones en una base de datos?"
  ];

  // 🔹 Cambiar lote de preguntas cada 6 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatch((prev) => (prev + 1) % Math.ceil(questions.length / 6));
    }, 6 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQuestions = questions.slice(currentBatch * 6, (currentBatch + 1) * 6);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();

    const subscription = subscribeToAuthState((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe?.();
  }, []);

  useEffect(() => {
    if (!welcomeSent) {
      setMessages([
        {
          from: 'ia',
          text: '👋 ¡Bienvenido! Aquí puedes preguntarme lo que quieras sobre tu proceso de aprendizaje en este módulo.'
        },
      ]);
      setWelcomeSent(true);
    }
  }, [welcomeSent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendRequest = async (query) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(`${API_URL}/gpt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        rol: 'Tutor',
        temperatura: 0.7,
        estilo: 'Amigable',
        config: empresaInfo,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    return await response.json();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await sendRequest(input);
      const respuesta = data.respuesta || data.message || 'No se pudo procesar la respuesta';
      setMessages((prev) => [...prev, { from: 'ia', text: respuesta }]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: 'ia', text: `⚠️ ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 bg-gray-50">
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-8 p-6 sm:p-12 ring-1 ring-black/10 shadow-xl rounded-3xl bg-white">

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-black text-center px-4"
        >
          Asistente de Aprendizaje con GLY-IA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-semibold text-gray-700 text-center max-w-2xl"
        >
          Consulta libremente tus dudas sobre el contenido del módulo y recibe explicaciones claras en tiempo real.
        </motion.p>

        {/* 🔹 Preguntas sugeridas en GRID responsive */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {currentQuestions.map((q, i) => (
            <p
              key={i}
              onClick={() => setInput(q)}
              className="cursor-pointer text-base text-gray-800 hover:underline text-center"
            >
              {q}
            </p>
          ))}
        </div>

        {/* Contenedor del chat */}
        <div className="w-full bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 flex flex-col max-h-[70vh]">
          
          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 text-sm shadow-md whitespace-pre-wrap rounded-lg ${
                      msg.from === 'ia'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-white text-black border border-gray-300'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages.length > 0 && (
                <div className="text-xs text-gray-400">Pensando...</div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-200 pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu consulta..."
              className="flex-1 text-sm px-3 py-2 border border-gray-300 focus:outline-none rounded-lg text-black"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-black text-white p-2 rounded-lg hover:bg-gray-800"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}