import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { get } from 'lodash';
import swal from 'sweetalert';
import submitData from '../Submit/SubmitData';

class UsersForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };


  handleChangePassword2 = event => {
    this.setState({ password2: event.target.value });
  };


  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  refresh = async event => {
      console.log('Refresh');
      window.location.reload(); 
   };

  salvar = async event => {
    this.state.formContact = '';
    event.preventDefault();
    const name = get(this.state, 'name');
    const email = get(this.state, 'email');
    const password = get(this.state, 'password');
    const password2 = get(this.state, 'password2');

    if (name.length <= 1) {
      swal('Erro', 'Verifique o campo Nome.', 'error');
      return false;
    }

    if (password.length <= 1) {
      swal('Erro', 'Verifique o campo Senha.', 'error');
      return false;
    } 

    if (email.length <= 1) {
      swal('Erro', 'Verifique o campo Email.', 'error');
      return false;
    }

    if (password2 !== password) {
      swal('Erro', 'Verifique a confirmação de senha.', 'error');
      return false;
    }

    const dataContact = {
      name: name,
      email: email,
      password: password,
      collection: "users"
    };

    const success = await submitData(dataContact);
    if (success) {
      swal({
        title: 'Sucesso',
        text: 'Cadastro realizado com sucesso!',
        type: 'success'
      }).then(function() {
         window.location.reload(); 
      });
    } else {
      swal('Erro', 'Falha no envio do Formulário!', 'error');
    }
  };

render() {
    return (
      <div>
      <Form id="formContact">
        <FormGroup>
          <Label for="name">Nome</Label>
          <Input name="name" id="name" type="text" placeholder="Nome" value={this.state.value} onChange={this.handleChangeName} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input name="email" id="email" type="email" placeholder="Email" value={this.state.value} onChange={this.handleChangeEmail} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input name="password" id="password" type="password" placeholder="Senha" value={this.state.value} onChange={this.handleChangePassword} />     
        </FormGroup>
        <FormGroup>
          <Label for="password2">Confirmação de Senha</Label>
          <Input type="password" name="password2" id="password2" placeholder="Repita a Senha" value={this.state.value} onChange={this.handleChangePassword2} />
        </FormGroup>
         <FormGroup>
             <Button color="primary" className="btn btn-primary" onClick={this.salvar}>
                  Salvar
             </Button>
             <Link to="/">
             <Button className="btn btn-secondary float-right">
                  Cancelar
             </Button>
          </Link>  
        </FormGroup>
      </Form>
      </div>
    );
  }
}
export default UsersForm;