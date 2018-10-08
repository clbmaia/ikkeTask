import React, { Component } from 'react';
import './App.css';
import { delete_cookie, bake_cookie } from 'sfcookies';

class Logoff extends Component {


 render() {
  console.log('Saindo...');
  delete_cookie('id');
  delete_cookie('name');
  delete_cookie('email');
  delete_cookie('password');
  bake_cookie('logado', false);
  window.location.replace('/');
     return (
    <div style={{height:'100%'}}>
      <main className="mainBox">
      </main>
    </div>    
   );
 }
}
export default Logoff;