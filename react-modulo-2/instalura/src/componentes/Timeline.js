import React, { Component } from 'react'
import FotoItem from "./Foto"
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
        this.logicaTimeline.lista(this.login)
    }

    componentWillMount() {
        this.logicaTimeline.subscribe(fotos => this.setState({ fotos }))
    }
    
    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) { 
        this.login = nextProps.login
        this.carregaFotos() 
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