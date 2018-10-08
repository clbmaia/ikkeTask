import React from 'react';

import DrawerToggleButton from './DrawerToggleButton';
import './Toolbar.css';

import { Link } from 'react-router-dom';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar_navigation">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerToggleClickHandler} />
      </div>
      <div className="toolbar_logo"><a href="/">BANCO IKKE</a></div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li><Link to="/contatos">Contatos</Link></li>
          <li><Link to="/cartoes">Cartões de Crédito</Link></li>
          <li><Link to="/transferencias">Transferências</Link></li> 
          |
          <li><Link to="/Logoff">Sair</Link></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;