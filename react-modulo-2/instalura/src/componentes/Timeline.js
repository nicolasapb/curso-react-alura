import React, { Component } from 'react';
import FotoItem from "./Foto";
import PubSub from 'pubsub-js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Timeline extends Component {

    constructor(props) {
        super(props)
        this.state = { fotos: [] }
        this.login = this.props.login
    }

    carregaFotos() {
        const urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        const urlPublica = `http://localhost:8080/api/public/fotos/${this.login}`;
        const url = (this.login === undefined) ? urlPerfil : urlPublica;
        fetch(url)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(resp.status);
                }
            })
            .then(fotos => this.setState({ fotos }))
            .catch(erro => console.log(erro));
    }

    componentWillMount() {
        PubSub.subscribe('timeline', (topic, obj) => {
            this.setState({ fotos: obj.fotos})
        })

        // Evento de Like
        PubSub.subscribe('atualiza-liker', (topic, obj) => {

            const fotoEncontrada = this.state.fotos.find(foto => foto.id === obj.fotoId)
            fotoEncontrada.likeada = !fotoEncontrada.likeada

            const possivelLiker = fotoEncontrada.likers.find(liker => liker.login === obj.liker.login)

            if (possivelLiker === undefined) {
                fotoEncontrada.likers.push(obj.liker)
            } else {
                fotoEncontrada.likers = fotoEncontrada.likers.filter(liker => liker.login !== obj.liker.login)
            }
            this.setState({ fotos: this.state.fotos })

        })

        // Evento de comentario
        PubSub.subscribe('novos-comentarios', (topic, obj) => {

            const fotoEncontrada = this.state.fotos.find(foto => foto.id === obj.fotoId)
            
            fotoEncontrada.comentarios.push(obj.comentario)
            
            this.setState({ fotos: this.state.fotos })
        })        
    }
    
    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) { 
        this.login = nextProps.login
        this.carregaFotos(nextProps) 
    }
    
    like(fotoId) {

        const urlLike = `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`

        fetch(urlLike, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Erro ao executar a operação')
                }
            })
            .then(liker => {
                PubSub.publish('atualiza-liker', { fotoId, liker })
            })
            .catch(erro => console.log(erro))        
    }

    comentar(fotoId, texto) {
        const urlComentario = `http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(urlComentario, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Erro ao realizar o comentário')
                }
            })
            .then(comentario => {
                PubSub.publish('novos-comentarios', { fotoId, comentario })
            })
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {
                        (this.state.fotos.length !== 0) &&
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like} comentar={this.comentar}/>)
                    }
                </ReactCSSTransitionGroup>
            </div>            
        )
    }
}