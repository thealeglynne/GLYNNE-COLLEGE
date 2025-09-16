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
    thumbnail: "https://i.pinimg.com/736x/c4/05/70/c405709a0fe02efb81531a853e442cc8.jpg"
  },
  {
    slug: "cap2-personalidad-real",
    title: "Cap 2 — Dale personalidad",
    duration: "12:31",
    description: "Tu agente con voz, carácter y estilo propio en cada interacción.",
    date: "26 ago 2025",
    thumbnail:"https://i.pinimg.com/736x/6c/36/f6/6c36f66bfc5d3afe23cc31b45377b260.jpg"
  },
  {
    slug: "cap3-roles-multiples",
    title: "Cap 3 — Roles múltiples",
    duration: "27:25",
    description: "Auditor, desarrollador o vendedor: un agente que cambia de rol al instante.",
    date: "27 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/81/da/3e/81da3e5146cd9b8abb2a9a48a5c2bf10.jpg"
  },
  {
    slug: "cap4-memoria-personalidad",
    title: "Cap 4 — Memoria viva",
    duration: "34:11",
    description: "Recuerda interacciones, adapta estilo y evoluciona con el usuario.",
    date: "29 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/ff/4d/98/ff4d98254d95e58f520021c031d5bce6.jpg"
  },
  
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

        // Cambiado a rutas dat1, dat2, etc.
        const href = capMatch ? `/dat${mainNum}${capMatch[2] ? '-' + capMatch[2] : ''}` : `/videos/${video.slug}`;
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

      <div className="flex justify-center">
        <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-gray-900 text-center my-[80px] overflow-hidden">
          <span className="relative z-10">No puede haber IA sin organizacion de datos</span>
          <span className="shine absolute inset-0"></span>
        </h2>
      </div>

      {renderVideos(otros)}
      {renderVideos(capitulos, true)}
    </section>
  );
}
