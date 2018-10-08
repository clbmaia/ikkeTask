import React from 'react';

import './SideDrawer.css';

import { Link } from 'react-router-dom';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if(props.show){
    drawerClasses = 'side-drawer open';
  }
  return(
  <nav className={drawerClasses}>
    <ul>
      <li><Link to="/contatos">Contatos</Link></li>
      <li><Link to="/cartoes">Cartões de Crédito</Link></li>
      <li><Link to="/transferencias">Transferências</Link></li>
      _______________
      <li><Link to="/Logoff">Sair</Link></li>
    </ul>
  </nav>
  );

};

export default sideDrawer;