import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import useWebSocket, {} from "react-use-websocket";
import { terminal } from "virtual:terminal"
import "./Game.css"
import CopyButton from "../../components/CopyButton";
import InputForm from "../../components/InputText";


interface Event {
    sender: string,
    data: any
    event_type: string,
}


function GamePage() {
    const { room_id } = useParams();
    // const location = useLocation();
    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("")
    const [messageHistory, setMesages] = useState<string[]>([])



    const { sendMessage, lastMessage, getWebSocket } = useWebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/${room_id}`)
    const messageEnd = useRef<null | HTMLDivElement>(null);




    useEffect(() => {
        messageEnd.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageHistory])

    window.addEventListener("popstate", () => {
        const ws = getWebSocket()
        terminal.log("Backing\n")
        terminal.log("Teste")
        if (ws)
            ws.close()
    })

    useEffect(() => {
        if (lastMessage !== null) {
            const ev: Event = JSON.parse(lastMessage.data)

            // if (ev.event_type == "new_client" && userId == "" && ev.sender == "server") {
            //     setUserId(ev.data.client_id)
            //     terminal.log(userId)

            // }
            // else if (ev.event_type == "message") {
            //     terminal.log(ev)
            // }

            terminal.log(ev)
        }
    }, [lastMessage, userId]);


    function send(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setMesages([...messageHistory, message])
        sendMessage(message);
        setMessage("")
    }



    return (
        <div className="h-screen bg-white text-center p-11 ">

            <div id="header" className="text-xl pb-4 flex gap-3 justify-between ">
                <h1 className="text-4xl text-violet-600 font-extrabold">Game Page </h1>

                <div className="group flex flex-col-reverse ">
                    <span className="group-hover:opacity-75 transition-opacity bg-gray-800 px-2 text-xs text-gray-100 rounded-md   opacity-0  mx-auto">{room_id}</span>
                    <CopyButton textToCopy={room_id} />
                </div>
            </div>
            <div id="body" className="flex flex-col   mb-10  justify-between border-4 border-gray-500 border-solid rounded-md">
                <div className="h-96 no-scrollbar overflow-y-auto bg-gray-200 justify-end  ">
                    <ul id="section-1">
                        {messageHistory.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))
                        }

                    </ul>
                    <div ref={messageEnd} />
                </div>
                <InputForm message={message} send={send} setMessage={setMessage} />
            </div>


        </div>
    )
}

export default GamePage

