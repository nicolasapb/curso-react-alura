import React, { Component } from "react"; 

export default class Login extends Component {

    constructor() {
        super()
        this.state = { msg: ''}
    }

    envia(evento) {
        evento.preventDefault(); 

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.login.value,
                senha: this.senha.value
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(response => {
                if(response.ok) { 
                    return response.text() 
                } else { 
                    throw new Error('não foi possível fazer o login')
                }            
            })
            .then(token => { 
                localStorage.setItem('auth-token', token)
                this.props.history.push('timeline')
            })
            .catch(erro => {
                this.setState({ msg: erro.message })
                this.senha.value = ''
            })
    }

    render() {
        return(
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)} method="post">
                    <input type="text" ref={ input => this.login = input }/>
                    <input type="password" ref={input => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        )
    }
}