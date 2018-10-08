import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { get } from 'lodash';
import swal from 'sweetalert';
import submitLogin from '../Submit/SubmitLogin';
import { bake_cookie } from 'sfcookies';

class LoginForm extends Component {

state = {
  email: '',
  password: ''

};

handleChangeEmail = event => {
  this.setState({ email: event.target.value });
};

handleChangePassword = event => {
  this.setState({ password: event.target.value });
};



logar = async event => {
  event.preventDefault();
  const email = get(this.state, 'email');
  const password = get(this.state, 'password');

  if (email.length <= 1) {
    swal('Erro', 'Verifique o campo Email.', 'error');
    return false;
  }

  if (password.length <= 1) {
    swal('Erro', 'Verifique o campo Senha.', 'error');
    return false;
  } 

  const dataLogin = {
    email: email,
    password: password,
    collection: "usersAuth"
  };


  const user = await submitLogin(dataLogin);
  console.log('user: ', user);
  if (user.length > 0) {
    // console.log('user._id :', user[0]._id);
    // console.log('user.name :', user[0].name);

    bake_cookie('logado', true);
    bake_cookie('id', user[0]._id);
    bake_cookie('name', user[0].name);
    bake_cookie('email', user[0].email);
    bake_cookie('password', user[0].password);

    swal({
      title: 'Saudações',
      text: 'Olá, '+ user[0].name +'!!',
      icon: 'success'
    }).then(function() {
      window.location.replace('/Home');
    });
  } else {
    swal('Erro', 'Email e/ou Senha informados, não localizados.', 'error');
  }
};


render() {
    return (
      <div>
      <Form>
        <FormGroup>
         <Label for="email">Email</Label>      
         <Input name="email" id="email" type="email" placeholder="Email" value={this.state.value} onChange={this.handleChangeEmail} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input type="password" placeholder="Senha" value={this.state.value} onChange={this.handleChangePassword} />
        </FormGroup>
        <FormGroup>
          <Button color="primary" onClick={this.logar}>Entrar</Button>
        </FormGroup>
      </Form>
      </div>
    );
  }
}
export default LoginForm;