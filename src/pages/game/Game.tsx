import { ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from "react-use-websocket";

function GamePage() {

    const { room_id } = useParams();
    // const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const [messageHistory, setMesages] = useState<string[]>([])
    const { sendMessage, lastMessage, readyState } = useWebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/${room_id}`)

    useEffect(() => {
        if (readyState == ReadyState.CLOSING) {
            alert("Conection Closed")
            navigate("/")
        }
    }, [readyState])

    useEffect(() => {
        if (lastMessage !== null) {
            setMesages((prev) => prev.concat(lastMessage.data));
        }
      }, [lastMessage, setMesages]);

   


    function send(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setMesages([...messageHistory, message])
        sendMessage(message);
    }
    return (
        <html>
            <header id="header">
                <h1>Game Page </h1>
                <p>{room_id}</p>
            </header>
            <body id="body">
                <ul>
                    {messageHistory.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))
                    }
                </ul>
            </body>
            <footer id="footer">
                <form>
                    <input onChange={(event) => { setMessage(event.target.value) }} className="border rounded-md p-1 " placeholder="sua mensagem aqui..."></input>
                    <button onClick={send}
                        className="border rounded border-solid p-1 m-2 bg-cyan-500 hover:bg-cyan-600 hover:text-md text-white text-md px-4 hover:text-lg"
                    >enviar</button>
                </form>
            </footer>

        </html>
    )


}


export default GamePage 