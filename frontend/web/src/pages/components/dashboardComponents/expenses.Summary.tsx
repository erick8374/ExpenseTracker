import React from "react";
import { Card, Button } from "react-bootstrap";
import ExpensePerCategoryBar from "../expensesView/charts/ExpensePerCategoryBar";


const ExpenseSummary = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Resumo</Card.Title>
        <Card.Text><ExpensePerCategoryBar/></Card.Text>

      </Card.Body>
    </Card>
  );
};

export default ExpenseSummary;
