import React, { Component } from 'react';

import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer'
import Backdrop from './Backdrop';
import { read_cookie } from 'sfcookies';



class Menu extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render() {
    let backdrop;
    const logado = read_cookie('logado');
    if (!logado) {
      window.location.replace('/');
    }

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div style={{height:'100%'}}>
        <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}        
      </div>
    );
  }
}


export default Menu;