import { useState } from 'react'
import './App.css'
import useWebSocket from 'react-use-websocket'

function App() {
  const appName = "My app"
  const [isConnected, setIsConnected] = useState(false)
  const [room, setRoom] = useState<string>('')
  const [messages, setMesages] = useState<string[]>([])

  useWebSocket(`ws://localhost:8080/ws/b271f5e8-5c1e-4f17-ba00-cc203340eafd`, {
    onOpen: () => {
      setIsConnected(true)
      console.log('WebSocket connection established.');
    },
    onMessage: (event) => {
      console.log(`Received data: ${event.data}`);
      setMesages([...messages, event.data])
    }
    ,  
    onClose: () => {
      setIsConnected(false)
      console.log('WebSocket connection closed.');
    }
  });

  


  return (
    <div className='App'>
      <h1>{appName}</h1>
      <h2>Alterando o HTML</h2>
      <p>Conectado: {isConnected ? 'Sim' : 'Não'}</p>



      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

    </div>
  )
}

export default App
