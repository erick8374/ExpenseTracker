import React from "react";
import { Card, Button } from "react-bootstrap";
import AccountMenu from "../accountComponents/AccountMenu";
import IncomePerAccountPieChart from "../IncomePerAccountPieChart";

const AccountSummary = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Resumo</Card.Title>
        <Card.Text><AccountMenu/></Card.Text>
        <Card.Text><IncomePerAccountPieChart/></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AccountSummary;
