import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { read_cookie } from 'sfcookies';

class ContactsList extends Component {

  state = {
    tableData: []
  };

componentDidMount () {
    axios.get('http://localhost:4000/rest/contacts', {
        responseType: 'json'
    }).then(response => {
        this.setState({ tableData: response.data });
    });
}


render () {
  const tableData = this.state.tableData;
  const userId = read_cookie('id'); 

  return (
    <Fragment>
   

      <Table hover responsive>
        <thead>
          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>CPF/CNPJ</th>
            <th>CONTA</th>
          </tr>
        </thead>
        <tbody>

          {tableData.map(contacts => 
            contacts.userId === userId ?
            <tr key={contacts.id}>
              <td>{contacts.name}</td>
              <td>{contacts.email}</td>
              <td>{contacts.cpf}</td>
              <td>{contacts.account}</td>
            </tr>
            : ''
          )}


        </tbody>
      </Table>

    </Fragment>
  )
}
}
export default ContactsList;