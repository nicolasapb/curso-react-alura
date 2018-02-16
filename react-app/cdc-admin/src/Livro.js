import React, { Component } from 'react';
import $ from "jquery";
import InputCustomizado from "./componentes/InputCustomizado";
import SubmitCustom from "./componentes/SubmitCustom";
import PubSub from "pubsub-js";
import TrataErros from "./TrataErros";

export default class LivroBox extends Component {

    constructor() {
        super()
        this.state = { lista: [], autores: [] }
    }

    componentDidMount() {
        $.ajax({
            // url: "http://localhost:8080/api/autores",
            url: "https://cdc-react.herokuapp.com/api/livros",
            dataType: "json",

            success: res => this.setState({ lista: res }),

            error: res => !(res.status === 200) ? new TrataErros().publicaErros(res.responseJSON) : false
        })

        $.ajax({
            // url: "http://localhost:8080/api/autores",
            url: "https://cdc-react.herokuapp.com/api/autores",
            dataType: "json",

            success: res => this.setState({ autores: res }),

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
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        )
    }
}

class FormularioLivro extends Component {

    constructor() {
        super()
        this.state = { titulo: '', preco: '', autorId: '' }
        this.enviaForm = this.enviaForm.bind(this) 
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
                autorId: this.state.autorId
            }),

            success: novaLista => {
                PubSub.publish('atualiza-lista-livros', novaLista)
                PubSub.publishSync('limpa-erros', {})
                this.setState({ titulo: '', preco: '', autorId: '' })
            },

            error: res => (res.status === 400) ? new TrataErros().publicaErros(res.responseJSON) : false,

            // beforeSend: () => PubSub.publish('limpa-erros', {})
        })
    }

    salvaAlteracao(nomeInput, evento) {
        this.setState({ [nomeInput]: evento.target.value });
    } 

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado label="Título" id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this, 'titulo')} />
                    <InputCustomizado label="Preço" id="preco" type="text" name="preco" value={this.state.preco} onChange={this.salvaAlteracao.bind(this, 'preco')} />
                    {/* <InputCustomizado label="Autor" id="autorId" type="text" name="autorId" value={this.state.autorId} onChange={this.setAutorId} /> */}
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select id="autorId" name="autorId" value={this.state.autorId} onChange={this.salvaAlteracao.bind(this, 'autorId')}>
                            <option value="">Selecione o autor</option>
                            {
                                (this.props.autores) && 
                                    this.props.autores.map(autor => <option key={autor.id} value={autor.id}>{autor.nome}</option>)
                            }
                        </select>
                    </div>
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