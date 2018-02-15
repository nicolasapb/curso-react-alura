import React, { Component } from 'react';
import $ from "jquery";
import InputCustomizado from "./componentes/InputCustomizado";
import SubmitCustom from "./componentes/SubmitCustom";
import PubSub from "pubsub-js";
import TrataErros from "./TrataErros";

export default class LivroBox extends Component {

    constructor() {
        super()
        this.state = { lista: [] }
    }

    componentDidMount() {
        $.ajax({
            // url: "http://localhost:8080/api/autores",
            url: "https://cdc-react.herokuapp.com/api/livros",
            dataType: "json",

            success: res => this.setState({ lista: res }),

            error: res => !(res.status === 200) ? new TrataErros().publicaErros(res.responseJSON) : false
        })

        PubSub.subscribe('atualiza-lista-livros',
            (topico, novaLista) => this.setState({ lista: novaLista })
        )
    }
    
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <br />
                <div className="content" id="content">
                    <FormularioLivro />
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        )
    }
}

class FormularioLivro extends Component {

    constructor() {
        super()
        this.state = { titulo: '', preco: '', autor: '' }
        this.enviaForm = this.enviaForm.bind(this)
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutor = this.setAutor.bind(this);
    }     


    enviaForm(evento) {
        evento.preventDefault()
        $.ajax({
            // url: "http://localhost:8080/api/autores",
            url: "https://cdc-react.herokuapp.com/api/livros",
            contentType: "application/json",
            dataType: "json",
            type: 'post',
            data: JSON.stringify({
                titulo: this.state.titulo,
                preco: this.state.preco,
                autor: this.state.autor
            }),

            success: novaLista => {
                PubSub.publish('atualiza-lista-livros', novaLista)
                PubSub.publishSync('limpa-erros', {})
                this.setState({ titulo: '', preco: '', autor: '' })
            },

            error: res => (res.status === 400) ? new TrataErros().publicaErros(res.responseJSON) : false,

            // beforeSend: () => PubSub.publish('limpa-erros', {})
        })
    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutor(evento) {
        // this.setState({ senha: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado label="Título" id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} />
                    <InputCustomizado label="Preço" id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} />
                    <InputCustomizado label="Autor" id="autor" type="text" name="autor" value={this.state.autor} onChange={this.setAutor} />
                    <SubmitCustom label="Gravar" type="submit" />
                </form>
            </div>  
        )
    }
}

class TabelaLivros extends Component {
    render() {
        return (
            <div> 
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(livro => <tr key={livro.id}><td>{livro.titulo}</td><td>R$ {livro.preco}</td><td>{livro.autor.nome}</td></tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}