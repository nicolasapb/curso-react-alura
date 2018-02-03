import React, { Component } from "react";
import $ from "jquery";
import InputCustomizado from "./componentes/InputCustomizado";
import SubmitCustom from "./componentes/SubmitCustom";
import PubSub from "pubsub-js";
import TrataErros from "./TrataErros";

export default class AutorBox extends Component {

    constructor() {
        super()
        this.state = { lista: [] } 
    }

    componentDidMount() {
        $.ajax({
            // url: "http://localhost:8080/api/autores",
            url: "https://cdc-react.herokuapp.com/api/autores",
            dataType: "json",

            success: res => this.setState({ lista: res }),

            error: res => !(res.status === 200) ?  new TrataErros().publicaErros(res.responseJSON) : false 
        })

        PubSub.subscribe('atualiza-lista-autores', 
            (topico, novaLista) => this.setState({lista: novaLista})
        )
    }
 
    render() {
        return ( 
            <div className="content" id="content">
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista}/>
            </div> 
        )
    }
}

class FormularioAutor extends Component {

    constructor() {
        super()
        this.state = { nome: '', email: '', senha: '' }
        this.enviaForm = this.enviaForm.bind(this)
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }    

    enviaForm(evento) {
        evento.preventDefault()
        $.ajax({
            // url: "http://localhost:8080/api/autores",
            url: "https://cdc-react.herokuapp.com/api/autores",
            contentType: "application/json",
            dataType: "json",
            type: 'post',
            data: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            }),

            success: novaLista =>  {
                PubSub.publish('atualiza-lista-autores', novaLista)
                PubSub.publishSync('limpa-erros', {})
                this.setState({ nome: '', email: '', senha: '' })
            },

            error: res =>  (res.status === 400) ? new TrataErros().publicaErros(res.responseJSON) : false,

            // beforeSend: () => PubSub.publish('limpa-erros', {})
        })
    }

    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }
    
    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                    <InputCustomizado label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
                    <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />
                    <SubmitCustom label="Gravar" type="submit" />
                </form>
            </div>             
        )
    }
}

class TabelaAutores extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(autor => <tr key={autor.id}><td>{autor.nome}</td><td>{autor.email}</td></tr>)
                        }
                    </tbody>
                </table>
            </div>               
        )
    }
}