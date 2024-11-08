import React from "react";
import { Card, Button } from "react-bootstrap";
import IncomePerPeriod from "../ExpensesPerPeriod";


const IncomeSummary = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Resumo Renda</Card.Title>
        <Card.Text><IncomePerPeriod/></Card.Text>

      </Card.Body>
    </Card>
  );
};

export default IncomeSummary;
