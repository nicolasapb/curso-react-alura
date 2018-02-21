import React, { Component } from 'react';
import FotoItem from "./Foto";

export default class Timeline extends Component {

    constructor() {
        super()
        this.state = {fotos: []}
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/public/fotos/alots')
        .then(resp => resp.json()) 
        .then(fotos => this.setState({fotos})) 
        .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div className="fotos container">
                {
                    (this.state.fotos) &&
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/> )
                }
                
            </div>            
        )
    }
}