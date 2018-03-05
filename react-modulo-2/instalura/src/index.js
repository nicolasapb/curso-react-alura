import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App';
import Login from "./componentes/Login";
import Logout from "./componentes/Logout";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect, matchPath } from 'react-router-dom';

function verificaAutenticacao(nextState, replace) { 
    const match = matchPath('/timeline', {
        path: nextState.match.url,
        exact: true
    })  

    let valida = false
    if (match !== null) {
        valida = match.isExact
    }

    if (valida && localStorage.getItem('auth-token') === null) { 
        return <Redirect to={{
            pathname: '/',
            state:  {msg: 'Faça login para acessar esta página'}
        }}/>
    } 
    return <App login={nextState.match.params.login}/>
}

ReactDOM.render(
    (<Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/timeline/:login?" render={verificaAutenticacao}/>
            <Route exact path="/logout" component={Logout}/>
        </Switch>
    </Router>), 

    document.getElementById('root')
);

registerServiceWorker();
