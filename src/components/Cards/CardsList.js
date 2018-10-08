import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { read_cookie } from 'sfcookies';

class CardsList extends Component {

  state = {
    tableData: []
  };

componentDidMount () {
    axios.get('http://localhost:4000/rest/cards', {
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
            <th>NOME DO TITULAR</th>
            <th>NÚMERO</th>
            <th>TIPO</th>
            <th>VENCIMENTO</th>
            <th>LIMITE</th>
          </tr>
        </thead>
        <tbody>

          {tableData.map(cards => 
            cards.userId === userId ? 
              <tr key={cards.id}>
                <td>{cards.name}</td>
                <td>{cards.cardNumber}</td>
                <td>{cards.type}</td>
                <td>{cards.expiration}</td>
                <td>{cards.limit}</td>
              </tr>
           : ''
          )}


        </tbody>
      </Table>

    </Fragment>
  )
}
}
export default CardsList;