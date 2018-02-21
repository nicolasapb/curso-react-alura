import React, { Component } from 'react';
import Foto from "./Foto";

export default class Timeline extends Component {

    componentDidMount() {
        fetch('http://localhost:8080/api/public/fotos/alots')
        .then(resp => resp.text())
        .then(texto => JSON.parse(texto))
        .then(resultado => resultado.map(a => console.log(a)))
        .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div className="fotos container">
                <Foto/> 
            </div>            
        )
    }
}