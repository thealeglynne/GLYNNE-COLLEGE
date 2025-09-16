'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion } from 'framer-motion'

export default function ChatGroqTutorial() {
  const [activeTab, setActiveTab] = useState('codigo')

  const scriptCode = `
# Definición del prompt con roles y estructura
Prompt_estruccture = """
[META]
Tu meta es analizar el negocio del usuario y generar un diagnóstico sobre cómo la IA
puede mejorar el crecimiento empresarial, explicando como si fueras un {rol} profesional.

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

promot_template = PromptTemplate(
    user_input=['rol', 'mensaje'],
    template=Prompt_estruccture.strip()
)
`

  const explanation = `
Este script demuestra cómo podemos darle personalidad a un agente de IA mediante la edición estratégica de prompts.

1. **Anatomía del prompt:** El bloque de texto en Prompt_estruccture define el comportamiento del agente, incluyendo meta, formato de respuesta, advertencias y entrada del usuario. Modificando estas secciones puedes cambiar el estilo, tono y profesionalismo del agente.

2. **Roles:** Al permitir un parámetro {rol}, el mismo script adapta la respuesta a diferentes perspectivas (auditor, desarrollador, vendedor). Esto es clave para dar personalidad y estilo contextual al agente.

3. **Consistencia y control:** Las advertencias dentro del prompt (no saludar, no inventar datos, tono corporativo) aseguran que el agente siga reglas coherentes, evitando respuestas inconsistentes o improvisadas.

4. **Loop de interacción:** La función chat junto con el while loop permite que el agente reciba entradas y genere respuestas dinámicas, simulando un diálogo continuo y profesional.

5. **Aplicación práctica:** Al modificar el prompt, puedes crear distintos "personajes" de agentes, cada uno con personalidad y estilo único, permitiendo que la IA se comporte de forma coherente y estratégica según el contexto de negocio.

En resumen, este código es una base para experimentar con prompts dinámicos, permitiendo que un principiante comprenda cómo configurar la personalidad de un agente y cómo escalarlo a interacciones más complejas.
`

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Contenedor Código */}
      <div className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[500px] overflow-auto shadow-md">
        <h3 className="text-lg font-bold mb-2 text-orange-500">Código de ejemplo</h3>
        <SyntaxHighlighter
          language="python"
          style={oneLight}
          wrapLines
          showLineNumbers
          customStyle={{ fontSize: '0.875rem', backgroundColor: '#ffffff' }}
          lineProps={{ style: { wordBreak: 'break-word', whiteSpace: 'pre-wrap' } }}
          codeTagProps={{
            style: { fontFamily: 'Fira Code, monospace', color: '#000' },
          }}
        >
          {scriptCode}
        </SyntaxHighlighter>
      </div>

      {/* Contenedor Explicación */}
      <div className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[500px] overflow-auto shadow-md">
        <h3 className="text-lg font-bold mb-2 text-orange-500">Explicación detallada</h3>
        <p className="text-gray-800 whitespace-pre-line">{explanation}</p>
      </div>
    </div>
  )
}
