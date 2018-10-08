import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import { Jumbotron, ListGroup, ListGroupItem } from 'reactstrap';
import { read_cookie } from 'sfcookies';

class Home extends Component {
 render() {
  const name = read_cookie('name');
  const email = read_cookie('email');
   return (
    <div style={{height:'100%'}}>
      <Menu />
      <main className="mainBox">
      <ListGroup>
        <ListGroupItem>Usuário: {name}</ListGroupItem>
        <ListGroupItem>Email: {email}</ListGroupItem>
      </ListGroup>
       <Jumbotron>
        <h2 className="display-5">Home</h2>
        Escolha uma da opções através de nosso menu.
       </Jumbotron>
      </main>
    </div>    
   );
 }
}
export default Home;