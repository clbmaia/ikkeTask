import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { get } from 'lodash';
import swal from 'sweetalert';
import submitData from '../Submit/SubmitData';
import { read_cookie } from 'sfcookies';

class CardsForm extends Component {

  state = {
    name: '',
    cardNumber: '',
    type: '',
    expiration: '',
    limit: ''

  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeCardNumber = event => {
    this.setState({ cardNumber: event.target.value });
  };

  handleChangeType = event => {
    this.setState({ type: event.target.value });
  };

  handleChangeExpiration = event => {
    this.setState({ expiration: event.target.value });
  };

  handleChangeLimit = event => {
    this.setState({ limit: event.target.value });
  };

  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  salvar = async event => {
    event.preventDefault();
    const name = get(this.state, 'name');
    const cardNumber = get(this.state, 'cardNumber');
    const type = get(this.state, 'type');
    const expiration = get(this.state, 'expiration');
    const limit = get(this.state, 'limit');

    if (name.length <= 1) {
      swal('Erro', 'Verifique o campo Nome.', 'error');
      return false;
    }

    if (cardNumber.length <= 1) {
      swal('Erro', 'Verifique o campo Número do Cartão.', 'error');
      return false;
    } 

    if (expiration.length <= 1) {
      swal('Erro', 'Verifique o campo Vencimento.', 'error');
      return false;
    }

    if (limit.length <= 0) {
      swal('Erro', 'Verifique o campo Limite.', 'error');
      return false;
    }

    const userId = read_cookie('id');

    const dataCard = {
      name: name,
      cardNumber: cardNumber,
      type: type,
      expiration: expiration,
      limit: limit,
      userId: userId,
      collection: "cards"
    };


    const success = await submitData(dataCard);
    if (success) {
      swal({
        title: 'Sucesso',
        text: 'Cartão cadastrado!',
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
            <Label for="name">Nome do Titular</Label>
            <Input name="name" id="name" type="text" placeholder="Nome" value={this.state.value} onChange={this.handleChangeName} />
        </FormGroup>
        <FormGroup>
          <Label for="cardNumber">Número do Cartão</Label>
          <Input name="cardNumber" id="cardNumber" type="number" placeholder="Número do Cartão" value={this.state.value} onChange={this.handleChangeCardNumber} />
        </FormGroup>
        <FormGroup>
          <Label for="type">Tipo</Label>
          <Input type="select"  name="type" id="type" value={this.state.value} onChange={this.handleChangeType} >
            <option value="Visa">Visa</option>
            <option value="Master">Master</option>
            <option value="Cielo">Cielo</option>
            <option value="Outro">Outro</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="expiration">Vencimento</Label>
          <Input type="date" name="expiration" id="expiration" min="2020-01-01" value={this.state.value} onChange={this.handleChangeExpiration} />
        </FormGroup>
        <FormGroup>
          <Label for="limit">Limite</Label>
          <Input name="limit" id="limit" type="number" min="100.00" max="10000.00" step="100.00" value={this.state.value} onChange={this.handleChangeLimit} />
        </FormGroup>
        <FormGroup>
          <Link to="/Cartoes">
             <Button color="primary" className="btn btn-primary" onClick={this.salvar}>
                  Salvar
             </Button>
          </Link>
          <Link to="/Cartoes">
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
export default CardsForm;