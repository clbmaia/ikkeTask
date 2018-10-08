import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/Login/LoginForm';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';

class Login extends Component {
 render() {
   return (
    <div style={{height:'100%'}}>
      <main>
        <Jumbotron>
          <h2 className="display-5">Bem Vindo ao Banco IKKE</h2>

          <LoginForm /> 
  {/*      <div style={{height:'100%'}}>
            <Home />        
        </div>*/}
        <Link to="/RecuperarSenha">Esqueci a senha</Link>
        <Link to="/cadastros" className="float-right">Faça seu Cadastro</Link>
        </Jumbotron>
      </main>
    </div>    
   );
 }
}
export default Login;