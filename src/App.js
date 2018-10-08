import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import { read_cookie } from 'sfcookies';

class App extends Component {

  render() {
  	const logado = read_cookie('logado');
  	let tela;
  	 if (logado) {
		      tela = <Home />
		    } else {
		      tela = <Login />
		    }
    return (
      <main className="mainBox">    
		{tela}
      </main>
      
    );
  }
}
export default App;
