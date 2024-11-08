import React from 'react';
import { Col, Container, Row, Tabs,Tab } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import AccountSummary from './components/dashboardComponents/accountsSummary';
import IncomeSummary from './components/dashboardComponents/incomeSummary';
import ExpenseSummary from './components/dashboardComponents/expenses.Summary';
import Cachorro from './components/cachorro';

const Dashboard: React.FC = () => {
  return (
    <>
    <Container>
    <Row>
      <Col md={8}  >
      <Tabs defaultActiveKey="contas" >
        <Tab eventKey="contas" title="Contas">
        <AccountSummary></AccountSummary>

        </Tab>
        <Tab eventKey="renda"  title="Renda">
        <IncomeSummary></IncomeSummary>

        </Tab>
        <Tab eventKey="gastos" title="Gastos">
        <ExpenseSummary></ExpenseSummary>

        </Tab>
        </Tabs>
      </Col>
      <Col md={4} >
        <Cachorro></Cachorro>
      </Col>

    </Row>
    </Container>
    </>
  );
};

export default Dashboard;