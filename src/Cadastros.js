import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import UsersForm from './components/Users/UsersForm';
import { Jumbotron } from 'reactstrap';
class Cadastros extends Component {
 render() {
   return (
    <div style={{height:'100%'}}>
      <Menu />
      <main className="mainBox">
       <Jumbotron>
        <h2 className="display-5">Cadastre-se</h2>
        <UsersForm />
       </Jumbotron>
      </main>
    </div>    
   );
 }
}
export default Cadastros;