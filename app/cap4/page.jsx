'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Video from './componentes/video'
import Main1 from './componentes/main1'
import Header from './componentes/header'
import ChatGroqTutorial from './componentes/scriptejm'
import ChatGroqExplained from './componentes/desfracmentarCodigo'
import Chat from '../../app/perfil/compoonents/ChatLLM'
import Documentacion from './componentes/documentacion'

export default function Cap2Page() {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [activeTab, setActiveTab] = useState('tutorial') // 👈 controla la sección activa

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault()
      setShowConfirm(true)
      window.history.pushState(null, '', window.location.href)
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleConfirm = () => {
    setShowConfirm(false)
    router.push('/perfil')
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  return (
    <main className="w-full h-full relative">
      <Header />

      {/* Intro principal */}
      <section className="w-screen h-screen">
        <Main1 />
      </section>

      {/* Sección con video y tabs */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black text-center mb-6">
          Hazla Pensar
        </h1>

        {/* Video principal */}
        <div className="w-full max-w-7xl mb-8">
          <Video />
        </div>

        {/* Botones para navegar entre los componentes */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'tutorial'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('tutorial')}
          >
            Explicación del Script
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'chat'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            Chat GLY-IA
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'codigo'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('codigo')}
          >
            Código Detallado
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'docs'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('docs')}
          >
            Documentación
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="w-full max-w-7xl">
          {activeTab === 'tutorial' && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
                Explicación General del Script
              </h2>
              <ChatGroqTutorial />
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
                Chat Empresarial con GLY-IA
              </h2>
              <Chat />
            </div>
          )}

          {activeTab === 'codigo' && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
                Código Detallado
              </h2>
              <ChatGroqExplained />
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
                Documentación y Recursos
              </h2>
              <Documentacion />
            </div>
          )}
        </div>
      </section>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">⚠️ Salir del capítulo</h2>
            <p className="text-gray-700 mb-6">
              Estás a punto de salir del capítulo.
              <br />
              Por temas de concentración, si lo cierras tendrás que reiniciarlo
              desde el inicio.
              <br />
              ¿Deseas volver al menú?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Sí, volver al menú
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
