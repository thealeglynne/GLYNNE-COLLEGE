'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import '../../globals.css'

const videos = [
  {
    slug: "cap1-hazla-pensar",
    title: "Cap 1 — Hazla pensar",
    duration: "26:11",
    description: "Crea tu primer agente que razona y responde con inteligencia real.",
    date: "25 ago 2025",
    thumbnail: "https://i.pinimg.com/1200x/d2/e1/fd/d2e1fd42e3bd9f18b48f334d4c9135f9.jpg"
  },
  {
    slug: "cap2-personalidad-real",
    title: "Cap 2 — Dale personalidad",
    duration: "12:31",
    description: "Tu agente con voz, carácter y estilo propio en cada interacción.",
    date: "26 ago 2025",
    thumbnail:"https://i.pinimg.com/736x/62/33/c3/6233c353463bee0967bd6482fbd6fe31.jpg"
  },
  {
    slug: "cap3-roles-multiples",
    title: "Cap 3 — Roles múltiples",
    duration: "27:25",
    description: "Auditor, desarrollador o vendedor: un agente que cambia de rol al instante.",
    date: "27 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/14/82/ec/1482ec973314f59e3cd0ce232d51f421.jpg"
  },
  {
    slug: "cap4-memoria-personalidad",
    title: "Cap 4 — Memoria viva",
    duration: "34:11",
    description: "Recuerda interacciones, adapta estilo y evoluciona con el usuario.",
    date: "29 ago 2025",
    thumbnail: "https://i.pinimg.com/1200x/cd/ef/e4/cdefe4b8b47c681ab0ee42abe7c9543a.jpg"
  },
  {
    slug: "cap5-nodos-dinamicos",
    title: "Cap 5 — Nodos inteligentes",
    duration: "54:24",
    description: "Diseña nodos que comunican, aprenden y mantienen la memoria de tu agente.",
    date: "1 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/45/55/7f/45557fe65b400ca294a9747d7969ed12.jpg"
  },
  {
    slug: "cap6",
    title: "Cap 6 — Conexión en tiempo real",
    duration: "1:02:52",
    description: "Tu agente accede a internet y responde con información actual y precisa.",
    date: "10 sept 2025",
    thumbnail: "https://i.pinimg.com/1200x/95/66/3e/95663ed81d940e3bf813d36fae915e62.jpg",
  },
  {
    slug: "cap7-nuevo-capitulo",
    title: "Cap 7 — Procesos automáticos",
    duration: "40:12",
    description: "Optimiza tareas empresariales con agentes que actúan de manera autónoma.",
    date: "14 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/36/e9/99/36e99905f86921b1c325ccaed00b5683.jpg"
  },
  {
    slug: "cap8-inteligencia-contextual",
    title: "Cap 8 — Inteligencia contextual",
    duration: "38:45",
    description: "Combina memoria y búsquedas web para respuestas precisas y contextuales.",
    date: "16 sept 2025",
    thumbnail: "https://i.pinimg.com/1200x/47/c3/6c/47c36c59584ee6182b2fd1329715ac6c.jpg"
  },
  {
    slug: "cap9-flujos-avanzados",
    title: "Cap 9 — Flujo maestro",
    duration: "45:30",
    description: "Integra nodos, memoria y búsquedas web para un agente completo y escalable.",
    date: "18 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/1e/5a/4e/1e5a4eb83b7a95167a476ab5330585db.jpg"
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
    <section className="p-6">
      <style jsx>{`
        .shine {
          pointer-events: none;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Primer título */}
      <div className="flex justify-center">
        <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-gray-900 text-center my-[80px] overflow-hidden">
          <span className="relative z-10">Descubre el poder de la IA aprendiendo a crearla</span>
          <span className="shine absolute inset-0"></span>
        </h2>
      </div>
      {renderVideos(otros)}
      {renderVideos(capitulos, true)}

   
    
    </section>
  );
}
