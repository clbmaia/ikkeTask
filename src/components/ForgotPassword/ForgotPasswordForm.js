import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import swal from 'sweetalert';
import { get } from 'lodash';
import requestPassword from '../Submit/RequestPassword';

class ForgotPasswordForm extends Component {

state = {
  email: ''
};

handleChangeEmail = event => {
  this.setState({ email: event.target.value });
};


enviar = async event => {
  event.preventDefault();
  const email = get(this.state, 'email');

  if (email.length <= 1) {
    swal('Erro', 'Verifique o campo Email.', 'error');
    return false;
  }

  const dataRequest = {
    email: email,
    collection: "usersEmail"
  };

  const success = await requestPassword(dataRequest);
    if (success) {
      swal({
        title: 'Operação concluída',
        text: 'Foi enviado uma mensagem para: '+ email +', informando a sua senha.',
        icon: 'success'
      }).then(function() {
        window.location.replace('/');
      });
    } else {
      swal('Erro', 'Email informado não localizado.', 'error');
    }
};


render() {
    return (
      <div>
      <Form>
        <FormGroup>
          <Label for="email">Digite seu <b>Email</b> e em breve, receberá uma nova senha:</Label>
          <Input name="email" id="email" type="email" placeholder="Email" value={this.state.value} onChange={this.handleChangeEmail} />
        </FormGroup>
        <FormGroup>
             <Button color="primary" className="btn btn-primary" onClick={this.enviar}>
                  Enviar
             </Button>
          <Link to="/">
             <Button className="btn btn-secondary float-right">
                  Voltar
             </Button>
          </Link>      
        </FormGroup>
      </Form>
      </div>
    );
  }
}
export default ForgotPasswordForm;