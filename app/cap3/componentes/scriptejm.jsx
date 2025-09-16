'use client'

import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatGroqTutorial() {
  const scriptCode = `
import os 
from dotenv import load_dotenv
import random
from langchain_groq import ChatGroq 
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain 

load_dotenv()
api_key = os.getenv('GROQ_API_KEY')
if not api_key:
    raise ValueError('en el .env no hay una api valida')

llm = ChatGroq(
    model = 'llama3-70b-8192',
    api_key=api_key,
    temperature=0.4
)

Prompt_estruccture  =  """
 [META]
 tu meta es analizar el negocio de el suario haccer consulta puntual 
 sobre algun contexto que necesites y poder generar un diagnostico de como la IA
 puede mejorar el crecimiento empresarial eexplicando como si fueras un {rol} 
 profsional 
 [Formato Respusta]
 la respesta tiene que ser clara en base a {rol} no mas de 100 palabras siendo profesional y ccorporatvo 
 [ADVERTENCIA]
 no quiero que saludes en cada consulta 
 no quiero que te inventes datoss 
 manten el tono de la combersacion clara y consiza 
[MEMORIA]
y a demas ten siempre en la consulta a realizar el contexto de la memoria {historial}

[ENTRADA DEL USUARIO]
consulta: {mensaje}

respuesta:
 
 """

usuario = {}

def get_chain(user_id):
    if user_id not in usuario:
        memory = ConversationBufferMemory(memory_key='historial',input_key='mensaje')
        prompt = PromptTemplate(
            input_variables=['rol','mensaje','historial'],
            template=Prompt_estruccture.strip()
        )
        chain = LLMChain(
            llm=llm,
            prompt=prompt,
            memory=memory,
            verbose=True
        )
        usuario[user_id] = chain 
    return usuario[user_id]

print('LLM iniciado')
roles = {
    'auditor':'actua como un aditor mppresarial y determina las estrategias que se pueden iimplementar con ia',
    'dessarrollador': 'quiero que todo lo quee expliques sea tecnico y descriptivo a tecnologias  estrategias de integracion a departaments empresariales',
    'vendedor': 'quiero qe solo trates de vender un software cualquiera con mala tecnica de venta y despectivo con el prodcto'
    }

user_id = str(random.randint(10000,90000))
print(f"tu user id es {user_id}")

rol = 'auditor'

while True:
    try:
        user_input = input('Tu ')
        if user_input.lower() == 'salir':
            break
        
        if user_input.startswith('/rol '):
            nuevo_rol = user_input.split('/rol ', 1)[1].lower().strip()
            if nuevo_rol in roles:
                rol = nuevo_rol
                print(f"tu nuevo rol es {nuevo_rol}")
            else:
                print('rol no disponible')
                
            continue
        
        chain = get_chain(user_id)
        respuesta = chain.run(rol=rol,mensaje=user_input)
        print(respuesta)
        
        print('memoria')
        print(chain.memory.load_memory_variables({}))
    except:
        break
  `

  const explanationJSX = (
    <>
      <p>
        Este script va más allá de la típica integración de LangChain porque introduce un componente fundamental: <strong>los roles</strong>.
      </p>

      <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm">
        <li>
          <strong>Estructura del prompt:</strong> Aunque ya conocemos el uso de plantillas con variables como <code>{'{mensaje}'}</code> o <code>{'{historial}'}</code>, aquí el prompt está diseñado para incorporar un rol dinámico. El mismo modelo puede responder de formas radicalmente distintas según el rol seleccionado.
        </li>

        <li>
          <strong>Roles como eje central:</strong> El parámetro <code>{'{rol}'}</code> es el núcleo del sistema. Cambiarlo transforma la personalidad del agente: puede ser un <strong>auditor corporativo</strong> que analiza estrategias, un <strong>desarrollador técnico</strong> que detalla integraciones y arquitecturas, o un <strong>vendedor con mala técnica</strong> que responde irónicamente. Esto permite múltiples personalidades con un único modelo.
        </li>

        <li>
          <strong>Memoria y contexto:</strong> La memoria de conversación asegura que el rol no solo afecte una respuesta puntual, sino que toda la interacción mantenga coherencia con el personaje elegido.
        </li>

        <li>
          <strong>Flexibilidad del sistema:</strong> El bucle interactivo y el comando <code>/rol</code> convierten al script en un entorno ágil para probar cómo cambia el comportamiento del agente al alternar roles.
        </li>

        <li>
          <strong>Aplicación empresarial:</strong> Este patrón es poderoso para diseñar agentes de IA con identidades definidas para consultoría, soporte, capacitación o ventas. Lo valioso es que no hace falta duplicar modelos ni infra —solo redefinir el rol.
        </li>
      </ol>

      <p className="mt-3">
        <strong>En conclusión:</strong> la verdadera innovación aquí no está en la infraestructura de LangChain (prompts, memoria, cadenas), sino en cómo <strong>los roles</strong> convierten un solo LLM en múltiples asesores especializados.
      </p>
    </>
  )

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
      <motion.div
        className="flex-1 bg-white border border-gray-300 rounded-xl p-4 max-h-[500px] overflow-auto shadow-md"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="text-lg font-bold mb-2 text-orange-500">Explicación detallada</h3>
        <div className="text-gray-800 leading-relaxed text-sm">{explanationJSX}</div>
      </motion.div>
    </div>
  )
}
