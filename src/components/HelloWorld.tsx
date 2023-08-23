import React from "react"
import Frase from "./Frase"

interface HelloWorldProps {
    name?: string
}

class HelloWorld extends React.Component <HelloWorldProps>{
    constructor(props: HelloWorldProps) {
        super(props)
    }
    render() {
        return (
            <div>
                <p> Ola {this.props.name?? ""}</p>
                <p> Componente de frase </p>
                <Frase />
            </div>
        )
    }
}

export default HelloWorld