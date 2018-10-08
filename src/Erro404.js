import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
class Erro404 extends Component {
 render() {
   return (
    <div style={{height:'100%'}}>
      <Menu />
      <main style={{marginTop: '54px'}}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Erro 404: Página não localizada</h1>
          </header>
          <p className="App-intro">
            Página não localizada
          </p>
        </div>
      </main>
    </div>    
   );
 }
}
export default Erro404;