import React from "react";

interface PessoaProps {
    nome: string,
    idade: number,
    sexo: string
}

class Pessoa extends React.Component <PessoaProps> {
    render(){
        return (
            <div>
                <p> Nome: {this.props.nome} </p>
                <p> Idade: {this.props.idade} </p>
                <p> Sexo: {this.props.sexo} </p>
            </div>
        )
    }
}

export default Pessoa