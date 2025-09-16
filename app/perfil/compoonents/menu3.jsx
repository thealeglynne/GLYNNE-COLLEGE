'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import '../../globals.css';

const videos = [
  {
    slug: "cap1-hazla-pensar",
    title: "Módulo 1 — Introducción a la Regresión Lineal",
    duration: "26:11",
    description: "Conceptos básicos, variables dependientes e independientes y cómo se relacionan.",
    date: "25 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/69/a4/39/69a439c202f1ff1489ebc44bed92b8bb.jpg"
  },
  {
    slug: "cap2-personalidad-real",
    title: "Módulo 2 — Variables y Preparación de Datos",
    duration: "12:31",
    description: "Limpieza de datos, transformación y análisis exploratorio para regresión.",
    date: "26 ago 2025",
    thumbnail:"https://i.pinimg.com/736x/9a/33/0c/9a330c976fb51ad658bce816e4161c3a.jpg"
  },
  {
    slug: "cap3-roles-multiples",
    title: "Módulo 3 — Construcción de Modelos Lineales",
    duration: "27:25",
    description: "Cómo definir ecuaciones, pesos y sesgos para modelar relaciones lineales.",
    date: "27 ago 2025",
    thumbnail: "https://i.pinimg.com/1200x/60/aa/68/60aa68be75138994d8b08648a54d302f.jpg"
  },
  {
    slug: "cap4-memoria-personalidad",
    title: "Módulo 4 — Evaluación y Métricas de Modelos",
    duration: "34:11",
    description: "Errores, R², RMSE y cómo interpretar la precisión del modelo.",
    date: "29 ago 2025",
    thumbnail: "https://i.pinimg.com/736x/84/c3/7b/84c37b4930a5d85da304d8b39ca5b06d.jpg"
  },
  {
    slug: "cap5-nodos-dinamicos",
    title: "Módulo 5 — Optimización y Ajuste de Parámetros",
    duration: "54:24",
    description: "Ajuste de coeficientes, regularización y mejora de la predicción.",
    date: "1 sept 2025",
    thumbnail: "https://i.pinimg.com/736x/bf/42/6e/bf426eef4550e9cc30ee7e154a988994.jpg"
  },
];

export default function VideoCardsSection3() {
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

        const href = capMatch
          ? `/RL${capMatch[1]}${capMatch[2] ? '-' + capMatch[2] : ''}`
          : `/videos/${video.slug}`;

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
      <h2 className="text-2xl font-bold mb-6">Capítulos de Regresión Lineal</h2>
      {renderVideos(capitulos, true)}

      {otros.length > 0 && (
        <>
          <h2 className="text-2xl font-bold my-6">Otros videos</h2>
          {renderVideos(otros)}
        </>
      )}
    </div>
  );
}
