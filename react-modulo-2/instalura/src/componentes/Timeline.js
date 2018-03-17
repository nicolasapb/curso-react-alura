import React, { Component } from 'react'
import FotoItem from "./Foto"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Timeline extends Component {
    "use strict";
    constructor(props) {
        super(props)
        this.state = { fotos: [] }
        this.login = this.props.login
    }

    carregaFotos() {
        this.props.store.lista(this.login)
    }

    componentWillMount() {
        this.props.store.subscribe(fotos => this.setState({fotos}))
    }
    
    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) { 
        this.login = nextProps.login
        this.carregaFotos() 
    }
    
    like(fotoId) {
        this.props.store.like(fotoId)     
    }

    comentar(fotoId, texto) {
        this.props.store.comentar(fotoId, texto)
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