import React, { Component } from 'react';
import {  Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { get } from 'lodash';
import swal from 'sweetalert';
import submitData from '../Submit/SubmitData';
import { read_cookie } from 'sfcookies';

class ContactsForm extends Component {

  state = {
    name: '',
    cpf: '',
    email: '',
    account: ''
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeCPF = event => {
    this.setState({ cpf: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangeAccount = event => {
    this.setState({ account: event.target.value });
  };

  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  refresh = async event => {
      console.log('Refresh');
      window.location.reload(); 
   };

  salvar = async event => {
    event.preventDefault();
    const name = get(this.state, 'name');
    const email = get(this.state, 'email');
    const cpf = get(this.state, 'cpf');
    const account = get(this.state, 'account');

    if (name.length <= 1) {
      swal('Erro', 'Verifique o campo Nome.', 'error');
      return false;
    }

    if (cpf.length <= 1) {
      swal('Erro', 'Verifique o campo CPF.', 'error');
      return false;
    } 

    if (email.length <= 1) {
      swal('Erro', 'Verifique o campo Email.', 'error');
      return false;
    }

    if (account.length <= 1) {
      swal('Erro', 'Verifique o campo Conta.', 'error');
      return false;
    }

    const userId = read_cookie('id');
    
    const dataContact = {
      name: name,
      email: email,
      cpf: cpf,
      account: account,
      userId: userId,
      collection: "contacts"
    };

    const success = await submitData(dataContact);
    if (success) {
      swal({
        title: 'Sucesso',
        text: 'Contato cadastrado!',
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
      <Form>
        <FormGroup>
          <Label for="name">Nome</Label>
          <Input name="name" id="name" type="text" placeholder="Nome" value={this.state.value} onChange={this.handleChangeName} />
        </FormGroup>
        <FormGroup>
          <Label for="cpf">CPF/CNPJ</Label>
          <Input name="cpf" id="cpf" type="text" placeholder="CPF/CNPJ" value={this.state.value} onChange={this.handleChangeCPF} />     
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input name="email" id="email" type="email" placeholder="Email" value={this.state.value} onChange={this.handleChangeEmail} />
        </FormGroup>
        <FormGroup>
          <Label for="account">Número da Conta</Label>
          <Input type="number" name="account" id="account" placeholder="Número da Conta" value={this.state.value} onChange={this.handleChangeAccount} />
        </FormGroup>
         <FormGroup>
             <Button color="primary" className="btn btn-primary" onClick={this.salvar}>
                  Salvar
             </Button>
             <Button className="btn btn-secondary float-right" onClick={this.refresh}>
                  Cancelar
             </Button>
        </FormGroup>
      </Form>
      </div>
    );
  }
}
export default ContactsForm;