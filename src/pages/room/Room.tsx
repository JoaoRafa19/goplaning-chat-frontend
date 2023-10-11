import axios from "axios";
import Card from "../../components/card"
import { useNavigate } from "react-router-dom"

interface CreateRoomResponse {
  created_room?: string
}
interface IsRoomActive {
  active: boolean
}

function RoomPage() {
  const navigate = useNavigate();


  function getRoom() {
    const base_url = import.meta.env.VITE_API_URL
    axios<CreateRoomResponse>(`${base_url}`).then((response) => {
      if (response.status == 201) {
        console.log(response.data.created_room)
        if (response.data.created_room)
          navigate(`/game/${response.data.created_room}`)
      }
    });
  }




  function enterRoom(roomId: string) {
    axios<IsRoomActive>(`${import.meta.env.VITE_API_URL}/activeroom/${roomId}`).then(response => {
      if (response.data.active == false) {
        alert("Sala desativada ou não encontrada!")
      } else {
        navigate(`/game/${roomId}`)
      }
    }).catch(reason => {
      console.log(reason)
    })

  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-blue-600 lg:min-h-screen lg:flex lg:items-center p-8 sm:p-12">
        <div className="flex-grow">
          <h1
            className='text-white text-center text-2xl sm:text5xl mb-2'
          >Seja bem vindo(a)</h1>
          <p className='text-center text-blue-200 sm:text-lg'> Crie ou entre em uma sala para jogar</p>
        </div>
      </div>
      <div className="lg:min-h-screen lg:flex lg:items-center p-12 lg:p-24 xl:p-48">
        <Card oncreate={getRoom} onenter={enterRoom} />
      </div>
    </div>
  )
}

export default RoomPage

