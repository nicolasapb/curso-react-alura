import React, { Component } from 'react'
import FotoItem from "./Foto"
import PubSub from 'pubsub-js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LogicaTimeline from '../logicas/LogicaTimeline'

export default class Timeline extends Component {
    "use strict";
    constructor(props) {
        super(props)
        this.state = { fotos: [] }
        this.login = this.props.login
        this.logicaTimeline = new LogicaTimeline([])
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
            .then(fotos => {
                this.setState({ fotos })
                this.logicaTimeline = new LogicaTimeline(fotos)
            })
            .catch(erro => console.log(erro));
    }

    componentWillMount() {
        PubSub.subscribe('timeline', (topic, fotos) => { 
            this.setState({ fotos})
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
        this.logicaTimeline.like(fotoId)     
    }

    comentar(fotoId, texto) {
        this.logicaTimeline.comentar(fotoId, texto)
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
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comentar={this.comentar.bind(this)}/>)
                    }
                </ReactCSSTransitionGroup>
            </div>            
        )
    }
}