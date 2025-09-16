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
      La verdadera potencia de este script no está solo en cómo responde el modelo, sino en cómo <strong>gestiona la memoria</strong>. Un LLM sin memoria es limitado: cada consulta sería aislada, sin contexto, y las respuestas perderían coherencia y relevancia.
    </p>

    <ol className="list-decimal pl-6 mt-4 space-y-3 text-sm">
      <li>
        <strong>Contexto persistente:</strong> La memoria de conversación almacena lo que el usuario ha preguntado y las respuestas previas. Esto permite que el modelo construya sobre información anterior, evitando repetir explicaciones o perder detalles críticos.
      </li>

      <li>
        <strong>Coherencia de rol:</strong> Al mantener un historial, el agente respeta el rol seleccionado en interacciones anteriores. Por ejemplo, un <strong>auditor corporativo</strong> recordará recomendaciones pasadas y podrá integrarlas a nuevas consultas.
      </li>

      <li>
        <strong>Consultas más inteligentes:</strong> La memoria permite que el modelo interprete mejor las preguntas, detecte patrones y entregue respuestas más precisas y útiles, adaptadas al contexto acumulado.
      </li>

      <li>
        <strong>Evita redundancia:</strong> Gracias a la memoria, no se repiten instrucciones, datos o explicaciones innecesarias. Cada respuesta es contextual, eficiente y profesional.
      </li>

      <li>
        <strong>Aplicación empresarial real:</strong> En entornos de consultoría, soporte o auditoría, un modelo sin memoria no podría generar diagnósticos progresivos ni seguimiento. La memoria convierte un LLM en un verdadero asesor que aprende y evoluciona con cada interacción.
      </li>
    </ol>

    <p className="mt-3">
      <strong>En conclusión:</strong> sin memoria, incluso los modelos más grandes y sofisticados pierden utilidad. La memoria es el corazón que mantiene la continuidad, la coherencia y la inteligencia contextual de este script.
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
