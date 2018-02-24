import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App';
import Login from "./componentes/Login";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

ReactDOM.render(
    (<Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/timeline" component={App}/>
        </Switch>
    </Router>), 

    document.getElementById('root')
);

registerServiceWorker();
