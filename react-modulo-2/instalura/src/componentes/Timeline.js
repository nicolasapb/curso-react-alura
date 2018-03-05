import React, { Component } from 'react';
import FotoItem from "./Foto";

export default class Timeline extends Component {

    constructor() {
        super()
        this.state = {fotos: []}
    }

    componentDidMount() {
        const urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
        const urlPublica = `http://localhost:8080/api/public/fotos/${this.props.login}`
        const url = (this.props.login === undefined) ? urlPerfil : urlPublica

        fetch(url)
        .then(resp => {  
            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error(resp.status)
            }
        })
        .then(fotos => this.setState({fotos})) 
        .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div className="fotos container">
                {    
                    (this.state.fotos.length !== 0) &&  
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/> )
                }
                
            </div>            
        )
    }
}