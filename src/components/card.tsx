import { useState } from "react"

type OnCreateFunction = () => void;
type OnEnterFunction = (roomId: string) => void;

function Card(props: { oncreate?: OnCreateFunction, onenter?: OnEnterFunction }) {

    const [loading, setLoading] = useState(false)
    const [enter, setEnter] = useState(false)
    const [roomId, setRoomId] = useState("")

    function OnEnter() {
        setLoading(true)
        if (props.onenter && roomId.length > 0) {
            props.onenter(roomId)
        }
        setLoading(false)
    }
    function OnCreate() {
        setLoading(true)
        if (props.oncreate)
            props.oncreate()
        setLoading(false)
    }



    return (
        <div className="flex-grow bg-white shadow-xl rounded-md border-gray-300 p-8">
            {
                loading ? <div className="flex items-center mx-auto ">
                    <div className=" h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                </div> : <div className="grid grid-cols-1 text-center space-y-5">
                    <button type="button" className="hover:text-white hover:bg-gray-600  py-5 rounded-xl transition-all hover:py-6 hover:text-lg" onClick={OnCreate}>Criar uma sala</button>
                    <button type="button" className="hover:text-white hover:bg-gray-600 py-5 rounded-xl transition-all hover:py-6 hover:text-lg" onClick={() => setEnter(!enter)}>Entrar em uma sala</button>

                    {enter && <form className='flex w-full mt-8'>
                        <input type="password" onChange={(event) => { setRoomId(event.target.value) }} placeholder="id da sala" className='flex-1 w-full text-gray-700 bg-gray-200 rounded-md hover:bg-white border border-gray-200 outline-none focus:bg-white py-2 px-4 ' />
                        <button onClick={OnEnter}
                            type='button' className='flex-shrink-0 bg-cyan-500 hover:bg-cyan-600 outline-none py-2 px-4 ml-4 text-white font-semibold rounded-md '>entrar</button>
                    </form>}

                </div>
            }


            {/* <div className="sm:flex sm:items-center">
                    <Fingerprint size={48} className="sm:flex-shrink-0 mx-auto sm:mx-0 h-24 rounded-full " />
                    <div className="sm:ml-4 sm-text-left text-center">
                        <p className="text-xl">Jose Silva</p>
                        <p className="text-sm text-gray-600">Gerente de Projeto</p>
                        <div className="mt-4">
                            <button type="button" className="text-red-600 hover:text-white border border-red-500 hover:bg-red-500 font-semibold rounded-md text-xs px-4 py-1">
                                Não é Jose?
                            </button>
                        </div>
                    </div>
                </div>
                        <form className='flex w-full mt-8'>
                            <input type="password" placeholder="sua senha" className='flex-1 w-full text-gray-700 bg-gray-200 rounded-md hover:bg-white border border-gray-200 outline-none focus:bg-white py-2 px-4 ' />
                            <button
                                type='button' className='flex-shrink-0 bg-teal-500 hover:bg-teal-600 outline-none py-2 px-4 ml-4 text-white font-semibold rounded-md '>entrar</button>
                        </form> */}
        </div>
    )
}


export default Card