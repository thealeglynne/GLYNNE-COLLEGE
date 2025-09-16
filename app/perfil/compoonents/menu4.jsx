'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import '../../globals.css'
import { div } from "framer-motion/client";

const videos = [
  {
    slug: "cap1-hazla-pensar",
    title: "Cap 1 — Hazla pensar",
    duration: "26:11",
    description: "Crea tu primer agente que razona y responde con inteligencia real.",
    date: "25 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/86/47/23/864723b34b783673ea5765830efac4b8.jpg"
  },
  {
    slug: "cap2-personalidad-real",
    title: "Cap 2 — Dale personalidad",
    duration: "12:31",
    description: "Tu agente con voz, carácter y estilo propio en cada interacción.",
    date: "26 ago 2025",
    thumbnail:"https://i.pinimg.com/736x/97/00/dc/9700dc8f4d02db9e8e1af7a0e50ae79b.jpg"
  },
  {
    slug: "cap3-roles-multiples",
    title: "Cap 3 — Roles múltiples",
    duration: "27:25",
    description: "Auditor, desarrollador o vendedor: un agente que cambia de rol al instante.",
    date: "27 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/4f/02/86/4f0286800141f465383ce19d0e7e8b17.jpg"
  },
  {
    slug: "cap4-memoria-personalidad",
    title: "Cap 4 — Memoria viva",
    duration: "34:11",
    description: "Recuerda interacciones, adapta estilo y evoluciona con el usuario.",
    date: "29 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/d4/ec/9b/d4ec9be7ac936c97dfa4df40895ee29e.jpg"
  },
  {
    slug: "cap5-nodos-dinamicos",
    title: "Cap 5 — Nodos inteligentes",
    duration: "54:24",
    description: "Diseña nodos que comunican, aprenden y mantienen la memoria de tu agente.",
    date: "1 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/bb/64/6c/bb646cb7f3f3da6d4e47cd2ddfa1739d.jpg"
  },
  {
    slug: "cap6",
    title: "Cap 6 — Conexión en tiempo real",
    duration: "1:02:52",
    description: "Tu agente accede a internet y responde con información actual y precisa.",
    date: "10 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/2a/06/9b/2a069be58beb906d4feb606e94b3db22.jpg",
  },
  {
    slug: "cap7-nuevo-capitulo",
    title: "Cap 7 — Procesos automáticos",
    duration: "40:12",
    description: "Optimiza tareas empresariales con agentes que actúan de manera autónoma.",
    date: "14 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/73/9d/be/739dbeefbcd67a7b5d8177f9d22ba16c.jpg"
  },
  {
    slug: "cap8-inteligencia-contextual",
    title: "Cap 8 — Inteligencia contextual",
    duration: "38:45",
    description: "Combina memoria y búsquedas web para respuestas precisas y contextuales.",
    date: "16 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/68/0c/44/680c445bb2342888e950278d0b130945.jpg"
  },
  {
    slug: "cap9-flujos-avanzados",
    title: "Cap 9 — Flujo maestro",
    duration: "45:30",
    description: "Integra nodos, memoria y búsquedas web para un agente completo y escalable.",
    date: "18 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/90/da/dc/90dadcf13ee2f880f4c3fadb831a3db1.jpg"
  }
];

export default function VideoCardsSection() {
  const capitulos = videos
    .filter((v) => v.slug.includes("cap"))
    .sort((a, b) => {
      const parseNum = (slug) => {
        const match = slug.match(/cap(\d+)(?:-(\d+))?/);
        const main = parseInt(match?.[1] || "0");
        const sub = parseInt(match?.[2] || "0");
        return main + sub / 10;
      };
      return parseNum(a.slug) - parseNum(b.slug);
    });

  const otros = videos.filter((v) => !v.slug.includes("cap"));

  const renderVideos = (list, isCapitulos = false) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {list.map((video) => {
        const capMatch = video.slug.match(/cap(\d+)(?:-(\d+))?/);
        const mainNum = capMatch ? capMatch[1] : null;
        const href = capMatch ? `/cap${capMatch[1]}${capMatch[2] ? '-' + capMatch[2] : ''}` : `/videos/${video.slug}`;
        const overlayText = isCapitulos ? `Módulo ${mainNum}` : null;

        return (
          <Link key={video.slug} href={href}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer flex flex-col"
            >
              <div className="relative w-full h-120 overflow-hidden">
                <motion.img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {overlayText && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <p className="text-white font-bold text-xl">{overlayText}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center text-center p-5 bg-gray-100">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-700 mb-1">{video.duration}</p>
                <p className="text-xs text-gray-500">{video.date}</p>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div>
        
    </div>
    
  );
}
