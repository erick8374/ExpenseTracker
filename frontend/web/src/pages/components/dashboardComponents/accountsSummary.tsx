import React from "react";
import { Card, Button } from "react-bootstrap";
import AccountMenu from "../accountComponents/AccountMenu";


const AccountSummary = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Resumo</Card.Title>
        <Card.Text><AccountMenu/></Card.Text>

      </Card.Body>
    </Card>
  );
};

export default AccountSummary;
