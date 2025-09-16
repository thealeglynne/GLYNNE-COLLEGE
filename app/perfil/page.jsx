'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalInicio from './compoonents/madalInicio';
import Main from './compoonents/main';
import Header from './compoonents/header';
import SideMenu from './compoonents/SideMenu';
import VideoCardsSection from './compoonents/menu';
import VideoCardsSection2 from './compoonents/menu2';
import VideoCardsSection3 from './compoonents/menu3';
 // import VideoCardsSection4 from './compoonents/menu4';

export default function Diagnostico() {
  const [datosEmpresa, setDatosEmpresa] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section1');

  const sections = [
    { key: 'section1', name: 'Aprende a construir agentes IA' },
    { key: 'section2', name: 'Ciencia de datos fundamental' },
    { key: 'section3', name: 'Crea tu framework Machine Learning' },
    { key: 'section4', name: 'Hora de saber cómo funciona una red neuronal' },
  ];

  return (
    <div className="relative min-h-screen bg-white flex">
      {/* Menú lateral */}
      <SideMenu isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />

      <div
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'ml-[300px]' : 'ml-0'
        }`}
      >
        {/* Header */}
        <Header onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

        <div className="flex-1 relative flex flex-col">
          {!datosEmpresa && <ModalInicio onComplete={setDatosEmpresa} />}
          <Main />

          {/* Botones estilo tabs */}
          <div className="flex flex-wrap justify-center gap-3 w-full mt-6">
            {sections.map(section => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`relative group overflow-hidden px-4 py-2 rounded-full border transition-all flex items-center gap-2
                    ${
                      isActive
                        ? 'bg-black text-white border-black'
                        : 'bg-transparent text-black border-black hover:bg-white hover:text-black'
                    }`}
                >
                  <span className="relative z-10 font-medium">{section.name}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </button>
              );
            })}
          </div>

          {/* Contenedor de cards con animación */}
          <div className="w-[90%] mx-auto mt-6">
            <AnimatePresence mode="wait">
              {activeSection === 'section1' && (
                <motion.div
                  key="section1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <VideoCardsSection />
                </motion.div>
              )}
              {activeSection === 'section2' && (
                <motion.div
                  key="section2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <VideoCardsSection2 />
                </motion.div>
              )}
              {activeSection === 'section3' && (
                <motion.div
                  key="section3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <VideoCardsSection3 />
                </motion.div>
              )}
              {activeSection === 'section4' && (
                <motion.div
                  key="section4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                {/*} <VideoCardsSection4 /> */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
