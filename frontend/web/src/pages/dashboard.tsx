import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import AccountSummary from './components/dashboardComponents/accountsSummary';
import IncomeSummary from './components/dashboardComponents/incomeSummary';
import ExpenseSummary from './components/dashboardComponents/expenses.Summary';

const Dashboard: React.FC = () => {
  return (
    <>
    <Container>
    <Row>
      <Col>
        <AccountSummary></AccountSummary>
      </Col>
      <Col>
        <IncomeSummary></IncomeSummary>
      </Col>
      <Col>
        <ExpenseSummary></ExpenseSummary>
      </Col>
    </Row>
    </Container>
    </>
  );
};

export default Dashboard;