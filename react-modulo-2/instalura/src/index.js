import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App';
import Login from "./componentes/Login";
import Logout from "./componentes/Logout";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 

function verificaAutenticacao(nextState, replace) {
    if (localStorage.getItem('auth-token') === null) { 
        return <Redirect to={{
            pathname: '/',
            state:  {msg: 'Faça login para acessar esta página'}
        }}/>
    }
    return <App/>
}

ReactDOM.render(
    (<Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/timeline" render={verificaAutenticacao}/>
            <Route exact path="/logout" component={Logout}/>
        </Switch>
    </Router>), 

    document.getElementById('root')
);

registerServiceWorker();
