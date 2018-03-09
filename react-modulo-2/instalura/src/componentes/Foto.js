import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { PubSub } from "pubsub-js";

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                            {this.props.foto.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        )
    }
}

class FotoInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            likers: this.props.foto.likers,
            comentarios: this.props.foto.comentarios
        }
    }

    componentWillMount() {
        PubSub.subscribe('atualiza-liker', (topic, obj) => {
            if (this.props.foto.id === obj.fotoId) {
                const possivelLiker = this.state.likers.find(liker => liker.login === obj.liker.login) 
                if (possivelLiker === undefined) {
                    this.setState({ likers: this.state.likers.concat(obj.liker) })
                } else {
                    this.setState({ likers: this.state.likers.filter(liker => liker.login !== obj.liker.login) })
                }
            }
        })

        PubSub.subscribe('novos-comentarios', (topic, obj) => {
            if (this.props.foto.id === obj.fotoId) { 
                this.setState({ comentarios: this.state.comentarios.concat(obj.comentario) }) 
            }
        })
    }

    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">

                    { 
                        (this.state.likers) &&
                            this.state.likers.map(liker => <Link to={`/timeline/${liker.login}`} key={liker.login}>{liker.login} </Link>)
                    } 
                    {
                        (this.state.likers.length > 1) &&
                            'curtiruam'
                    }
                    
                
                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">{this.props.foto.loginUsuario} </Link>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        (this.state.comentarios) &&
                            this.state.comentarios.map(comentario => {
                                return (
                                    <li className="comentario" key={comentario.id}>
                                        <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                                        {comentario.texto}
                                    </li>
                                )
                            })
                    }
                    
                </ul>
            </div>            
        )
    }
}

class FotoAtualizacoes extends Component {

    constructor(props) {
        super(props)
        this.state = {liked: this.props.foto.likeada}
    }

    like(event) {
        event.preventDefault()
        const urlLike = `http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`

        fetch(urlLike, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Erro ao executar a operação')
                }
            })
            .then(liker => {
                this.setState({liked: !this.state.liked})
                PubSub.publish('atualiza-liker', {fotoId: this.props.foto.id, liker})
            })
            .catch(erro => console.log(erro))
    }

    comentar(event) {
        event.preventDefault()
        const urlComentario = `http://localhost:8080/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                texto: this.comentario.value
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(urlComentario, requestInfo)
            .then( response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Erro ao realizar o comentário')
                }
            })
            .then(comentario => {
                PubSub.publish('novos-comentarios', {fotoId: this.props.foto.id, comentario})
                this.comentario.value = ''
            })
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} href="" className={this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comentar.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input} />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        )
    }
}

export default class FotoItem extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto}/>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
                <FotoInfo foto={this.props.foto}/>
                <FotoAtualizacoes foto={this.props.foto}/>
            </div>            
        )
    }
}