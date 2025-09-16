
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ChatSeccion() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 bg-gray-50">
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-8 p-10 ring-1 ring-black/10 shadow-xl rounded-3xl bg-white">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src="/logo2.png" // 🔹 Asegúrate de tener tu logo en public/logo.png
            alt="Logo GLY College"
            width={180}
            height={180}
            className="rounded-full shadow-lg"
          />
        </motion.div>

        {/* Mensaje */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-black"
        >
          🚀 Próximamente disponible
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-lg text-gray-600 max-w-xl"
        >
          Estamos preparando el <span className="font-semibold">Asistente de Aprendizaje con IA</span> 
          para que estudies más cómodo y con el apoyo de la tecnología. 
          Muy pronto estará disponible en GLY College.
        </motion.p>
      </div>
    </section>
  );
}
