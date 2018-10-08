import React, { Component } from 'react';
import './App.css';
import ForgotPasswordForm from './components/ForgotPassword/ForgotPasswordForm';
import { Jumbotron } from 'reactstrap';
class RecuperarSenha extends Component {
 render() {
    return (
      <main className="mainBox">
       <Jumbotron>
        <h2 className="display-5">Recupere sua Senha</h2>
        <ForgotPasswordForm />
       </Jumbotron>
      </main>
    );
  }
}
export default RecuperarSenha;





