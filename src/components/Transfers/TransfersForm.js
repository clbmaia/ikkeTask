import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { get } from 'lodash';
import swal from 'sweetalert';
import submitData from '../Submit/SubmitData';
import transfersCheckPrevious from './TransfersCheckPrevious';
import axios from 'axios';
import { read_cookie } from 'sfcookies';

class TransfersForm extends Component {

  state = {
    reason: '',
    contact: '',
    valueTransfer: '',
    dateTransfer: '',
    tableData: []
  };

  handleChangeReason = event => {
    this.setState({ reason: event.target.value });
  };

  handleChangeContact = event => {
    this.setState({ contact: event.target.value });
  };

  handleChangeValueTransfer = event => {
    this.setState({ valueTransfer: event.target.value });
  };

  handleChangeDateTransfer = event => {
    this.setState({ dateTransfer: event.target.value });
  };

  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  refresh = async event => {
      window.location.reload(); 
   };

  salvar = async event => {
    event.preventDefault();
    let contact;
    const reason = get(this.state, 'reason');
    const contactId = get(this.state, 'contact');
    const valueTransfer = get(this.state, 'valueTransfer');
    const dateTransfer = get(this.state, 'dateTransfer');


    if (reason.length <= 1) {
      swal('Erro', 'Verifique o campo Motivo.', 'error');
      return false;
    }

    if (contactId.length <= 1) {
      swal('Erro', 'Verifique o campo Contato.', 'error');
      return false;
    } 

    if (valueTransfer.length <= 1) {
      swal('Erro', 'Verifique o campo Valor.', 'error');
      return false;
    }

    if (dateTransfer.length <= 1) {
      swal('Erro', 'Verifique o campo Data.', 'error');
      return false;
    }

    const collection = 'http://localhost:4000/rest/contacts/' + contactId;
      await axios.get(collection, {
          responseType: 'json'
      }).then(response => {
          contact = response.data.name;
      });
    
    const userId = read_cookie('id');    

    const dataTransfer = {
      reason: reason,
      contact: contact,
      contactId: contactId,
      valueTransfer: valueTransfer,
      dateTransfer: dateTransfer,
      userId: userId,
      collection: "transfers"
    };

    await transfersCheckPrevious(dataTransfer);

    const success = await submitData(dataTransfer);
    if (success) {
      swal({
        title: 'Sucesso',
        text: 'Transferência efetuada!',
        icon: 'success'
      }).then(function() {
         window.location.reload(); 
      });
    } else {
      swal('Erro', 'Falha no envio do Formulário!', 'error');
    }
  };

componentDidMount () {
    axios.get('http://localhost:4000/rest/contacts', {
        responseType: 'json'
    }).then(response => {
        this.setState({ tableData: response.data });
    });
}

render() {
  const tableData = this.state.tableData;
  const userId = read_cookie('id'); 
    return (
      <div>
      <Form>
      <FormGroup>
        <Label for="reason">Motivo da transferencia:</Label>
        <Input name="reason" id="reason" type="text" placeholder="Motivo" value={this.state.value} onChange={this.handleChangeReason} />
      </FormGroup>
      <FormGroup>
        <Label for="contact">Contato Favorecido</Label>       
        <Input type="select"  name="contact" id="contact" value={this.state.value} onChange={this.handleChangeContact} >
          <option value="-1">Escolha um Contato Favorecido para Transferencia</option>
          {tableData.map(contacts => 
           contacts.userId === userId ? 
            <option key={contacts._id} value={contacts._id}>{contacts.name} - CONTA: {contacts.account} - CPF/CNPJ: {contacts.cpf}</option>
           : ''
          )}
         </Input>
      </FormGroup>
      <FormGroup>
        <Label for="valueTransfer">Valor</Label>
        <Input name="valueTransfer" id="valueTransfer" type="number" min="1.00" max="10000.00" step="1.00" value={this.state.value} onChange={this.handleChangeValueTransfer} />
      </FormGroup>
      <FormGroup>
        <Label for="dateTransfer">Data da Transferencia</Label>
        <Input type="date" name="dateTransfer" id="dateTransfer" min="2018-10-05" value={this.state.value} onChange={this.handleChangeDateTransfer} />
      </FormGroup>
      <FormGroup>
          <Link to="/Transferencias">
             <Button color="primary" className="btn btn-primary" onClick={this.salvar}>
                  Salvar
             </Button>
          </Link>
          <Link to="/Transferencias">
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
export default TransfersForm;