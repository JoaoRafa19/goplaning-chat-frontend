
interface InputProps {
    send: (event: { preventDefault: () => void; }) => void;
    message: string;
    setMessage: (val: string) => void
}


function InputForm(props: InputProps) {
    return <div id="footer">
        <form className="flex m-4 " onSubmit={(e) => { e.preventDefault(); props.send(e); }}>
            <input value={props.message} type="text" onChange={(event) => {event.preventDefault(); props.setMessage(event.target.value); }} onSubmit={(e) => { props.send(e); }} className="border rounded-md p-1 w-screen   " placeholder="sua mensagem aqui..."></input>
            <button onClick={props.send} type="button"
                className="border rounded border-solid p-1 m-2 bg-cyan-500 hover:bg-cyan-600 hover:text-md text-white text-md px-4 hover:text-lg"
            >enviar</button>
        </form>
    </div>;
}

export default InputForm