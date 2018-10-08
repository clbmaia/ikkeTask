import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { read_cookie } from 'sfcookies';

class TransfersList extends Component {

  state = {
    tableData: []
  };



componentDidMount () {
    axios.get('http://localhost:4000/rest/transfers', {
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
            <th>MOTIVO</th>
            <th>CONTATO</th>
            <th>VALOR</th>
            <th>DATA</th>
          </tr>
        </thead>
        <tbody>      
          {tableData.map(transfers => 
             transfers.userId === userId?
              <tr key={transfers._id}>
                <td>{transfers.reason}</td>
                <td>{transfers.contact}</td>
                <td>{transfers.valueTransfer}</td>
                <td>{transfers.dateTransfer}</td>
              </tr>
              : ' '
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}
}
export default TransfersList;