import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Cadastros from './Cadastros';
import Cartoes from './Cartoes';
import Contatos from './Contatos';
import Erro404 from './Erro404';
import Home from './Home';
import Logoff from './Logoff';
import RecuperarSenha from './RecuperarSenha';
import Transferencias from './Transferencias';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/cadastros" component={Cadastros} />
            <Route path="/cartoes" component={Cartoes} />  
            <Route path="/contatos" component={Contatos} />
            <Route path="/home" component={Home} />   
            <Route path="/logoff" component={Logoff} />                
            <Route path="/recuperarSenha" component={RecuperarSenha} />     
            <Route path="/transferencias" component={Transferencias} />            
            <Route path='*' component={Erro404} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
