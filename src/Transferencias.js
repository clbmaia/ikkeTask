import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import TransfersForm from './components/Transfers/TransfersForm';
import TransfersList from './components/Transfers/TransfersList';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Jumbotron } from 'reactstrap';
import classnames from 'classnames';

class Contatos extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

 render() {
   return (
    <div style={{height:'100%'}}>
      <Menu />
      <main className="mainBox">
       <Jumbotron>
        <h2 className="display-5">Transferências </h2>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Histório de Transferências
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Nova Transferência
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <TransfersList />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col >
                <TransfersForm />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
       </Jumbotron>
      </main>
    </div>    
   );
 }
}
export default Contatos;